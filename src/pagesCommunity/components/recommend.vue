<template>
    <scroll-view @scrolltolower='scrolltolower' lower-threshold='200'
    @scroll='onScroll' scroll-y class="scrollView" >
      <wux-refresher :id="'wux-refresher-'+type" @pulling="onPulling" @refresh="onRefresh">

        <div class="w100 mainBox wraper" >

          <div class="main_img" v-if="cover_img.length > 0&&type == '101'">
            <div class="swiperContainer">
              <swiper :indicator-dots="indicatorDots" :current="swiperCurrent" :autoplay="autoplay" :interval="interval"
                :duration="duration" circular='true' @change="bannerSwiperChange" class="swiper">
                <block v-for="(item,index) in cover_img" :key="index">
                  <swiper-item>
                    <div class="slide-image">
                      <wux-image wux-class="image" shape="circle" :src="item.thumb">
                      </wux-image>
                    </div>
                  </swiper-item>
                </block>
              </swiper>
              <div class="dots">
                <block v-for="(item,index) in cover_img" :key="index" v-if="cover_img.length>1">
                  <view class="dot" :class="{'active':swiperCurrent == index}"></view>
                </block>
              </div>
            </div>
          </div>
          <div class="likeAll" id="item2" v-if="textList.length>0">
            <div class="w100">
              <div class="w100 item-wrap active_f">
                <div class="active_box1">
                  <div class="item active_fiex offiCial" v-for="(item,index) in textList" :key="index" v-if="item.info&&index%2 !==1"  @click.stop='$router.push({path: "/pagesSub/community/communitydetail", query: { id:item.info.id,memberid:item.info.memberid} })'>
                    <div class="item_box_1" v-if="item.type=='0'&&item.info">
                      <a  @click="false">
                        <wux-image wux-class="image" :src="item.info.cover_img">
                        </wux-image>
                      </a>
                      <div class="item_text item_text2">
                        {{item.info.title}}
                      </div>
                      <div class="item_ico flex flex_hc">
                        <div class="lis_1" @click.stop="toUserHome(item.info.memberid,item.info.type)">
                          <img :src="item.info.author_info.avatar" alt="" />
                        </div>
                        <p class="f12 flex1" @click.stop="toUserHome(item.info.memberid,item.info.type)">{{item.info.author_info.nickname}}</p>
                        <div class="lis_2 flex flex_hc" @click.stop="like(item.info.id,item.info.memberid,index)">
                          <span class="ico" :class="{'hasLike':item.info.like==1}"></span>
                          <i class="f10">{{(item.info.likednum |
                            parseint)>999?'999+':item.info.likednum=='0'?'赞':item.info.likednum||0}}</i>
                        </div>
                      </div>
                    </div>
                    <div class="item_box_1" v-if="item.type=='1'&&item.info"  @click.stop="toUserHome(item.info.memberid,item.info.type)">
                      <div class="offiCialImg">
                        <wux-image wux-class="image" :src="item.info.last_article_cover_img">
                        </wux-image>
                      </div>
                      <div class="offiCialText">
                        <p class="f12 color32">{{item.info.nickname}}</p>
                        <div class="textTitle color9a f11 mt6 mb6">
                          {{item.info.sign}}
                        </div>
                        <div class="offiCialGo">
                          去看看>
                        </div>
                        <div class="headerIco">
                          <img :src="item.info.avatar" alt="" />
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="active_box2">
                  <div class="item active_fiex offiCial" v-for="(item,index) in textList" :key="index" v-if="item.info&&index%2 ==1" @click.stop='$router.push({path: "/pagesSub/community/communitydetail", query: { id:item.info.id,memberid:item.info.memberid} })'>
                    <div class="item_box" v-if="item.type=='0'&&item.info">
                      <a @click="false">
                        <wux-image wux-class="image" :src="item.info.cover_img">
                        </wux-image>
                      </a>
                      <div class="item_text item_text2">
                        {{item.info.title}}
                      </div>
                      <div class="item_ico flex flex_hc">
                        <div class="lis_1" @click.stop="toUserHome(item.info.memberid,item.info.type)">
                          <img :src="item.info.author_info.avatar" alt="" />
                        </div>
                        <p class="f12 flex1" @click.stop="toUserHome(item.info.memberid,item.info.type)">{{item.info.author_info.nickname}}</p>
                        <div class="lis_2 flex flex_hc" @click.stop="like(item.info.id,item.info.memberid,index)">
                          <span class="ico" :class="{'hasLike':item.info.like==1}"></span>
                          <i class="f10">{{(item.info.likednum |
                            parseint)>999?'999+':item.info.likednum=='0'?'赞':item.info.likednum||0}}</i>
                        </div>
                      </div>
                    </div>
                    <div class="item_box" v-if="item.type=='1'&&item.info"  @click.stop="toUserHome(item.info.memberid,item.info.type)">
                      <div class="offiCialImg">
                        <wux-image wux-class="image" :src="item.info.last_article_cover_img">
                        </wux-image>
                      </div>
                      <div class="offiCialText">
                        <p class="f12 color32">{{item.info.nickname}}</p>
                        <div class="textTitle color9a f11 mt6 mb6">
                          {{item.info.sign}}
                        </div>
                        <div class="offiCialGo">
                          去看看>
                        </div>
                        <div class="headerIco">
                          <img :src="item.info.avatar" alt="" />
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--官方推荐-->
                </div>
              </div>
            </div>
            <div class="mt10">
              <zan-loadmore v-if="!attentionIsBottom" type="loading"></zan-loadmore>
              <zan-loadmore v-if="attentionIsBottom" type="text" text="暂无数据"></zan-loadmore>
            </div>      
          </div>
          <div class="empty3" v-if="hasLoading&&(cover_img.length==0 && textList.length==0)||(textList.length==0 &&type !== '101')">
            <img src="../../../static/images/img_focus.png">
            <div>没有{{cate}}推荐哟o(∩_∩)o</div>
          </div>
        </div>
      </wux-refresher>
    </scroll-view>
