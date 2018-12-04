<template>
  <div class="container lineTop">
    <div class="publish" :class="{'isIphoneX':isIphoneX}" :animation='passAnimation' @click="togglePopup">
      <div class="ico mr5"></div>
      <div class="f18 color3f">发布</div>
    </div>
    <tab_bar cur_index="2"></tab_bar>

    <van-popup :show="showBottom" custom-class="left" @close="togglePopup" position="bottom">
      <div class="toPublish">
        <div class="slogan">
          <div class="ico"> </div>
          <!-- <div class="align f24">在国粉社区</div>
          <div class="align f24 mt10 bold"> 分享我的美好世界</div> -->
        </div>

        <div class="pubulishtype">
          <div class="l" @click='togglePopup();$router.push({path: "/pagesSub/community/experience"})'>
            <div class="ico"></div>
            <div class="f16 mt14">图文心得</div>
          </div>
          <div class="r" @click='togglePopup();$router.push({path: "/pagesSub/community/userQuestion"})'>
            <div class="ico"></div>
            <div class="f16 mt14">提问</div>
          </div>
        </div>
        <div class="publishClose ico" @click="togglePopup"></div>
      </div>
    </van-popup>

    <!-- <isLoading :isLoading='isLoading'></isLoading> -->
    <!-- 评论内容 模态框 -->
    <comment ref="comment" :articleid="popupId" 
      :showAssessbottom="showAssessbottom" @componentDeleteComment="commentDelete"
      @componentReply="componentReply" @popUp="closePopUp"></comment>
    <!-- 评论内容 模态框-->

    <div class="vanBox">
      <div class="searchBoxWraper">
        <div class="headerfonts" @click="$router.push({ path: '/pagesSub/community/userHomePage', query: { memberid: memberInfo.id,type:memberInfo.type } })">
          <!-- <open-data type="userAvatarUrl"></open-data> -->
          <img :src="memberInfo.avatar" alt="" />
          <div class="ico" :class="{'isVip':memberInfo.type==1}"></div>
        </div>
        <div class="searchBox">

          <div class="flex flex_hc">
            <div class="flex1">
              <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
              <span class="searchIcon mr10"></span>
              <input type="text" class="search" disabled placeholder-class="placeholder" :placeholder="placeholder">
            </div>

          </div>
          <div></div>
        </div>
        <div class="headerfonts2" @click="$router.push({ path: '/pagesSub/community/newsHome'})">
          <div class="unreadnum" v-if="unreadnum>0">
            {{unreadnum>99?'99':unreadnum}}
          </div>
        </div>
      </div>
      <!-- <van-tab class="catewrap" :list="catelist.list" v-if="categoryList.length>0"
       tab-class="cateclass" active-tab-class="cateselected" border="border" :selected-id="catelist.selectedId" :scroll="catelist.scroll" :height="catelist.height" @tabchange="catetabChange" /> -->
      <van-tab class="catewrap" :list="catelist.list" v-if="categoryList.length>0"
       tab-class="cateclass" active-tab-class="cateselected" border="border" :selected-id="catelist.selectedId" :scroll="catelist.scroll" :height="catelist.height" @tabchange="catetabChange" />
    </div>
       <div class="refreshWraper" :class="{activeRefrush}">
              <div v-if="updateNum>0" >{{updateNum}}条新内容</div>
              <div v-else >暂无新内容</div>
        </div>
			<swiper class="content" 
      :duration="duration" @change="swiperChange" :current-item-id='catelist.selectedId'>
          
          <swiper-item item-id='100' >
            <div class="w100">
              <focusList ref="focusList" :isFrom='"commuity"' @childScrollTop='onScroll'></focusList>
            </div>
          </swiper-item>
          <swiper-item item-id='101'>
            <div  class="w100">
              <recommend :type='"101"' @childScrollTop='onScroll' :cate="'推荐'"></recommend>
            </div>
          </swiper-item>
          <swiper-item  item-id='102'>
              <div  class="w100">
                <ask @childScrollTop='onScroll'></ask>
              </div>
          </swiper-item>
          <swiper-item :item-id='item.id' v-for="(item,index) in categoryList" :key='index'>
              <div class="w100" >
              <recommend :type='item.id' @childScrollTop='onScroll' :cate='item.title'></recommend>
            </div>
          </swiper-item>

          

         

          
          

         
      </swiper> 


    <!-- <div v-show="101==catelist.selectedId" class="w100">
      <recommend :type='"recomend"' :cate="'推荐'"></recommend>
    </div>

    <div class="w100" v-show="100==catelist.selectedId">
      <focusList ref="focusList"></focusList>
    </div>

    <div v-show="102==catelist.selectedId" class="w100">
      <ask></ask>
    </div>
    <div v-show="item.id==catelist.selectedId" class="w100" v-for="(item,index) in categoryList" :key='index'>
      <recommend :type='item.id' :cate='item.title'></recommend>
    </div> -->

  </div>
