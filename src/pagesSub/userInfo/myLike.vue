<template>
  <div class="container lineTop">
    <div class="swiper">
      <div class="navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
          </div>
        </block>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>
      <swiper class="content" :duration="50" @change="swiperChange" :current="currentTab">
        <swiper-item>
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
            <div class="likeAll" id="item1">
              <div class="w100" v-if="list1&&list1.length>0">
                <div class="w100 item-wrap active_t">
                  <div class="item" v-for="(item,index) in list1" :key="index" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})">
                    <div class="over_box">
                      <a href="">
                        <wux-image wux-class="image" :src="item.thumb">
                        </wux-image>
                      </a>
                      <div class="item_text over_hidden">
                        {{item.title}}
                      </div>
                      <div class="itemDetial">
                        <span class="fl colorf45d f14">￥{{item.productprice}}</span>
                        <span class="fr f12 color_s">已售{{item.sales}}件</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt10">
                  <zan-loadmore v-if="!isBottom1" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom1" type="text" text="暂无数据"></zan-loadmore>
                </div>
              </div>
              <div class="empty3" v-if="!list1 || list1.length==0">
                <img src="../../../static/images/img_focus.png">
                <div>您还没有收藏过商品哟o(∩_∩)o</div>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
            <div class="likeAll" id="item2">
              <div class="w100" v-if="list2&&list2.length>0">
                <div class="w100 item-wrap active_f">
                  <div class="active_box1">
                    <div class="item active_fiex" v-for="(item,index) in list2" :key="index" v-if="index%2 !==1" @click="activity_info(item.id,item.merchid,item.is_official)">
                      <div class="item_box_1">
                        <div class="leftIco" v-if="item.is_official==1"></div>
                        <a href="">
                          <wux-image wux-class="image" :src="item.cover_img">
                          </wux-image>
                        </a>
                        <div class="item_text item_text2">
                          #{{item.title}}:
                          <i>{{item.sub_title}}</i>
                        </div>
                        <div class="item_ico flex flex_hc">
                          <div class="lis_1">
                            <img :src="item.thumb" alt="" />
                          </div>
                          <p class="f12 flex1">{{item.name}}</p>
                          <div class="lis_2 flex flex_hc" @click.stop="styFollow(item.id,index)">
                            <span class="ico"></span>
                            <i class="f14">{{item.follownum}}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="active_box2">
                    <div class="item active_fiex" v-for="(item,index) in list2" :key="index" v-if="index%2 ==1" @click="activity_info(item.id,item.merchid,item.is_official)">
                      <div class="item_box">
                        <div class="leftIco" v-if="item.is_official==1"></div>
                        <a href="">
                          <wux-image wux-class="image" :src="item.cover_img">
                          </wux-image>
                        </a>
                        <div class="item_text item_text2">
                          #{{item.title}}:
                          <i>{{item.sub_title}}</i>
                        </div>
                        <div class="item_ico flex flex_hc">
                          <div class="lis_1">
                            <img :src="item.thumb" alt="" />
                          </div>
                          <p class="f12 flex1">{{item.name}}</p>
                          <div class="lis_2 flex flex_hc" @click.stop="styFollow(item.id,index)">
                            <span class="ico"></span>
                            <i class="f14">{{item.follownum}}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt10">
                  <zan-loadmore v-if="!isBottom2" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom2" type="text" text="暂无数据"></zan-loadmore>
                </div>
              </div>
              <div class="empty3" v-if="!list2 || list2.length==0">
                <img src="../../../static/images/img_focus.png">
                <div>您还没有收藏过穿搭哟o(∩_∩)o</div>
              </div>
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
      windowHeight: 0,
      lowerThreshold:"100",
      page1: 1,
      page2: 1,
      per_page: 10,
      list1: [],
      list2: [],
      prePage: 6,
      isBottom1: false,
      isBottom2: false,
      contentHeight: 0,
      tabs: [
        {
          name: "商品",
          type: "1",
          checked: true
        },
        {
          name: "穿搭",
          type: "2",
          checked: true
        }
      ],
      activeIndex: 0,
      currentTab: 0
    };
  },
  methods: {
    async getMore() {
    
      switch (this.activeIndex) {
        case 0:
          if (this.isBottom1) return;
          let result1 = await this._to(
            this.$http.mylike(this.$store.state.user.userInfo.openId, this.page1, this.prePage)
          );

          if (!result1[1].error) {
            if (
              result1[1].list.data instanceof Array &&
              result1[1].list.data.length > 0
            ) {
              if (result1[1].list.data.length < this.prePage) {
                this.isBottom1 = true;
              }

              this.list1 = [...this.list1, ...result1[1].list.data];
              this.page1++;
            }
          } else {
            console.log("加载失败");
          }
          break;
        case 1:
          if (this.isBottom2) return;
          let result2 = await this._to(
            this.$http.mystrategyfollow(this.$store.state.user.userInfo.openId, this.page2, this.prePage)
          );

          if (!result2[1].error) {
            if (
              result2[1].list instanceof Array &&
              result2[1].list.length > 0
            ) {
              if (result2[1].list.length < this.prePage) {
                this.isBottom2 = true;
              }

              this.list2 = [...this.list2, ...result2[1].list];
              this.page2++;
            }
          } else {
            console.log("加载失败");
          }
          break;
      }
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
    },
    swiperChange(e) {
      this.page1= 1;
      this.page2= 1;
      this.list1= [];
      this.list2= [];
      this.isBottom1= false;
      this.isBottom2= false;
      this.activeIndex= 0;
      this.currentTab= 0;
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
      
      this.getMore();
    },
    activity_info(id, merchid,is_official) {
      this.$router.push({
        path: "/pagesSub/busineshop/strategyDetil",
        query: {
          id,
          merchid:is_official==0?merchid:'',
          type: "info",
          official:is_official
        }
      });
    },
    async styFollow(id,index) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        let List = await this._to(
          this.$http.strategyFollow(
            id,
            this.$store.state.user.userInfo.openId
          )
        );
        if (!List[1].error) {
          this.list2 = this.list2.filter(function(val, i) {
            return val.id != id;
          });
        }
      }
    },
    reachBottom: function() {
      this.getMore();
    },
  },
 async onShow(){
    this.page1= 1;
    this.page2= 1;
    this.list1= [];
    this.list2= [];
    this.isBottom1= false;
    this.isBottom2= false;
    await this.getMore();
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
    }
  },
};
</script>
<style  scoped lang='scss'>
.container {
  background: #f2f2f2;
  .leftIco{
    position: absolute;
    left:0px;
    top:0px;
    z-index:1;
    width:29px !important;
    height:26px;
    background: url("#{$imgUrl}img_official@3x.png") no-repeat center center;
        background-size: 100% 100%;
  }
  .swiper {
    width: 100%;

    .navbar {
      border-radius: 3px 3px 0 0;
      position: relative;
      top: 0;
      height: 40px;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      text-align: center;

      .navbar_item {
        position: relative;
        display: inline-block;
        width: 80px;
        padding: 10px 0;
        text-align: center;
        font-size: 0;

        .navbar_title {
          color: #9a9a9a;
          font-weight: 500;
          display: inline-block;
          font-size: 14px;
          max-width: 8em;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
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
        background-color: #FF455D;
        border-radius: 2px;
        transition: all 0.1s;
      }

      .navbar_slider_0 {
        left: 33%;
        z-index: 10;
      }

      .navbar_slider_1 {
        z-index: 10;
        left: 54.5%;
      }
    }

    .content {
      box-sizing: border-box;
      width: 100%;
      height: calc(100vh - 40px);
      -webkit-overflow-scrolling: touch;
      scroll-view{
				height: 100%;
			}
      #item1 {
        display: block;
        background: #f2f2f2;
        .item-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7.5px;
          .item {
            padding: 7.5px;
            .over_box {
              background: #fff;
              overflow: hidden;
              border-radius: 5px;
            }
          }
        }
      }

      #item2 {
        .item-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;

          .item {
            position: relative;
            border-radius: 2px;
            width: 50%;
            padding: 8px 10px;

            a {
              display: block;
              height: 169px;
              width: 100%;
              overflow: hidden;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .item_text {
              width: 170px;
              height: 31.5px;
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0;
              color: #323232;
              padding: 9px 16px;
              position: relative;
            }

            .z_price {
              display: inline-block;
              position: absolute;
              left: 0px;
              width: 40px;
              height: 20px;
              line-height: 20px;
              background-color: #ff455d;
              border-radius: 0px 4px 4px 4px;

              text-align: center;
              font-size: 12px;
              color: #ffffff;
              overflow: hidden;
              top: 0px;
            }
          }

          /*促销活动*/

          .active_fiex {
            display: block;
            border-radius: 6px;
            padding: 4px;

            .item_box {
              border: 0.5px solid #e8e8e8;
              border-radius: 8px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0rem 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);
              position:relative;
              a {
                position: relative;
                .z_price_2 {
                  display: inline-block;
                  position: absolute;
                  right: 7.5px;
                  width: 80px;
                  height: 30px;
                  line-height: 20px;
                  border-radius: 0px 4px 4px 4px;
                  vertical-align: middle;
                  text-align: center;
                  font-size: 12px;
                  color: #ffffff;
                  overflow: hidden;
                  bottom: 7.5px;

                  i {
                    display: inline-block;
                    width: 14px;
                    height: 13px;
                    margin-right: 6px;
                    vertical-align: middle;
                    margin-bottom: 2px;
                    background: url("#{$imgUrl}icon_heart_xing.png") no-repeat
                      100% 100%;
                    background-size: cover;
                  }
                }
              }

              .itemDetial2 {
                padding: 20px 9px 9px 9px;
              }

              .item_text2 {
                width: 100%;
                height: auto;

                i {
                  display: inline;
                  color: #9a9a9a;
                  font-size: 12px;
                }
              }
              .item_ico {
                padding:0 9px 5px 9px;
                height: 30px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                position: relative;
                line-height: 30px;

                .lis_1 {
                  width: 23px;
                  height: 23px;
                  border-radius: 50%;
                  overflow: hidden;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                  
                  i {
                    position: relative;
                    top: -6px;
                    display: inline-block;
                    color: #323232;
                  }
                }
                .lis_2 {
                  width: 60px;
                  justify-content: flex-end;
                  span {
                    display: inline-block;
                    width: 13px;
                    height: 12px;
                    margin-right: 5px;
                    position: relative;
                    background-image:url(../../../static/images/icon_kindheart.png)        
                  }
                  i {
                    display: inline-block;
                    color: #9a9a9a;
                  }
                }
              }
            }
          }
        }
        .active_f {
          padding: 7.5px;
          div {
            width: 100%;
          }

          .active_box1 {
            display: flex;
            flex-direction: column;
            width: 50%;
            height: 100%;
            .active_fiex {
              border-radius: 12rpx;
              padding: 8rpx;
              .item_box_1 {
                position:relative;
                border-radius: 4px;
                background: #fff;
                overflow: hidden;
                box-shadow: 0px 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);
                .item_text2 {
                  width: 100%;
                  height: auto;

                  i {
                    display: inline;
                    color: #9a9a9a;
                    font-size: 12px;
                  }
                }
                .item_ico {
                  padding:0px 9px 5px 9px;
                  height: 30px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  position: relative;
                  line-height: 30px;

                  .lis_1 {                    
                      margin: 3px;
                      width: 23px;
                      height: 23px;
                      border-radius: 50%;
                      overflow: hidden;
                      img {
                        width: 100%;
                        height: 100%;
                      }
                    i {
                      position: relative;
                      top: -6px;
                      display: inline-block;
                      color: #323232;
                    }
                  }
                  .lis_2 {
                    width: 60px;
                    justify-content:flex-end;
                    span {
                      display: inline-block;
                      width: 13px;
                      height: 12px;
                      margin-right: 5px;
                      position: relative;
                      background-image:url(../../../static/images/icon_kindheart.png) 
                    }
                    i {
                      display: inline-block;
                      color: #9a9a9a;
                    }
                  }
                }
              }
            }
          }

          .active_box2 {
            display: flex;
            flex-direction: column;
            width: 50%;
            height: 100%;
          }
        }
      }

      .likeAll {
        .item-wrap {
          display: flex;
          background: #f2f2f2;
          flex-wrap: wrap;

          justify-content: flex-start;

          .item {
            position: relative;
            border-radius: 2px;
            width: 50%;
            padding: 8px 10px;

            a {
              display: block;
              height: 169px;
              width: 100%;
              overflow: hidden;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .item_text {
              width: 150px;
              height: 31.5px;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0;
              color: #323232;
              padding: 9px 13.5px;
              position: relative;
            }

            .itemDetial {
              height: 28px;
              padding: 0 13.5px;

              .color_s {
                color: #9a9a9a;
              }
            }

            .z_price {
              display: inline-block;
              position: absolute;
              left: 0px;
              width: 40px;
              height: 20px;
              line-height: 20px;
              background-color: #ff455d;
              border-radius: 0px 4px 4px 4px;
              text-align: center;
              font-size: 12px;
              color: #ffffff;
              overflow: hidden;
              top: 0px;
            }
          }

          /*促销活动*/

          .active_fiex {
            display: block;
            border-radius: 6px;
            padding: 4px;

            .item_box {
              border-radius: 4px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0rem 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);
              position:relative;

              a {
                position: relative;

                .z_price_2 {
                  display: inline-block;
                  position: absolute;
                  right: 7.5px;
                  width: 80px;
                  height: 30px;
                  line-height: 20px;
                  border-radius: 0px 4px 4px 4px;
                  vertical-align: middle;
                  text-align: center;
                  font-size: 12px;
                  color: #ffffff;
                  overflow: hidden;
                  bottom: 7.5px;

                  i {
                    display: inline-block;
                    width: 14px;
                    height: 13px;
                    margin-right: 6px;
                    vertical-align: middle;
                    margin-bottom: 2px;
                    background: url("#{$imgUrl}icon_heart_xing.png") no-repeat
                      100% 100%;
                    background-size: cover;
                  }
                }
              }

              .itemDetial2 {
                padding: 20px 9px 9px 9px;
              }

              .item_text2 {
                width: 100%;
                height: auto;

                i {
                  display: inline;
                  color: #9a9a9a;
                  font-size: 12px;
                }
              }
            }
          }
        }

        .active_f {
          div {
            width: 100%;
          }
          .active_box1 {
            display: flex;
            flex-direction: column;
            width: 50%;
            height: 100%;
          }

          .active_box2 {
            display: flex;
            flex-direction: column;
            width: 50%;
            height: 100%;
          }
        }
      }
    }
  }
  .likeAll {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 185px;
      padding: 15px;
      border-radius: 2px;
      & > img {
        width: 164px;
        height: 215px;
      }
    }
  }
}
</style>
