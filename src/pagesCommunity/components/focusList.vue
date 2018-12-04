<template>
  <scroll-view  @scroll='onScroll'
   @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="scrollView" >
      <wux-refresher id="wux-refresher-focusList" @pulling="onPulling" @refresh="onRefresh">
         
        <div class="w100 wraper">
          <div v-if="attentionList&&attentionList.length>0">
            <div class="w100 focusMains" v-for="(item,index) in attentionList" :key="index">
              <div class="fMains lineBottom" v-if="item.articletype=='1'"
                @click='$router.push({path: "/pagesSub/community/communitydetail", query: { id: item.id, memberid: item.memberid} })'>
                <div class="focusInfo" @click='$router.push({path: "/pagesSub/community/userHomePage", query: {type: item.type,memberid: item.memberid} })'>
                  <div class="focus_ico">
                    <img :src="item.avatar" alt="">
                    <div class="ico" :class="{'isVip':item.type==1}"></div>
                  </div>
                  <div class="focuspl">
                    <p class="color32 f14">{{item.name}}</p>
                    <span>
                      <div class="color9a f10">
                        {{item.createtime}}
                      </div>
                    </span>
                  </div>
                </div>
                <div class="focusImg">
                  <img mode="widthFix" :src="item.cover_img" alt="" />
                </div>
                <div class="focusText">
                  <h4 class="f14 color32">
                    {{item.title}}
                  </h4>
                  <p class="f13 color9a mainContent">{{item.content}}</p>
                </div>
                <div class="focuSpoints">
                  <div class="pointLeft">
                    <div class="mr15" @click.stop="like(item.id,item.memberid,index)">
                      <span class="ico" :class="{'hasLike':item.islike}"></span>
                      <i class="f12">{{(item.likednum | parseint)>999?'999+':item.likednum=='0'?'赞':item.likednum||0}}</i>
                    </div>
                    <div @click.stop="toggleAssessPopup(item.id)">
                      <span class="ico iconComment"></span>
                      <i class="f12">{{item.commentnum||0}}</i>
                    </div>
                  </div>

                  <button @click.stop="returnFalse" class="pointRight" :data-id="item.id" :data-title="item.title" :data-memberid="item.memberid" open-type='share'>
                    <i class="f10 mr3">分享</i>
                    <span class="ico"></span>
                  </button>
                </div>
              </div>

              <!-- @click='$router.push({path: "/pagesSub/community/askdetail",query:{id:item.id}})' -->
              <div class="aksMain lineBottom" v-else 
              
              >
                    <div class="focusInfo" @click.stop='$router.push({path: "/pagesSub/community/userHomePage", query: {type: item.type,memberid: item.memberid} })'>
                      <div class="focus_ico">
                        <img :src="item.avatar" alt="">
                        <div class="ico" :class="{'isVip':item.type==1}"></div>
                      </div>
                      <div class="focuspl">
                        <p class="color32 f14">{{item.name}}</p>
                        <span>
                          <div class="color9a f10">
                            {{item.createtime}}
                          </div>
                        </span>
                      </div>
                      <div class="zan" @click.stop="questionLike(item.id,index)">
                      <span class="ico" :class="{'hasLike':item.islike}"></span>
                      <i class="f12">{{(item.likenum | parseint)>999?'999+':item.likenum=='0'?'赞':item.likenum||0}}</i>
                    </div>
                    </div>
                    <div class="askTitle f16 bold">
                        {{item.title}}
                    </div>
                    <div class="writeAsk" @click.stop='$router.push({path: "/pagesSub/community/askdetail",query:{id:item.id}})'>
                      <div class="mr7 ico"></div>
                      <div class="f12 color9a">写回答</div>

                    </div>
              </div>
            </div>
          </div>

          <div class="mt10 pb10" v-if="attentionList.length>0">
            <zan-loadmore v-if="!attentionIsBottom" type="loading"></zan-loadmore>
            <zan-loadmore v-if="attentionIsBottom" type="text" text="暂无数据"></zan-loadmore>
          </div>
          <div v-if="type!='personal'&&hasLoading&&attentionList.length==0" class="empty3">
            <img src="../../../static/images/icon_none.png">
            <div>没有相关关注哟o(∩_∩)o</div>
          </div>
          <div v-if="hasLoading&&type=='personal'&&attentionList.length==0" class="empty5">
              <img src="../../../static/images/img_publish.png">
              <div>{{isSelf?'你':'他'}}还没有发布过文章哟o(∩_∩)o</div>
                <div class="empbutton" v-if="isSelf" @click="$router.push({path: '/pagesSub/community/experience'})">
                  写文章
                </div>
          </div>
          <!-- 评论内容 模态框 -->
          <comment ref="comment" :articleid="popupId" v-if="isFrom!='commuity'"
            :showAssessbottom="showAssessbottom" @componentDeleteComment="commentDelete"
            @componentReply="componentReply" @popUp="closePopUp"></comment>
          <!-- 评论内容 模态框-->
        </div>
      </wux-refresher>
  </scroll-view>
