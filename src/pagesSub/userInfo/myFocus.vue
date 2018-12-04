<template>
  <div class="container lineTop" >
    <div class="swiper">
      <div class="navbar flex">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
          </div>
        </block>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>
      <swiper class="content" :duration="50" @change="swiperChange"  :current="currentTab" @animationfinish="onAnimationfinish">
        <swiper-item>
          <scroll-view @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="likeAll" id="item1">
            <div class="w100 item-wrap" v-if="list1.length>0">
              <div class="myFocusAll" v-if="0">
                <div class="f13 h50p lineBottom">你可能感兴趣的人</div>
                <div class="item flex flex_hc lineBottom" v-for="(item,index) in 3" :key="index">
                  <img class="shopLogo" src="../../../static/images/icon_official.png" alt="">
                  <div class="shopName flex1">
                    <span class=" over_hidden f14">老王</span>
                    <span class="text">你可能认识的人</span>
                  </div>
                  <div class="cancelFocus">
                    <span>关注</span>
                  </div>
                </div>

              </div>
              <div class="myFocusAll" >
                <div class="f13 h50p lineBottom">你关注的好友</div>
                <div class="item flex flex_hc lineBottom" v-for="(item,index) in list1" 
              
                :key="index">
                  <img class="shopLogo" :src="item.avatar" alt="">
                  <div class="shopName flex1">
                    <span class=" over_hidden f14">{{item.nickname}}</span>
                    <span class="text">{{item.count}}个粉丝</span>
                  </div>

                  <div class="cancelFocus"   @click="followPerson(item.id,index)">
                    <span class="editbgc">取消关注</span>
                  </div>
                </div>

              </div>
            </div>
            <div class="empty3" v-if="list1.length<=0">
              <img src="../../../static/images/img_focus.png">
              <div>您还没有关注过用户哟o(∩_∩)o</div>
            </div>
          
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view  @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="likeAll" id="item2">
            <div class="w100 item-wrap">
              <div class="myFocusAll brandFocus" v-if="list4&&list4.length>0">
                <div class="lineBottom h50p f13">你关注的品牌</div>
                <div class="item flex flex_hc lineBottom" v-for="(item,index) in list4" v-if="item.isfollow==1" :key="index" @click="$router.push({ path:'/pagesSub/brand/brandDetail',query: { id: item.id}})">
                  <div class="shopLogo">
                    <wux-image wux-class="image" shape="thumbnail" mode="aspectFit" :src="item.images">
                    </wux-image>
                  </div>
                  <div class="shopName flex1">
                    <span class=" over_hidden f14">{{item.brand}}</span>
                    <span class="text f10">{{item.location}}</span>
                  </div>

                  <div class="cancelFocus" @click.stop="tabfollow4(item.isfollow,item.id,index)">
                    <span>{{item.isfollow==1?"已关注":"关注"}}</span>
                  </div>
                </div>

              </div>
            </div>
              <div class="mt10"  v-if=" list4.length>0">
                <zan-loadmore v-if="!isBottom4" type="loading"></zan-loadmore>
                <zan-loadmore v-if="isBottom4" type="text" text="暂无数据"></zan-loadmore>
              </div>
            <div class="empty3" v-if="!list4 || list4.length==0">
              <img src="../../../static/images/img_focus.png">
              <div>您还没有关注过品牌哟o(∩_∩)o</div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view  @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="likeAll" id="item3">
            <div class="w100 item-wrap">
              <div class="myFocusAll clusterFocus" v-if="list3&&list3.length>0">
                <div class="item lineBottom flex flex_hc" v-for="(item,index) in list3" v-if="item.isfollow==1" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: { id: item.cluster_id }})">
                  <div class="shopLogo">
                    <wux-image wux-class="image" shape="rounded" :src="item.images">
                    </wux-image>
                  </div>
                  <div class="shopName flex1">
                    <span class=" over_hidden f14">{{item.name}}</span>
                    <span class="text">{{item.merch_num}}个品牌 {{item.activity_num}}个活动</span>
                  </div>

                  <div class="cancelFocus" @click.stop="tabfollow3(item.isfollow,item.cluster_id,index)">
                    <span>{{item.isfollow==1?"已关注":"关注"}}</span>
                  </div>
                </div>
              </div>
            </div>
              <div class="mt10"  v-if=" list3.length>0">
                <zan-loadmore v-if="!isBottom3" type="loading"></zan-loadmore>
                <zan-loadmore v-if="isBottom3" type="text" text="暂无数据"></zan-loadmore>
              </div>
            <div class="empty3" v-if="!list3 || list3.length==0">
              <img src="../../../static/images/img_focus.png">
              <div>您还没有关注过商场哟o(∩_∩)o</div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view  @scrolltolower='scrolltolower' lower-threshold='200' scroll-y class="likeAll" id="item4">
            <div class="w100 item-wrap">
              <div class="myFocusAll storeFocus" v-if="list2&&list2.length>0">
                <div class="lineBottom h50p f13">你关注的店铺</div>
                <div class="item flex flex_hc lineBottom" v-for="(item,index) in list2" v-if="item.isfollow==1" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.merchid }})">
                  <div class="shopLogo">
                    <wux-image wux-class="image" shape="rounded" :src="item.logo">
                    </wux-image>
                  </div>
                  <div class="shopName flex1">
                    <span class="over_hidden f14">{{item.merchname}}</span>
                  </div>
                  <div class="cancelFocus" @click.stop="tabfollow2(item.isfollow,item.merchid,index)">
                    <span>{{item.isfollow==1?"已关注":"关注"}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt10"  v-if=" list2.length>0">
                <zan-loadmore v-if="!isBottom2" type="loading"></zan-loadmore>
                <zan-loadmore v-if="isBottom2" type="text" text="暂无数据"></zan-loadmore>
              </div>
            <div class="empty3" v-if="!list2 || list2.length==0">
              <img src="../../../static/images/img_focus.png">
              <div>您还没有关注过店铺哟o(∩_∩)o</div>
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
import { getSystemInfoSync } from "@/utils/wechat";
export default {
  data() {
    return {
      openId: "",
      contentHeight: "500px",
      windowHeight: 0,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      prePage: 10,
      isBottom1: false,
      isBottom2: false,
      isBottom3: false,
      isBottom4: false,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      fllow_s: "",
      activeIndex: 0,
      currentTab: 0,
      tabs: [
        {
          name: "用户",
          type: "1",
          checked: true
        },
        {
          name: "品牌",
          type: "2",
          checked: true
        },
        {
          name: "商场",
          type: "3",
          checked: true
        },
        {
          name: "店铺",
          type: "4",
          checked: true
        }
      ]
    };
  },
  methods: {
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
    },
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
      this.getMore();
    },
    async followPerson(memberid, index) {
      let data = await this.$http.personalFllow(
        memberid,
        this.$store.state.user.userInfo.openId
      );

      if (data.error == 0) {
        let that = this;
        if (!data.isfollow) {
          this.$tips.toast(
            "取消关注",
            function() {
              console.log("取消关注");
              that.list1.splice(index, 1);
            },
            "success",
            1000
          );
        }
      } else {
        this.$tips.toast(data.message, function() {}, "none", 1000);
      }
    },
    async getMore() {
      switch (this.activeIndex) {
        case 0:
          if (this.isBottom1) return;
          let result1 = await this._to(
            this.$http.userAttentionList(this.openId, this.page1, this.prePage)
          );

          if (result1[1].status == 1) {
            if (result1[1].result.data instanceof Array) {
              if (result1[1].result.data.length < this.prePage) {
                this.isBottom1 = true;
              }

              this.list1 = [...this.list1, ...result1[1].result.data];
              this.page1++;
            }
          } else {
            console.log("加载失败");
          }
          break;
        case 1:
          if (this.isBottom4) return;
          let result4 = await this._to(
            this.$http.mybrandfollow(this.openId, this.page4, this.prePage)
          );

          if (result4[1].status == 1) {
            if (result4[1].result.data instanceof Array) {
              if (result4[1].result.data.length < this.prePage) {
                this.isBottom4 = true;
              }

              this.list4 = [...this.list4, ...result4[1].result.data];
              this.page4++;
            }
          } else {
            console.log("加载失败");
          }
          break;
        case 2:
          if (this.isBottom3) return;
          let result3 = await this._to(
            this.$http.myclusterfollow(this.openId, this.page3, this.prePage)
          );

          if (result3[1].status == 1) {
            if (result3[1].result.data instanceof Array) {
              if (result3[1].result.data.length < this.prePage) {
                this.isBottom3 = true;
              }

              this.list3 = [...this.list3, ...result3[1].result.data];
              this.page3++;
            }
          } else {
            console.log("加载失败");
          }
          break;
        case 3:
          if (this.isBottom2) return;
          let result2 = await this._to(
            this.$http.myfollow(this.openId, this.page2, this.prePage)
          );
          if (!result2[1].error) {
            if (result2[1].list.data instanceof Array) {
              if (result2[1].list.data.length < this.prePage) {
                this.isBottom2 = true;
              }

              this.list2 = [...this.list2, ...result2[1].list.data];
              this.page2++;
            }
          } else {
            console.log("加载失败");
          }
          break;
      }
    },
    async tabfollow2(fllow, merchid, index) {
      if (fllow == 1) {
        let resultList = await this._to(
          this.$http.getfollow(merchid, this.openId, 0)
        );
        if (resultList[1].status == 1) {
          this.list2 = this.list2.filter(function(val, i) {
            return i != index;
          });
        }
      }
    },
    async tabfollow3(fllow, id, index) {
      if (fllow == 1) {
        let resultList = await this._to(
          this.$http.getclusterfollow(id, this.openId, 0)
        );
        if (resultList[1].status == 1) {
          this.list3 = this.list3.filter(function(val, i) {
            return i != index;
          });
        }
      }
    },
    async tabfollow4(fllow, id, index) {
      if (fllow == 1) {
        let resultList = await this._to(
          this.$http.followInterestBrand(this.openId, 0, id)
        );
        if (resultList[1].status == 1) {
          this.list4 = this.list4.filter(function(val, i) {
            return i != index;
          });
        }
      }
    },
    scrolltolower() {
      this.loadMoreTxt = "拼命加载中";
      this.getMore();
    }
  },
  onPullDownRefresh() {},
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
    this.getMore();
  },
  onReachBottom: function() {
    // this.loadMoreTxt = "拼命加载中";
    // setTimeout(() => {
    //   this.getMore();
    // }, 1000);
  },
  async mounted() {},
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
      if (this.activeIndex == 2) {
        return "navbar_slider_2";
      }
      if (this.activeIndex == 3) {
        return "navbar_slider_3";
      }
    }
  }
};
</script>
<style  scoped lang='scss'>
.container {
  background: #f2f2f2;

  .h100 {
    height: 100px;
    line-height: 100px;
  }
  .swiper {
    width: 100%;

    .navbar {
      position: relative;
      width: 100%;
      background-color: #fff;
      padding: 0 10%;

      .navbar_item {
        width: 0%;
        -webkit-flex: 1;
        flex: 1;
        position: relative;
        line-height: 40px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;

        .navbar_title {
          color: #9a9a9a;
          line-height: 40px;
          display: inline-block;
          font-size: 14px;
        }

        .selective {
          color: #323232;
          font-size: 16px;
        }

        .navbar_item_on {
          color: #ff455d;
        }
      }

      .navbar_slider {
        position: absolute;
        left: 0;
        bottom: -2px;
        z-index: 10;
        width: 48px;
        height: 3px;
        background-color: #ff455d;
        border-radius: 2px;
        transition: all 0.1s;
      }

      .navbar_slider_0 {
        left: 13.5%;
        z-index: 10;
      }

      .navbar_slider_1 {
        z-index: 10;
        left: 33.5%;
      }
      .navbar_slider_2 {
        z-index: 10;
        left: 53.5%;
      }
      .navbar_slider_3 {
        z-index: 10;
        left: 73.5%;
      }
    }

    .content {
      height: calc(100vh - 41px);
      box-sizing: border-box;
      width: 100%;
      -webkit-overflow-scrolling: touch;

      .likeAll {
        overflow: hidden;
        height: 100%;
        .item-wrap {
          .myFocusAll {
            width: 100%;
            padding: 0 15px;
            h3 {
              height: 45px;
              line-height: 45px;
            }
          }
        }
      }
      #item1 {
        .myFocusAll {
          margin-top: 10px;
          background: #fff;
        }
      }
      #item2,
      #item3,
      #item4 {
        .item-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;

          /*促销活动*/
          .myFocusAll {
            margin-top: 10px;
            background: #fff;
          }
        }
      }
      .item {
        line-height: 1.5;
        padding: 13px 0;
        .shopLogo {
          width: 37px;
          height: 37px;
          border-radius: 5px;
          overflow: hidden;
        }
        .shopName {
          margin-left: 15px;
          margin-right: 15px;
          span {
            display: block;
            height: 18px;
            line-height: 18px;
          }
          .text {
            color: #9a9a9a;
            font-size: 11px;
          }
        }
        .cancelFocus {
          & > span {
            display: inline-block;
            width: 54px;
            height: 26px;
            border: 1px solid #ff455d;
            color: #fff;
            background: #ff455d;
            text-align: center;
            font-size: 12px;
            line-height: 26px;
            border-radius: 5px;
          }
          .editbgc {
            border: 1px solid #9a9a9a;
            color: #9a9a9a;
            background: #fff;
          }
        }
      }
      /*促销活动*/
      .brandFocus {
        margin-top: 10px;
        background: #fff;
        .shopLogo {
          width: 62px;
          height: 34px;
        }
      }

      .storeFocus {
        .shopLogo {
          width: 82px;
          height: 62px;
        }
      }
      .clusterFocus {
        .shopLogo {
          width: 82px;
          height: 62px;
        }
      }
    }
  }
}
</style>
