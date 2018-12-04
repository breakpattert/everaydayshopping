<template>
  <div class="container lineTop">
		<!--<movable-area class="magicBallContainer">
      <movable-view class="right_prour flex flex_hc flex_c" direction="vertical" @click="toggleActivityPopupright" :class="{'show_active_pouper':showActivityright,'on':(isSign==0||isComment==0)&&!showActivityright}">
      <p>更多互动</p>
    </movable-view>
    </movable-area>-->
    <div class="right_prour flex flex_hc flex_c" direction="vertical" @click="toggleActivityPopupright" :class="{'show_active_pouper':showActivityright,'on':(isSign==0||isComment==0)&&!showActivityright}">
      <p>更多互动</p>
    </div>
    <isLoading :isLoading='isLoading'></isLoading>
    
    <!--   <div @click="isBuild" class="fansAuth"></div>-->
    <div class="banner_img">
      <div class="banner_img_modelr">
      </div>
      <!--   	<img :src="shopinfo.headimg" alt="" />-->
      <wux-image wux-class="image" :src="shopinfo?shopinfo.headimg:''">
      </wux-image>
      <button @click="tabfollow()">
        <!--	{{fllow_s}}-->
        <div :class="{'starActive':fllow_s}"></div>
        <span>{{fllow_text}}</span>
      </button>
      <!--改版的店铺详情信息-->
      <div class="edit_shop_info">
        <div class="shop_detil">

          <div class="shop_text">
            <div class="moderly">

            </div>
            <div class="shop_a">
              <img :src="shopinfo.logo" alt="" />
            </div>
            <div class="shop_info">

              <h3 class="over_hidden w200">{{shopinfo.merchname}}</h3>
              <p class="shop_pons">
                <span>粉丝：{{shopinfo.favorite_num}} </span>
                <span>收藏：{{shopinfo.follow_num}}</span>
              </p>
              <p class="shop_pons shop_address_ico" @click="openLocation">
                <!--over_hidden-->
                <i></i>
                <span>{{shopkm}}km</span>
                <em></em>
                <span class="shop_info_text over_hidden">
                  {{shopinfo.city==null?'':shopinfo.city}}{{shopinfo.area==null?'':shopinfo.area}}{{shopinfo.address}}

                </span>
                <span style="font-family:Cursive;">></span>
              </p>

            </div>
            <!--<button @click="toggleCouponsPopup">领券</button>-->
          </div>
        </div>
      </div>

    </div>
    <div class="all_goods">
      <div class="discounts lineBottom discounts_d" style="background:#fff;" v-if="showCoupons2">
        <div class="present" @click="toggleCouponsPopup">
          <span class="gift">
            <img :src="tinyPics.intro" />
          </span>
          <i class="f13 color32">优惠</i>

          <span class="discount_msg">{{couponname}}</span>
          <span class="discount_msg_text">领劵</span>
        </div>
        <div class="right-arrow">

        </div>
      </div>
      <!--<div class="discounts lineBottom" style="background:#fff;" v-if="showdiscounts">
        <div class="present" v-if="showgd" @click="toggleActivityPopup">
          <span class="gift">
            <img :src="tinyPics.promotion" />
          </span>
          <i class="f13 color32">活动</i>
          <span class="discount_msg over_hidden">{{y_title}}</span>
          <span class="discount_msg_text">更多</span>
        </div>
          <div class="present" v-else @click="$router.push({ path:'/pages/busineshop/activeinfo',query: { id:y_id}})">
          <span class="gift">
            <img :src="tinyPics.promotion" />
          </span>
          <i class="f13 color32">活动</i>
          <span class="discount_msg over_hidden">{{y_title}}</span>
          
        </div>
        <div class="right-arrow">

        </div>
      </div>-->
      <div class="discounts lineBottom" style="background:#fff;" v-if="showdiscounts">
        <div class="present">
          <span class="gift">
            <img :src="tinyPics.promotion" />
          </span>
          <i class="f13 color32">活动</i>
          <span class="lutext">
            <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
              <div v-for="(item3,index3) in activity_list" :key="index3">

                <div @click="$router.push({ path:'/pagesSub/busineshop/activeinfo',query: { id:item3.id}})">
                  <swiper-item @touchmove.stop="catchtouchmove">
                    <div class="swiper_item over_hidden">{{item3.title}}</div>
                  </swiper-item>
                </div>
              </div>
            </swiper>
          </span>

          <span class="discount_msg_text" v-if="showgd">更多</span>
        </div>

        <div class="right-arrow">

        </div>
      </div>
    </div>

    <!--优惠券滑动-->
    <!--<div class="codeall">
   			<scroll-view scroll-x="true" style=" white-space: nowrap; display: flex;padding:15px 0;" :style="{ width: width_scroll + 'px' }">
   				<view class="v_code" style="width:113px; height: 70.5px; display: inline-block;" v-for="(item,index) in shopinfo.coupon_list" :key="index">
   						<img src="../../../static/images/img_smoll.png" alt="" />
   						<div class="code_price">
   							<h4>￥{{item.enough}}</h4>
   							<p style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.couponname}}</p>
   						</div>
   						<div class="code_button">
   							<p>
   								优惠券
   							</p>
   							<button>点击领取</button>
   						</div>
   				</view>
  

   			</scroll-view>
   		</div>-->
    <!--弹窗优惠券-->
    <!--<div class="discounts">
      <div class="present" @click="toggleCouponsPopup">
        <span class="gift">
          <img src="../../../static/images/icon_gift.png" />
        </span>
        <span class="discount_msg">满600减100元券</span>
      </div>
      <div class="right-arrow">

      </div>
    </div>-->
    <!--弹窗拍视屏-->

    <van-popup :show="showActivityright" custom-class="right" @close="toggleActivityPopupright" position="right">
    	<!--<canvas style="width: 145px; height: 100px;background: red;z-index: 1000;" canvas-id="firstCanvas">
    		<cover-view style="color:#fff;">5555555555555555555555555555555</cover-view>
    	</canvas>-->
     <div class="pai_vidio" @click="toggleActivityPanle">
        <ul class="write_box">
          <li @click="$router.push({ path:'/pagesSub/sign/sign',query:{id:$route.query.id,}})">
            <span :class="{'on':isSign==0}">
              <img src="../../../static/images/icon_signin.png" alt="" />
            </span>
            <p>签到</p>
          </li>
          <li>
            <span>
              <img src="../../../static/images/icon_video.png" alt="" />
            </span>
            <p>拍视频</p>
          </li>
          <li>
            <span>
              <img src="../../../static/images/icon_photos.png" alt="" />
            </span>
            <p>传照片</p>
          </li>
          <li @click="toAssess">
            <span :class="{'on':isComment==0}">
              <img src="../../../static/images/icon_evaluation.png" alt="" />
            </span>
            <p>评价</p>
          </li>
          <li @click="$router.push({ path:'/pagesSub/userInfo/feedback',query:{pageName:$router.currentRoute.fullPath}})">
            <span>
              <img src="../../../static/images/icon_errorreporting.png" alt="" />
            </span>
            <p>报错</p>
          </li>
        </ul>
      </div>
    </van-popup>
    <!-- 满减促销 -->
    <!--<van-popup :show="showActivitybottom" custom-class="bottom" @close="toggleActivityPopup" position="bottom">
      <div class="onSale">
        <div class="header h40">
          <span class="fl ml15"> 促销活动</span>
          <span class="fr mr15 bgc_img" @click="opendown()">
            <img src="../../../static/images/icon_close.png" style="width:16px;height:16px;" />
          </span>
        </div>

        <div class="mainslist">
          <div class="item_1" v-for="(item,index) in activity_list" :key="index" @click="$router.push({ path:'/pages/busineshop/activeinfo',query: { id:item.id}})">
            <div class="item_left">
              <span></span>
            </div>
            <div class="item_right">
              <h4 class="color32 f14">{{item.title}}</h4>
              <p class="f12 color9a">{{item.sub_title}}</p>
            </div>
          </div>
          <button @click="opendown()">确定</button>
        </div>
      </div>
    </van-popup>-->
    <!-- 优惠券领取 -->
    <van-popup :show="showCouponsbottom" custom-class="bottom" @close="toggleCouponsPopup" position="bottom">
      <div>
        <view>
          <div class="onSale w100">
            <div class="header h40 lineBottom">
              <span class="fl ml15">领取优惠券</span>
              <span class="fr mr15 bgc_img" @click="oend()">
                <img src="../../../static/images/icon_close.png" alt="" style="width:16px;height:16px;" />
              </span>
            </div>
            <div class="mainslist_2">
              <div class="item_2" v-for="(ite,index) in shopinfo.coupon_list" :key="index">
                <div class="voucher_s">
                		<img src="../../../static/images/img_yhj.png" alt="" />
                  <div class="voucher_price">
                    <span class="color3f f11">￥</span>
                    <span class="color3f f24 ml4">{{ite.deduct}}</span>
                  

                  </div>
                  <div class="voucherInfos">
                  
                      <h4 class="color32 f16">{{ite.couponname}}</h4>
                      <div class="color9a f12 mt6">使用条件&nbsp;:&nbsp;满{{ite.enough}}减{{ite.deduct}}可使用</div>
                      <div class="color9a f12 mt6">适用范围&nbsp;:&nbsp;全场通用</div>
	                    <div class="userVoucher">
	                  		<p class="v_ptext f10 color9a">{{ite.timestart}}—{{ite.timeend}} &nbsp;</p>
	                  		<div class="span_no f12 color3f" @click="getPay_coupon(its.id)">立即使用</div>
	                  	</div>
                	</div>
                	
              		</div>

            	</div>
          		</div>
							</div>	
        </view>
      </div>
    </van-popup>
    <div class="swiper">
      <div class="navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
          </div>
        </block>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>

      <swiper class="content" :duration="50" @change="swiperChange" :style="'height:'+contentHeight" :current="currentTab" @animationfinish="onAnimationfinish">
        <swiper-item>
          <div class="likeAll" id="item1">

            <div v-if="cmtlist.length==0" class="empty">
              <img src="../../../static/images/icon_none.png">
              <p class="color9a">该商家还没发布口碑信息</p>
            </div>
            <div class="w100 item-wrap praise lineBottom" v-for="(its,inds) in cmtlist" :key="inds" v-if="cmtlist.length !==0">
              <div class="praiseInfo">
                <div class="praise_ico">
                  <img :src="its.avatar" alt="">
                </div>
                <div class="praisepl">
                  <p class="color32 f14">{{its.nickname}}</p>
                  <span>
                    <div>
                      <wux-rater font-size='20' slot="footer" disabled allow-half allow-clear allow-touch-move :default-value="its.zh" />
                    </div>
                  </span>
                </div>
                <span class="praiseTime color9a f10">{{its.add_time==null?"":its.add_time}}</span>
              </div>
              <div class="praiseMains" v-if="its.content!=''" @click="$router.push({ path:'/pagesSub/busineshop/commentdetil',query: { commentId:its.id}})">
                <p class="color32 f12">{{its.content}}</p>
              </div>
              <div class="praiseImg" @click="$router.push({ path:'/pagesSub/busineshop/commentdetil',query: { commentId:its.id}})">
                <div v-for="(v,k) in its.imgs" :key="k" v-if="its.imgs[0] !==''">
                  <wux-image wux-class="image" :src="v"></wux-image>
                </div>
                <div v-for="(v2,k2) in its.video" :key="k2" v-if="its.video[0] !==''">

                  <video id="myVideo" :src="v2" :controls="true" :autoplay="false" v-if="!showActivityright">

                  </video>
                  <img src="../../../static/images/video.png" v-else alt="" />

                </div>

              </div>
              <div class="praiseIike">
                <div class="praiseRight">
                  <div class="likePeople" @click="userLike(its.id)">
                    <i></i>
                    <span class="f10 color32" v-if="its.star>999">{{its.star}}+</span>
                    <span class="f10 color32" v-else>{{its.star}}</span>
                  </div>
                  <div class="allMessage" @click="$router.push({ path:'/pagesSub/busineshop/commentdetil',query: { commentId:its.id}})">
                    <i></i>

                    <span class="f10 color32" v-if="its.hf>999">{{its.hf}}+</span>
                    <span class="f10 color32" v-else>{{its.hf}}</span>
                  </div>
                </div>
              </div>

            </div>
            <div class="mt10" v-if="loadMoreOne">
              <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
              <zan-loadmore v-if="isBottom" type="text" :text="textdetil"></zan-loadmore>
            </div>

          </div>

        </swiper-item>
        <swiper-item>
          <div class="likeAll" id="item2">
            <div v-if="strategyList.length==0" class="empty">
              <img src="../../../static/images/icon_none.png">
              <p class="color9a">该商家还没发布攻略</p>
            </div>
 						<div class="w100 item-wrap active_f" v-if="strategyList&&strategyList.length>0">
							<div class="active_box1">
               <div class="item active_fiex" v-for="(item,index) in strategyList" :key="index" v-if="index%2 !==1">
              	<div class="item_box">
                <div class="itemInfos">
                	<wux-image wux-class="image" :src="item.cover_img" @click="activity_info(item.id,item.is_official)">
									</wux-image>
                	<span class="z_price_2" @click="styFollow(item.id,item.islike)">
                		<i :class="{'likeActive':item.islike}">
                		</i>{{item.likenum}}
                	</span>
                </div>
                <div class="item_text item_text2" @click="activity_info(item.id,item.is_official)">
                  	#{{item.title}}:<i>{{item.sub_title}}</i>
                  	知之为知之，不知为为不知”，一个问题当你一时还不知道答案的时候，知道怎么去寻找答案已经是不容易了，而坚信自己最终一定会找到答案，靠的不仅仅是一时的勇气，更是一种长久以来形成的对自我能力的肯定和认知！这一点

                </div>
   							<div class="leftIco" v-if="item.is_official==1"></div>
                
                </div>
              </div>
              </div>
              <div class="active_box2">
               <div class="item active_fiex" v-for="(item,index) in strategyList" :key="index" v-if="index%2 ==1">
              	<div class="item_box">
                <div class="itemInfos">
                	<wux-image wux-class="image" :src="item.cover_img" @click="activity_info(item.id,item.is_official)">
									</wux-image>
                	
                	<span class="z_price_2" @click="styFollow(item.id,item.islike)">
                		<i :class="{'likeActive':item.islike}">
                			
                		</i>{{item.likenum}}
                	</span>
                </div>
                <div class="item_text item_text2" @click="activity_info(item.id,item.is_official)">
                  {{item.title}}:<i>{{item.sub_title}}</i>

                </div>
                <div class="leftIco" v-if="item.is_official==1"></div>
                </div>
              </div>
              </div>

              
            </div>
             <div class="mt10" v-if="strategyList.length !== 0">
              <zan-loadmore v-if="!isBottom2" type="loading"></zan-loadmore>
              <zan-loadmore v-if="isBottom2" type="text" :text="textdetil"></zan-loadmore>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="likeAll" id="item3">
            <div v-if="goodlist.data&&P_List.data&&goodlist.data.length<=0&&P_List.data.length<=0" class="empty">
              <img src="../../../static/images/icon_none.png">
              <p class="color9a">该商家还没发布商品</p>
            </div>

            <div class="w100 item-wrap" else>
              <div class="item lineLeft lineBottom2" v-for="(item2,index2) in P_List.data" :key="index2" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item2.id }})">
                <div class="item_a">

                  <wux-image wux-class="image" :src="item2.thumb">
                  </wux-image>
                </div>
                <div class="item_text">
                  {{item2.title}}
                  <!--<span>8.5折</span>-->
                  <!--<span>{{diCount(item2.discounts_price,item2.marketprice)}}折</span>-->
                </div>
                <div class="itemDetial">

                  <span class="fl colorf45d f14">￥{{item2.marketprice}}</span>
                  <span class="fr f12 color_s">已售{{item2.sales}}件</span>

                </div>
                <span class="z_price" v-if="item2.isdiscount=='1'&&item2.isdiscount_value">{{item2.isdiscount_value}}折</span>
              </div>
              <div @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})" class="item lineLeft lineBottom2" v-for="(item,index) in goodlist.data" :key="index">
                <div class="item_a"><img :src="item.thumb" alt=""></div>
                <div class="item_text">
                  {{item.title}}

                </div>
                <div class="itemDetial">

                  <span class="fl colorf45d f14">￥{{item.marketprice}}</span>
                  <span class="fr f12 color_s">{{item.keywords}}</span>

                </div>
                <span class="z_price" v-if="item.isdiscount=='1'&&item.isdiscount_value">{{item.isdiscount_value}}折</span>
              </div>
            </div>
            <!--促销的商品-->
            <!--<div class="w100 item-wrap" v-if="goodlist.data&&goodlist.data.length>0">
              <div @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})" class="item lineLeft lineBottom2"
                v-for="(item,index) in goodlist.data" :key="index">
                <a @click="returnFalse"><img :src="item.thumb" alt=""></a>
                <div class="item_text">
                  {{item.title}}

                </div>
                <div class="itemDetial">

                  <span class="fl colorf45d f14">￥{{item.marketprice}}</span>
                  <span class="fr f12 color_s">{{item.keywords}}</span>

                </div>
                <span class="z_price" v-if="item.isdiscount=='1'&&item.isdiscount_value">{{item.isdiscount_value}}折</span>
              </div>
            </div>-->
          </div>
        </swiper-item>

      </swiper>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getLocation
} from "@/utils/wechat";
import tab_bar from "@/components/tab_bar";
import sercah from "@/components/sercah";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
      tinyPics: {
        intro: "/static/images/icon_preferential.png",
        promotion: "/static/images/icon_activity.png"
      },
      tabs: [
        {
          name: "口碑"
        },
        {
          name: "攻略"
        },
        {
          name: "宝贝"
        }
      ],
      shopId: null,
      activeIndex: 0,
      currentTab: 0,
      ybarsIndex: 0,
      contentHeight: 0,
      shopinfo: {},
      goodlist: "",
      strategyList: "",
      PromList: "",
      P_List: "",
      showCouponsbottom: false,
      showActivitybottom: false,
      showActivityright: false,
      fllow_text: "关注",
      fllow_s: false,
      iPhoneshow: false,
      iphoneheight: "",
      activity_list: [],
      shopkm: "",
      showdiscounts: false,
      showCoupons2: false,
      showgd: false,
      couponname: "",
      //评论列表
      cmtlist: "",
      page: 1,
      isBottom: false,
      isBottom2: false,
      loadMore: true,
      loadMoreOne: true,
      textdetil: "已经最后一页了...",
      isSign: 1,
      isComment: 1,
      strategyList: "",
      styisfollow: "",
      hasLogin: false
      //    imgHost: 'https://bigmk-oss-001.oss-us-west-1.aliyuncs.com/',
    };
  },
  components: {
    isLoading,
    tab_bar,
    sercah
  },

  methods: {
    returnFalse() {
      return false;
    },
    openLocation() {
      var that = this;
      let [latitude, longitude] = this._U.bMapTransqqMap(
        parseFloat(this.shopinfo.lat),
        parseFloat(this.shopinfo.lng)
      );
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      });
    },
    activity_info(id, is_official) {
      this.$router.push({
        path: "/pagesSub/busineshop/strategyDetil",
        query: {
          id: id,
          merchid: is_official == 0 ? this.$route.query.id : "",
          type: "info",
          official: is_official
        }
      });
    },
    toggleCouponsPopup() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      this.showCouponsbottom = !this.showCouponsbottom;
    },
    toggleActivityPopup() {
      this.showActivitybottom = !this.showActivitybottom;
    },
    toggleActivityPopupright() {
      this.showActivityright = !this.showActivityright;
    },
    toggleActivityPanle() {
      this.showActivityright = !this.showActivityright;
    },
    oend() {
      this.showCouponsbottom = false;
    },
    opendown() {
      this.showActivitybottom = false;
    },
    async saltfollow() {
      let [err1, data] = await this._to(getLocation());
      let infolist = await this._to(
        this.$http.getShopInfo(
          this.$route.query.id,
          data.latitude,
          data.longitude,
          this.$store.state.user.userInfo.openId
        )
      );
      this.shopinfo = infolist[1].result;
    },
    tabfollow() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      if (this.shopinfo.isfollow == "1") {
        this.$http.getfollow(
          this.$route.query.id,
          this.$store.state.user.userInfo.openId,
          0
        );

        this.fllow_s = false;
        this.fllow_text = "关注";
        this.shopinfo.isfollow = 0;
      } else {
        this.$http.getfollow(
          this.$route.query.id,
          this.$store.state.user.userInfo.openId,
          1
        );

        this.fllow_s = true;
        this.fllow_text = "已关注";
        this.shopinfo.isfollow = 1;
      }
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
    },
    poinClick(e) {
      this.ybarsIndex = e;
    },
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
      this.page = 1;

      if (this.currentTab == 0) {
        var query = wx.createSelectorQuery();
        query
          .select("#item1")
          .boundingClientRect(res => {
            this.contentHeight = res.height + 28 + "px";
          })
          .exec();
      } else if (this.currentTab == 1) {
        var query = wx.createSelectorQuery();
        query
          .select("#item2")
          .boundingClientRect(res => {
            this.contentHeight = res.height + 28 + "px";
          })
          .exec();
      } else {
        var query = wx.createSelectorQuery();
        query
          .select("#item3")
          .boundingClientRect(res => {
            this.contentHeight = res.height + 28 + "px";
          })
          .exec();
      }
    },

    onAnimationfinish() {},
    //   	口碑列表this.$route.query.id
    async commentList() {
      let openid = "";
      if (this.$store.state.user.loginStatus) {
        openid = this.$store.state.user.userInfo.openid;
      }
      let List = await this._to(
        this.$http.praiseList(openid, this.$route.query.id, this.page)
      );

      if (List[1].result.data.length < 5) {
        this.isBottom = true;
        if (List[1].result.data.length == 0) {
          this.loadMoreOne = false;
        }
      }

      this.cmtlist = List[1].result.data;
      console.log(this.cmtlist, 99999);
      this.isSign = List[1].result.today_check_in;
      this.isComment = List[1].result.today_comment;

      let arrs = [];
      this.cmtlist.forEach(function(item, index) {
        let img = item.pics;

        let imgarr = img.split(",");
        let video = item.video;
        let videoarr = video.split(",");
        arrs.push({
          add_time: item.add_time,
          avatar: item.avatar,
          content: item.content,
          merchid: item.merchid,
          nickname: item.nickname,
          openid: item.openid,
          imgs: imgarr,
          rjxf: item.rjxf,
          star: item.star,
          video: videoarr,
          status: item.status,
          zh: item.zh,
          hf: item.hf,
          id: item.id
        });
      });
      this.cmtlist = arrs;
      this.cmtlist = this.cmtlist.map(v => {
        v.add_time = this._U.formatDate(v.add_time, "MM月dd日 HH:mm");
        return v;
      });
      if (this.currentTab == 0) {
        setTimeout(() => {
          var query = wx.createSelectorQuery();
          query
            .select("#item1")
            .boundingClientRect(res => {
              this.contentHeight = res.height + 28 + "px";
            })
            .exec();
        }, 500);
      }
    },
    async shopstrategyList() {
      let Data = await this._to(
        this.$http.strategyList(
          this.$route.query.id,
          this.page,
          10,
          this.$store.state.user.userInfo.openid
        )
      );
      this.strategyList = Data[1].list;
      console.log(Data, "666666666");
    },
    async shopstrategyList2() {
      let Data = await this._to(
        this.$http.strategyList(
          this.$route.query.id,
          1,
          this.strategyList.length,
          this.$store.state.user.userInfo.openid
        )
      );
      this.strategyList = Data[1].list;
      console.log(Data, "8888888");
    },
    async userLike(id) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        let List = await this._to(
          this.$http.setLike(0, id, this.$store.state.user.userInfo.openid)
        );

        if (List[1].result.message == "ok") {
          this.commentList();
        } else {
          this.$tips.toast("已经赞过了！");
        }
      }
    },
    async styFollow(id, isfollow) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (isfollow == false) {
          //  				 this.$http.strategyLike(
          //          this.thirdStrategyList[0].id,
          //          this.$store.state.user.userInfo.openId
          //       );
          let List = await this._to(
            this.$http.strategyLike(id, this.$store.state.user.userInfo.openid)
          );
          this.shopstrategyList2();
          this.$tips.toast("点赞成功");
        }
        if (isfollow == true) {
          let List = await this._to(
            this.$http.strategyLike(id, this.$store.state.user.userInfo.openid)
          );
          this.shopstrategyList2();
          this.$tips.toast("取消点赞");
        }
      }
    },
    async initData() {
      this.shopinfo = "";
      this.goodlist = "";
      this.goodlist2 = "";
      this.P_List = "";
      this.page = 1;
      this.strategyList = "";

      //    this.$store.commit("SET_IS_LOADING", true);
      const [
        infolist,
        PromGoodsList,
        strategyAllList,
        PromList,
        ActiveList
      ] = await this._U.PromiseAll(
        this.$http.getShopInfo(
          this.$route.query.id,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.$store.state.user.userInfo
            ? this.$store.state.user.userInfo.openId
            : null
        ),

        this.$http.getShopPromGoodsList(this.$route.query.id),
        this.$http.strategyList(
          this.$route.query.id,
          this.page,
          10,
          this.$store.state.user.userInfo
            ? this.$store.state.user.userInfo.openId
            : null
        ),
        this.$http.getShopGoodsList(this.$route.query.id),
        this.$http.activelist(this.$route.query.id)
      );

      this.currentTab = 1;
      this.shopinfo = infolist.result;
      this.shopkm = (infolist.result.jl / 1000).toFixed(1);
      this.goodlist = PromGoodsList.result;
      this.P_List = PromList.result;
      this.$store.commit("SET_IS_LOADING", false);
      this.strategyList = strategyAllList.list;
      console.log(strategyAllList, 55555);
      if (ActiveList.result.list !== undefined) {
        this.activity_list = ActiveList.result.list
          ? ActiveList.result.list
          : [];
        if (!this.activity_list) {
          this.showdiscounts = false;
        } else {
          this.showdiscounts = true;
          if (this.activity_list.length == 1) {
            this.showgd = false;
          } else {
            this.showgd = true;
          }
        }
      } else {
        this.showdiscounts = false;
      }
      if (this.shopinfo.coupon_list.length == 0) {
        this.showCoupons2 = false;
      } else {
        this.showCoupons2 = true;
        this.shopinfo.coupon_list.map(i => {
          i.timestart = this._U.formatTime(i.timestart);
          i.timeend = this._U.formatTime(i.timeend);
        });
        this.couponname = this.shopinfo.coupon_list[0].couponname;
      }

      setTimeout(() => {
        var query = wx.createSelectorQuery();
        query
          .select("#item2")
          .boundingClientRect(res => {
            this.contentHeight = res.height + 28 + "px";
          })
          .exec();
      }, 500);

      if (this.shopinfo.isfollow == "1") {
        this.fllow_s = true;
        this.fllow_text = "已关注";
      } else {
        this.fllow_s = false;
        this.fllow_text = "关注";
      }
    },
    toAssess() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }

      if (!this.isComment) {
        this.$router.push({
          path: "/pagesSub/busineshop/comment",
          query: { id: this.$route.query.id, shopName: this.shopinfo.merchname }
        });
      } else {
        this.$tips.alert("今日已评价过了");
      }
    }
  },
  async mounted() {
    var res = wx.getSystemInfoSync();
  },
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
    },
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  async onReachBottom() {
    let openid = "";

    if (this.$store.state.user.loginStatus != false) {
      openid = this.$store.state.user.userInfo.openid;
    }

    if (this.currentTab == 1) {
      console.log(this.isBottom2, 77);
      if (this.isBottom2) return;
      let Data = await this.$http.strategyList(
        this.$route.query.id,
        ++this.page,
        10,
        openid
      );

      if (Data.list.length < 10) {
        this.isBottom2 = true;
      }
      this.strategyList = [...this.strategyList, ...Data.list];

      setTimeout(() => {
        var query = wx.createSelectorQuery();
        query
          .select("#item2")
          .boundingClientRect(res => {
            this.contentHeight = res.height + 28 + "px";
          })
          .exec();
      }, 500);
    }
    if (this.currentTab == 0) {
      if (this.isBottom) return;
      let List = await this.$http.praiseList(
        openid,
        this.$route.query.id,
        ++this.page
      );

      if (List.result.data.length < 14) {
        this.isBottom = true;
      }
      let pagelist = List.result.data;
      let arrs = [];
      pagelist.forEach(function(item, index) {
        let img = item.pics;
        let imgarr = img.split(",");
        let video = item.video;
        let videoarr = video.split(",");
        arrs.push({
          add_time: item.add_time,
          avatar: item.avatar,
          content: item.content,
          merchid: item.merchid,
          nickname: item.nickname,
          openid: item.openid,
          imgs: imgarr,
          rjxf: item.rjxf,
          star: item.star,
          video: videoarr,
          status: item.status,
          zh: item.zh,
          hf: item.hf,
          id: item.id
        });
      });
      pagelist = arrs;

      pagelist = pagelist.map(v => {
        v.add_time = this._U.formatDate(v.add_time, "MM月dd日 HH:mm");
        return v;
      });
      this.cmtlist = [...this.cmtlist, ...pagelist];

      setTimeout(() => {
        var query = wx.createSelectorQuery();
        query
          .select("#item1")
          .boundingClientRect(res => {
            this.contentHeight = res.height + 28 + "px";
          })
          .exec();
      }, 500);
      return;
    }
    if (this.currentTab == 2) {
      return;
    }
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街的商铺...",
      path: "/pagesSub/busineshop/shop?id=" + this.$route.query.id
    };
  },
  watch: {
    shopId(v) {
      this.initData();
    },
    hasLogin(v) {
      this.shopstrategyList();
    }
  },
  async onShow() {
    this.shopId = this.$route.query.id;

    this.$store.commit("SET_IS_LOADING", false);

    this.commentList();
    this.hasLogin = this.$store.state.user.loginStatus;
  }
};
</script>
<style scoped lang='scss'>
.container {
  background-color: #f2f2f2;
  padding-bottom: 20px;
  font-family: PingFang-SC-Regular;

  .right_prour {
    width: 55px;
    height: 50px;
    background-color: #323232;
    border-radius: 4px 0px 0px 4px;
    opacity: 0.8;
    position: fixed;
    top: 62%;
    right: 0px;
    z-index: 10;

    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: url("#{$imgUrl}icon_popup.png") no-repeat left center;
      background-size: 20px 20px;
    }

    p {
      width: 30px;
      text-align: center;
      font-family: PingFang-SC-Bold;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1.2;
      letter-spacing: 0px;
      color: #fefefe;
      margin-left: 6px;
    }

    .right_prour.on::after {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff455d;
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 3;
    }
    .show_active_pouper {
      right: 145px;
      z-index: 99;
    }
  }

  .banner_img {
    width: 100%;
    height: 240px;
    position: relative;

    .banner_img_modelr {
      width: 100%;
      height: 240px;
      background: black;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.4;
      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
    }

    button {
      z-index: 3;
      padding: 0;
      margin: 0;
      background: rgba(0, 0, 0, 0);
      position: absolute;
      top: 15px;
      right: 15px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      width: 50px;
      height: 50px;

      div {
        width: 17px;
        height: 15px;
        z-index: 3;
        margin: auto;
        background: url("#{$imgUrl}icon_kindheart_act_2.png") no-repeat 100%
          100%;
        background-size: cover;
      }

      span {
        display: block;
        width: 100%;
        height: 16px;

        line-height: 10px;
        color: #fff;
        font-size: 10px;
      }

      .starActive {
        width: 17px;
        height: 15px;
        z-index: 3;
        margin: auto;
        background: url("#{$imgUrl}/icon_heart_act.png") no-repeat 100% 100%;
        background-size: cover;
      }
    }
  }

  .all_goods {
    /*  height: 86px;*/
    background: #f2f2f2;
    padding-bottom: 10px 0;
    width: 100%;
    position: relative;
    /* top:-10px;*/
    border-radius: 12px 12px 0px 0px;
    top: -10px;
    z-index: 3;

    .discounts {
      width: 100%;
      height: 43px;
      line-height: 43px;
      background-color: #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px 0 19px;

      .right-arrow {
        width: 10px;
        height: 12px;
        background: url(#{$imgUrl}/icon_ret.png) no-repeat center/cover;
      }

      .present {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;

        .discount_msg {
          height: 43px;
          width: 120px;
          line-height: 43px;
          font-family: PingFang-SC;
          font-size: 13px;
          letter-spacing: 1px;
          color: #9a9a9a;
          margin-left: 12px;
        }

        .discount_msg_text {
          height: 43px;
          line-height: 43px;
          font-family: PingFang-SC;
          font-size: 13px;
          letter-spacing: 1px;
          color: #9a9a9a;
          position: absolute;
          right: 10px;
        }

        .text-right {
          flex: 1;
          padding-right: 15px;
          text-align: right;
          font-size: 14px;
          letter-spacing: 1px;
          color: #9a9a9a;
        }

        .gift {
          display: inline-block;
          width: 18px;
          height: 31px;
          margin-right: 4px;

          img {
            width: 18px;
            height: 18px;
          }
        }

        .gift_1 {
          img {
            width: 25px;
            height: 18px;
          }
        }
        .lutext {
          display: inline-block;
          height: 45px;
          width: 240px;
          overflow: hidden;
          padding-left: 15px;
          padding-right: 15px;
        }
      }
    }

    .discounts_d {
      border-radius: 12px 12px 0px 0px;
    }
  }

  .codeall {
    .v_code {
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .code_price {
        width: 56px;
        position: absolute;
        left: 0;
        top: 0;
        height: 70px;
        padding: 20px 6px;

        h4 {
          font-size: 12px;
          color: #fff;
          margin-bottom: 4px;
          font-family: PingFang-SC-Regular;
        }

        p {
          font-size: 10px;
          color: #fff;
          font-family: PingFang-SC-Regular;
        }
      }

      .code_button {
        width: 56px;
        position: absolute;
        right: 0;
        top: 0;
        height: 70px;
        padding: 20px 6px 12px 6px;

        p {
          font-size: 10px;
          text-align: center;
          color: #fc9fff;
          margin-bottom: 10px;
          font-family: PingFang-SC-Regular;
        }

        button {
          width: 43.5px;
          height: 14.5px;

          border-radius: 7px;
          color: #fff;
          font-size: 9px;
          text-align: center;
          padding: 0;
          line-height: 12px;
          background-color: #fc9fff;
        }
      }
    }
  }

  .swiper {
    width: 100%;

    .navbar {
      border-radius: 3px 3px 0 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      position: relative;
      top: 0;
      height: 40px;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;

      /*	box-shadow: 0px 4px 7.4px 0.6px rgba(0, 0, 0, 0.1) !important;*/
      .navbar_item {
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
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
          color: #ff455d;
          font-size: 16px;
        }

        .navbar_item_on {
          color: #ff455d;
        }
      }

      .navbar_slider {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 9%;
        height: 3px;
        background-color: #ff455d;
        border-radius: 2px;
        transition: all 0.1s;
      }

      .navbar_slider_0 {
        left: 12%;
      }

      .navbar_slider_1 {
        left: 45.5%;
      }

      .navbar_slider_2 {
        left: 78.6%;
      }
    }

    .content {
      box-sizing: border-box;
      width: 100%;
      -webkit-overflow-scrolling: touch;

      #item1 {
        .praise {
          background: #f2f2f2;
          padding: 15px 15px 0 15px;
          .praiseInfo {
            position: relative;
            display: flex;
            // justify-content: space-between;
            align-items: center;
            width: 100%;
            .praise_ico {
              width: 40px;
              height: 40px;

              border-radius: 50%;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .praisepl {
              padding-left: 10px;
              span {
                display: block;
                width: 114px;
              }
            }
            .praiseTime {
              display: inline-block;
              position: absolute;
              right: 0;
              top: 12px;
            }
          }
          .praiseMains {
            padding: 0 15px;
            margin-top: 10px;
            width: 100%;
            p {
              word-break: normal;
              white-space: pre-warp;
              word-wrapl: break-word;
            }
          }

          .praiseImg {
            display: inline-block;
            margin-top: 15px;
            div {
              width: 86px;
              height: 86px;
              background-color: #9a9a9a;
              border-radius: 3px;
              float: left;
              margin: 0 4.5px 4.5px 0;
              img {
                width: 100%;
                height: 100%;
              }
              video {
                width: 100%;
                height: 100%;
              }
            }
            div:nth-child(2n) {
              /*	float:left !important;*/
              /*margin-left:4.5px;
                  margin-right:4.5px;*/
            }
          }
          .videos {
            display: flex;
            align-items: center;
            margin: 5px 0;
            width: 100%;

            .section {
              width: 112px;
              height: 112px;
              overflow: hidden;
              #myVideo {
                width: 112px;
                height: 112px;
                overflow: hidden;
              }
            }
            div:nth-child(2) {
              margin: 0 5px;
            }
          }
          .praiseIike {
            width: 100%;
            .praiseRight {
              padding-bottom: 15px;
              float: right;
              .likePeople {
                vertical-align: middle;
                display: inline-block;
                i {
                  width: 15px;
                  height: 16px;
                  display: inline-block;
                  background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100%
                    100%;
                  background-size: cover;
                  margin-right: 6px;
                  position: relative;
                  top: 2px;
                }
              }
              .allMessage {
                margin-left: 12px;
                display: inline-block;
                vertical-align: middle;
                i {
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  background: url("#{$imgUrl}icon_comment@2x.png") no-repeat
                    100% 100%;
                  background-size: cover;
                  margin-right: 6px;
                  position: relative;
                  top: 2px;
                }
              }
            }
          }
        }
      }

      .likeAll {
        .item-wrap {
          display: flex;
          background: #fff;
          flex-wrap: wrap;

          justify-content: flex-start;

          .item {
            position: relative;
            border-radius: 2px;
            width: 50%;
            padding: 8px 10px;

            .item_a {
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
              width: 125px;
              height: 31.5px;
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0;
              color: #323232;
              padding: 9px;
              position: relative;
            }

            .itemDetial {
              height: 44px;
              padding: 30px 9px 9px 9px;

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
            padding: 6px;

            .item_box {
              border: 0.5px solid #e8e8e8;
              border-radius: 8px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0rem 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);
              position: relative;
              .leftIco {
                position: absolute;
                left: 0px;
                top: 0px;
                width: 29px;
                height: 26px;
                background: url("#{$imgUrl}img_official@3x.png") no-repeat
                  center center;
                background-size: 100% 100%;
              }
              .itemInfos {
                height: 180px;
                position: relative;
                .z_price_2 {
                  display: inline-block;
                  position: absolute;
                  right: 7.5px;
                  width: 80px;
                  height: 30px;
                  line-height: 30px;
                  z-index: 1000;
                  border-radius: 0px 4px 4px 4px;
                  vertical-align: middle;
                  text-align: right;
                  font-size: 12px;
                  color: #323232;
                  overflow: hidden;
                  bottom: 0px;

                  i {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    margin-right: 6px;
                    vertical-align: middle;
                    margin-bottom: 2px;
                    background: url("#{$imgUrl}icon_fabulous.png") no-repeat
                      center center;
                    background-size: 100% 100%;
                  }
                  .likeActive {
                    background: url("#{$imgUrl}icon_fabulous_act.png") no-repeat
                      center center;
                    background-size: 100% 100%;
                  }
                }
              }
              .itemDetial2 {
                padding: 20px 9px 9px 9px;
              }
              .item_text2 {
                width: 100%;
               height: auto;
                overflow: hidden;
						    text-overflow: ellipsis;
						    display: -webkit-box;
						    -webkit-box-orient: vertical;
						    -webkit-line-clamp: 4;
						    max-height: 90px;
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
          padding: 4px 6px;
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
  /*弹窗优惠券*/
  .discounts {
    width: 100%;
    height: 43px;
    line-height: 43px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    .right-arrow {
      width: 10px;
      height: 12px;
      background: url(#{$imgUrl}/icon_ret.png) no-repeat center/cover;
    }
    .present {
      flex: 1;
      display: flex;
      align-items: center;
      .discount_msg {
        height: 43px;
        line-height: 43px;
        font-family: PingFang-SC;
        font-size: 14px;
        letter-spacing: 1px;
        color: #323232;
      }

      .gift {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 4px;
        position: relative;
        bottom: 3px;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  /*改版的店铺详情*/
  .edit_shop_info {
    z-index: 3;
    padding: 0 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .shop_detil {
      width: 100%;
      position: relative;
      img {
        width: 100%;
      }

      .shop_text {
        overflow: hidden;
        position: relative;
        padding: 15px 0 15px 0;
        margin: auto;
        .shop_a {
          width: 49px;
          height: 49px;
          background: rgba(255, 255, 255, 1);
          border: 0.5px solid rgba(245, 245, 245, 1);
          border-radius: 2px;
          box-shadow: 4px 6px 6px rgba(50, 50, 50, 0.05);
          display: block;
          float: left;
          margin: 14px 14px 14px 0px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            border-radius: 2px;
          }
        }

        .shop_info {
          /*	float:left;*/
          overflow: hidden;
          font-family: PingFang-SC-Regular;

          .shop_pons {
            span {
              /* padding-right: 12px;*/
            }
          }

          .shop_address_ico {
            display: flex;
            align-items: center;

            .shop_info_text {
              display: inline-block;
              width: 201px;
              padding-right: 6px;
            }

            i {
              display: inline-block;
              width: 10px;
              height: 12.5px;
              margin-right: 6px;
              background: url("#{$imgUrl}/icon_adree@2x.png") no-repeat 100%
                100%;
              background-size: cover;
            }
            em {
              display: inline-block;
              width: 1px;
              height: 12.5px;
              background: #fff;
              margin: 0 6px;
            }
          }

          h3 {
            font-size: 16px;
            line-height: 24px;
            color: #fff;
            font-weight: 700;
          }

          p {
            line-height: 24px;
            font-size: 12px;
            color: #fff;

            span {
              font-size: 12px;
              color: #fff;
            }
          }
        }

        button {
          position: absolute;
          top: 15px;
          right: 15px;
          text-align: center;
          /*padding:0px 8px;*/
          width: 50px;
          line-height: 24px;
          height: 24px;
          line-height: 24px;
          background-color: #ff455d;
          border-radius: 12px;
          font-size: 14px;
          color: #fff;
          padding: 0;
        }
      }
    }

    .info_p {
      height: 60px;
      /* 	border:0.5px solid brown;*/
      line-height: 21px;
    }
  }

  /*弹窗后优惠券样式*/
  /*弹窗*/
  .mainslist_2 {
    width: 100%;
    height: 400px;
    overflow-y: scroll;

    button {
      background-color: #ff455d;
      color: #fff;
      font-size: 14px;
      line-height: 36px;
      height: 36px;
      text-align: center;
      margin-top: 15px;
      border-radius: 0;
    }

    .item_2 {
      .voucher_s {
        margin: 15px 0;
        padding: 0 15px;
        width: 100%;
        height: 133px;
        position: relative;
        border-radius: 5px;

        .voucher_price {
          position: absolute;
          left: 0;
          top: 0;
          width: 124px;
          height: 133px;
          line-height: 133px;
          padding-left: 20px;
        }
        .voucherInfos {
          position: absolute;
          left: 124px;
          top: 0px;
          height: 100%;

          padding: 15px 7.5px;
          .userVoucher {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            .span_no {
              position: relative;
              right: -32px;
              padding: 4px 5px;
              background: #ff455d;
              border-radius: 3px;
            }
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .onSale {
    .mainslist {
      width: 100%;

      .bgc_img {
        border: 0.5px solid red;
        display: inline-block;
        width: 16px;
        height: 16px;
      }

      button {
        background-color: #ff455d;
        color: #fff;
        font-size: 16px;
        line-height: 47px;
        height: 47px;
        text-align: center;
        margin-top: 15px;
        border-radius: 0;
      }

      .item_1 {
        /*	padding:15px;*/
        height: 72px;

        .item_left {
          width: 45px;
          height: 72px;
          float: left;

          span {
            display: block;
            width: 12px;
            height: 12px;
            border: 0.5px solid #ff455d;
            margin: 15px auto;
            -webkit-transform: rotateZ(45deg);
            -moz-transform: rotateZ(45deg);
            -o-transform: rotateZ(45deg);
            -ms-transform: rotateZ(45deg);
            transform: rotateZ(45deg);
          }
        }

        .item_right {
          h4 {
            line-height: 24px;
            padding: 6px 0;
          }

          p {
            line-height: 16px;
          }
        }
      }
    }
  }

  .pai_vidio {
    height: 100px;

    .write_box {
      width: 145px;
      height: 100px;
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #ffffff;
      border-radius: 4px 0px 0px 4px;
      display: flex;
      flex-wrap: wrap;
      padding: 6px;
      justify-content: flex-start;

      li {
        width: 44.5px;
        text-align: center;
        height: 44px;

        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: relative;

          img {
            width: 100%;
            height: 100%;
          }
        }
        span.on {
          &::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ff455d;
            position: absolute;
            right: 0px;
            top: 0px;
            z-index: 3;
          }
        }
        p {
          font-size: 12px;
          color: #9a9a9a;
        }
      }
    }
  }
}
</style>