</template>
<script>
import wxParse from "mpvue-wxparse";
import comment from "@/pagesCommunity/components/comment";
export default {
  props: ["type", "authorOpenid", "isSelf", "isFrom"],
  data() {
    return {
      showAssessbottom: false,
      attentionList: [],
      attentionPage: 1,
      attentionIsBottom: false,
      prePage: 10,
      isIphoneX: false,
      openId: null,
      popupId: "",
      hasLoading: false,
      id: null,
      lastTime: 0,
      firstCount: 0
    };
  },
  methods: {
    returnFalse() {
      return false;
    },
    async getAttentionList() {
      if (this.type != "personal") {
        this.$store.commit("SET_IS_LOADING", false);
        this.$store.commit("SET_IS_LOADING", true);
      }
      let data;
      if (this.type == "personal") {
        data = await this.$http.personalList(
          this.$route.query.memberid,
          this.authorOpenid,
          this.attentionPage,
          this.prePage
        );
      } else {
        data = await this.$http.attentionList(
          this.openId,
          this.attentionPage,
          this.prePage
        );
      }
      if (data.error == 0) {
        if (data.list instanceof Array && data.list.length < this.prePage) {
          this.attentionIsBottom = true;
        }

        data.list && data.list.map(this._U.hasOverTime);
        this.attentionList = [...this.attentionList, ...data.list];
        this.hasLoading = true;
        this.$store.commit("SET_IS_LOADING", false);
        this.attentionPage++;
      } else {
        console.log("加载失败");
      }
    },
    toggleAssessPopup(id) {
      this.popupId = id;
      this.showAssessbottom = false;
      this.showAssessbottom = true;
      this.$bus.$emit("commentPop", {
        isCommentPop: this.showAssessbottom,
        popupId: id
      });
    },
    componentReply(e) {
      this.attentionList.map(val => {
        if (val.id == e) {
          val.commentnum = parseInt(val.commentnum || 0) + 1;
        }
      });
    },
    commentDelete(e) {
      this.attentionList.map(val => {
        if (val.id == e) {
          val.commentnum = parseInt(val.commentnum || 0) - 1;
        }
      });
    },
    onComponentReply(e) {
      // this.$bus.$off("componentReply");
      this.$bus.$on("componentReply", e => {
        this.attentionList.map(val => {
          if (val.id == e.id) {
            val.commentnum = parseInt(val.commentnum || 0) + 1;
          }
        });
      });
    },
    onCommentDelete(e) {
      // this.$bus.$off("commentDelete");
      this.$bus.$on("commentDelete", e => {
        this.attentionList.map(val => {
          if (val.id == e.id) {
            val.commentnum = parseInt(val.commentnum || 0) - 1;
          }
        });
      });
    },
    onCommunitySwiperChage() {
      if (this.type == "personal") return;
      // this.$bus.$off("communitySwiperChage100");
      this.$bus.$on("communitySwiperChage100", async e => {
        this.lastTime = this.lastTime || this._U.getTimestamp();
        let num = await this.$http.antentionUpdate(this.openId, this.lastTime);
        this.lastTime = this._U.getTimestamp();

        if (num.count > 10) {
          await this.refreshList(10);
          this.$store.commit("SET_UPDATE_NUM", 10);
          this.firstCount = num.count - 10;
        } else {
          await this.refreshList(num.count);
          this.$store.commit("SET_UPDATE_NUM", num.count);
        }
      });
    },
    async onRefresh() {
      if (this.type == "personal") return;
      if (this.firstCount <= 0) {
        console.log(this.firstCount);
      } else if (this.firstCount <= 10) {
        await this.refreshList(this.firstCount);
        this.$store.commit("SET_UPDATE_NUM", this.firstCount);
        this.firstCount = 0;
      } else {
        await this.refreshList(10);
        this.$store.commit("SET_UPDATE_NUM", 10);
        this.firstCount = this.firstCount - 10;
      }

      this._U.stopRefresh("#wux-refresher-focusList");
    },
    async refreshList(count) {
      if (count <= 0) return;
      let data = await this.$http.attentionList(
        this.openId,
        this.attentionPage,
        1,
        count
      );
      if (data.error == 0) {
        data.list && data.list.map(this._U.hasOverTime);
        this.attentionList = [...data.list, ...this.attentionList];
      } else {
        console.log("加载失败");
      }
    },
    closePopUp() {
      this.popupId = "";
      this.showAssessbottom = false;
    },
    async like(id, memberid, index) {
      this.showAssessbottom = false;
      let result = await this.$http.personalLike(memberid, this.openId, id);

      if (!result.error) {
        if (result.islike) {
          this.$tips.toast("点赞成功");
          this.attentionList[index].likednum =
            parseInt(this.attentionList[index].likednum || 0) + 1;

          this.$bus.$emit("focusListzan", { id: this.popupId, isZan: 1 });
        } else {
          this.$tips.toast("取消点赞");
          this.attentionList[index].likednum =
            parseInt(this.attentionList[index].likednum || 0) - 1;
          this.$bus.$emit("focusListzan", { id: this.popupId, isZan: 0 });
        }
        this.attentionList[index].islike = result.islike;
      } else {
        this.$tips.toast("请求失败");
      }
    },
    async questionLike(questionid, index) {
      let result = await this.$http.questionLikeOrCancel(
        this.$store.state.user.userInfo.openId,
        questionid
      );
      if (!result.error) {
        if (result.msg == "1") {
          this.$tips.toast("点赞成功");
          this.attentionList[index].likednum =
            parseInt(this.attentionList[index].likednum || 0) + 1;
        } else {
          this.$tips.toast("取消点赞");
          this.attentionList[index].likednum =
            parseInt(this.attentionList[index].likednum || 0) - 1;
        }
        this.attentionList[index].islike = result.islike;
      } else {
        this.$tips.toast("请求失败");
      }
    },
    updateArticlePraise() {
      // 兄弟组件通讯  communitydetail中点了之后在这里要更新点赞数量
      // this.$bus.$off("articlePraise");
      this.$bus.$on("articlePraise", e => {
        console.log(e);
        // e:{id:this.articleid,type:1}  type=1 是点赞成功  0是取消点赞
        if (e.type == 1) {
          console.log("点赞");
          this.attentionList.map(val => {
            if (val.id == e.id) {
              val.likednum = parseInt(val.likednum || 0) + 1;
              val.islike = true;
              return;
            }
          });
        } else {
          console.log("取消点赞");
          this.attentionList.map(val => {
            if (val.id == e.id) {
              val.likednum = parseInt(val.likednum || 0) - 1;
              val.islike = false;
              return;
            }
          });
        }
      });
    },
    updateArticleCommentNum() {
      // 兄弟组件通讯  communitydetail中点了之后在这里要更新点赞数量
      // this.$bus.$off("articleCommentNum");
      this.$bus.$on("articleCommentNum", e => {
        // e:{id:this.articleid,type:1}  type=1 添加评论  0是删除评论
        if (e.type == 1) {
          console.log("添加评论");
          this.attentionList.map(val => {
            if (val.id == e.id) {
              val.commentnum = parseInt(val.commentnum || 0) + 1;
              return;
            }
          });
        } else {
          console.log("删除评论");
          this.attentionList.map(val => {
            if (val.id == e.id) {
              val.commentnum = parseInt(val.commentnum || 0) - 1;
              return;
            }
          });
        }
      });
    },
    onScroll({ mp }) {
      this.$emit("childScrollTop", mp.detail.scrollTop);
    },
    scrolltolower() {
      if (this.attentionIsBottom) return;
      this.getAttentionList();
    }
  },
  computed: {},
  mounted() {
    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "";
    this.onCommunitySwiperChage();
    this.getAttentionList();
    this.updateArticlePraise();
    this.updateArticleCommentNum();
    this.onComponentReply();
    this.onCommentDelete();
  },
  // async onShow() {
  //   this.updateArticlePraise();
  //   this.updateArticleCommentNum();
  // },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") +
        "给您分享天天逛街精美文章" +
        options.target.dataset.title,
      path:
        "/pagesSub/community/communitydetail?id=" +
        options.target.dataset.id +
        "&memberid=" +
        options.target.dataset.memberid
    };
  },
  components: {
    wxParse,
    comment
  },
  beforeDestroy() {
    this.$bus.$off("componentReply");
    this.$bus.$off("commentDelete");
    this.$bus.$off("communitySwiperChage100");
    this.$bus.$off("articlePraise");
    this.$bus.$off("articleCommentNum");
  }
  // async onReachBottom() {
  //   if (this.attentionIsBottom) return;
  //   this.getAttentionList();
  // }
};
</script>

