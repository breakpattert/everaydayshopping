<template>
 <wux-refresher id="wux-refresher" @pulling="onPulling" @refresh="onRefresh">

    <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
      <div class="handerItem" v-if="msgList.length>0">
        <div class="ico">
        </div>
        <div class="hander_name over_hidden">
          <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
            <div v-for="(item,index) in msgList" :key="index">
              <div>
                <swiper-item @touchmove.stop="catchtouchmove">
                  <div class="swiper_item">{{item.title}}</div>
                </swiper-item>
              </div>
            </div>
          </swiper>
        </div>
      </div>
      <div class="nearly">
        <div class="goodsContent">
          <div class="w100" v-if="brandNewsList&&brandNewsList.length>0">
            <div class="item" v-for="(item,index) in brandNewsList" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: {id: item.id,title:item.name}})">
              <div class="flex cont lineBottom">
                <div class="left">
                  <wux-image wux-class="image" shape="rounded" :src="item.images">
                  </wux-image>
                </div>
                <div class="right flex1">
                  <div class="title flex flex_hc">
                    <p class="f14 color32 bold flex1">{{item.name}}</p>
                    <span class="ico" :class="{'on':item.followCluster==1}" @click.stop="clickFollow(item.followCluster,item.id)"></span>
                  </div>
                  <div class="over_hidden f12 color4040 mt15">{{item.city}}{{item.area}}{{item.addr}}</div>
                  <div class="over_hidden f10 color4040 mt5">{{item.merch_num}}种品牌丨{{item.activity_num}}种活动</div>
                </div>
              </div>
              <div class="flex desc">
                <p class="flex1 f12">距您{{item.jl}}km</p>
                <div class="r flex flex_hc" v-if="item.follow_num > 0">
                  <div class="li" v-if="childindex <= 3" v-for="(childitem,childindex) in item.followList" :key="childindex">
                    <wux-image wux-class="image" shape="circle" :src="childitem.avatar">
                    </wux-image>               
                  </div>
                  <p class="f12 color9a ml5">{{item.follow_num}}人等关注</p>
                </div>
              </div>
            </div>

            <div class="mt10 align">
              <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
              <div v-if="isBottom">
                <p class="f10 color9a mt30">天天逛街 {{version}}</p>
                <p class="f12 colorb7 mt8">更多商城，敬请期待！</p>
              </div>
            </div>
          </div>

          <div v-if="hasLoading&&brandNewsList&&brandNewsList.length<=0" class="empty">
            <img src="../../../static/images/icon_none.png">
            <div>暂无相关热门商场</div>
          </div>

        </div>
      </div>
    </div>
  </wux-refresher>    
</template>

<script>
import { getSystemInfoSync } from "@/utils/wechat";
import isLoading from "@/components/isLoading";

export default {
  data() {
    return {
      clusterInfo: "",
      openId: "",
      city: "",
      lat: "",
      lng: "",
      msgList: [],
      brandNewsList: "",
      iPhoneshow: false,
      iphoneheight: "",
      page: 1,
      prePage: 4,
      isBottom: false,
      version: "",
      hasLoading: false
    };
  },
  components: {
    isLoading
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
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    async initData(data) {
      const [err, brandNewsList] = await this._to(
        this.$http.getHotClusterList(
          this.openId,
          this.city,
          this.lat,
          this.lng,
          this.page,
          this.prePage
        )
      );

      if (brandNewsList.status == 1) {
        if (
          brandNewsList.result.data instanceof Array &&
          brandNewsList.result.data.length < this.prePage
        ) {
          this.isBottom = true;
        }
        this.msgList = brandNewsList.result.activityList || [];
        this.brandNewsList = [
          ...this.brandNewsList,
          ...brandNewsList.result.data
        ];
         this.hasLoading = true;
        this.page++;
      } else {
        console.log("加载失败");
      }

      this.$store.commit("SET_IS_LOADING", false);
    },
    async clickFollow(followCluster, id) {
      // 点击关注
      let res = await this.$http.getclusterfollow(
        id,
        this.openId,
        followCluster == "1" ? 0 : 1
      );

      if (res.status == 0 && res.result.message == "用户OPENID不能为空！") {
        this.$tips.alert("请登录");
        return;
      } else if (res.status == 1) {
        this.brandNewsList.map(val => {
          if (val.id == id) {
            val.followCluster = followCluster == "1" ? 0 : 1;
          }
        });
      } else {
        this.$tips.alert("关注失败");
        return;
      }
    },
    async onRefresh() {
      this.page = 1;
      this.msgList = [];
      this.brandNewsList = "";
      this.isBottom = false;
      await this.initData();
      this._U.stopRefresh();
    }
  },
  async mounted() {
    this.version = this.$version;
    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "";
    this.city = this.$store.state.user.clusterInfo
      ? this.$store.state.user.clusterInfo.city
      : "";
    this.lat = this.$store.state.user.locationInfo
      ? this.$store.state.user.locationInfo.latitude
      : "";
    this.lng = this.$store.state.user.locationInfo
      ? this.$store.state.user.locationInfo.longitude
      : "";
    this.iphone_xsp();
    if (this.isBottom) return;
    this.initData();
  },
  async onReachBottom() {
    if (this.isBottom) return;
    this.initData();

    this.$store.commit("SET_IS_LOADING", false);
  },
  onUnload() {
    this.clusterInfo = "";
    this.openId = "";
    this.city = "";
    this.lat = "";
    this.lng = "";
    this.msgList = [];
    this.brandNewsList = "";
    this.page = 1;
    this.isBottom = false;
    this.version = "";
  }
};
</script>

<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  padding-bottom: 50px;
  width: 100%;
  position: relative;

  .handerItem {
    background: #ffffff;
    position: relative;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    display: flex;

    .ico {
      margin-left: 15px;
      margin-right: 10px;
      width: 17px;
      height: 100%;
      position: relative;
      background-image: url("#{$imgUrl}icon_notice@2x.png");
    }

    .hander_name {
      font-size: 14px;
      color: #404040;
      line-height: 40px;
      width: 0%;
      -webkit-flex: 1;
      flex: 1;
    }

    .hander_r {
      margin-right: 15px;
      width: 30px;
      height: 100%;
      background: url("#{$imgUrl}icon_corner mark.png") no-repeat center top;
      background-size: 100%;
    }

    .swiper_container {
      height: 40px;
      width: 100%;
    }

    .swiper_item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .nearly {
    width: 100%;
    position: relative;
  }

  .goodsContent {
    margin: 0 15px;
    overflow: hidden;
    .item {
      position: relative;
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-top: 10px;
      .cont {
        padding: 10px 15px;
      }
      .desc {
        padding: 0 15px;
        line-height: 40px;
        .li {
          line-height: 1;
          width: 25px;
          height: 25px;
          border: 0.5px solid #ffffff;
          border-radius: 100%;
          overflow: hidden;
          margin-left: -10px;
        }
      }
      .left {
        width: 125px;
        height: 80px;
        position: relative;
        border-radius: 5px;
        box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.1);
      }

      img {
        width: 100%;
        height: 100%;
      }

      .right {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        height: 80px;
        .title {
          .ico {
            width: 17px;
            height: 17px;
            background-image: url("#{$imgUrl}icon_kindheart_g.png");
          }
          .ico.on {
            background-image: url("#{$imgUrl}icon_kindheart_act.png");
          }
        }
      }
    }
  }
}
</style>
