<template>
    <div class="w100">
        <slot></slot>
          <van-popup :show="showAssessbottom" custom-class="bottom" @close="toggleAssessPopup" position="bottom">
          <div class="w100 assessPopup">
              <div class="w100" @click="showComment">
                <div class="w100 h40p h1 f14 color9a align h1">共{{commentnum||0}}条评论
                    <i @click.stop="toggleAssessPopup">×</i>
                </div>
                <div class="w100 h40p h2 f16">最新评论</div>
                <div class="w100 popupcontent">
                    <scroll-view scroll-y @scrolltolower="reachBottom"
                       
                     lower-threshold="100" @scroll="scrollviewScroll" :scroll-into-view="viewId">

                        <div id="start" class="w100 alllist" v-if="allResplist&&allResplist.length>0">
                            <div class="lineBottom" v-for="(items,index) in allResplist" :key="index">
                                <div :id="'com_'+items.id" class="flex praiseInfo">
                                    <div class="l" @click.stop="toUserHome(items.memberid,items.type)">
                                      <img :src="items.avatar" alt="">
                                      <span class="ico" v-if="items.type=='1'"></span>
                                    </div>
                                    <div class="c flex1">
                                        <div>
                                            <p class="color9a f14" @click.stop="toUserHome(items.memberid,items.type)">{{items.nickname || items.name}}</p>
                                            <p class="color32 f12">{{items.content}}</p>
                                            <span class="color9a f10">{{items.createtime}} ·
                                                <i class="color9a f10" v-if="items.openid==openId" @click.stop="deleteComment(items.id)">删除</i>
                                                <i class="color9a f10" v-else @click.stop="reply(items.id,items.openid,'',items.nickname || items.name,'com_'+items.id)">回复</i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="r" @click.stop="articlePraiseComment(items.id,items.like_comment)">
                                        <i :class="{'likeActive3':items.like_comment}"></i>
                                        <span class="f14 color32" v-if="items.likenum =='0'">赞</span>
                                        <span class="f16 color32" v-else-if="items.likenum>999">999+</span>
                                        <span class="f16 color32" v-else>{{items.likenum||0}}</span>
                                    </div>
                                </div>
                                <div class="praiseMains" v-if="items.replylist.length > 0">
                                    <div class="praiseWrite">
                                        <div class="w100 lineBottom">
                                            <div :id="'com_'+items.id+'_'+item2.id" class="praiseInfo textFrist flex" v-for="(item2,index2) in items.replylist" :key="index2" v-if="items.unfoldstatus==false?index2<3:true">
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

                                                            <i class="color9a f10" v-else @click.stop="reply(items.id,item2.from_openid,item2.target_id,item2.from_name,'com_'+items.id+'_'+item2.id)">回复</i>
                                                        </span>

                                                    </div>
                                                </div>
                                                <div class="r" @click.stop="articlePraiseReply(items.id,item2.like_reply,item2.id)">
                                                    <i :class="{'likeActive3':item2.like_reply}"></i>
                                                    <span class="f14 color32" v-if="item2.likenum =='0'">赞</span>
                                                    <span class="f16 color32" v-else-if="(item2.likenum | parseint)>999">999+</span>
                                                    <span class="f16 color32" v-else>{{item2.likenum||0}}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="allWritelist flex flex_c flex_hc" @click.stop="unfold(index)" v-if="!items.unfoldstatus&&items.replylist.length>3">
                                            <span>查看全部{{items.replynum||0}}条回复</span>
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="allResplist&&allResplist.length<=0" class="empty">
                            <img src="../../../static/images/icon_none.png">
                            <div>暂无评论</div>
                        </div>
                    </scroll-view>
                </div>
              </div>
              <div class="searchBoxWraper lineTop" :class="{'iphoneX2':iPhoneshow}">
                  <div class="searchBox ">
                      <span class="mr4 searchIcon">{{setnames}}</span>
                      <input type="text" class="search" v-model="setcontent" cursor-spacing="16" @click.stop="focusDel" placeholder-class="placeholder" :placeholder="placeholder">
                  </div>
                  <div class="searchsend f14" @click.stop="setcomment()">
                      发送
                  </div>
              </div>
          </div>
        </van-popup>
    </div> 
