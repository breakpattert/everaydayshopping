<template>
    <div class="container lineTop">
        <scroll-view @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="likeAll" id="item1">
            <div class="w100 item-wrap" v-if="list1.length>0">
                <div class="item flex flex_hc lineBottom" v-for="(item,index) in list1" :key="index">
                    <img class="shopLogo" :src="item.avatar" alt="">
                    <div class="shopName flex1">
                        <!-- <p class="flex over_hidden f14 color32"><i class="bold">{{item.nickname}}</i>点赞了你的{{item.messagetype==3?'文章':item.messagetype==5?'评论':item.messagetype==7?'回复':''}}【我的世界】</p> -->
                        <p class="flex over_hidden f14 color32">
                          {{item.content}}
                        </p>
                        <p class="f10 color9a mt5">{{item.createtime}}</p>
                    </div>
                </div>
            </div>
            <div class="mt10" v-if="list1&&list1.length>0">
                        <zan-loadmore v-if="!isBottom1" type="loading"></zan-loadmore>
                        <zan-loadmore v-if="isBottom1" type="text" text="暂无数据"></zan-loadmore>
            </div>
            <div class="empty3" v-if="list1.length<=0">
                <img src="../../../static/images/img_focus.png">
                <div>您还没有被点赞过哟o(∩_∩)o</div>
            </div>

        </scroll-view>
    </div>
</template>
<script>
import { getSystemInfoSync } from "@/utils/wechat";
export default {
  data() {
    return {
      openId: "",
      page1: 1,
      prePage: 10,
      isBottom1: false,
      list1: []
    };
  },
  methods: {
    async getMore() {
      if (this.isBottom1) return;
      let result1 = await this._to(
        this.$http.getSingleNews("like", this.openId, this.page1, this.prePage)
      );

      if (result1[1].error == 0) {
        if (result1[1].list instanceof Array) {
          if (result1[1].list.length < this.prePage) {
            this.isBottom1 = true;
          }
          result1[1].list.map(this._U.hasOverTime);
          this.list1 = [...this.list1, ...result1[1].list];
          this.page1++;
        }
      } else {
        console.log("加载失败");
      }
    },
    scrolltolower() {
      this.loadMoreTxt = "拼命加载中";
      // if(this.isBottom1) return
      this.getMore();
    }
  },
  onShow() {
    const systemInfo = getSystemInfoSync();
    if (this.$store.state.user.iphoneX) {
      this.windowHeight = systemInfo.windowHeight - 34;
    } else {
      this.windowHeight = systemInfo.windowHeight;
    }
    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "";
    this.page1 = 1;
    this.isBottom1 = false;
    this.list1 = [];
    this.getMore();
  },
  computed: {}
};
</script>
<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  height: calc(100vh - 41px);
  box-sizing: border-box;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  .likeAll {
    overflow: hidden;
    height: 100%;
    .item-wrap {
      background: #fff;
    }
  }

  .item {
    line-height: 1;
    padding: 15px;

    .shopLogo {
      width: 37px;
      height: 37px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 15px;
    }

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
