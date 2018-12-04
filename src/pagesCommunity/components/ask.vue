<template>
    <scroll-view  @scroll='onScroll'
    @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="scrollView" >
      <wux-refresher id="wux-refresher-ask" @pulling="onPulling" @refresh="onRefresh">

        <div class="w100 askContainer">

          <div class="ff455d" v-if="askList&&askList.length>0"></div>
          <div class="wraper">
            <div class="item" v-if="askList&&askList.length>0" v-for="(item,index) in askList" :key='index' @click='$router.push({path: "/pagesSub/community/askdetail",query:{id:item.id}})'>
              <div class="header">
                <div class="averter" @click.stop='$router.push({path: "/pagesSub/community/userHomePage",query:{memberid:item.memberid,type:item.type}})'>
                  <img :src="item.avatar" alt="">
                  <div class="isVip ico" v-if="item.type=='1'"></div>
                </div>
                <div class="nikeName">
                  <div class="fs16" @click.stop='$router.push({path: "/pagesSub/community/userHomePage",query:{memberid:item.memberid,type:item.type}})'>{{item.name}}</div>
                  <div class="mt5 fs10 color9a">{{item.createtime}}</div>
                </div>
              </div>
              <div class="title mt15 fs18 bold">
                {{item.title}}
              </div>
              <div class="replayAsk mt14">
                <div class="f12 color9a">已有{{item.answerCount}}条回答</div>
                <div class="writeAsk" @click.stop='$router.push({path: "/pagesSub/community/answer",query:{id:item.id}})'>
                  <div class="mr7 ico"></div>
                  <div class="f12 color9a">写回答</div>

                </div>
              </div>
            </div>

          </div>
          <div class="mt10" v-if="askList.length>0">
            <zan-loadmore v-if="!askIsBottom" type="loading"></zan-loadmore>
            <zan-loadmore v-if="askIsBottom" type="text" text="暂无数据"></zan-loadmore>
          </div>
          <div v-if="hasLoading&&askList.length<=0" class="empty3">
            <img src="../../../static/images/icon_none.png">
            <div>没有相关问答哟o(∩_∩)o</div>
          </div>
        </div>
      </wux-refresher>
    </scroll-view>
</template>
<script>
import wxParse from "mpvue-wxparse";
import comment from "@/pagesCommunity/components/comment";
export default {
  data() {
    return {
      askList: [],
      askPage: 1,
      prePage: 10,
      askIsBottom: false,
      hasLoading: false,
      lastTime: 0,
      firstCount: 0
    };
  },
  methods: {
    async getAskList() {
      this.$store.commit("SET_IS_LOADING", false);
      this.$store.commit("SET_IS_LOADING", true);
      let data = await this.$http.getAskList(this.askPage, this.prePage);

      if (!data.error) {
        if (
          data.list.data instanceof Array &&
          data.list.data.length < this.prePage
        ) {
          this.askIsBottom = true;
        }

        data.list.data && data.list.data.map(this._U.hasOverTime);
        this.askList = [...this.askList, ...data.list.data];
        this.hasLoading = true;
        this.$store.commit("SET_IS_LOADING", false);
        this.askPage++;
      } else {
        console.log("加载失败");
      }
    },
    updateAnswerNum() {
      // 兄弟组件通讯  communitydetail中点了之后在这里要更新点赞数量
      // this.$bus.$off("answerNum");
      // this.$bus.$off("upDateAskList");
      this.$bus.$on("answerNum", e => {
        // e:{id:this.articleid,type:1}  type=1 是增加回答条数
        this.askList.map(val => {
          if (val.id == e.id) {
            val.answerCount = parseInt(val.answerCount) + 1;
            return;
          }
        });
      });
      this.$bus.$on("upDateAskList", e => {
        console.log(e, 111111111);
        this.getAskList();
      });
    },
    onScroll({ mp }) {
      this.$emit("childScrollTop", mp.detail.scrollTop);
    },
    scrolltolower() {
      if (this.askIsBottom) return;
      this.getAskList();
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

      this._U.stopRefresh("#wux-refresher-ask");
    },
    async refreshList(count) {
      if (count <= 0) return;
      let data = await this.$http.getAskList(this.askPage, 1, count);

      if (!data.error) {
        data.list.data && data.list.data.map(this._U.hasOverTime);
        this.askList = [...data.list.data, ...this.askList];
      } else {
        console.log("加载失败");
      }
    },
    onCommunitySwiperChage() {
      // this.$bus.$off("communitySwiperChage102");
      this.$bus.$on("communitySwiperChage102", async e => {
        this.lastTime = this.lastTime || this._U.getTimestamp();
        let num = await this.$http.askUpdate(this.openId, this.lastTime);
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
    }
  },
  computed: {},
  mounted() {
    this.askList = [];
    this.askPage = 1;
    this.askIsBottom = false;
    this.getAskList();
    this.onCommunitySwiperChage();
    this.updateAnswerNum();
  },
  // async onReachBottom() {
  //   if (this.askIsBottom) return;
  //   this.getAskList();
  // },
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

  components: {
    // wxParse,
    // comment
  },
  beforeDestroy() {
    this.$bus.$off("answerNum");
    this.$bus.$off("upDateAskList");
    this.$bus.$off("communitySwiperChage102");

    // bus.$off('select'，this.handle)
  }
};
</script>

<style  scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "@/styles/comment.scss";
.scrollView {
  overflow: hidden;
  height: 100%;
  .askContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .ff455d {
      background: #ff455d;
      height: 22px;
      width: 100%;
    }
    .wraper {
      position: relative;
      transform: translateY(-20px);
      z-index: 2;
      width: 100%;

      .item {
        width: 345px;
        padding: 7px 20px 13px 11px;
        box-shadow: 0px 2px 3px 0px rgba(50, 50, 50, 0.1);
        border-radius: 5px;
        left: 0;
        right: 0;
        margin: 0 auto;
        background: #fff;
        margin-bottom: 10px;
        .header {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          .averter {
            width: 37px;
            height: 37px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
            position: relative;
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
              z-index: 1;
              right: 0px;
              bottom: 0px;
            }
          }

          .nikeName {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
        }
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
        .replayAsk {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .writeAsk {
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
}
</style>
