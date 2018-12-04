<template>
  <div class="container" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <div class="askdetail_head">
      <div class="askdetail_head_cont">
        <h2 class="f24 bold">{{questionInfo.title}}</h2>
        <p class="f14 color9a">{{questionInfo.subtitle}}</p>
        <div class="f12 color9a">回答{{questionInfo.count}}</div>
      </div>
    </div>

    <div class="w100" v-if="list&&list.length>0">
      <div class="w100 focusMains" v-for="(item,index) in list" :key="index">        
        <div class="fMains">
          <div class="focusInfo" @click='$router.push({path: "/pagesSub/community/userHomePage", query: { type:item.type,memberid:item.memberid} })'>
            <div class="focus_ico">
              <img :src="item.avatar" alt="">
              <div class="ico" :class="{'isVip':item.type==1}"></div>
            </div>
            <div class="focuspl">
              <p class="color32 f16 bold">{{item.nickname}}</p>
              <span>
                <div class="color9a f10">
                  {{item.createtime}}
                </div>
              </span>
            </div>
          </div>
          <p class="color4040 f14 mainContent">{{item.content}}</p>
          <div class="focusImg flexwrap" v-if="item.images&&item.images.length>0">
            <div class="img" v-for="(childItem, childIndex) in item.images" :key="childIndex">
              <wux-image wux-class="image" :src="childItem" shape="rounded"></wux-image>
            </div>
          </div>
          <div class="focuSpoints">
            <div class="pointLeft">
              <div class="mr15" @click="like(item.id,item.isfavorite)">
                <span class="ico" :class="{'hasLike':item.isfavorite}"></span>
                <i class="f12">{{item.favoriteCount >999?'999+':item.favoriteCount}}</i>
              </div>
              <div :id="item.id" @click.stop="toggleAssessPopup(item.id)">
                <span class="ico iconComment"></span>
                <i class="f12">{{item.commentCount}}</i>
              </div>
            </div>

            <button class="pointRight" open-type='share'>
              <i class="f12">分享</i>
              <span class="ico"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论内容 模态框 -->
    <askcomment ref="comment" :articleid="popupId" :showAssessbottom="showAssessbottom" @componentDeleteComment="commentDelete"
      @componentReply="componentReply" @popUp="closePopUp"></askcomment>
    <!-- 评论内容 模态框-->

    <div v-if="list.length==0" class="empty">
      <img src="../../../static/images/icon_none.png">
      <p class="color9a">暂无回复</p>
    </div>

    <div class="flex flex_hc flex_c answerBtn" :class="{'answerBtn_x':iPhoneshow}" @click="$router.push({path:'/pagesSub/community/answer',query:{id:questionid}})">
      <i class="ico"></i>
      <p class="color3f f18">发布回答</p>
    </div>
  </div>