</template>
<script>
export default {
  props: ["articleid", "showAssessbottom"],
  data() {
    return {
      iPhoneshow: false,
      viewId: "start",
      floorId: "",
      openId: null,
      page: 1,
      pagesize: 10,
      placeholder: "评论使人坚强，说点什么吧",
      setcontent: "",
      i_h: "",
      autokeyword: false,
      strategyDetail: {},
      allResplist: [],
      setstatus: "直接评论",
      commentid: "",
      from_openid: "",
      target_id: "",
      isBottom: false,
      loadMoreOne: true,
      textdetil: "没有更多评论",
      buyShopList: "",
      setnames: "",
      push_pages: "",
      commentnum: "",
      setint: null,
      isFocus: false,
      monty: true,
      official: ""
    };
  },
  methods: {
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
      }
    },
    async initData() {
      this.commentlist();
    },
    async commentlist() {
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
    toggleAssessPopup() {
      this.showAssessbottom = false;
      this.$emit("popUp", false);
      this.$bus.$emit("commentPop", { isCommentPop: this.showAssessbottom });
    },
    focusDel() {
      this.isFocus = true;
    },
    searchblur() {
      this.isFocus = false;
    },
    async setcomment() {
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

          this.viewId = "";
          this.viewId = "start";

          if (!set.error) {
            this.commentlist2(1);
            this.$tips.toast("发送成功");
            this.setcontent = "";
            this.isFocus = false;

            this.$emit("componentReply", this.articleid);
          } else {
            this.$tips.toast("发送失败");
          }
        }
      }
    },
    async reply(c_id, t_openid, t_id, name, viewId) {
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
        this.isFocus = true;
        this.setstatus = "楼层回复";
        this.commentid = c_id;
        this.target_id = t_id;
        this.to_openid = t_openid;
        this.setnames = "回复:" + name;

        this.floorId = viewId;
      }
    },
    async setfloorReply() {
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

      this.viewId = this.floorId;

      if (!res.error) {
        this.push_pages = this.page;
        this.commentlist2();
        this.setcontent = "";
        this.$tips.toast("回复楼层成功");

        this.$emit("commentlistupdate");
      } else {
        console.log(res.message);
        this.$tips.alert("评论失败");

        return;
      }
    },
    async deleteComment(commentid) {
      let res = await this.$http.articleDeleteComment(commentid, this.openId);

      if (!res.error) {
        this.push_pages = this.page;
        this.$tips.toast("删除成功");

        await this.commentlist2();

        this.$emit("componentDeleteComment", this.articleid);
      } else {
        console.log(res.message);
        this.$tips.alert("删除失败");

        return;
      }
    },
    async deleteReply(replyid) {
      let res = await this.$http.articleDeleteReply(replyid, this.openId);

      if (!res.error) {
        this.push_pages = this.page;
        this.commentlist2();
        this.$tips.toast("删除成功");

        this.$emit("commentlistupdate");
      } else {
        console.log(res.message);
        this.$tips.alert("删除失败");

        return;
      }
    },
    unfold(index) {
      this.allResplist[index]["unfoldstatus"] = true;
    },
    async articlePraiseComment(commentid, islike) {
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
        this.$emit("commentlistupdate");
      }
    },
    async articlePraiseReply(commentid, islike, replyid) {
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

        this.$emit("commentlistupdate");
      }
    },
    stopFouces() {
      this.isFocus = false;
    },
    async reachBottom() {
      if (this.isBottom) return;
      let Data = await this.$http.articleCommentList(
        this.articleid,
        this.openId,
        ++this.page,
        this.pagesize
      );

      if (Data.comment_list.length < this.pagesize) {
        this.isBottom = true;
      }

      Data.comment_list.map(val => {
        val.replylist && val.replylist.map(this._U.hasOverTime);
        val["unfoldstatus"] = false;
      });
      Data.comment_list.map(this._U.hasOverTime);
      this.allResplist = [...this.allResplist, ...Data.comment_list];

      this.push_pages = this.allResplist.length;
    },
    toUserHome(memberid, type) {
      this.$router.push({
        path: "/pagesSub/community/userHomePage",
        query: {
          memberid,
          type
        }
      });
    },
    scrollviewScroll(e) {
      this.viewId = "";
    },
    showComment() {
      this.isFocus = false;
      this.setstatus = "直接评论";
      this.commentid = "";
      this.target_id = "";
      this.to_openid = "";
      this.setnames = "";
    }
  },
  mounted() {
    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "sns_wa_oUnEr5GA3q-i17_y18F8nMGNKGOU";
    // this.openId = this.$store.state.user.userInfo
    //   ? this.$store.state.user.userInfo.openId
    //   : "sns_wa_oUnEr5GA3q-i17_y18F8nMGNKGOU";

    // this.openId = "sns_wa_oUnEr5P25LEE9fRAO-_aAAHSL8W0";
    this.iphone_xsp();

    console.log(this.showAssessbottom);
    //  this.setint = setInterval(() => {
    //    this.commentlist2();
    //
    //    // this.$emit("componentReply")
    //  }, 20000);
  },
  // async onHide() {
  //   clearInterval(this.setint);
  //   this.setint = null;
  // },
  watch: {
    articleid(v) {
      console.log(this.showAssessbottom);
      if (v != "") {
        this.page = 1;
        this.pagesize = 10;
        this.push_pages = "";
        this.initData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/comment.scss";
</style>

