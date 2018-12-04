<template>
  <div class="container lineBottom" :class="{'iphonex':iPhoneshow}">
    <div class="w100 pos1" @click="stopFouces">
      <div class="fullPage2" style="opacity:0;" v-if="isFocus">
      </div>
      <isLoading :isLoading='isLoading'></isLoading>

      <div class="w100" id="topHeight">
        <div class="w100 main_img">
          <div class="swiperContainer">
            <img mode="widthFix" :src="strategyDetail.cover_img" alt="" />
          </div>
        </div>
        <div class="w100 lineBottom articleHead">
          <div class="articleAvatar lineBottom flex flex_hc">
            <div class="l" @click.stop="toUserHome(memberid,strategyDetail.type)">
              <img :src="strategyDetail.avatar" alt="">
              <span class="ico" v-if="strategyDetail.type=='1'"></span>
            </div>
            <div class="c flex1" @click.stop="toUserHome(memberid,strategyDetail.type)">
              <p class="color32 f14 bold">{{strategyDetail.name}}</p>
              <p class="color9a f12">{{strategyDetail.self_describe?strategyDetail.self_describe:'该用户暂未设置个性签名'}}</p>
            </div>
            <span class="r f14" @click="shopLike(0,strategyDetail.follow_member)">{{strategyDetail.follow_member?'已关注':'+关注'}}</span>
          </div>
          <div class="articleMains">
            <h2 class="f16 bold color32">{{strategyDetail.title}}</h2>
            <p class="color32 f12">
              <wxParse :content="strategyDetail.content" @preview="preview" @navigate="navigate" />
            </p>
          </div>
          <div class="articleLabel flex">
            <!-- <div class="flex1 flexwrap l">
              <div v-for="(item,index) in strategyDetail.tags" :key="index">{{item}}</div>
            </div>
            <div class="r f12 color9a">日期：{{strategyDetail.createtime}}</div> -->
            <div class="l f12 color9a">{{strategyDetail.createtime}}</div>
          </div>
        </div>
      </div>
      <div class="w100 praise praise2">
        <div class="praBox">
          <div class="commentcounts h50p lineBottom">
            <span class="color32 f16 flex1">评论（{{commentnum||0}}条）</span>
            <div class="write" @click.stop="toggleAssessPopup(articleid)">
              <i></i>
              <span class="color9a f14">写评论</span>
            </div>
          </div>

          <div class="w100 alllist" v-if="allResplist&&allResplist.length>0">
            <div class="lineBottom" v-if="index<3" v-for="(items,index) in allResplist" :key="index">
              <div class="flex praiseInfo">
                <div class="l" @click.stop="toUserHome(items.memberid,items.type)">
                  <img :src="items.avatar" alt="">
                  <span class="ico" v-if="items.type=='1'"></span>
                </div>
                <div class="c flex1">
                  <div>
                    <p class="color9a f14" @click.stop="toUserHome(items.memberid,items.type)">{{items.nickname ||
                      items.name}}</p>
                    <p class="color32 f12">{{items.content}}</p>
                    <span class="color9a f10">{{items.createtime}} ·
                      <i class="color9a f10" v-if="items.openid==openId" @click.stop="deleteComment(items.id)">删除</i>
                      <i class="color9a f10" v-else @click.stop="reply(items.id,items.openid,'',items.nickname || items.name)">回复</i>
                    </span>
                  </div>
                </div>
                <div class="r" @click="articlePraiseComment(items.id,items.like_comment)">
                  <i :class="{'likeActive3':items.like_comment}"></i>
                  <span class="f14 color32" v-if="items.likenum =='0'">赞</span>
                  <span class="f16 color32" v-else-if="items.likenum>999">999+</span>
                  <span class="f16 color32" v-else>{{items.likenum||0}}</span>
                </div>
              </div>
              <div class="praiseMains" v-if="items.replylist.length > 0">
                <div class="praiseWrite">
                  <div class="w100 lineBottom">
                    <div class="praiseInfo textFrist flex" v-for="(item2,index2) in items.replylist" :key="index2" v-if="items.unfoldstatus==false?index2<3:true">
                      <div class="l" @click.stop="toUserHome(item2.from_memberid,item2.from_type)">
                        <img :src="item2.from_avatar" alt="">
                        <span class="ico" v-if="item2.from_type=='1'"></span>
                      </div>
                      <div class="c flex1">
                        <div>
                          <p class="color9a f14" @click.stop="toUserHome(item2.from_memberid,item2.from_type)">{{item2.from_name}}</p>
                          <p class="color32 f12" v-if="index2>0">
                            <span class="color32 f12">回复</span>
                            <span class="color9a f12">@{{item2.to_nickname}}：</span>
                            {{item2.content}}
                          </p>
                          <p class="color32 f12" v-else>
                            {{item2.content}}
                          </p>

                          <span class="color9a f10">{{item2.createtime}} ·
                            <i class="color9a f10" v-if="item2.from_openid==openId" @click.stop="deleteReply(item2.id)">删除</i>

                            <i class="color9a f10" v-else @click.stop="reply(items.id,item2.from_openid,item2.target_id,item2.from_name)">回复</i>
                          </span>

                        </div>
                      </div>
                      <div class="r" @click="articlePraiseReply(items.id,item2.like_reply,item2.id)">
                        <i :class="{'likeActive3':item2.like_reply}"></i>
                        <span class="f14 color32" v-if="item2.likenum =='0'">赞</span>
                        <span class="f16 color32" v-else-if="(item2.likenum | parseint)>999">999+</span>
                        <span class="f16 color32" v-else>{{item2.likenum||0}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="allWritelist flex flex_c flex_hc" @click="unfold(index)" v-if="!items.unfoldstatus&&items.replylist.length>3">
                    <span>查看全部{{items.replynum||0}}条回复</span>
                    <i></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="align font12 color9a h40p" @click.stop="toggleAssessPopup(articleid)">查看全部{{commentnum||0}}条评论 >></div>
          </div>

          <div v-if="allResplist&&allResplist.length<=0" class="empty">
            <img src="../../../static/images/icon_none.png">
            <div>暂无评论</div>
          </div>


        </div>
      </div>
    </div>

    
    <!-- 评论内容 模态框 -->
    <comment ref="comment" :articleid="popupId" :showAssessbottom="showAssessbottom" @componentReply="componentReply"
      @commentlistupdate="commentlist2" @componentDeleteComment="commentlist2" @popUp="closePopUp"></comment>
    <!-- 评论内容 模态框-->
    
    <div class="searchBoxWraper lineTop" v-if="showTop" :class="{'iphoneX2':iPhoneshow}">
      <div class="searchBox ">
        <span class="mr4 searchIcon">{{setnames}}</span>
        <input type="text" class="search" v-model="setcontent" cursor-spacing="16" :focus='isFocus' @click.stop="focusDel" placeholder-class="placeholder"
          :placeholder="placeholder">
        <!--@click.stop="focusDel" @blur="searchblur" -->
      </div>
      <div class="searchsend f14" @click.stop="setcomment()">
        发送
      </div>
    </div>
    <div class="tabBox lineTop" v-if="!showTop" :class="{'iphonexbars':iPhoneshow}">
      <div class="lineRight flex flex_hc flex_c" @click="shopLike(1,strategyDetail.like_article)">
        <span class="mr10" :class="{'likeActive2':strategyDetail.like_article}"></span>
        <p class="color32 f16">赞·{{strategyDetail.likednum||0}}</p>
      </div>
      <div class="flex flex_hc flex_c" @click.stop="toggleAssessPopup(articleid)">
        <span class="mr10"></span>
        <p class="color32 f16">评论·{{commentnum||0}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import wxParse from "mpvue-wxparse";
import isLoading from "@/components/isLoading";
import comment from "@/pagesCommunity/components/comment";
export default {
  data() {
    return {
      imgs: [
        "https://sh.szwfy.com.cn/attachment/images/3/2018/09/B3Z3plH3S4X48KXf3x396rkszKV9uk.jpg",
        "https://sh.szwfy.com.cn/attachment/images/3/2018/10/Nwj6yZXeakH0X6gJ5aEA6hyhKqwxk8.jpg"
      ],
      iPhoneshow: false,
      openId: null,
      articleid: null,
      memberid: null,
      page: 1,
      pagesize: 10,
      limitNum: 3,
      placeholder: "评论使人坚强，说点什么吧",
      showTop: false,
      setcontent: "",
      i_h: "",
      showAssessbottom: false,
      autokeyword: false,
      strategyDetail: {},
      allResplist: "",
      setstatus: "直接评论",
      commentid: "",
      from_openid: "",
      target_id: "",
      unfoldstatus: false,
      isBottom: false,
      loadMoreOne: true,
      textdetil: "没有更多评论",
      buyShopList: "",
      setnames: "",
      push_pages: "",
      commentnum: "",
      isFocus: false,
      monty: true,
      official: "",
      popupId: null
    };
  },
  components: {
    isLoading,
    wxParse,
    comment
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  methods: {
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
      }
    },
    //			获取元素高度
    clientHeights() {
      setTimeout(() => {
        let query = wx.createSelectorQuery();
        query
          .select("#topHeight")
          .boundingClientRect(res => {
            this.i_h = res.height;
          })
          .exec();
      }, 500);
    },
    async initData() {
      this.$store.commit("SET_IS_LOADING", true);
      this.setstatus = "直接评论";
      this.getDetail();
      this.commentlist();
    },
    async getDetail() {
      let List = await this._to(
        this.$http.articleDetail(this.memberid, this.openId, this.articleid)
      );

      this.strategyDetail = List[1].$article_detail;
      this.strategyDetail.createtime = this._U.formatDate(
        this.strategyDetail.createtime,
        "MM.dd"
      );
    },
    async commentlist() {
      this.showAssessbottom = false;
      this.isBottom = false;
      let Data = await this.$http.articleCommentList(
        this.articleid,
        this.openId,
        this.page,
        this.pagesize
      );

      Data.comment_list.map(val => {
        val.replylist && val.replylist.map(this._U.hasOverTime);
        val["unfoldstatus"] = false;
      });
      Data.comment_list.map(this._U.hasOverTime);
      this.allResplist = Data.comment_list;

      if (this.allResplist.length < this.pagesize) {
        this.isBottom = true;
      }
      this.commentnum = Data.total;
      this.push_pages = this.allResplist.length;
      this.$store.commit("SET_IS_LOADING", false);
    },
    async commentlist2(type) {
      this.isBottom = false;
      let pagesize = "";
      if ((type = 1 && this.allResplist.length !== 0)) {
        pagesize = this.allResplist.length + 1;
      } else {
        if (this.allResplist.length == 0) {
          pagesize = 10;
        } else {
          pagesize = this.allResplist.length;
        }
      }
      let Data = await this.$http.articleCommentList(
        this.articleid,
        this.openId,
        1,
        pagesize
      );

      this.commentnum = Data.total;

      Data.comment_list.map(val => {
        val.replylist && val.replylist.map(this._U.hasOverTime);
        val["unfoldstatus"] = false;
      });
      Data.comment_list.map(this._U.hasOverTime);
      this.allResplist = Data.comment_list;

      if (this.allResplist.length < this.pagesize) {
        this.isBottom = true;
      }
    },
    autoKeyWord() {
      this.showAssessbottom = false;
      this.isFocus = true;
      this.setstatus == "直接评论";
      this.setnames = "";
      let pageScroll = parseInt(this.i_h + 12);
      if (this.allResplist.length < 5) {
        this.showTop = true;
      } else {
        this.showTop = true;
        wx.pageScrollTo({
          scrollTop: pageScroll,
          duration: 300
        });
      }
    },
    toggleAssessPopup(id) {
      this.popupId = id;
      this.showTop = false;
      this.showAssessbottom = false;
      this.showAssessbottom = true;
    },
    closePopUp() {
      this.popupId = "";
      this.showAssessbottom = false;
    },
    focusDel() {
      this.isFocus = true;
    },
    searchblur() {
      this.isFocus = false;
    },
    // 关注
    async shopLike(type, islike) {
      this.showAssessbottom = false;
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (type == 0) {
          let res = await this.$http.personalFllow(
            this.memberid,
            this.openId,
            this.articleid
          );

          if (!res.error) {
            this.strategyDetail.follow_member = res.isfollow;
          } else {
            this.$tips.toast("请求失败");
          }
        }
        if (type == 1) {
          let result = await this.$http.personalLike(
            this.memberid,
            this.openId,
            this.articleid
          );

          if (!result.error) {
            if (result.islike) {
              this.$tips.toast("点赞成功");
              this.strategyDetail.likednum =
                parseInt(this.strategyDetail.likednum || 0) + 1;

              this.$bus.$emit("articlePraise", { id: this.articleid, type: 1 });
            } else {
              this.$tips.toast("取消点赞");
              this.strategyDetail.likednum =
                parseInt(this.strategyDetail.likednum || 0) - 1;

              this.$bus.$emit("articlePraise", { id: this.articleid, type: 0 });
            }
            this.strategyDetail.like_article = result.islike;
          } else {
            this.$tips.toast("请求失败");
          }
        }
      }
    },
    async setcomment() {
      this.showAssessbottom = false;
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (this.setcontent == "") {
          this.placeholder = "输入不能为空";
          return;
        }
        if (this.setstatus == "楼层回复") {
          this.setfloorReply();
          this.isFocus = false;

          return;
        }
        if (this.setstatus == "直接评论") {
          let set = await this.$http.articleAddComment(
            this.articleid,
            this.openId,
            this.setcontent
          );

          if (!set.error) {
            this.commentlist2(1);
            this.$tips.toast("发送成功");
            this.setcontent = "";
            this.isFocus = false;

            this.$bus.$emit("articleCommentNum", {
              id: this.articleid,
              type: 1
            });
          } else {
            this.$tips.toast("发送失败");
          }
        }
      }
    },
    componentReply() {
      this.commentlist2(1);
    },
    async reply(c_id, t_openid, t_id, name) {
      this.showAssessbottom = false;
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (this.openId == t_openid) {
          this.$tips.toast("您不能回复自己哦..", function() {}, "none", 2000);
          return;
        }
        this.showTop = true;
        this.isFocus = true;
        this.setstatus = "楼层回复";
        this.commentid = c_id;
        this.target_id = t_id;
        this.to_openid = t_openid;
        this.setnames = "回复:" + name;
      }
    },
    async setfloorReply(event) {
      this.showAssessbottom = false;
      let ids = {
        articleid: this.articleid,
        commentid: this.commentid,
        from_openid: this.openId,
        to_openid: this.to_openid,
        target_id: this.target_id,
        content: this.setcontent
      };
      let res = await this.$http.articleFloorReply(
        ids.articleid,
        ids.commentid,
        ids.from_openid,
        ids.to_openid,
        ids.target_id,
        ids.content
      );

      if (!res.error) {
        this.push_pages = this.page;
        this.commentlist2();
        this.setcontent = "";
        this.$tips.toast("回复楼层成功");
      } else {
        console.log(res.message);
        this.$tips.alert("评论失败");

        return;
      }
    },
    async deleteComment(commentid) {
      this.showAssessbottom = false;
      let res = await this.$http.articleDeleteComment(commentid, this.openId);

      if (!res.error) {
        this.push_pages = this.page;
        this.commentlist2();
        this.$tips.toast("删除成功");

        this.$bus.$emit("articleCommentNum", { id: this.articleid, type: 0 });
      } else {
        console.log(res.message);
        this.$tips.alert("删除失败");

        return;
      }
    },
    async deleteReply(replyid) {
      this.showAssessbottom = false;
      let res = await this.$http.articleDeleteReply(replyid, this.openId);

      if (!res.error) {
        this.push_pages = this.page;
        this.commentlist2();
        this.$tips.toast("删除成功");
      } else {
        console.log(res.message);
        this.$tips.alert("删除失败");

        return;
      }
    },
    unfold(index) {
      this.showAssessbottom = false;
      this.allResplist[index]["unfoldstatus"] = true;
    },
    async articlePraiseComment(commentid, islike) {
      this.showAssessbottom = false;
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        let List = await this.$http.articlePraiseComment(
          commentid,
          this.openId,
          this.articleid
        );

        this.$tips.toast(islike ? "取消点赞" : "点赞成功");
        this.commentlist2();
      }
    },
    async articlePraiseReply(commentid, islike, replyid) {
      this.showAssessbottom = false;
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        let List = await this.$http.articlePraiseReply(
          commentid,
          this.openId,
          replyid
        );

        this.$tips.toast(islike ? "取消点赞" : "点赞成功");
        this.commentlist2();
      }
    },
    stopFouces() {
      this.showAssessbottom = false;
      this.isFocus = false;
      this.showTop = false;
    },
    toUserHome(memberid, type) {
      this.showAssessbottom = false;
      this.$router.push({
        path: "/pagesSub/community/userHomePage",
        query: {
          memberid,
          type
        }
      });
    }
  },
  mounted() {
    this.iphone_xsp();
    this.clientHeights();
  },
  watch: {
    articleid(v) {
      this.strategyDetail = {};
      this.allResplist = "";
      this.initData();
    },
    commentnum: {
      handler(v) {
        this.commentlist2();
      },
      immediate: false
    }
  },
  async onShow() {
    this.setstatus = "直接评论";
    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "";

    this.memberid = this.$route.query.memberid;
    this.articleid = this.$route.query.id;
    this.showAssessbottom = false;
    this.push_pages = "";
    this.page = 1;

    this.clientHeights();
  },
  async onHide() {
    this.showTop = false;
  }
};
</script>
<style scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "@/styles/comment.scss";
.pos1 {
  position: relative;
  z-index: 1;
}
.container {
  background: #f2f2f2;
  margin-bottom: 50px;

  .empty2 {
    margin-bottom: 100px !important;
  }

  .main_img {
    width: 100%;
    position: relative;

    .swiperContainer {
      width: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .articleHead {
    background: #ffffff;

    .articleAvatar {
      padding: 15px;
      position: relative;
      width: 100%;

      .l {
        width: 45px;
        height: 45px;
        margin-right: 10px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .ico {
          width: 11px;
          height: 11px;
          background-image: url("#{$imgUrl}icon_authentication@2x.png");
          position: absolute;
          right: 0px;
          bottom: 0px;
        }
      }

      .r {
        width: 60px;
        height: 24px;
        line-height: 24px;
        background-color: #ff455d;
        border-radius: 12px;
        color: #fff;
        text-align: center;
      }
    }

    .articleMains {
      padding: 15px;

      > p {
        line-height: 2;
      }
    }

    .articleLabel {
      padding: 15px;
      margin-bottom: 15px;

      .l {
        > div {
          font-size: 14px;
          color: #9a9a9a;
          padding: 0px 10px;
          height: 30px;
          line-height: 30px;
          background: rgba(242, 242, 242, 1);
          border-radius: 15px;
          margin-right: 10px;
          margin-bottom: 5px;
        }
      }
    }
  }

  .praise2 {
    padding-bottom: 48px;
    background: #ffffff;

    .commentcounts {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;

      .write {
        > i {
          width: 16px;
          margin-right: 8px;
          height: 15px;
          position: relative;
          top: 3.5px;
          display: inline-block;
          background: url("#{$imgUrl}icon_writeacomment.png") no-repeat 100%
            100%;
          background-size: cover;
        }
      }
    }
  }
}

.searchBoxWraper {
  width: 100%;
  padding: 10px 5px 10px 15px;
  display: flex;
  z-index: 1000;
  justify-content: space-between;
  background: #fff;
  align-items: center;
  position: fixed;
  bottom: 0px;
  left: 0;

  .searchBox {
    .placeholder {
      color: #b7b7b7;
      font-size: 10px;
      vertical-align: middle;
    }

    background: #e8e8e8;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    width: 100%;
    border-radius: 15px;
    padding-left: 12px;

    .searchIcon {
      display: inline-block;
      padding: 0 4px;
      vertical-align: middle;
    }

    .search {
      display: inline-block;
      width: 170px;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }
  }

  .searchsend {
    line-height: 30px;
    color: #fff;
    width: 55px;
    height: 30px;
    background-color: #ff455d;
    border-radius: 0 15px 15px 0;
    text-align: center;
    position: relative;
    right: 12px;
  }
}

.iphoneX2 {
  padding-bottom: 34px;
}

.tabBox {
  display: flex;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: flex-start;
  height: 54px;
  background: #fff;
  z-index: 5;
  position: fixed;
  bottom: 0px;
  left: 0;

  div {
    width: 0%;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 34px;
    text-align: center;

    span {
      width: 24px;
      height: 24px;
      background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }

  div:nth-child(1) {
    span {
      background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
      background-size: 100% 100%;
    }

    .likeActive2 {
      background: url("#{$imgUrl}icon_fabulous_act.png") no-repeat center center !important;
      background-size: 100% 100% !important;
    }
  }

  div:nth-child(2) {
    span {
      background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }

  .likeActive {
    background: url("#{$imgUrl}icon_kindheart_act.png") no-repeat center center !important;
    background-size: 100% 100% !important;
  }
}
</style>
