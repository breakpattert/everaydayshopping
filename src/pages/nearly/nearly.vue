<template>
  <div class="container lineTop">
    <tab_bar cur_index="1"></tab_bar>

    <isLoading :isLoading='isLoading'></isLoading>
    <goAuth></goAuth>

    <div class="homeHeader w100">
      <div class="searchBox">
        <span class="searchIcon mr15"></span>
        <input type="text" class="search" placeholder-class="placeholder" disabled confirm-type="search" :placeholder="placeholder" @click='$router.push({path: "/pagesSub/searchshop/searchresult", query: { type: "nearly"} })'>
      </div>
      <div class="selectitem">
        <van-tab class="catewrap"
          :list="catelist.list"
          tab-class="cateclass"
          active-tab-class="cateselected"
          :selected-id="catelist.selectedId"
          :scroll="catelist.scroll"
          :height="catelist.height"
          @tabchange="catetabChange"
        />          
      </div>
    </div>

    <div class="swiper">
      <div class="content">
        <div>
          <div class="search_mains" id="item1">
            <div @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: { id: item.id,title:item.name}})" class="info_list" v-for="(item,index) in reMarketList" :key='item.id'>
              <div class="bgc_img">
                <wux-image wux-class="image" :src="item.images">
                </wux-image>
                <!--<span class="like z_top">关注+</span>-->
                <p class="share z_top">
									<i></i> 推荐
								</p>
                <p class="address z_top">
                  <i>
                    <img src="../../../static/images/icon_adree@2x.png" alt="" />
                  </i>
                  <span>{{item.distance}}km</span>
                </p>
                <div class="title_name">
                  <h4>{{item.name}}</h4>
                  <p>{{item.activity_num}}家品牌活动</p>
                </div>
              </div>
              <!--显示店铺信息的title蒙版-->
              <div class="moderly">

              </div>
            </div>

            <div @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: { id: item.id,title:item.name}})" class="info_list" v-for="(item,index) in marketList" :key='item.id'>
              <div class="bgc_img">
                <wux-image wux-class="image" :src="item.images">
                </wux-image>
                <!--<span class="like z_top">关注+</span>-->
                <!-- <p class="share z_top">
									<i></i> 推荐
								</p> -->
                <p class="address z_top">
                  <i>
                    <img src="../../../static/images/icon_adree@2x.png" alt="" />
                  </i>
                  <span>{{item.distance}}km</span>
                </p>
                <div class="title_name">
                  <h4>{{item.name}}</h4>
                  <p>{{item.activity_num}}家品牌活动</p>
                </div>
              </div>
              <div class="moderly">

              </div>
            </div>

            <div class="mt10">
              <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
              <zan-loadmore v-if="isBottom" type="text" text="更多商场信息持续更新中..."></zan-loadmore>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