<style  scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "@/styles/comment.scss";

.mainContent {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 75px;
  // /deep/.wxParse {
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   display: -webkit-box;
  //   -webkit-box-orient: vertical;
  //   -webkit-line-clamp: 3;
  //   max-height: 75px;
  //   .p {
  //     margin: 0px 0 10px !important;
  //   }
  // }
}
.scrollView {
  overflow: hidden;
  height: 100%;

  .wraper {
    padding-bottom: 20px;

    .focusMains {
      padding: 0px 15px;
      background: #fff;
      .fMains {
        padding: 10px 0px;
        .focusInfo {
          position: relative;
          display: flex;
          // justify-content: space-between;
          align-items: center;
          width: 100%;
          .focus_ico {
            width: 38px;
            height: 38px;
            position: relative;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            .isVip {
              width: 11px;
              height: 11px;
              background-image: url("#{$imgUrl}icon_authentication@2x.png");
              position: absolute;
              right: 0px;
              bottom: 0px;
            }
          }
          .focuspl {
            padding-left: 10px;
            span {
              display: block;
              width: 114px;
            }
          }
        }
        .focusImg {
          width: 100%;
          // height: 150px;
          height: auto;
          border-radius: 5px;
          margin-top: 10px;
          overflow: hidden;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .focusText {
          h4 {
            line-height: 24px;
          }
          p {
            line-height: 20px;
          }
        }
        .focuSpoints {
          width: 100%;
          justify-content: space-between;
          align-items: center;
          display: flex;
          margin-top: 8px;
          .pointLeft {
            width: 100px;

            height: 20px;

            > div {
              display: inline-block;
              span {
                display: inline-block;
                margin-right: 5px;
                position: relative;
                width: 13px;
                height: 14px;
                background-image: url("#{$imgUrl}icon_snap.@2x.png");
                vertical-align: middle;
              }
              .hasLike {
                background-image: url("#{$imgUrl}icon_fabulous_act.png");
              }
              .iconComment {
                background-image: url("#{$imgUrl}icon_comment2.png");
                vertical-align: middle;
              }
              i {
                display: inline-block;
                color: #323232;
                font-size: 12px;
              }
            }
          }
          .pointRight {
            width: 100px;
            height: 20px;
            text-align: right;
            display: inline-block;
            padding: 0;
            line-height: 20px;
            background: #fff;
            margin: 0;

            span {
              display: inline-block;
              margin-right: 5px;
              position: relative;
              width: 14px;
              height: 13px;
              position: relative;
              top: 1px;
              background: url("#{$imgUrl}icon_share.png") no-repeat 100% 100%;
              background-size: cover;
            }
            i {
              display: inline-block;
              color: #323232;
              font-size: 12px;
            }
          }
        }
      }
      .aksMain {
        padding: 10px 0px 30px;
        .focusInfo {
          position: relative;
          display: flex;

          align-items: center;
          width: 100%;
          .focus_ico {
            width: 38px;
            height: 38px;
            position: relative;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            .isVip {
              width: 11px;
              height: 11px;
              background-image: url("#{$imgUrl}icon_authentication@2x.png");
              position: absolute;
              right: 0px;
              bottom: 0px;
            }
          }
          .focuspl {
            padding-left: 10px;
            span {
              display: block;
              width: 114px;
            }
          }
          .zan {
            position: absolute;
            right: 0px;
            display: flex;
            justify-content: center;
            display: flex;
            span {
              display: inline-block;
              margin-right: 5px;
              position: relative;
              width: 13px;
              height: 14px;
              background-image: url("#{$imgUrl}icon_snap.@2x.png");
              vertical-align: middle;
            }
            .hasLike {
              background-image: url("#{$imgUrl}icon_fabulous_act.png");
            }
          }
        }
        .askTitle {
          width: 100%;
          padding: 15px 10px 20px 48px;
          text-align: left;
        }
        .writeAsk {
          float: right;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .ico {
            width: 14px;
            height: 15px;
            background-image: url("#{$imgUrl}icon_writeacomment.png");
          }
        }
      }
    }
  }
}
</style>