</template>
<script>
import Vue from "vue";
export default {
  props: ["type", "cate"],
  data() {
    return {
      cover_img: "",
      swiperCurrent: 0,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      islike: "",
      textList: [],
      page: 1,
      attentionIsBottom: false,

      pagesize: 15,
      hasLoading: false,

      lastTime: 0,
      firstCount: 0
    };
  },

  methods: {
    bannerSwiperChange(e) {
      this.swiperCurrent = e.mp.detail.current;
    },
    async recommendList() {
      let data = [];
      if (this.type != "101") {
        data = await this.$http.cateGoryList(
          this.$store.state.user.userInfo.openid,
          this.type,
          this.page,
          this.pagesize
        );
      } else {
        data = await this.$http.getRecommend(
          this.page,
          this.$store.state.user.userInfo.openid,
          this.pagesize
        );
      }
      if (data.status == 1) {
        if (
          data.result.data instanceof Array &&
          data.result.data.length < this.pagesize
        ) {
          this.attentionIsBottom = true;
        }

        //      data.list.map(this._U.hasOverTime);
        let list = [...this.textList, ...data.result.data];

        this.hasLoading = true;

        list.map(val => {
          if (typeof val.info !== "undefined") {
            return (this.textList = [...this.textList, val]);
          }
        });

        this.page++;
      } else {
        console.log("加载失败");
      }
    },
    async getImgs() {
      let Data = await this.$http.getBannerImg();
      this.cover_img = Data.result;
    },
    async like(id, memberid, index) {
      this.showAssessbottom = false;
      let result = await this.$http.personalLike(
        memberid,
        this.$store.state.user.userInfo.openId,
        id
      );

      if (!result.error) {
        if (result.islike) {
          this.$tips.toast("点赞成功");
          this.textList[index].info.likednum =
            parseInt(this.textList[index].info.likednum || 0) + 1;
          this.textList[index].info.like = 1;
        } else {
          this.$tips.toast("取消点赞");
          this.textList[index].info.likednum =
            parseInt(this.textList[index].info.likednum || 0) - 1;
          this.textList[index].info.like = 0;
        }
      } else {
        this.$tips.toast("请求失败");
      }
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
    updateArticlePraise() {
      // 兄弟组件通讯  communitydetail中点了之后在这里要更新点赞数量

      let that = this;
      // this.$bus.$off("articlePraise");
      this.$bus.$on("articlePraise", e => {
        // e:{id:this.articleid,type:1}  type=1 是点赞成功  0是取消点赞
        if (e.type == 1) {
          console.log("点赞", 11);
          console.log(this.textList, "点赞");
          console.log(that.textList, "that点赞");
          this.textList.map(val => {
            if (val.info && val.info.id == e.id) {
              val.info.likednum = parseInt(val.info.likednum || 0) + 1;
              val.info.like = 1;

              return;
            }
          });
          console.log(this.textList, "99999");
        } else {
          console.log("取消点赞", 11);
          console.log(this.textList, "取消点赞");
          console.log(that.textList, "that取消点赞");
          this.textList.map(val => {
            if (val.info && val.info.id == e.id) {
              val.info.likednum = parseInt(val.info.likednum || 0) - 1;
              val.info.like = 0;
              return;
            }
          });
          console.log(this.textList, "88888");
        }
      });
    },
    scrolltolower() {
      if (this.attentionIsBottom) return;
      this.recommendList();
    },
    onScroll({ mp }) {
      this.$emit("childScrollTop", mp.detail.scrollTop);
    },
    onCommunitySwiperChage() {
      // this.$bus.$off("communitySwiperChage" + this.type);
      this.$bus.$on("communitySwiperChage" + this.type, async e => {
        this.lastTime = this.lastTime || this._U.getTimestamp();
        let num = 0;
        if (this.type != "101") {
          num = await this.$http.recommendTypeUpdate(
            this.openId,
            this.type,
            this.lastTime
          );
        } else {
          num = await this.$http.recommendUpdate(this.openId, this.lastTime);
        }
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
    },
    async onRefresh() {
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

      this._U.stopRefresh("#wux-refresher-" + this.type);
    },
    async refreshList(count) {
      if (count <= 0) return;
      let data = [];
      if (this.type != "101") {
        data = await this.$http.cateGoryList(
          this.$store.state.user.userInfo.openid,
          this.type,
          1,
          count
        );
      } else {
        data = await this.$http.getRecommend(
          this.page,
          this.$store.state.user.userInfo.openid,
          1,
          count
        );
      }
      if (data.status == 1) {
        //      data.list.map(this._U.hasOverTime);
        let list = [...data.result.data, ...this.textList];
        list.map(val => {
          if (typeof val.info !== "undefined") {
            return (this.textList = [...this.textList, val]);
          }
        });
      } else {
        console.log("加载失败");
      }
    }
  },
  computed: {},
  // onHide() {
  //   this.$bus.$off("articlePraise");
  // },
  beforeDestroy() {
    this.$bus.$off("articlePraise");
    this.$bus.$off("communitySwiperChage" + this.type);
    // bus.$off('select'，this.handle)
  },
  mounted() {
    this.getImgs();
    this.recommendList();
    this.onCommunitySwiperChage();
    this.updateArticlePraise();
  }
  // async onReachBottom() {
  //   if (this.attentionIsBottom) return;
  //   this.recommendList();
  // }
};
</script>
<style scoped lang='scss'>
.scrollView {
  overflow: hidden;
  height: 100%;
  .mainBox {
    padding: 0px 15px;
    .main_img {
      width: 100%;
      border-radius: 5px;
      margin-top: 10px;
      height: 130px;
      background-color: #9a9a9a;
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      .swiperContainer {
        width: 100%;
        position: relative;
        height: 100%;

        .swiper {
          width: 100%;
          height: 130px;

          .slide-image {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;
          }
        }

        .dots {
          position: absolute;
          /*  left: 0;*/
          right: 10px;
          bottom: 10px;
          display: flex;
          align-items: flex-end;

          /*justify-content: center;*/
          .dot {
            margin: 0 4px;
            width: 7px;
            height: 3px;
            /*border-radius: 50%;*/
            transition: all 0.6s;
            background-color: #ffffff;
            border: 1.5px solid #fff;

            &.active {
              width: 7px;
              height: 7px;
              background: #fff;
              /*border-radius:3px;*/
            }
          }
        }
      }
    }

    /*列表样式*/
    #item2 {
      margin-top: 18px;
      margin-bottom: 36px;

      .item-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .item {
          position: relative;
          border-radius: 2px;
          width: 50%;

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
            padding: 6px 8px;
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
          border-radius: 5px;

          .item_box {
            border: 0.5px solid #e8e8e8;
            border-radius: 5px;
            background: #fff;
            overflow: hidden;
            box-shadow: 0rem 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);

            position: relative;

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
            }

            .item_ico {
              padding: 0 6px 5px 6px;
              height: 30px;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              position: relative;
              line-height: 30px;

              .lis_1 {
                margin-right: 6px;
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
                width: 50px;
                justify-content: flex-end;

                span {
                  display: inline-block;
                  margin-right: 5px;
                  position: relative;
                  width: 11px;
                  height: 12px;
                  background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100%
                    100%;
                  background-size: cover;
                }

                i {
                  display: inline-block;
                  color: #9a9a9a;
                }

                .hasLike {
                  background-image: url("#{$imgUrl}icon_fabulous_act.png");
                }
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

          .active_fiex {
            border-radius: 5px;
            padding-right: 4px;
            padding-bottom: 8px;

            .item_box_1 {
              position: relative;
              border-radius: 5px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0px 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);

              .item_text2 {
                width: 100%;
                height: auto;
              }

              .item_ico {
                padding: 0px 6px 5px 6px;
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
                  margin-right: 6px;

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
                  width: 50px;
                  justify-content: flex-end;

                  span {
                    display: inline-block;
                    margin-right: 5px;
                    position: relative;
                    width: 11px;
                    height: 12px;
                    background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat
                      100% 100%;
                    background-size: cover;
                  }

                  i {
                    display: inline-block;
                    color: #9a9a9a;
                  }

                  .hasLike {
                    background-image: url("#{$imgUrl}icon_fabulous_act.png");
                  }
                }
              }
            }
          }

          /*官方样式*/
          .offiCial {
            .item_box_1 {
              margin-bottom: 7.5px;

              .offiCialImg {
                width: 100%;
                height: 169px;
              }

              .offiCialText {
                position: relative;
                padding: 20px 14px 10px 14px;

                p {
                  line-height: 15px;
                  text-align: center;
                }

                .offiCialGo {
                  width: 55px;
                  height: 19px;
                  border-radius: 10px;
                  border: solid 1px #ff455d;
                  font-family: PingFang-SC-Medium;
                  font-size: 12px;
                  text-align: center;
                  color: #ff455d;
                  margin: 0 auto;
                }

                .headerIco {
                  border-radius: 50%;
                  position: absolute;
                  top: -17px;
                  left: 0px;
                  right: 0px;
                  margin: auto;
                  width: 34px;
                  height: 34px;

                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                  }

                  span {
                    display: inline-block;
                    width: 11px;
                    height: 11px;
                    background: url("#{$imgUrl}icon_authentication@2x.png")
                      no-repeat center center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
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

          .active_fiex {
            padding-left: 4px;
            padding-bottom: 8px;
          }

          .offiCial {
            .item_box {
              margin-bottom: 7.5px;

              .offiCialImg {
                width: 100%;
                height: 169px;
              }

              .offiCialText {
                position: relative;
                padding: 20px 14px 10px 14px;

                p {
                  line-height: 15px;
                  text-align: center;
                }

                .offiCialGo {
                  width: 55px;
                  height: 19px;
                  border-radius: 10px;
                  border: solid 1px #ff455d;
                  font-family: PingFang-SC-Medium;
                  font-size: 12px;
                  text-align: center;
                  color: #ff455d;
                  margin: 0 auto;
                }

                .headerIco {
                  border-radius: 50%;
                  position: absolute;
                  top: -17px;
                  left: 0px;
                  right: 0px;
                  margin: auto;
                  width: 34px;
                  height: 34px;

                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                  }

                  span {
                    display: inline-block;
                    width: 11px;
                    height: 11px;
                    background: url("#{$imgUrl}icon_authentication@2x.png")
                      no-repeat center center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
