<template>
<div class="container lineTop" >
    <van-popup :show="showLeft" custom-class="left" @close="togglePopup" position="left">
      <div class="category">
          <div class="cateName">
              <div class="f16 bold">攻略分类</div>
              <div class="mt5 f11 color9a">Raiders</div>
          </div>
          <div class="item" v-for="(item,index) in strategyCateList" :key='index'
           :class="{'active':cateIndex === index}"
            @click="getCate(item.id,index)"
          >
              {{item.name}}
          </div>
      </div>
    </van-popup>
  <div class="selectIcon" @click="togglePopup"> </div>
    <div  class="sliderContainer" >
            
            <!-- <movable-view class="slider" :x='ballX' :y='ballY'   @change='magicBallChange'
                        damping='100' friction='10' inertia='true' scale='true' 
                        @touchstart="silderTouchstart($event)" 
                        @touchend="silderTouchend($event)" 
                        @touchmove="silderTouchMove($event)" 
                        out-of-bounds='true'
                        direction="all"> 
            </movable-view> -->

            
            <div class="slider" :class="{'h430':minHeightPhone,'h575':iphoneX}" 
                        :style="{'z-index':zIndex1}"
                        @transitionend='transitionend'
                        :animation='animationData'
                        @touchend="silderTouchend($event)" 
                        @touchcancel="silderTouchend($event)" 
                        @touchstart="silderTouchstart($event)" 
                        @touchmove="silderTouchMove($event)"> 
                        
                       <div class="img" :class="{'h308':minHeightPhone,'h450':iphoneX,'h390':thirdStrategyList[0]&&thirdStrategyList[0].is_official=='1','h500':iphoneX&&thirdStrategyList[0]&&thirdStrategyList[0].is_official=='1'}"
                        @click="goStrategyDetail(thirdStrategyList[0]?thirdStrategyList[0].id:null,
                        thirdStrategyList[0]?thirdStrategyList[0].merchid:null,
                        thirdStrategyList[0]?thirdStrategyList[0].is_official:null
                        )"                                               
                       >
                           
                            <!-- <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[0]?thirdStrategyList[0].cover_img:''">
                            </wux-image> -->
                            <image class="imgIn" mode="widthFix" :src="thirdStrategyList[0]?thirdStrategyList[0].cover_img:''" alt="">
                                <div class="like">
                                        <div class="activeLike mr4"></div>
                                        <div class="colorf45d">{{thirdStrategyList[0]?thirdStrategyList[0].likenum:''}}</div>
                                </div>
                            </image>
                       </div>
                       <div class="content" v-if="thirdStrategyList[0]&&thirdStrategyList[0].is_official=='0'" >
                           <div class="logo">
                                <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[0]?thirdStrategyList[0].logo:''">
                               </wux-image>
                           </div>
                           <div class="shopName f12">{{thirdStrategyList[0]?thirdStrategyList[0].name:''}}</div>
                           <div class="detail ">
                               <div class="title f16 align over_hidden">{{thirdStrategyList[0]?thirdStrategyList[0].title:''}}</div>
                               <div class="f12 color9a align over_hidden p15">
                                   {{thirdStrategyList[0]?thirdStrategyList[0].sub_title:''}}
                               </div>
                               
                           </div>
                           <div class="adress " :class="{'contentTranslateY30':minHeightPhone}">
                               
                               
                               
                               <div class="color9a over_hidden ">
                                   <div class="icon mr4"></div>
                                   <span class=" color9a f12 mr4"> {{thirdStrategyList[0]?thirdStrategyList[0].distance:''}} km | </span>
                                   {{thirdStrategyList[0]?thirdStrategyList[0].addr:''}} 
                                </div>
                           </div>
                       </div>
                        <div class="officeContent" v-if="thirdStrategyList[0]&&thirdStrategyList[0].is_official=='1'" >
                           <div class="logo mr9">
                                <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[0]?thirdStrategyList[0].logo:''">
                               </wux-image>
                           </div>
                           
                           <div class="detail ">
                               <div class="title f16  over_hidden">{{thirdStrategyList[0]?thirdStrategyList[0].title:''}}</div>
                               <div class="f12 color9a  over_hidden p15">
                                   {{thirdStrategyList[0]?thirdStrategyList[0].sub_title:''}}
                               </div>
                               
                           </div>
                           
                       </div>

                        
            </div>
            <div class="slider" :class="{'h430':minHeightPhone,'h575':iphoneX}" 
                        :style="{'z-index':zIndex2}"
                        @transitionend='transitionend'
                        :animation='animationData1'
                        @touchend="silderTouchend2($event)" 
                        @touchcancel="silderTouchend2($event)" 
                        @touchstart="silderTouchstart2($event)" 
                        @touchmove="silderTouchMove2($event)"> 
                        <div class="img"  :class="{'h308':minHeightPhone,'h450':iphoneX,'h390':thirdStrategyList[1]&&thirdStrategyList[1].is_official=='1','h500':iphoneX&&thirdStrategyList[1]&&thirdStrategyList[1].is_official=='1'}"
                        @click="goStrategyDetail(thirdStrategyList[1]?thirdStrategyList[1].id:null,
                        thirdStrategyList[1]?thirdStrategyList[1].merchid:null,
                        thirdStrategyList[1]?thirdStrategyList[1].is_official:null
                        )"  
                        >
                           
                            <!-- <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[1]?thirdStrategyList[1].cover_img:''">
                            </wux-image> -->
                               <image class="imgIn" mode="widthFix" :src="thirdStrategyList[1]?thirdStrategyList[1].cover_img:''" >
                                   <div class="like">
                                            <div class="activeLike mr4"></div>
                                            <div class="colorf45d">{{thirdStrategyList[1]?thirdStrategyList[1].likenum:''}}</div>
                                    </div>
                               </image>

                       </div>
                       <div class="content" v-if="thirdStrategyList[1]&&thirdStrategyList[1].is_official=='0'"  >
                           <div class="logo">
                                <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[1]?thirdStrategyList[1].logo:''">
                               </wux-image>
                           </div>
                           <div class="shopName f12">{{thirdStrategyList[1]?thirdStrategyList[1].name:''}}</div>
                           <div class="detail ">
                               <div class="title f16 align over_hidden">{{thirdStrategyList[1]?thirdStrategyList[1].title:''}}</div>
                               <div class="f12 color9a align over_hidden p15">
                                   {{thirdStrategyList[1]?thirdStrategyList[1].sub_title:''}}
                               </div>
                               
                           </div>
                           <div class="adress " :class="{'contentTranslateY30':minHeightPhone}">
                               
                               
                               <div class="color9a  over_hidden">
                                   <div class="icon mr4"></div>
                                   <span class=" color9a f12 mr4"> {{thirdStrategyList[1]?thirdStrategyList[1].distance:''}} km | </span>
                                   {{thirdStrategyList[1]?thirdStrategyList[1].addr:''}} 
                                </div>
                           </div>
                       </div>
                       <div class="officeContent" v-if="thirdStrategyList[1]&&thirdStrategyList[1].is_official=='1'" >
                           <div class="logo mr9">
                                <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[1]?thirdStrategyList[1].logo:''">
                               </wux-image>
                           </div>
                           
                           <div class="detail ">
                               <div class="title f16  over_hidden">{{thirdStrategyList[1]?thirdStrategyList[1].title:''}}</div>
                               <div class="f12 color9a  over_hidden p15">
                                   {{thirdStrategyList[1]?thirdStrategyList[1].sub_title:''}}
                               </div>
                               
                           </div>
                           
                       </div>
                        
            </div>
            <div class="slider" :class="{'h430':minHeightPhone,'h575':iphoneX}" 
                        :style="{'z-index':zIndex3}"
                        @transitionend='transitionend'
                        :animation='animationData2'
                        @touchend="silderTouchend3($event)" 
                        @touchcancel="silderTouchend3($event)" 
                        @touchstart="silderTouchstart3($event)" 
                        @touchmove="silderTouchMove3($event)"> 
                       <div class="img" :class="{'h308':minHeightPhone,'h450':iphoneX,'h390':thirdStrategyList[2]&&thirdStrategyList[2].is_official=='1','h500':iphoneX&&thirdStrategyList[2]&&thirdStrategyList[2].is_official=='1'}"
                        @click="goStrategyDetail(thirdStrategyList[2]?thirdStrategyList[2].id:null,
                        thirdStrategyList[2]?thirdStrategyList[2].merchid:null,
                        thirdStrategyList[2]?thirdStrategyList[2].is_official:null
                        )" 
                       >
                         
                            <image class="imgIn" mode="widthFix" :src="thirdStrategyList[2]?thirdStrategyList[2].cover_img:''"> 
                                    <div class="like">
                                            <div class="activeLike mr4"></div>
                                            <div class="colorf45d">{{thirdStrategyList[2]?thirdStrategyList[2].likenum:''}}</div>
                                    </div>
                            </image>

                            <!-- <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[2]?thirdStrategyList[2].cover_img:''">
                            </wux-image> -->
                       </div>
                       <div class="content" v-if="thirdStrategyList[2]&&thirdStrategyList[2].is_official=='0'" >
                           <div class="logo">
                                <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[2]?thirdStrategyList[2].logo:''">
                               </wux-image>
                           </div>
                           <div class="shopName f12">{{thirdStrategyList[2]?thirdStrategyList[2].name:''}}</div>
                           <div class="detail ">
                               <div class="title f16 align over_hidden">{{thirdStrategyList[2]?thirdStrategyList[2].title:''}}</div>
                               <div class="f12 color9a align over_hidden p15">
                                   {{thirdStrategyList[2]?thirdStrategyList[2].sub_title:''}}
                               </div>
                               
                           </div>
                           <div class="adress " :class="{'contentTranslateY30':minHeightPhone}">
                               
                               <div class="color9a over_hidden ">
                                   <div class="icon mr4"></div>
                                   <span class=" color9a f12 mr4"> {{thirdStrategyList[2]?thirdStrategyList[2].distance:''}} km | </span>
                                   {{thirdStrategyList[2]?thirdStrategyList[2].addr:''}} 
                                </div>
                           </div>
                       </div>
                       <div class="officeContent" v-if="thirdStrategyList[2]&&thirdStrategyList[2].is_official=='1'" >
                           <div class="logo mr9">
                                <wux-image wux-class="image" shape="circle" :src="thirdStrategyList[2]?thirdStrategyList[2].logo:''">
                               </wux-image>
                           </div>
                           
                           <div class="detail ">
                               <div class="title f16  over_hidden">{{thirdStrategyList[2]?thirdStrategyList[2].title:''}}</div>
                               <div class="f12 color9a  over_hidden p15">
                                   {{thirdStrategyList[2]?thirdStrategyList[2].sub_title:''}}
                               </div>
                               
                           </div>
                           
                       </div>
                        
            </div>
             <!-- <div class="slider" :class="{'h430':minHeightPhone,'h575':iphoneX}"  :style="{'z-index':1}" >  </div> -->
             <div class="slider" v-if="stopGetData" :class="{'zIndex':stopGetData,'h430':minHeightPhone,'h575':iphoneX}" > 
                 <div  class="empty">
                    <img src="../../../static/images/icon_none.png">
                    <p class="color9a">没有更多攻略啦~</p>
                </div>
             </div>
            <div class="likeContent" :class="{'b52':iphoneX}">
                <div class="unlike"  :animation='passAnimation' @click="goPass"></div>
                <div class="reload" @click="reloadData"></div>
                <div class="like"  :animation='likeAnimation' @click="goLike"></div>
            </div>
       
    </div>
       
 </div>