</template>
<script>
import tab_bar from "@/components/tab_bar";
import recommend from "@/pagesCommunity/components/recommend";
import focusList from "@/pagesCommunity/components/focusList";
import allList from "@/pagesCommunity/components/allList";
import ask from "@/pagesCommunity/components/ask";
import comment from "@/pagesCommunity/components/comment";

import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getLocation
} from "@/utils/wechat";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
      catelist: {
        list: [
          {
            title: "关注",
            type: "attention",
            id: "100"
          },
          {
            title: "推荐",
            type: "recommend",
            id: "101"
          },
          {
            title: "问答",
            type: "aks",
            id: "102"
          }
        ],
        selectedId: "101",
        scroll: true,
        height: 120
      },
      categoryList: [],
      memberInfo: {},
      tabIndex: 101,
      placeholder: "搜你想要的~",
      scrollTop: 0,
      childScrollTop: 0,
      showBottom: false,
      passAnimation: {},
      unreadnum: 0,
      setint: null,
      prePage: 10,
      isIphoneX: false,
      attentionList: [],
      attentionPage: 1,
      attentionIsBottom: false,
      currentTab: 1,
      duration: 200,
      showAssessbottom: false,
      popupId: ""
    };
  },
  components: {
    tab_bar,
    isLoading,
    recommend,
    focusList,
    allList,
    ask,
    comment
  },
  methods: {
    async catetabChange(e) {
      this.catelist.selectedId = e.mp.detail;
    },
    togglePopup() {
      this.showBottom = !this.showBottom;
    },
    swiperChange(e) {
      this.catelist.selectedId = e.mp.detail.currentItemId;
      this.passAnimation = wx
        .createAnimation({
          timingFunction: "ease",
          duration: 400
        })
        .translateY(0)
        .opacity(1)
        .step()
        .export();

      this.$bus.$emit("communitySwiperChage" + this.catelist.selectedId);
    },
    onScroll(scrollTop) {
      if (scrollTop <= 0) {
        scrollTop = 0;
      } else if (scrollTop > this.windowHeight) {
        // scrollTop = this.windowHeight;
      } //判断浏览器滚动条上下滚动
      if (
        scrollTop > this.childScrollTop
        // || scrollTop == this.windowHeight
      ) {
        //向下滚动
        this.passAnimation = wx
          .createAnimation({
            timingFunction: "ease",
            duration: 400
          })
          .translateY(76)
          .opacity(0)
          .step()
          .export();
      } else {
        this.passAnimation = wx
          .createAnimation({
            timingFunction: "ease",
            duration: 400
          })
          .translateY(0)
          .opacity(1)
          .step()
          .export();
        //向上滚动
      } //给scrollTop重新赋值
      setTimeout(() => {
        this.childScrollTop = scrollTop;
      }, 0);
    },
    onCommentPop() {
      // this.$bus.$off("commentPop");
      this.$bus.$on("commentPop", e => {
        this.showAssessbottom = e.isCommentPop;
        this.popupId = e.popupId;
      });
    },
    closePopUp() {
      this.popupId = "";
      this.showAssessbottom = false;
    },
    componentReply() {
      this.$bus.$emit("componentReply", { id: this.popupId });
    },
    commentDelete() {
      this.$bus.$emit("commentDelete", { id: this.popupId });
    }
  },
  async mounted() {
    wx.hideTabBar();

    if (this.$store.state.user.iphoneX) {
      this.isIphoneX = true;
    }
    // let data = await this.$http.communityCate(
    //   this.$store.state.user.userInfo.openId
    // );

    // this.categoryList = data.list;
    let category = this.$store.state.user.communityCateList;
    this.categoryList = category.list;
    this.catelist.list = [...this.catelist.list, ...category.list];
    this.memberInfo = category.member_info;

    this.onCommentPop();
  },
  async onHide() {
    clearInterval(this.setint);
    this.setint = null;
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    },
    windowHeight() {
      return this.$store.state.user.systemInfo.windowHeight;
    },
    activeRefrush() {
      return this.$store.state.user.refresh;
    },
    updateNum() {
      return this.$store.state.user.updateNum;
    }
  },
  watch: {},

  // onShareAppMessage(options) {
  //   return {
  //     title:
  //       (this.$store.state.user.userInfo
  //         ? this.$store.state.user.userInfo.nickName
  //         : "") +
  //       "给您分享天天逛街精美文章" +
  //       options.target.dataset.title,
  //     path:
  //       "/pagesSub/community/communitydetail?id=" +
  //       options.target.dataset.id +
  //       "&memberid=" +
  //       options.target.dataset.memberid
  //   };
  // },
  async onShow() {
    if (!this.$store.state.user.userInfo) {
      this.$store.commit("SET_HANDLE_LOGIN_OUT", get("handleLoginOut"));
      this.$store.commit("SET_USER_INFO", get("userInfo"));
      this.$store.commit("SET_LOGIN_STATUS", get("loginStatus"));
      return;
    }

    let getNewsNum = await this.$http.getNewsNum(
      this.$store.state.user.userInfo.openId
    );
    this.unreadnum = getNewsNum.unreadnum;

    if (this.setint) return;
    this.setint = setInterval(async () => {
      let getNewsNum = await this.$http.getNewsNum(
        this.$store.state.user.userInfo.openId
      );
      this.unreadnum = getNewsNum.unreadnum;
    }, 5000);
  },
  beforeDestroy() {
    this.$bus.$off("commentPop");

    // bus.$off('select'，this.handle)
  }
};
</script>