</template>
<script>
import isLoading from "@/components/isLoading";
import askcomment from "@/pagesCommunity/components/askcomment";
export default {
  data() {
    return {
      iPhoneshow: false,
      iphoneheight: "",
      showAssessbottom: false,
      openId: "",
      page: 1,
      prePage: 10,
      isBottom: false,
      questionInfo: {},
      list: [],
      popupId: ""
    };
  },
  methods: {
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
      }
    },
    async initData() {
      this.$store.commit("SET_IS_LOADING", false);
      this.$store.commit("SET_IS_LOADING", true);
      let data = await this.$http.askDetail(
        this.questionid,
        this.openId,
        this.page,
        this.prePage
      );

      if (!data.error) {
        this.questionInfo = data.data.questionInfo;
        if (
          data.data.answerList.data instanceof Array &&
          data.data.answerList.data.length < this.prePage
        ) {
          this.isBottom = true;
        }

        data.data.answerList.data.map(this._U.hasOverTime);
        this.list = [...this.list, ...data.data.answerList.data];
        this.$store.commit("SET_IS_LOADING", false);
        this.page++;
      } else {
        console.log("加载失败");
      }
    },
    toggleAssessPopup(id) {
      this.popupId = id;
      this.showAssessbottom = false;
      this.showAssessbottom = true;

      // this.$refs.comment.initData();
    },
    componentReply(e) {
      this.list.map(val => {
        if (val.id == e) {
          val.commentCount++;
        }
      });
    },
    commentDelete(e) {
      this.list.map(val => {
        if (val.id == e) {
          val.commentCount--;
        }
      });
    },
    closePopUp() {
      this.popupId = "";
      this.showAssessbottom = false;
    },
    async like(id, isfavorite) {
      this.showAssessbottom = false;
      isfavorite = isfavorite == "1" ? 0 : 1;
      let result = await this.$http.askPraise(this.openId, id, isfavorite);

      if (!result.error) {
        if (isfavorite == "1") {
          this.$tips.toast("点赞成功");
          this.list.map(val => {
            if (val.id == id) {
              val.isfavorite = 1;
              val.favoriteCount = parseInt(val.favoriteCount) + 1;
            }
          });
        } else {
          this.$tips.toast("取消点赞");
          this.list.map(val => {
            if (val.id == id) {
              val.isfavorite = 0;
              val.favoriteCount = parseInt(val.favoriteCount) - 1;
            }
          });
        }
      } else {
        this.$tips.toast("请求失败");
      }
    }
  },
  computed: {},
  // mounted() {
  //   console.log(1111111111)
  //   this.questionid = 1;
  //   this.openId = this.$store.state.user.userInfo ? this.$store.state.user.userInfo.openId :
  //     'sns_wa_oUnEr5GA3q-i17_y18F8nMGNKGOU';
  //   this.initData();
  // },
  onShow() {
    this.showAssessbottom = false;
    this.page = 1;
    this.prePage = 10;
    this.isBottom = false;
    this.questionInfo = {};
    this.list = [];
    this.popupId = "";

    this.questionid = this.$route.query.id;
    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "";
    // this.openId = "sns_wa_oUnEr5P25LEE9fRAO-_aAAHSL8W0";

    // this.questionid = 1;
    this.iphone_xsp();
    this.initData();
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") +
        "给您分享天天逛街精美文章" +
        this.title,
      path:
        "/pagesSub/community/communitydetail?id=" + id + "&memberid=" + memberid
    };
  },
  async onReachBottom() {
    if (this.isBottom) return;
    this.initData();
  },
  components: {
    askcomment,
    isLoading
  }
};
</script>

<style scoped lang='scss'>
@import "@/styles/comment.scss";
.answerBtn {
  position: fixed;
  z-index: 10;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: 48px;
  padding: 0 15px;
  border-radius: 48px;
  background: #ff455d;
  i {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-image: url("#{$imgUrl}icon_answer@2x.png");
  }
}
.answerBtn_x {
  bottom: 60px;
}
.container {
  background: #f2f2f2;
  padding-bottom: 60px;
}

.askdetail_head {
  width: 100%;
  overflow: hidden;
  padding: 0px 20px 30px;
  background: #fff url("#{$imgUrl}askdetail.png") no-repeat top center;
  background-size: 100% auto;

  .askdetail_head_cont {
    margin-top: 50px;
    background-color: #fff;
    width: 100%;
    padding: 30px 15px 20px;
    box-shadow: 0px 3px 7px 0px rgba(50, 50, 50, 0.2);
    border-radius: 5px;
    overflow: hidden;

    p {
      margin: 18px 0px 10px;
    }
  }
}

.mainContent {
  margin-top: 10px;
  line-height: 1.8;
}

.focusMains {
  margin-bottom: 10px;
  padding: 0px 15px;
  background: #fff;

  .fMains {
    padding: 10px 0px;

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
    }

    .focusImg {
      width: 100%;
      height: 150px;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;

      .img {
        width: 108px;
        height: 108px;
        margin-right: 8px;
      }

      .img:nth-child(3n) {
        margin-right: 0px;
      }
    }

    .focuSpoints {
      width: 100%;
      justify-content: space-between;
      align-items: center;
      display: flex;
      margin-top: 15px;

      .pointLeft {
        width: 100px;
        height: 20px;

        > div {
          display: inline-block;

          span {
            display: inline-block;
            margin-right: 5px;
            position: relative;
            width: 18px;
            height: 18px;
            background-image: url("#{$imgUrl}icon_snap.@2x.png");
            vertical-align: middle;
          }

          .hasLike {
            background-image: url("#{$imgUrl}icon_fabulous_act.png");
          }

          .iconComment {
            background-image: url("#{$imgUrl}icon_comment2.png");
          }

          i {
            display: inline-block;
            vertical-align: middle;
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
          position: relative;
          width: 18px;
          height: 18px;
          position: relative;
          top: 1px;
          background-image: url("#{$imgUrl}icon_share.png");
          vertical-align: middle;
        }

        i {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