import tab_bar from "@/components/tab_bar";
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getLocation
} from "@/utils/wechat";
import isLoading from "@/components/isLoading";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      clusterInfo: null,
      placeholder: "搜你想要的~",
      contentHeight: 0,
      cateid: "",
      catelist: {
        list: [],
        selectedId: "",
        scroll: true,
        height: 72
      },
      marketList: [],
      reMarketList: [],
      page: 1,
      prePage: 10,
      isBottom: false,
      iPhoneshow: false,
      iphoneheight: ""
    };
  },
  components: {
    tab_bar,
    isLoading
  },
  methods: {
    async initAreaData() {
      const [err, areaList] = await this._to(
        this.$http.getAreaList(
          this.$store.state.user.clusterInfo
            ? this.$store.state.user.clusterInfo.city
            : "深圳市"
        )
      ).catch(e => {
        console.log(e);
      });

      let arr = [
        {
          id: "0",
          title: "全部"
        }
      ];

      //let reg =/区$/gi; //不能把区字去掉    如：坪山新区
      areaList.result.map((val, i) => {
        arr.push({
          title: val.area,
          id: i + 1
        });
      });
      this.catelist.list = arr;
      this.catelist.selectedId = arr[0].id;
    },
    async initData() {
      wx.hideTabBar();
      this.isBottom = false;
      this.clusterInfo = this.$store.state.user.clusterInfo;
      let clusterInfoId = this.$store.state.user.clusterInfo
        ? this.$store.state.user.clusterInfo.id
        : "";
      this.$store.commit("SET_IS_LOADING", false);
      this.$store.commit("SET_IS_LOADING", true);

      const [reMarketList, marketList] = await this._U
        .PromiseAll(
          this.$http.marketList(
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo
              ? this.$store.state.user.clusterInfo.city
              : "深圳市",
            this.cateid,
            1,
            10,
            1,
            1
          ),
          this.$http.marketList(
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo
              ? this.$store.state.user.clusterInfo.city
              : "深圳市",
            this.cateid,
            1,
            10,
            1
          )
        )
        .catch(e => {
          console.log(e);
        });
      this.$store.commit("SET_IS_LOADING", false);
      console.log(reMarketList.result.data);
      console.log(marketList.result.data);

      this.reMarketList = reMarketList.result.data || [];
      this.marketList = marketList.result.data || [];

      if (this.reMarketList.length + this.marketList.length < this.prePage) {
        this.isBottom = true;
      }
    },
    async catetabChange(e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      let i = e.mp.detail;

      this.cateid =
        this.catelist.list[i].title == "全部"
          ? ""
          : this.catelist.list[i].title;
      this.catelist.selectedId = e.mp.detail;
      this.page = 1;
      await this.initData();
    },
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
      } else {
        console.log("用户还未授权过");
      }
    },
    bindGetUserInfo(e) {
      if (e.mp.detail.rawData) {
        const data = e.mp.detail.rawData;
        this.userInfo = JSON.parse(data);
        setStorage("userInfo", data);
      } else {
        console.log("用户按了拒绝按钮");
        return;
      }
    }
  },
  async mounted() {
    await this.initAreaData();
    await this.initData();
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  watch: {
    clusterInfo: {
      async handler(ne, old) {
        await this.initAreaData();
        await this.initData();
      },
      deep: true
    }
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街附近商场...",
      path: this.$route.fullPath
    };
  },
  async onReachBottom() {
    if (this.isBottom) return;
    this.$store.commit("SET_IS_LOADING", true);
    let data = await this.$http.marketList(
      this.$store.state.user.locationInfo.latitude,
      this.$store.state.user.locationInfo.longitude,
      this.$store.state.user.clusterInfo
        ? this.$store.state.user.clusterInfo.city
        : "深圳市",
      this.cateid,
      ++this.page,
      this.prePage,
      1
    );
    this.$store.commit("SET_IS_LOADING", false);
    if (data.result.data.length < this.prePage) {
      this.isBottom = true;
    }
    this.marketList = [...this.marketList, ...data.result.data];
  },
  async onShow() {
    this.clusterInfo = this.$store.state.user.clusterInfo;

    if (!this.$store.state.user.userInfo) {
      this.$store.commit("SET_HANDLE_LOGIN_OUT", get("handleLoginOut"));
      this.$store.commit("SET_USER_INFO", get("userInfo"));
      this.$store.commit("SET_LOGIN_STATUS", get("loginStatus"));
      return;
    }
  }
};
</script>
<style>
/* 全局的  修改子组件的样式  在<style scoped lang='scss'>中无效*/
.cateselected {
  color: #323232 !important;
  border-bottom: none !important;
  font-size: 14px !important;
}
.cateclass {
  position: relative;
  min-width: 60px !important;
}
.cateclass::after {
  content: "";
  width: 1px;
  height: 12px;
  transform: scaleX(0.5);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #e8e8e8;
  z-index: 1;
}
</style>
<style scoped lang='scss'>
.container {
  background-color: #fff;
  padding-top: 106px;

  .selectitem {
    width: 100%;
    font-size: 12px;
    color: #9a9a9a;
  }
  .homeHeader {
    position: fixed;
    top: 0;
    z-index: 98;
    background: #fff;
    padding: 6px 15px;
    .shop_m {
      position: absolute;
      right: 0px;
      top: 0px;
      .shop_home {
        width: 60px;
        height: 30px;
        border-radius: 30px;
        background: #e8e8e8;
        color: #323232;
        position: relative;
        right: 0px;
        top: 0px;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        padding-right: 10px;
        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          position: absolute;
          top: 0px;
          right: 8px;
          img {
            width: 65%;
            height: 7.5px;
          }
        }
      }
      .shop_home_02 {
        width: 60px;
        height: 46px;
        background: url("#{$imgUrl}img_box.png") no-repeat center center;
        background-size: cover;
        position: absolute;
        right: 3px;
        top: 22px;
        text-align: center;
        color: #323232;
        font-size: 14px;
        line-height: 51px;
      }
    }
    .adressIcon {
      width: 13px;
      height: 20px;
      display: inline-block;
      background: url("#{$imgUrl}icon_adr.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    .searchBox {
      display: inline-block;
      height: 30px;
      line-height: 28px;
      background: #e8e8e8;
      width: 100%;
      border-right: 0;
      padding-left: 14px;
      position: relative;
      border-radius: 30px;
      margin: 10px auto;
      .searchIcon {
        display: inline-block;
        width: 13.5px;
        height: 14px;
        background: url("#{$imgUrl}search.png") no-repeat center center;
        background-size: cover;
        vertical-align: middle;
      }
      .searchIcon_2 {
        display: inline-block;
        width: 1px;
        height: 15px;
        vertical-align: middle;
        background: #9a9a9a;
      }
      .search {
        display: inline-block;
        width: 238px;
        height: 15px !important;
        color: #323232;
        vertical-align: middle;
      }
    }
    .ser_button {
      height: 48px;
      line-height: 0px;
      padding: 2px 15px;
      a {
        display: inline-block;
        margin-left: 6px;
        height: 24px;
        border: solid 0.5px #9a9a9a;
        border-radius: 10px;
        color: #b7b7b7;
        line-height: 22px;
        width: 56px;
        font-size: 12px;
        text-align: center;
      }
    }
    .carIcon {
      position: relative;
      display: inline-block;
      width: 21px;
      height: 22px;
      background: url("#{$imgUrl}icon_screen.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
      .count {
        position: absolute;
        width: 15px;
        height: 15px;
        right: -10px;
        top: -6px;
        border-radius: 50%;
        background-color: #ff455d;
        color: #fff;
        text-align: center;
        line-height: 15px;
        font-size: 10px;
      }
    }
  }
  .swiper {
    width: 100%;
    .content {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      .search_mains {
        margin-bottom: 56px;
      }

      .info_list {
        border-radius: 5px;
        width: 100%;
        overflow: hidden;
        padding: 15px;
        padding-bottom: 0;
        position: relative;
        .moderly {
          text-align: center;
          padding: 13px 0;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 170px;
          background: rgba(0, 0, 0, 1);
          opacity: 0.2;
          border-radius: 5px;
          width: 92%;
        }
        .bgc_img {
          width: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 5px;
          height: 170px;
          img {
            width: 100%;
            height: 100%;
          }
          .z_top {
            z-index: 7;
          }
          .like {
            width: 47px;
            height: 23px;
            background-color: #ff455d;
            border-radius: 5px;
            position: absolute;
            top: 11px;
            right: 11px;
            text-align: center;
            line-height: 23px;
            font-size: 12px;
            color: #fff;
          }
          .address {
            width: 68px;
            position: absolute;
            bottom: 11px;
            right: 11px;
            i {
              display: inline-block;
              width: 17px;
              height: 21px;
              overflow: hidden;
              position: relative;
              left: 10px;
              top: -0.5px;
              img {
                width: 50%;
                height: 11px;
              }
            }
            span {
              color: #ffffff;
              position: absolute;
              font-size: 12px;
              left: 22px;
            }
          }
          .title_name {
            z-index: 7;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 152px;
            text-align: center;
            height: 60px;
            padding: 14px 0;
            h4 {
              color: #fff;
              font-weight: 700;
              font-size: 14px;
              text-align: center;
            }
            p {
              color: #f0f0f0;
              font-size: 12px;
              text-align: center;
            }
          }
          .share {
            position: absolute;
            top: 11px;
            left: 0;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0;
            letter-spacing: 0;
            color: #ffffff;
            width: 54px;
            line-height: 25px;
            height: 25px;
            background-color: rgba(50, 50, 50, 0.6);
            border-radius: 0rem 5px 5px 0;
            i {
              display: inline-block;
              width: 3px;
              height: 15px;
              margin: 0 6px;
              position: relative;
              top: 3px;
              background-color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>