</template>
<script>
export default {
  data() {
    return {
      animationData: {},
      animationData1: {},
      animationData2: {},
      likeAnimation: {},
      passAnimation: {},
      originX: 0,
      originY: 0,
      pageX: 0,
      pageY: 0,
      dx: 0,
      zIndex1: 4,
      zIndex2: 3,
      zIndex3: 2,
      zIndex4: 1,
      indexArr: [4, 3, 2],
      transitionIsEnd: true,
      strategyList: [],
      thirdStrategyList: [],
      count: 0,
      stopGetData: false,
      unlike: false,
      like: false,
      iphoneX: false,
      minHeightPhone: false,
      flag: true,
      showLeft: false,
      strategyCateList: [],
      cate: "",
      cateIndex: "",
      prePage: 15,
      page: 1
    };
  },
  components: {},
  computed: {
    screenHeight() {
      if (this.$store.state.user.systemInfo.screenHeight <= 625) {
        this.minHeightPhone = true;
      }

      return this.$store.state.user.systemInfo.screenHeight;
    },
    screenWidth() {
      return this.$store.state.user.systemInfo.screenWidth;
    }
  },
  watch: {
    count(value) {
      if (value % 3 == 1) {
        this.thirdStrategyList[0] = this.strategyList.splice(0, 1)[0];
      }
      if (value % 3 == 2) {
        this.thirdStrategyList[1] = this.strategyList.splice(0, 1)[0];
      }
      if (value % 3 == 0) {
        this.thirdStrategyList[2] = this.strategyList.splice(0, 1)[0];
      }
    },
    async strategyList(v) {
      if (v.length <= 3 && !this.stopGetData) {
        let getStrategyList = await this.$http.getStrategyList(
          this.$store.state.user.userInfo.openId,
          this.$store.state.user.clusterInfo.city,
          this.$store.state.user.clusterInfo.area,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.cate,
          this.prePage,
          this.page
        );
        if (getStrategyList.list.length < 3) {
          this.stopGetData = false;
          this.page = 1;
        } else {
          this.stopGetData = false;
          this.page++;
        }

        this.strategyList = [...this.strategyList, ...getStrategyList.list];
      }
    }
  },
  methods: {
    goStrategyDetail(id, merchid, is_official) {
      this.$router.push({
        path: "/pagesSub/busineshop/strategyDetil",
        query: {
          id,
          merchid: is_official == 0 ? merchid : "",
          type: "info",
          official: is_official
        }
      });
    },
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iphoneX = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    togglePopup() {
      this.showLeft = !this.showLeft;
    },
    startIndexToEnd() {
      this.indexArr.unshift(this.indexArr[this.indexArr.length - 1]);
      this.indexArr = this.indexArr.slice(0, 3);
      this.zIndex1 = this.indexArr[0];
      this.zIndex2 = this.indexArr[1];
      this.zIndex3 = this.indexArr[2];
      this.count += 1;
    },
    silderTouchstart({ mp }) {
      this.originX = mp.changedTouches[0].pageX;
      this.originY = mp.changedTouches[0].pageY;
    },
    silderTouchMove({ mp }) {
      let pageX = mp.changedTouches[0].pageX;
      let pageY = mp.changedTouches[0].pageY;
      this.dx = pageX - this.originX;

      let precent =
        Math.abs(pageX - this.originX) * 2 / this.screenWidth >
        Math.abs(pageY - this.originY) * 2 / this.screenHeight
          ? Math.abs(pageX - this.originX) * 2 / this.screenWidth
          : Math.abs(pageY - this.originY) * 2 / this.screenHeight;

      precent = precent >= 1 ? 1 : precent;
      this.animationData = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .translate(pageX - this.originX, pageY - this.originY)
        .step()
        .export();
      this.animationData1 = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .scale((9 + precent) * 0.1)
        .translateY(35 * (1 - precent))
        .step()
        .export();
      this.animationData2 = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .scale(0.8 + precent * 0.1)
        .translateY(45 * (1 - precent) + 35)
        .step()
        .export();

      this.passOrLikeBtnToScale(precent);
    },
    async silderTouchend({ mp }) {
      let pageX = mp.changedTouches[0].pageX;
      let pageY = mp.changedTouches[0].pageY;
      console.log(pageX, pageY, "end");
      this.dx = pageX - this.originX;

      if (
        pageX - this.screenWidth >= -65 ||
        pageX <= 100 ||
        (pageY < -50 && Math.abs(this.dx) > 0) ||
        (pageY - this.screenHeight >= -10 && Math.abs(this.dx) > 0)
      ) {
        this.$http.strategyisFoke(
          this.thirdStrategyList[0].id,
          this.$store.state.user.userInfo.openId,
          this.dx > 5 ? 1 : 0
        );

        this.startIndexToEnd();
        this.animationData = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(0.8)
          .translateY(80)
          .step()
          .export();

        let precent = 1;
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
      } else {
        setTimeout(() => {
          this.animationData = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .translate(0, 0)
            .step()
            .export();
          let precent = 0;
          this.animationData1 = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .scale((9 + precent) * 0.1)
            .translateY(35 * (1 - precent))
            .step()
            .export();
          this.animationData2 = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .scale(0.8 + precent * 0.1)
            .translateY(45 * (1 - precent) + 35)
            .step()
            .export();
        }, 200);
      }
      this.passLikeBtnToOrigin();
    },

    silderTouchstart2({ mp }) {
      this.originX = mp.changedTouches[0].pageX;
      this.originY = mp.changedTouches[0].pageY;
    },
    silderTouchMove2({ mp }) {
      let pageX = mp.changedTouches[0].pageX;
      let pageY = mp.changedTouches[0].pageY;
      this.dx = pageX - this.originX;

      let precent =
        Math.abs(pageX - this.originX) * 2 / this.screenWidth >
        Math.abs(pageY - this.originY) * 2 / this.screenHeight
          ? Math.abs(pageX - this.originX) * 2 / this.screenWidth
          : Math.abs(pageY - this.originY) * 2 / this.screenHeight;
      precent = precent >= 1 ? 1 : precent;

      this.animationData1 = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .translate(pageX - this.originX, pageY - this.originY)
        .step()
        .export();

      this.animationData2 = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .scale((9 + precent) * 0.1)
        .translateY(35 * (1 - precent))
        .step()
        .export();
      this.animationData = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .scale(0.8 + precent * 0.1)
        .translateY(45 * (1 - precent) + 35)
        .step()
        .export();

      this.passOrLikeBtnToScale(precent);
    },
    async silderTouchend2({ mp }) {
      let pageX = mp.changedTouches[0].pageX;
      let pageY = mp.changedTouches[0].pageY;
      this.dx = pageX - this.originX;

      if (
        pageX - this.screenWidth >= -65 ||
        pageX <= 100 ||
        (pageY < -50 && Math.abs(this.dx) > 0) ||
        (pageY - this.screenHeight >= -10 && Math.abs(this.dx) > 0)
      ) {
        this.$http.strategyisFoke(
          this.thirdStrategyList[1].id,
          this.$store.state.user.userInfo.openId,
          this.dx > 5 ? 1 : 0
        );

        this.startIndexToEnd();

        this.animationData1 = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(0.8)
          .translateY(80)
          .step()
          .export();
        let precent = 1;
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
      } else {
        setTimeout(() => {
          this.animationData1 = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .translate(0, 0)
            .step()
            .export();

          let precent = 0;
          this.animationData2 = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .scale((9 + precent) * 0.1)
            .translateY(35 * (1 - precent))
            .step()
            .export();
          this.animationData = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .scale(0.8 + precent * 0.1)
            .translateY(45 * (1 - precent) + 35)
            .step()
            .export();
        }, 200);
      }
      this.passLikeBtnToOrigin();
    },

    silderTouchstart3({ mp }) {
      this.originX = mp.changedTouches[0].pageX;
      this.originY = mp.changedTouches[0].pageY;
    },
    silderTouchMove3({ mp }) {
      let pageX = mp.changedTouches[0].pageX;
      let pageY = mp.changedTouches[0].pageY;
      this.dx = pageX - this.originX;

      let precent =
        Math.abs(pageX - this.originX) * 2 / this.screenWidth >
        Math.abs(pageY - this.originY) * 2 / this.screenHeight
          ? Math.abs(pageX - this.originX) * 2 / this.screenWidth
          : Math.abs(pageY - this.originY) * 2 / this.screenHeight;
      precent = precent >= 1 ? 1 : precent;

      this.animationData2 = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .translate(pageX - this.originX, pageY - this.originY)
        .step()
        .export();

      this.animationData = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .scale((9 + precent) * 0.1)
        .translateY(35 * (1 - precent))
        .step()
        .export();
      this.animationData1 = wx
        .createAnimation({
          timingFunction: "step-start"
        })
        .scale(0.8 + precent * 0.1)
        .translateY(45 * (1 - precent) + 35)
        .step()
        .export();
      this.passOrLikeBtnToScale(precent);
    },
    async silderTouchend3({ mp }) {
      let pageX = mp.changedTouches[0].pageX;
      let pageY = mp.changedTouches[0].pageY;
      this.dx = pageX - this.originX;
      if (
        pageX - this.screenWidth >= -65 ||
        pageX <= 100 ||
        (pageY < -50 && Math.abs(this.dx) > 0) ||
        (pageY - this.screenHeight >= -10 && Math.abs(this.dx) > 0)
      ) {
        this.$http.strategyisFoke(
          this.thirdStrategyList[2].id,
          this.$store.state.user.userInfo.openId,
          this.dx > 5 ? 1 : 0
        );

        this.startIndexToEnd();

        this.animationData2 = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(0.8)
          .translateY(80)
          .step()
          .export();
        let precent = 1;

        this.animationData = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
      } else {
        setTimeout(() => {
          let precent = 0;
          this.animationData2 = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .translate(0, 0)
            .step()
            .export();
          this.animationData = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .scale((9 + precent) * 0.1)
            .translateY(35 * (1 - precent))
            .step()
            .export();
          this.animationData1 = wx
            .createAnimation({
              timingFunction: "ease",
              duration: 200
            })
            .scale(0.8 + precent * 0.1)
            .translateY(45 * (1 - precent) + 35)
            .step()
            .export();
        }, 200);
      }
      this.passLikeBtnToOrigin();
    },
    transitionend() {
      this.transitionIsEnd = true;
    },
    passLikeBtnToOrigin() {
      setTimeout(() => {
        this.flag = true;
      }, 200);
      this.like = false;
      this.passAnimation = wx
        .createAnimation({
          timingFunction: "ease",
          duration: 200
        })
        .scale(1)
        .step()
        .export();
      this.likeAnimation = wx
        .createAnimation({
          timingFunction: "ease",
          duration: 200
        })
        .scale(1)
        .step()
        .export();
    },
    passOrLikeBtnToScale(precent) {
      this.like = this.dx >= 0 ? true : false;
      if (this.like) {
        this.passAnimation = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(1)
          .step()
          .export();
        this.likeAnimation = wx
          .createAnimation({
            timingFunction: "ease"
          })
          .scale(1 + precent / 3)
          .step()
          .export();
      } else {
        this.likeAnimation = wx
          .createAnimation({
            timingFunction: "step-start"
          })
          .scale(1)
          .step()
          .export();
        this.passAnimation = wx
          .createAnimation({
            timingFunction: "ease"
          })
          .scale(1 + precent / 3)
          .step()
          .export();
      }
    },

    async getData() {
      let getStrategyList = await this.$http.getStrategyList(
        this.$store.state.user.userInfo.openId,
        this.$store.state.user.clusterInfo.city,
        this.$store.state.user.clusterInfo.area,
        this.$store.state.user.locationInfo.latitude,
        this.$store.state.user.locationInfo.longitude,
        this.cate,
        this.prePage,
        this.page
      );
      if (getStrategyList.list.length < 3) {
        // this.stopGetData = true;
        // this.$tips.alert("当前数据不够");
        this.stopGetData = false;
        this.page = 1;
      } else {
        this.stopGetData = false;
      }

      this.strategyList = getStrategyList.list;
    },
    async goLike() {
      if (!this.flag || this.stopGetData) return;
      this.flag = false;

      let maxIndex = this.indexArr.findIndex(e => {
        return e == Math.max.apply(null, this.indexArr);
      });
      if (maxIndex == 0) {
        this.animationData = wx
          .createAnimation({
            timingFunction: "linear"
          })

          .translate(this.screenWidth, this.screenHeight * 2)
          .scale(0.1)
          .step()
          .export();
        let precent = 1;
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
        setTimeout(() => {
          this.startIndexToEnd();
          this.animationData = wx
            .createAnimation({
              timingFunction: "step-start"
            })
            .scale(0.8)
            .translateY(80)
            .step()
            .export();
        }, 300);

        this.$http.strategyisFoke(
          this.thirdStrategyList[0].id,
          this.$store.state.user.userInfo.openId,
          1
        );
      } else if (maxIndex == 1) {
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "linear"
          })

          .translate(this.screenWidth, this.screenHeight * 2)
          .scale(0.1)
          .step()
          .export();
        let precent = 1;
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
        setTimeout(() => {
          this.animationData1 = wx
            .createAnimation({
              timingFunction: "step-start"
            })
            .scale(0.8)
            .translateY(80)
            .step()
            .export();
          this.startIndexToEnd();
        }, 300);
        this.$http.strategyisFoke(
          this.thirdStrategyList[1].id,
          this.$store.state.user.userInfo.openId,
          1
        );
      } else if (maxIndex == 2) {
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "linear"
          })

          .translate(this.screenWidth, this.screenHeight * 2)
          .scale(0.1)
          .step()
          .export();

        let precent = 1;

        this.animationData = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
        setTimeout(() => {
          this.startIndexToEnd();

          this.animationData2 = wx
            .createAnimation({
              timingFunction: "step-start"
            })
            .scale(0.8)
            .translateY(80)
            .step()
            .export();
        }, 300);

        this.$http.strategyisFoke(
          this.thirdStrategyList[2].id,
          this.$store.state.user.userInfo.openId,
          1
        );
      }
      this.likeAnimation = wx
        .createAnimation({
          timingFunction: "ease",
          duration: 200
        })
        .scale(1.3)
        .step()
        .export();
      setTimeout(() => {
        this.likeAnimation = wx
          .createAnimation({
            timingFunction: "ease",
            duration: 200
          })
          .scale(1)
          .step()
          .export();
      }, 200);
      setTimeout(() => {
        this.flag = true;
      }, 400);
    },
    async getCate(id, index) {
      if (id != undefined) {
        this.cate = id;
        this.cateIndex = index;
        this.showLeft = false;
      } else {
        this.cate = "";
      }
      this.page = 1;
      let getStrategyList = await this.$http.getStrategyList(
        this.$store.state.user.userInfo.openId,
        this.$store.state.user.clusterInfo.city,
        this.$store.state.user.clusterInfo.area,
        this.$store.state.user.locationInfo.latitude,
        this.$store.state.user.locationInfo.longitude,
        this.cate,
        this.prePage,
        this.page
      );
      this.strategyList = getStrategyList.list;
      if (this.strategyList.length >= 3) {
        this.page++;
        this.thirdStrategyList = this.strategyList.splice(0, 3);
        this.stopGetData = false;
      } else {
        this.stopGetData = true;
        this.$tips.alert("当前数据不够");
      }
    },
    async reloadData() {
      if (this.stopGetData == true) {
        this.$tips.alert("当前数据不够");
        return;
      }

      await this.getData();
      if (this.strategyList.length >= 3) {
        this.page++;
        this.thirdStrategyList = this.strategyList.splice(0, 3);
      }
    },
    goPass() {
      if (!this.flag || this.stopGetData) return;
      this.flag = false;

      let maxIndex = this.indexArr.findIndex(e => {
        return e == Math.max.apply(null, this.indexArr);
      });
      if (maxIndex == 0) {
        this.animationData = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(1)
          .translate(-this.screenWidth - 1000, 300)
          .step()
          .export();
        let precent = 1;
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
        setTimeout(() => {
          this.startIndexToEnd();
          this.animationData = wx
            .createAnimation({
              timingFunction: "step-start"
            })
            .scale(0.8)
            .translateY(80)
            .step()
            .export();
        }, 200);
        this.$http.strategyisFoke(
          this.thirdStrategyList[0].id,
          this.$store.state.user.userInfo.openId,
          0
        );
      } else if (maxIndex == 1) {
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.2)
          .translate(-this.screenWidth - 1000, 300)
          .step()
          .export();
        let precent = 1;
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
        setTimeout(() => {
          this.animationData1 = wx
            .createAnimation({
              timingFunction: "step-start"
            })
            .scale(0.8)
            .translateY(80)
            .step()
            .export();
          this.startIndexToEnd();
        }, 200);
        this.$http.strategyisFoke(
          this.thirdStrategyList[1].id,
          this.$store.state.user.userInfo.openId,
          0
        );
      } else if (maxIndex == 2) {
        this.animationData2 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.2)
          .translate(-this.screenWidth - 1000, 300)
          .step()
          .export();

        let precent = 1;

        this.animationData = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale((9 + precent) * 0.1)
          .translateY(35 * (1 - precent))
          .step()
          .export();
        this.animationData1 = wx
          .createAnimation({
            timingFunction: "linear"
          })
          .scale(0.8 + precent * 0.1)
          .translateY(45 * (1 - precent) + 35)
          .step()
          .export();
        setTimeout(() => {
          this.startIndexToEnd();

          this.animationData2 = wx
            .createAnimation({
              timingFunction: "step-start"
            })
            .scale(0.8)
            .translateY(80)
            .step()
            .export();
        }, 200);
        this.$http.strategyisFoke(
          this.thirdStrategyList[2].id,
          this.$store.state.user.userInfo.openId,
          0
        );
      }
      this.passAnimation = wx
        .createAnimation({
          timingFunction: "ease",
          duration: 200
        })
        .scale(1.3)
        .step()
        .export();
      setTimeout(() => {
        this.passAnimation = wx
          .createAnimation({
            timingFunction: "ease",
            duration: 200
          })
          .scale(1)
          .step()
          .export();
      }, 200);
      setTimeout(() => {
        this.flag = true;
      }, 400);
    },
    initAnimation() {
      this.animationData = wx
        .createAnimation({
          timingFunction: "step-start",
          duration: 200
        })
        .scale(1)
        .translate(0, 0)
        .step()
        .export();
      let precent = 0;
      this.animationData1 = wx
        .createAnimation({
          timingFunction: "step-start",
          duration: 200
        })
        .scale((9 + precent) * 0.1)
        .translateY(35 * (1 - precent))
        .step()
        .export();
      this.animationData2 = wx
        .createAnimation({
          timingFunction: "step-start",
          duration: 200
        })
        .scale(0.8 + precent * 0.1)
        .translateY(45 * (1 - precent) + 35)
        .step()
        .export();
    }
  },

  async mounted() {
    this.iphone_xsp();
    let data = await this.$http.strategyCateList();
    this.strategyCateList = data.list;

    if (this.$store.state.user.loginStatus == false) {
      this.$router.push({
        path: "/pagesSub/login/loginIndex"
      });
      return;
    }

    this.zIndex1 = this.indexArr[0];
    this.zIndex2 = this.indexArr[1];
    this.zIndex3 = this.indexArr[2];
    this.page = 1;
    let getStrategyList = await this.$http.getStrategyList(
      this.$store.state.user.userInfo.openId,
      this.$store.state.user.clusterInfo.city,
      this.$store.state.user.clusterInfo.area,
      this.$store.state.user.locationInfo.latitude,
      this.$store.state.user.locationInfo.longitude,
      this.cate,
      this.prePage,
      this.page
    );

    this.strategyList = getStrategyList.list;

    if (this.strategyList.length >= 3) {
      this.page++;
      this.thirdStrategyList = this.strategyList.splice(0, 3);
    } else {
      this.stopGetData = true;
      this.$tips.alert("当前数据不够");
    }
  },

  async onShow() {
    // this.initAnimation()
  }
};
</script>
<style  scoped lang='scss'>
.zIndex {
  z-index: 7;
}
.h575 {
  height: 575px !important;
}
.h450 {
  height: 450px !important;
}
.h308 {
  height: 328px !important;
}
.h390 {
  height: 390px !important;
}
.h430 {
  height: 460px !important;
}
.h500 {
  height: 500px !important;
}
.b52 {
  bottom: 52px !important;
}
.contentTranslateY30 {
  transform: translateY(-15px) !important;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f2f2f2;
  /*background: url("#{$imgUrl}img_background.png") no-repeat center center;*/
  /*    background-size: cover;*/
  overflow: hidden;
  .selectIcon {
    top: 37px;
    left: 37px;
    width: 40px;
    height: 40px;
    position: absolute;
    background: url("#{$imgUrl}btn_raiders@2x.png") no-repeat center center;
    background-size: cover;
    z-index: 8;
  }
  .category {
    height: 100vh;
    width: 149.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 64px;
    border-radius: 5px;
    .cateName {
      height: 64px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
    }
    .item {
      width: 90px;
      height: 40.5px;
      background: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 40.5px;
      border-radius: 20.5px;
    }
    .active {
      background: #ffeaed;
      font-size: 16px;
      color: #ff455d;
    }
  }
  .sliderContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
  }
  .slider {
    position: absolute;
    border: 0.5px solid #f2f2f2;
    box-shadow: 1px 1px 1px #f2f2f2;
    width: 345px;
    height: 460px;
    top: 18px;
    margin: auto;
    right: 0;
    left: 0;

    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    &::before {
      content: "";
      position: absolute;
      width: 1000%;
      height: 1000%;
    }
    &:nth-of-type(1) {
      transform: scale(1) translateY(0px);
    }
    &:nth-of-type(2) {
      transform: scale(0.9) translateY(35px);
    }
    &:nth-of-type(3) {
      transform: scale(0.8) translateY(80px);
    }

    .img {
      width: 100%;
      height: 345px;
      position: relative;
      overflow: hidden;
      border-bottom: 0.5px;
      box-shadow: 0.5px 0.5px 0.5px #f2f2f2;
      .imgIn {
        width: 100%;
        position: relative;
        .like {
          position: absolute;
          z-index: 8;
          top: 10px;
          right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;

          .likeIcon {
            width: 12px;
            height: 11px;
            background: url("#{$imgUrl}icon_kindheart_act_2.png") no-repeat
              center center;
            background-size: cover;
          }
          .activeLike {
            width: 12px;
            height: 11px;
            background: url("#{$imgUrl}icon_kindheart_act.png") no-repeat center
              center;
            background-size: cover;
          }
        }
      }
    }
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 37px;
        height: 37px;
        border-radius: 50%;
        overflow: hidden;
        transform: translateY(-50%);
      }
      .shopName {
        transform: translateY(-15px);
      }
      .detail {
        width: 100%;
        transform: translateY(-10px);
        .p15 {
          padding: 0 15px;
        }
      }
      .adress {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-7px);
        .color9a {
          width: 250px;
          text-align: center;
          .icon {
            width: 10px;
            height: 13px;
            display: inline-block;
            vertical-align: middle;
            background: url("#{$imgUrl}icon_adr.png") no-repeat center center;
            background-size: cover;
          }
        }
      }
    }
    .officeContent {
      transform: translateY(15px);
      display: flex;
      align-items: center;
      padding: 0 15px;
      .logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      .detail {
        width: 260px;
      }
    }
  }

  .likeContent {
    width: 100%;
    height: 60px;
    padding: 0 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 9px;
    left: 0;
    z-index: 8;
    .unlike {
      width: 60px;
      height: 60px;
      background: url("#{$imgUrl}icon_quit.png") no-repeat center center;
      background-size: cover;
    }
    .reload {
      width: 50px;
      height: 50px;
      background: url("#{$imgUrl}icon_refurbish.png") no-repeat center center;
      background-size: cover;
    }
    .like {
      width: 60px;
      height: 60px;
      background: url("#{$imgUrl}icon_like.png") no-repeat center center;
      background-size: cover;
    }
  }
}
</style>