<style scoped lang='scss'>
.refreshWraper {
  width: 100%;
  height: 25px;
  position: fixed;
  z-index: 99;
  top: 75px;
  left: 0;
  opacity: 0;
  transition: all 1s ease;
  display: flex;
  justify-content: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #ffffff;
    font-size: 11px;
    padding: 5px;
    border-radius: 5px;
    background: #525251;
  }
}
.activeRefrush {
  opacity: 1;
  transform: translateY(30px);
}
.vh100 {
  height: 100vh !important;
}
.isCommentPop {
  height: 100vh !important;
  z-index: 99 !important;
  position: fixed !important;
  // top: 0px;
  transform: translateY(-90px) !important;
}
.container {
  background-color: #f2f2f2;
  padding: 90px 0 60px;
  /deep/.van-popup {
    z-index: 23;
  }
  .publish {
    width: 100px;
    height: 47px;
    border-radius: 23.5px;
    background: #ff455d;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 64px;
    right: 15px;
    z-index: 5;
    .ico {
      width: 18px;
      height: 20px;
      background-image: url("#{$imgUrl}icon_answer@2x.png");
    }
  }
  .isIphoneX {
    bottom: 100px !important;
  }
  .toPublish {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .slogan {
      margin-top: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .ico {
        width: 240px;
        height: 81px;
        background-image: url("#{$imgUrl}img_release_share.png");
      }
      // > .f24 {
      //   transform: translateY(-120px);
      //   letter-spacing: 5px;
      //   white-space: nowrap;
      // }
    }
    .pubulishtype {
      transform: translateY(25px);
      width: 270px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        display: flex;
        flex-direction: column;
        width: 120px;
        align-items: center;
      }
      .l {
        .ico {
          width: 60px;
          height: 60px;
          background-image: url("#{$imgUrl}icon_figure.png");
        }
      }
      .r {
        .ico {
          width: 60px;
          height: 60px;
          background-image: url("#{$imgUrl}icon_quiz.png");
        }
      }
    }
    .publishClose {
      transform: translateY(-25px);
      width: 27px;
      height: 27px;
      background-image: url("#{$imgUrl}icon_fork.png");
    }
  }
  .vanBox {
    width: 100%;
    height: 90px;
    overflow: hidden;
    padding: 0 15px;
    padding-top: 10px;
    position: fixed;
    top: 0px;
    z-index: 22;
    background: #ff455d;
    .searchBoxWraper {
      width: 100%;
      padding: 0px 0px 5px 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      z-index: 1;
      .headerfonts {
        width: 27px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        height: 27px;

        img {
          width: 100%;
          height: 100%;
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
      .headerfonts2 {
        width: 19px;
        height: 19px;
        position: relative;
        background: url("#{$imgUrl}icon_comment_white@2x.png") no-repeat center
          center;
        background-size: 100% 100%;
        .unreadnum {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #ffc900;
          color: #ffffff;
          font-size: 10px;
          position: absolute;
          text-align: center;
          line-height: 15px;
          top: -8px;
          right: -5px;
        }
      }
      .searchBox {
        width: 286px;
        position: relative;
        margin: 0px 5px 0px 8px;
        &::before {
          content: " ";
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
          border: solid 0.5px #b7b7b7;
          border-width: 2rpx;
          border-radius: 30px;
        }

        .placeholder {
          color: #b7b7b7;
          font-size: 10px;
          vertical-align: middle;
        }

        background: #ffffff;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        padding-left: 20px;
        padding-right: 20px;

        .searchIcon {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url("#{$imgUrl}icon_search_red@2x.png") no-repeat center
            center;
          background-size: cover;
          vertical-align: middle;
        }

        .search {
          display: inline-block;
          width: 170px;
          height: 20px;
          line-height: 20px;
          min-height: 20px;
          vertical-align: middle;
        }
      }
    }
    /deep/ .catewrap {
      width: 100%;
      position: relative;
      top: -10px;
      z-index: 0;
      overflow: hidden;

      .border {
        border-bottom: 0px !important;
        background: #ff455d !important;
        transform: translateX(-6px) !important;
      }

      .cateselected {
        border: none !important;
        color: #ffffff !important;
        font-size: 14px !important;
      }
      .cateclass {
        position: relative;
        min-width: 10px !important;
        margin: 0 6px;
        padding: 0 !important;
        background: #ff455d;
        color: #ffffff;
      }

      .cateselected::after {
        content: "";
        width: 100%;
        height: 3px;
        border-radius: 2px;
        /*transform: scaleX(0.5);*/
        position: absolute;
        right: 0;
        left: 0;
        bottom: 10px;
        margin: auto;
        background: #ffffff;
        z-index: 1;
      }
      .zan-tab .zan-tab__title {
        background: #ff455d;
      }
      .zan-tab .zan-tab__bd {
        background: #ff455d !important;
      }
    }
  }
  .content {
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 90px - 50px);
    -webkit-overflow-scrolling: touch;
    swiper-item {
      > .w100 {
        height: 100%;
      }
    }
    /deep/scroll-view {
      height: 100%;
    }
  }
}
</style>