<template>
  <div class="warper">

    <form @submit="formSubmit_collect" report-submit="true">

      <div :class="{'cuspos':showTop}" v-if="showTop">
        <div class="nearlyHeader bgcfff">
          <van-tab class="catewrap" :list="catelist.list" tab-class="cateclass" active-tab-class="cateselected" border="border"  :selected-id="catelist.selectedId" :scroll="catelist.scroll" :height="catelist.height" @tabchange="catetabChange" />
          <div class="result_page flex">
            <li @click="pick1" :class="{'colorf45d':fjyh.cluserid!=''}">
              {{fjyh.clusername}}
              <a class="ri_poins" :class="{'poin_top_show':showPick1}">
              </a>
            </li>
            <li @click="pick2" :class="{'colorf45d':fjyh.distance!=''}">
              距离最近
            </li>
            <li class="lineRight" :class="{'colorf45d':fjyh.hot!=''}" @click="pick3">
              <span class="carIcon">
              </span>
              人气
            </li>
            <li @click="pick4" :class="{'colorf45d':fjyh.isfollow!=''}">已关注品牌</li>
          </div>
        </div>
      </div>
      <movable-area style="width:100%;height:100%;">
        <movable-view class="magicBall ico" :x='ballX' :y='ballY' @tap="magicBallTap"  damping='100' friction='10' inertia='true' animation='false' @change='magicBallChange' @touchend='magicBallEnd($event)' direction="all">
            <div class="magicBallIn magicBallInJump ico"></div>
        </movable-view>

        <tab_bar cur_index="0"></tab_bar>
        <wux-refresher id="wux-refresher" @pulling="onPulling" @refresh="onRefresh">

          <div class="container" @touchmove="handletouchmove($event)">
            <!-- 魔球 start-->

            <!-- 魔球 end-->

            <div v-if="posPopShow" class="fullPage2 pos_pop_wrap" style="z-index:9999;">
              <div class="cont">
                <div class="pos_pop">
                  <img src="../../../static/images/img_adr.png">
                  <div>无法获取地理位置，请允许地理位置授权</div>
                  <button open-type="openSetting" class="smallbtn" @opensetting="opensetting">获取位置</button>
                </div>
              </div>
              <div class="footH"></div>
            </div>
          
            <div id="topHeight">
              <div class="homeHeader w100" >
                
                <div class="poin_address over_hidden ">                  
                      <span class="adressIcon ml15 mr5" @click="$router.push({ path: '/pages/home/GoCity'})"></span>

                      <!-- <span class="f12 color3f mr7 bold city">{{isCurrent}}</span> -->
                      <div v-if="city" class="w70 over_hidden" @click="$router.push({ path: '/pages/home/GoCity'})">  
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>                  
                        <span class="f12 color3f  bold city w100">{{city}}</span>
                        <!-- <span class="f12  mr5 city fontArrow"></span> -->
                      </div>
                      <div class="searchBox " @click='$router.push({path: "/pagesSub/searchshop/searchresult", query: { type: "home"} })'>
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>                  

                      <span class="icon ico  mr3"></span>
                      <span class="color3f">搜索</span>
                      </div>
                </div>
               
                <div class="warther">
                  <div class="weatherTemper bold f12 color3f">
                    <!-- {{weatherDesc}}  -->
                    {{temperature}}
                    </div>
                  <img class="dayPic" :class="{'localIcon':localIcon}" :src="dayPictureUrl" alt="">
                </div>
                <span class="carIcon" v-if="false">
                  <span class="carIconIn" @click="$store.state.user.loginStatus!=false?$router.push({ path:'/pages/user/myCar'}):$router.push({ path: '/pagesSub/login/loginIndex' })">
                    <span v-if="getCarCount&&getCarCount>0&&userInfo" class="count">{{getCarCount>99 ?'+':getCarCount}}</span>
                  </span>
                </span>
              </div>

              <!-- <div class="searchBoxWraper">
                <div class="searchBox">
                  
                  <div class="flex flex_hc">
                    <div class="flex1" @click='$router.push({path: "/pagesSub/searchshop/searchresult", query: { type: "home"} })'>
                      <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                      <span class="searchIcon mr10"></span>
                      <input type="text" class="search" disabled placeholder-class="placeholder" :placeholder="placeholder">
                    </div>
                    <div class="ico scan_ico" @click="scan">
                      <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                    </div>
                  </div>
                </div>
              </div> -->

              <div class="recommendContainer">
                <div class="sectionItem">
                  <div class="sectionTitle f16 bold color28">今日推荐</div>
                  <div class="flex flex_hc sectionSubtitle">
                    <p class="f12 color9a flex1 over_hidden">网罗最新、最潮、最实惠的生活指南</p>
                    <div class="num_r">{{swiperCurrent+1}}/{{everyRecommendList.length}}</div>
                  </div>
                </div>
                <div class="swiperContainer">
                  <swiper :indicator-dots="indicatorDots" :current="swiperCurrent" :autoplay="autoplay" :interval="interval" :duration="duration"  circular='true' @change="swiperChange" class="swiper">
                    <block v-for="(item,index) in everyRecommendList" :key="index">
                      <swiper-item @click="herfrecommend(item.type,item.linkid,item.id)" class="swiperItem">
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                        <div class="banner">
                          <wux-image wux-class="image" shape="rounded" :src="item.thumb">
                          </wux-image>
                        </div>
                        <div class="recommendContent">
                          <div class="contentTitle mt8 f14">{{item.title}}</div>
                          <div class="color9a mt3 f12 over_hidden">{{item.description}}</div>
                        </div>
                      </swiper-item>
                    </block>
                  </swiper>

                  <div class="dots" v-if='0'>
                    <block v-for="(item,index) in everyRecommendList?everyRecommendList:[]" :key="index">
                      <view class="dot" :class="{'active':swiperCurrent == index}"></view>
                    </block>
                  </div>
                </div>
              </div>

              <div class="w100" v-if="weeklist&&weeklist.length>0">
                <div class="gap"></div>
                <div class="week">
                  <div class="sectionItem">
                    <div class="sectionTitle f16 bold color28">最新活动</div>
                    <div class="flex flex_hc sectionSubtitle">
                      <p class="f12 color9a flex1 over_hidden">快来看看，大家都在参与什么</p>
                    </div>
                  </div>
                  <div class="weekContent hotContent">
                    <scroll-view class="scroll-view_H" scroll-x style="width: 100%" :lower-threshold="lowerthreshold" @scrolltolower="weeklistData">
                      <view class="item" v-for="(item,index) in weeklist " :key='index' @click="goWeekTo(item.type, item.linkid, item.title)">
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                        <div class="bg">
                          <wux-image wux-class="image" shape="rounded" :src="item.images">
                          </wux-image>
                        </div>
                        <div class="itemDetail mt8 f14 over_hidden">{{item.title}}</div>
                      </view>
                    </scroll-view>
                  </div>
                </div>
              </div>

              <div class="w100" v-if="hotClusterList&&hotClusterList.length>0">
                <div class="gap"></div>
                <div class="week">
                  <div class="sectionItem">
                    <div class="sectionTitle f16 bold color28">热门商场</div>
                    <div class="flex flex_hc sectionSubtitle">
                      <p class="f12 color9a flex1 over_hidden">最受欢迎的购物中心/百货</p>
                    </div>
                  </div>
                  <div class="hotCluster">
                    <div @click="$router.push({ path:'/pagesSub/brand/hotcluster'})" class="info_list1">
                      <div class="bgc_img">
                        <wux-image wux-class="image" :src="selectcity=='深圳市'?'../../../static/images/img_eg1@2x.png':''">  
                        </wux-image>                        
                      </div>
                    </div>
                    <swiper class="hotswiper" :indicator-dots="hotdots" display-multiple-items="3" :current="hotSwiperCurrent" :autoplay="hotauto" duration="1000" @change="hotSwiperChange">
                      <block v-for="(item,index) in hotClusterList" :key="index">
                        <swiper-item @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: {id: item.id,title:item.name}})" class="swiperItem info_list flex flex_hc" :class="{'active':hotSwiperCurrent == index}">
                        <!-- <swiper-item class="swiperItem info_list flex flex_hc" :class="{'active':hotSwiperCurrent == index}"> -->
                          <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                          <div class="bgc_img">
                            <wux-image  wux-class="image" shape="rounded" :src="item.images">
                            </wux-image>
                            <div class="title_name">
                              <h4 class="f10">{{item.name}}</h4>
                              <p class="f8 bold">{{item.merch_num || 0}}品牌丨{{item.activity_num || 0}}活动</p>
                            </div>
                          </div>
                        </swiper-item>
                      </block>
                    </swiper>
                  </div>
                </div>
              </div>

              <div class="w100" v-if="brandNewsList&&brandNewsList.length>0">
                <div class="gap"></div>
                <div class="week">
                  <div class="sectionItem">
                    <div class="sectionTitle flex flex_hc">
                      <p class="flex1 f16 bold color28">品牌快讯</p>
                      <div class="more f12 color9a ico" @click="$router.push('/pagesSub/brand/brandnews')">更多</div>
                    </div>
                    <div class="flex flex_hc sectionSubtitle">
                      <p class="f12 color9a flex1 over_hidden">十万时尚达人都在看</p>
                    </div>
                  </div>
                  <div class="weekContent brandNewsContent">
                    <scroll-view class="scroll-view_H" scroll-x style="width: 100%"  :lower-threshold="lowerthreshold" @scrolltolower="brandNewsData">
                      <view class="item" v-for="(item,index) in brandNewsList " :key='index' @click="herfNewsFlash(item.id)">
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                        <div class="bg">
                          <wux-image wux-class="image" shape="rounded" :src="item.thumb">
                          </wux-image>
                          <div class="r flex flex_hc">
                            <span class="ico"></span>
                            <p class="f10 color3f">{{item.view || 0}}</p>
                          </div>
                        </div>
                        <div class="itemDetail mt8 f14 over_hidden">{{item.title}}</div>
                      </view>
                    </scroll-view>
                  </div>
                </div>
              </div>

              <div class="w100" v-if="interestBrandList&&interestBrandList.length>0">
                <div class="gap"></div>
                <div class="toSale interestBrand">
                  <div class="sectionItem">
                    <div class="sectionTitle flex flex_hc">
                      <p class="flex1 f16 bold color28">您可能感兴趣的品牌</p>
                      <div class="more more1 f12 color32 ico" @click="randomBrand">换一批</div>
                    </div>
                  </div>
                  <div class="saleContent mt5">
                    <div class="item" v-for="(item,index) in interestBrandList" :key="index"
                    @click="$router.push({ path:'/pagesSub/brand/brandDetail',query: { id: item.id}})"
                    >
                      <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                      <div class="picHeader">
                        <div class="bg">
                          <wux-image wux-class="image" shape="circleborder" :src="item.images"></wux-image>
                        </div>
                        <div class="sale colorf45d" @click.stop="interestBrandListFocus(item.isfollow,item.id)">{{item.isfollow==1?'已关注':'关注'}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="ChinaGoods" v-if="false">
              <div class="gap"></div>
              <div class="goodsHeader">
                <div class="goodsTitle f16 bold color28">
                  国货当自强
                  <div class="more fr">>></div>
                </div>
                <div class="weekTitleDetail mt11 f12 color9a">made in China厉害了我的国</div>
              </div>
              <div class="goodsContent lineBottom">
                <div class="goods" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: 458}})">
                  <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                  <wux-image wux-class="image" shape="circle" src="https://sh.szwfy.com.cn/attachment/images/3/2018/09/hXx90zo5dg7SYK8qp15DXgRsXGZzWq.png">
                  </wux-image>
                </div>
                <div class="goodsDetail">
                  <div class="detailTitle f13 color28 mt8">超越维密指日可待！</div>
                  <div class="mt8 f12 color9a">中国人自己的内衣品牌，支持国产，促进内需。</div>
                </div>
              </div>
            </div>           
            <div id="selectStart" class="w100">
              <div class="w100" v-if="shownearlySale">
                <div class="bgcf2 align h40p color9a f12 bold">一 附近优惠 一</div>
                <div class="nearlyHeaderHeight">
                  <div class="nearlyHeader bgcfff" v-if="!showTop">
                    <van-tab class="catewrap" :list="catelist.list" tab-class="cateclass" active-tab-class="cateselected" border="border" :selected-id="catelist.selectedId" :scroll="catelist.scroll" :height="catelist.height" @tabchange="catetabChange" />
                    <!-- <div class="result_page" v-if="showresult_2"> -->
                    <div class="result_page flex">
                      <li @click="pick1" :class="{'colorf45d':fjyh.cluserid!=''}">
                        {{fjyh.clusername}}
                        <a class="ri_poins" :class="{'poin_top_show':showPick1}">
                        </a>
                      </li>
                      <li @click="pick2" :class="{'colorf45d':fjyh.distance!=''}">
                        距离最近
                      </li>
                      <li class="lineRight" :class="{'colorf45d':fjyh.hot!=''}" @click="pick3">
                        <span class="carIcon">
                        </span>
                        人气
                      </li>
                      <li @click="pick4" :class="{'colorf45d':fjyh.isfollow!=''}">已关注品牌</li>
                    </div>
                  </div>
                </div>

                <div class="nearly">
                  <div class="goodsContent fjyhgoodsContent">
                    <div class="w100" v-if="nearlySale&&nearlySale.length>0">
                      <div class="item" v-for="(item,index) in nearlySale" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.id }})">
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                        <div class="left">
                          <wux-image wux-class="image" shape="thumbnail" :src="item.logo">
                          </wux-image>
                        </div>
                        <div class="right">
                          <div class="title f14 color32 over_hidden">
                            {{item.merchname}}
                          </div>
                          <div class="price f12 mt15 over_hidden">
                            {{item.catename}} | {{item.jiawei||"大众价位"}} <span class="hot">人气：{{item.view||0}}</span>
                          </div>
                          <div class="time mt8 flex">
                            <div class="flex1 flexwrap">
                              <div class="li" v-for="(childitem,childindex) in item.activityList" :key="childindex">{{childitem.title}}</div>
                            </div>
                            <span class="f12 color9a">{{item.jl}}KM</span>
                          </div>
                        </div>
                      </div>

                      <div class="mt10">
                        <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
                        <zan-loadmore v-if="isBottom" type="text" text="暂无数据"></zan-loadmore>
                      </div>
                    </div>

                    <div v-if="nearlySale&&nearlySale.length<=0" class="empty">
                      <img src="../../../static/images/icon_none.png">
                      <div>暂无相关附近优惠</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </wux-refresher>
      </movable-area>
    </form>

    <van-popup :show="showPick1" custom-class="top" @close="pick1" position="top">
      <div class="myToast">
        <!-- v-if="showPick1" -->
        <div class="f_main">
          <p>选择商圈</p>
        </div>
        <ul class="t_main">
          <li v-for="(item, index) in clusterList" :class="{'li_active':fjyh.cluserid== item.id}" :key="index" @click="pick1Item(item.id,item.name,index)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation,
  getSystemInfoSync,
  NetworkStatusChange,
  getScanCode
} from "@/utils/wechat";
import tab_bar from "@/components/tab_bar";
import isLoading from "@/components/isLoading";
import { mapState, mapGetters, mapActions } from "vuex";
import bmap from "../../../static/lib/bmap-wx.min.js";

export default {
  data() {
    return {
      lowerthreshold: 100,
      posPopShow: false,
      user_Info: {},
      clusterInfo: null,
      selectcity: "",
      isCurrent: "获取定位中",
      weatherDesc: "",
      temperature: "",
      dayPictureUrl: "",
      localIcon: true,
      placeholder: "搜索同城商场、品牌优惠",
      everyRecommendList: [
        {
          id: "",
          uniacid: 3,
          title: "",
          link: "",
          description: "",
          enabled: 1,
          displayorder: 4,
          createtime: 1540349118,
          thumb: "",
          type: 3,
          linkid: null,
          content: ""
        }
      ],
      weeklist: [
        {
          id: "",
          displayorder: 5,
          cluster_id: "",
          province: "广东省",
          city: "深圳市",
          area: "市辖区",
          images: "",
          title: "",
          content: "",
          add_time: 1538984584,
          update_time: 1541571351,
          status: 1,
          type: 3,
          merchid: 0,
          deleted: 0,
          linkid: 9
        },
        {
          id: "",
          displayorder: 5,
          cluster_id: "",
          province: "广东省",
          city: "深圳市",
          area: "市辖区",
          images: "",
          title: "",
          content: "",
          add_time: 1538984584,
          update_time: 1541571351,
          status: 1,
          type: 3,
          merchid: 0,
          deleted: 0,
          linkid: 9
        }
      ],
      hotSwiperCurrent: 0,
      hotdots: false,
      hotauto: false,
      hotClusterList: [
        {
          id: "",
          pid: "",
          uniacid: "3",
          type: "1",
          displayorder: "6",
          province: "广东省",
          city: "深圳市",
          area: "罗湖区",
          name: "",
          addr: "",
          business_time: "09:00-22:00",
          tel: "027-00000000",
          latitude: "22.54554187880014",
          longitude: "114.11733552366445",
          images: "",
          description: null,
          deleted: "0",
          add_time: "1536212972",
          status: "1",
          recommend: "1",
          merchids: "",
          view: null,
          hot: "1",
          activity_num: "",
          merch_num: ""
        },
        {
          id: "",
          pid: "",
          uniacid: "3",
          type: "1",
          displayorder: "6",
          province: "广东省",
          city: "深圳市",
          area: "罗湖区",
          name: "",
          addr: "",
          business_time: "09:00-22:00",
          tel: "027-00000000",
          latitude: "22.54554187880014",
          longitude: "114.11733552366445",
          images: "",
          description: null,
          deleted: "0",
          add_time: "1536212972",
          status: "1",
          recommend: "1",
          merchids: "",
          view: null,
          hot: "1",
          activity_num: "",
          merch_num: ""
        },
        {
          id: "",
          pid: "",
          uniacid: "3",
          type: "1",
          displayorder: "6",
          province: "广东省",
          city: "深圳市",
          area: "罗湖区",
          name: "",
          addr: "",
          business_time: "09:00-22:00",
          tel: "027-00000000",
          latitude: "22.54554187880014",
          longitude: "114.11733552366445",
          images: "",
          description: null,
          deleted: "0",
          add_time: "1536212972",
          status: "1",
          recommend: "1",
          merchids: "",
          view: null,
          hot: "1",
          activity_num: "",
          merch_num: ""
        }
      ],
      brandNewsList: [
        {
          id: "",
          uniacid: 3,
          title: "",
          description: "",
          enabled: 0,
          displayorder: 5,
          createtime: 1541648276,
          thumb: "",
          articleid: 4,
          brandid: 9,
          isindex: 1,
          view: 10,
          brandname: null,
          brandlogo: ""
        },
        {
          id: "",
          uniacid: 3,
          title: "",
          description: "",
          enabled: 0,
          displayorder: 5,
          createtime: 1541648276,
          thumb: "",
          articleid: 4,
          brandid: 9,
          isindex: 1,
          view: 10,
          brandname: null,
          brandlogo: ""
        }
      ],
      interestBrandList: [
        {
          id: "",
          brand: "",
          company: "10",
          companyids: null,
          createtime: "1541579870",
          status: "1",
          updatetime: null,
          creator: "",
          introduction: "",
          location: "",
          scope: "",
          price: "",
          anothername: "",
          images: "",
          categoryids: "",
          isfollow: 0
        },
        {
          id: "",
          brand: "",
          company: "10",
          companyids: null,
          createtime: "1541579870",
          status: "1",
          updatetime: null,
          creator: "",
          introduction: "",
          location: "",
          scope: "",
          price: "",
          anothername: "",
          images: "",
          categoryids: "",
          isfollow: 0
        },
        {
          id: "",
          brand: "",
          company: "10",
          companyids: null,
          createtime: "1541579870",
          status: "1",
          updatetime: null,
          creator: "",
          introduction: "",
          location: "",
          scope: "",
          price: "",
          anothername: "",
          images: "",
          categoryids: "",
          isfollow: 0
        },
        {
          id: "",
          brand: "",
          company: "10",
          companyids: null,
          createtime: "1541579870",
          status: "1",
          updatetime: null,
          creator: "",
          introduction: "",
          location: "",
          scope: "",
          price: "",
          anothername: "",
          images: "",
          categoryids: "",
          isfollow: 0
        },
        {
          id: "",
          brand: "",
          company: "10",
          companyids: null,
          createtime: "1541579870",
          status: "1",
          updatetime: null,
          creator: "",
          introduction: "",
          location: "",
          scope: "",
          price: "",
          anothername: "",
          images: "",
          categoryids: "",
          isfollow: 0
        }
      ],
      catelist: {
        list: [],
        selectedId: "",
        scroll: true,
        height: 76
      },
      clusterList: [],
      fjyh: {
        type: "",
        cateid: "",
        cluserid: "",
        clusername: "全城",
        distance: "",
        jiawei: "",
        hot: "",
        isfollow: ""
      },
      showPick1: false,
      nearlySale: [],
      shownearlySale: false,
      searchshow: false,
      value: 2,
      indicatorDots: false,
      swiperCurrent: 0,
      autoplay: true,
      interval: 8000,
      duration: 1000,
      showTop: false,
      showSelectCont: false,
      isClick: false,
      touchMove: false,
      cluster_id: "",
      city: "获取定位中",
      selelet_active1: null,
      selelet_active2: null,
      selelet_active3: null,
      selectStartHeight: 1285,
      weekPage: 1,
      brandNewsPage: 1,
      hotPage: 1,
      page: 1,
      prePage: 6,
      isWeekBottom: false,
      isBrandNewsBottom: false,
      isHotBottom: false,
      isBottom: false,
      iPhoneshow: false,
      iphoneheight: "",
      ballY: 300,
      ballX: 600
    };
  },
  components: {
    tab_bar,
    isLoading
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["getCarCount"]),
    isLoading() {
      return this.$store.state.user.isLoading;
    },
    screenHeight() {
      return this.$store.state.user.systemInfo.screenHeight;
    },
    screenWidth() {
      return this.$store.state.user.systemInfo.screenWidth;
    }
  },
  watch: {
    clusterInfo: {
      async handler(ne, old) {
        console.log(1111111111);
        this.selelet_active1 = null;
        this.selelet_active2 = null;
        this.selelet_active3 = null;
        this.value = 2;
        this.isBottom = false;
        this.page = 1;
        this.weekPage = 1;
        this.brandNewsPage = 1;
        this.hotPage = 1;
        this.isWeekBottom = false;
        this.isBrandNewsBottom = false;
        this.isHotBottom = false;
        this.showTop = false;
        this.fjyh = {
          type: "",
          cateid: "",
          cluserid: "",
          clusername: "全城",
          distance: "",
          jiawei: "",
          hot: "",
          isfollow: ""
        };

        if (this.clusterInfo) {
          this.selectcity = this.$store.state.user.clusterInfo.city;
        }
        let data;
        if (!this.$store.state.user.locationInfo) {
          data = await this.getPosition();
          this.isCurrent = "(附近)";
        } else {
          data = this.$store.state.user.locationInfo;
          if (this.$store.state.user.clusterInfo.isCurrent) {
            this.isCurrent = "(附近)";
          } else {
            this.isCurrent = "(当前)";
          }
        }
        this.initData(data); //获取定位
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    ...mapActions(["getUserInfo", "getAllProducts"]),
    async hasauth() {
      if (this.$store.state.user.handleLoginOut == true) {
        return;
      }

      if (this.$store.state.user.loginStatus == "wap") {
        this.getAllProducts();
        return;
      }
      const res = await getSetting();
      if (!res.authSetting["scope.userInfo"]) return;

      console.log("用户已经授权过");

      this.$store.commit("SET_LOGIN_STATUS", "wx");

      // await this.getAuthInfo();
    },
    async opensetting() {
      let data = await this.getPosition();
      this.initData(data);
    },
    async getPosition() {
      var that = this;
      // 选定商圈位置获取附近优惠
      const res = await getSetting();

      if (res.authSetting["scope.userLocation"]) {
        that.posPopShow = false;
        if (that.$store.state.user.locationInfo) {
          return that.$store.state.user.locationInfo;
        } else {
          let data = await getLocation();
          return data;
        }
      } else {
        let [err1, data] = await this._to(getLocation());

        //进入时自动弹出位置授权，如果未允许授权：弹出提示请允许授权，如果允许授权：请求数据
        if (err1) {
          this.posPopShow = true;
          return false;
        } else {
          this.posPopShow = false;

          return data;
        }
      }
    },
    async initData(data) {
      this.getWeather(data);
      this.$store.commit("SET_LOCATION_INFO", data);
      // 根据定位获取返回的第一个商圈
      let BusinessList = {};
      let clusterInfoArr = ["", ""];
      if (this.clusterInfo) {
        clusterInfoArr = [
          this.$store.state.user.clusterInfo.province,
          this.$store.state.user.clusterInfo.city
        ];
        this.city = this.$store.state.user.clusterInfo.isCurrent
          ? `${this.$store.state.user.clusterInfo.area}`
          : `${this.$store.state.user.clusterInfo.name}`;
      } else {
        if (!this.$store.state.user.BusinessList) {
          BusinessList = await this.$http.getBusinessPosition(
            data.latitude,
            data.longitude
          );

          if (BusinessList.status == -1) {
            this.$tips.alert(" 经纬度解析错误，请联系管理员.");
          }
          //如果此地点没有商圈   提示此位置没有相应的商圈
          if (BusinessList.result.length > 0) {
            if (!this.$store.state.user.clusterInfo) {
              this.$store.commit("SET_CLUSTER_INFO", BusinessList.result[0]);
            }

            clusterInfoArr = [
              this.$store.state.user.clusterInfo.province,
              this.$store.state.user.clusterInfo.city
            ];
            this.city = `${this.$store.state.user.clusterInfo.area}`;
          } else {
            this.$tips.alert("当前位置没有相应的商圈，请切换商圈哦", () => {
              this.$router.push({ path: "/pages/home/GoCity" });
            });

            this.city = "切换商圈";
          }
          this.$store.commit("SET_BUSINESS_LIST", BusinessList);
        } else {
          BusinessList = this.$store.state.user.BusinessList;

          clusterInfoArr = [
            this.$store.state.user.clusterInfo.province,
            this.$store.state.user.clusterInfo.city
          ];
          this.city = `${this.$store.state.user.clusterInfo.area}`;
        }
      }
      if (this.$store.state.user.clusterInfo) {
        this.selectcity = this.$store.state.user.clusterInfo.city;
      } else {
        this.selectcity = BusinessList.result[0].city;
      }
      if (!this.$store.state.user.ids) {
        let ids = "";
        BusinessList.result.map(e => {
          ids += e.id + ",";
        });
        this.$store.commit("SET_IDS", ids.slice(0, ids.length - 1));
      }

      this.$store.commit("SET_IS_LOADING", false);
      this.$store.commit("SET_IS_LOADING", true);

      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";

      const [
        everyRecommendList,
        getWeekList,
        hotClusterList,
        brandNewsList,
        interestBrandList,
        nearlySale,
        marketCityList
      ] = await this._U
        .PromiseAll(
          this.$http.getEveryRecommend(),
          this.$http.getWeekList(
            ...clusterInfoArr,
            this.weekPage,
            this.prePage
          ),
          this.$http.getReclusterList(
            this.$store.state.user.clusterInfo
              ? this.$store.state.user.clusterInfo.city
              : "",
            this.hotPage,
            this.prePage
          ),
          this.$http.getBrandNewsList(this.brandNewsPage, this.prePage),
          this.$http.getInterestBrandList(
            this.$store.state.user.clusterInfo
              ? this.$store.state.user.clusterInfo.city
              : "",
            openid
          ),
          this.$http.getNearlySale(
            openid,
            this.$store.state.user.ids,
            this.$store.state.user.clusterInfo.id,
            data.latitude,
            data.longitude,
            this.fjyh.type,
            this.fjyh.hot,
            this.fjyh.cluserid,
            this.fjyh.jiawei,
            this.fjyh.cateid,
            this.fjyh.distance,
            this.fjyh.isfollow,
            this.page,
            this.prePage
          ),
          this.$http.marketCityList(
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            1,
            20,
            this.$store.state.user.clusterInfo
              ? this.$store.state.user.clusterInfo.city
              : ""
          )
        )
        .catch(function(e) {
          console.log(e);
        });

      this.$store.commit("SET_IS_LOADING", false);

      if (
        everyRecommendList.list instanceof Array &&
        everyRecommendList.list.length > 0
      ) {
        this.everyRecommendList = everyRecommendList.list;
      }

      if (
        getWeekList.result.data instanceof Array &&
        getWeekList.result.data.length > 0
      ) {
        this.weeklist = getWeekList.result.data;
      }

      if (
        hotClusterList.result.data instanceof Array &&
        hotClusterList.result.data.length > 0
      ) {
        this.hotClusterList = hotClusterList.result.data;
      }

      if (
        brandNewsList.result.data instanceof Array &&
        brandNewsList.result.data.length > 0
      ) {
        this.brandNewsList = brandNewsList.result.data;
      }

      if (
        interestBrandList.result instanceof Array &&
        interestBrandList.result.length > 0
      ) {
        this.interestBrandList = interestBrandList.result;
      }

      this.shownearlySale = false;
      if (
        nearlySale.result.data instanceof Array &&
        nearlySale.result.data.length > 0
      ) {
        this.shownearlySale = true; //初始化时有数据   防止筛选后没有数据  附近优惠栏目消失的情况
      }
      if (
        nearlySale.result.data instanceof Array &&
        nearlySale.result.data.length > 0 &&
        nearlySale.result.data.length < this.prePage
      ) {
        this.isBottom = true; //初始化时有数据   防止筛选后没有数据  附近优惠栏目消失的情况
      }
      this.nearlySale = nearlySale.result.data || this.nearlySale;

      this.weekPage = this.weekPage + 1;
      this.brandNewsPage = this.brandNewsPage + 1;
      this.hotPage = this.hotPage + 1;
      let that = this;
      if (this.nearlySale.length > 0) {
        setTimeout(() => {
          var query = wx.createSelectorQuery();
          query
            .select("#topHeight")
            .boundingClientRect(res => {
              that.selectStartHeight = res.height + 40;
            })
            .exec();
        }, 2000);
      }

      this.clusterList = marketCityList.result.data;
    },
    async weeklistData() {
      if (this.isWeekBottom) return;
      let clusterInfoArr = ["", ""];

      if (this.$store.state.user.clusterInfo) {
        clusterInfoArr = [
          this.$store.state.user.clusterInfo.province,
          this.$store.state.user.clusterInfo.city
        ];
      }
      const [err, getWeekList] = await this._to(
        this.$http.getWeekList(...clusterInfoArr, this.weekPage, this.prePage)
      );
      if (getWeekList.status == 1) {
        if (
          getWeekList.result.data instanceof Array &&
          getWeekList.result.data.length >= 0 &&
          getWeekList.result.data.length < this.prePage
        ) {
          this.isWeekBottom = true;
        }
        this.getWeekList = [...this.getWeekList, ...getWeekList.result.data];
        this.weekPage++;
      } else {
        console.log("加载失败");
      }

      this.$store.commit("SET_IS_LOADING", false);
    },
    async brandNewsData() {
      if (this.isBrandNewsBottom) return;
      const [err, brandNewsList] = await this._to(
        this.$http.getBrandNewsList(this.brandNewsPage, this.prePage)
      );
      if (brandNewsList.status == 1) {
        if (
          brandNewsList.result.data instanceof Array &&
          brandNewsList.result.data.length >= 0 &&
          brandNewsList.result.data.length < this.prePage
        ) {
          this.isBrandNewsBottom = true;
        }
        this.brandNewsList = [
          ...this.brandNewsList,
          ...brandNewsList.result.data
        ];
        this.brandNewsPage++;
      } else {
        console.log("加载失败");
      }

      this.$store.commit("SET_IS_LOADING", false);
    },
    async hotData() {
      if (this.isHotBottom) return;
      const [err, hotClusterList] = await this._to(
        this.$http.getReclusterList(
          this.$store.state.user.clusterInfo
            ? this.$store.state.user.clusterInfo.city
            : "",
          this.hotPage,
          this.prePage
        )
      );
      if (hotClusterList.status == 1) {
        if (
          hotClusterList.result.data instanceof Array &&
          hotClusterList.result.data.length >= 0 &&
          hotClusterList.result.data.length < this.prePage
        ) {
          this.isHotBottom = true;
        }
        this.hotClusterList = [
          ...this.hotClusterList,
          ...hotClusterList.result.data
        ];
        this.hotPage++;
      } else {
        console.log("加载失败");
      }

      this.$store.commit("SET_IS_LOADING", false);
    },
    async initShopCate() {
      const [err, res] = await this._to(this.$http.getShopCategory());
      let arr = [
        {
          id: "-1",
          title: "全部"
        }
      ];
      res.result.map(val => {
        arr.push({
          id: val.id,
          title: val.catename
        });
      });
      this.catelist.list = arr;
      this.catelist.selectedId = arr[0].id;
    },
    async randomBrand() {
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      let res = await this.$http.getInterestBrandList(
        this.$store.state.user.clusterInfo
          ? this.$store.state.user.clusterInfo.city
          : "",
        openid
      );

      if (res.status == 1) {
        if (res.result instanceof Array && res.result.length > 0) {
          this.interestBrandList = res.result;
        }
        return;
      } else {
        this.$tips.alert("请求失败");
        return;
      }
    },
    async interestBrandListFocus(isfollow, id) {
      // 点击关注可能感兴趣的品牌
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      let res = await this.$http.followInterestBrand(
        openid,
        isfollow == "1" ? 0 : 1,
        id
      );

      if (res.status == 0 && res.result.message == "用户OPENID不能为空！") {
        this.$tips.alert("请登录");
        return;
      } else if (res.status == 1) {
        this.interestBrandList.map(val => {
          if (val.id == id) {
            val.isfollow = isfollow == "1" ? 0 : 1;
          }
        });
      } else {
        this.$tips.alert("关注失败");
        return;
      }
    },
    async catetabChange(e) {
      this.fjyh.cateid = e.mp.detail;
      this.catelist.selectedId = e.mp.detail;
      await this.handleGetfindList();
    },
    async pick1() {
      this.showPick1 = !this.showPick1;
      this.isClick = !this.isClick;
      if (this.isClick) {
        if (parseFloat(getStorage("scrollY")) < this.selectStartHeight) {
          this.showTop = false;
          wx.pageScrollTo({
            scrollTop: this.selectStartHeight + 5,
            duration: 0
          });
          //不要设置duration>0
        } else {
          this.showTop = true;
          this.showSelectCont = this.isClick;
          this.showPick1 = this.isClick;
        }
      } else {
        if (parseFloat(getStorage("scrollY")) < this.selectStartHeight) {
          this.showTop = false;
          this.showSelectCont = this.isClick;
          this.showPick1 = this.isClick;
        } else {
          this.showTop = true;
          this.showSelectCont = this.isClick;
          this.showPick1 = this.isClick;
        }
      }
      wx.pageScrollTo({
        scrollTop: this.selectStartHeight + 5,
        duration: 0
      });
    },
    async pick1Item(cluser_id, cluser_name, index) {
      this.$store.commit("SET_IS_LOADING", true);
      this.showPick1 = false;
      this.fjyh.cluserid = cluser_id;
      this.fjyh.clusername = cluser_name;

      await this.handleGetfindList();
    },
    async pick2() {
      this.showPick1 = false;
      if (this.fjyh.distance == "") {
        this.fjyh.distance = 1;
      } else if (this.fjyh.distance == "1") {
        this.fjyh.distance = "";
      }
      await this.handleGetfindList();
    },
    async pick3() {
      this.$store.commit("SET_IS_LOADING", true);
      this.showPick1 = false;
      if (this.fjyh.hot == "") {
        this.fjyh.hot = "up";
      } else if (this.fjyh.hot == "up") {
        this.fjyh.hot = "down";
      } else if (this.fjyh.hot == "down") {
        this.fjyh.hot = "up";
      }

      await this.handleGetfindList();
    },
    async pick4() {
      this.$store.commit("SET_IS_LOADING", true);
      this.showPick1 = false;

      if (this.fjyh.isfollow == "") {
        this.fjyh.isfollow = 1;
      } else if (this.fjyh.isfollow == "1") {
        this.fjyh.isfollow = "";
      }

      await this.handleGetfindList();
    },
    // 点击查看商家
    async handleGetfindList() {
      this.page = 1;
      this.isBottom = false;
      this.isClick = false;
      this.showSelectCont = false;
      this.showPick1 = false;
      this.fjyh.type = "";
      wx.pageScrollTo({
        scrollTop: this.selectStartHeight + 5,
        duration: 0
      });
      await this.findlist(true);
    },
    //		 获取筛选商品列表
    async findlist(isSelect) {
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      let shopDistrictlist = await this._to(
        this.$http.getNearlySale(
          openid,
          this.$store.state.user.ids,
          this.$store.state.user.clusterInfo.id,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.fjyh.type,
          this.fjyh.hot,
          this.fjyh.cluserid,
          this.fjyh.jiawei,
          this.fjyh.cateid,
          this.fjyh.distance,
          this.fjyh.isfollow,
          this.page,
          this.prePage
        )
      );
      if (
        !shopDistrictlist[1].result.data instanceof Array ||
        shopDistrictlist[1].result.data.length < this.prePage
      ) {
        this.isBottom = true;
      }
      if (isSelect) {
        this.nearlySale = shopDistrictlist[1].result.data;
      } else {
        this.nearlySale = [
          ...this.nearlySale,
          ...shopDistrictlist[1].result.data
        ];
      }
    },
    swiperChange(e) {
      this.swiperCurrent = e.mp.detail.current;
    },
    hotSwiperChange(e) {
      this.hotSwiperCurrent = e.mp.detail.current;
      if (this.hotSwiperCurrent == (this.hotPage - 1) * this.prePage - 3) {
        this.hotData();
      }
    },
    async getAuthInfo() {
      if (!this.$store.state.user.userInfo) {
        await this.getUserInfo();
        this.getAllProducts();
      }
      const userInfo = this.$store.state.user.userInfo;

      const [err, res] = await this._to(getUserInfo());
      if (err) return console.error(err);
      const { encryptedData, iv } = res;

      const [err1, authInfo] = await this._to(
        this.$http.doAuth(
          userInfo.openid,
          encryptedData,
          iv,
          userInfo.session_key,
          userInfo.authkey
        )
      );

      if (err1) return console.error(err1);
      authInfo.openId = "sns_wa_" + authInfo.openId;
      authInfo["openid"] = authInfo.openId;

      this.$store.commit("SET_USER_INFO", authInfo);
      this.$store.commit("SET_DO_AUTH", true);
      this.user_Info = authInfo;
    },
    scan() {
      getScanCode(false).then(data => {
        this.$tips.alert(data.charSet);
      });
    },
    //跳转四个页面
    herfrecommend(type, linkid, id) {
      if (type == 1) {
        this.$router.push({
          path: "/pagesSub/goodsDetail/index",
          query: {
            id: linkid
          }
        });
      } else if (type == 2) {
        this.$router.push({
          path: "/pagesSub/busineshop/shop",
          query: {
            id: linkid
          }
        });
      } else if (type == 3) {
        this.$router.push({
          path: "/pagesSub/recommend/recommendone",
          query: {
            id
          }
        });
      }
    },
    herfNewsFlash(typeId) {
      this.$router.push({
        path: "/pagesSub/recommend/recommendone",
        query: {
          id: typeId,
          type: "newFlash"
        }
      });
    },
    goWeekTo(type, linkid, title) {
      if (type == 1) {
        this.$router.push({
          path: "/pagesSub/busineshop/shoplist",
          query: {
            id: linkid,
            title
          }
        });
      } else if (type == 2) {
        this.$router.push({
          path: "/pagesSub/busineshop/shop",
          query: {
            id: linkid
          }
        });
      } else if (type == 3) {
        this.$router.push({
          path: "/pagesSub/recommend/recommendone",
          query: {
            id: linkid,
            type: "week"
          }
        });
      }
    },
    async onRefresh() {
      this.selelet_active1 = null;
      this.selelet_active2 = null;
      this.selelet_active3 = null;
      this.value = 2;
      this.isBottom = false;
      this.page = 1;
      this.weekPage = 1;
      this.brandNewsPage = 1;
      this.hotPage = 1;
      this.isWeekBottom = false;
      this.isBrandNewsBottom = false;
      this.isHotBottom = false;
      this.showTop = false;
      this.fjyh = {
        type: "",
        cateid: "",
        cluserid: "",
        distance: "",
        jiawei: "",
        hot: "",
        isfollow: ""
      };
      if (!this.isClick) {
        let data;
        if (!this.$store.state.user.locationInfo) {
          data = await this.getPosition();
        } else {
          data = this.$store.state.user.locationInfo;
        }

        await this.initData(data); //获取定位
        this.isClick = false;
      }
      this._U.stopRefresh();
    },
    async togglePopup() {
      //  	获取筛选的满减showSelectCont
      this.isClick = !this.isClick;
      if (this.isClick) {
        if (parseFloat(getStorage("scrollY")) < this.selectStartHeight) {
          this.showTop = false;
          wx.pageScrollTo({
            scrollTop: this.selectStartHeight,
            duration: 0
          });
          //不要设置duration>0
        } else {
          this.showTop = true;
          this.showSelectCont = this.isClick;
          this.showPick1 = this.isClick;
        }
      } else {
        if (parseFloat(getStorage("scrollY")) < this.selectStartHeight) {
          this.showTop = false;
          this.showSelectCont = this.isClick;
          this.showPick1 = this.isClick;
        } else {
          this.showTop = true;
          this.showSelectCont = this.isClick;
          this.showPick1 = this.isClick;
        }
      }
    },
    handletouchmove(e) {
      this.touchMove = true;
    },
    formSubmit_collect({ mp }) {
      let formId = mp.detail.formId;
      if (formId == "" || formId == "undefined") {
        return;
      }
      let data = {
        formid: formId,
        timestamp: parseInt(new Date().getTime() / 1000) //计算7天后的过期时间时间戳
      };
      let formIds = this.$store.state.user.formIds.slice(0);
      formIds.push(data);

      this.$store.commit("SET_FORM_IDS", formIds);
    },
    magicBallChange({ mp }) {},
    magicBallEnd({ mp }) {
      this.ballX = this.screenWidth;
      this.ballY =
        mp.changedTouches[0].pageY - parseFloat(getStorage("scrollY")) - 41;

      if (
        mp.changedTouches[0].pageY - parseFloat(getStorage("scrollY")) >
        400
      ) {
        this.ballY = 400;
      }
      if (mp.changedTouches[0].pageY - parseFloat(getStorage("scrollY")) < 80) {
        this.ballY = 80;
      }
    },
    magicBallTap() {
      this.$router.push({ path: "/pagesSub/busineshop/wearStrategy" });
    },
    getWeather(data) {
      let date = new Date();
      let weatherData = data.originalData.results[0].weather_data[0];
      this.weatherDesc = weatherData.weather;
      //    console.log(data.originalData,6666)
      if (6 < date.getHours() && date.getHours() < 18) {
        if (weatherData.weather.indexOf("雷") > -1) {
          this.dayPictureUrl = "/static/images/hail.png";
        } else if (weatherData.weather.indexOf("大雨") > -1) {
          this.dayPictureUrl = "/static/images/bigRain.png";
        } else if (weatherData.weather.indexOf("中雨") > -1) {
          this.dayPictureUrl = "/static/images/midRain.png";
        } else if (weatherData.weather.indexOf("阵雨") > -1) {
          this.dayPictureUrl = "/static/images/shower.png";
        } else if (weatherData.weather.indexOf("雨") > -1) {
          this.dayPictureUrl = "/static/images/rain.png";
        } else if (weatherData.weather.indexOf("大雪") > -1) {
          this.dayPictureUrl = "/static/images/bigSnow.png";
        } else if (weatherData.weather.indexOf("中雪") > -1) {
          this.dayPictureUrl = "/static/images/midSnow.png";
        } else if (weatherData.weather.indexOf("小雪") > -1) {
          this.dayPictureUrl = "/static/images/snow.png";
        } else if (weatherData.weather.indexOf("云") > -1) {
          this.dayPictureUrl = "/static/images/clond.png";
        } else if (weatherData.weather.indexOf("阴") > -1) {
          this.dayPictureUrl = "/static/images/cloudy.png";
        } else if (weatherData.weather.indexOf("雾") > -1) {
          this.dayPictureUrl = "/static/images/fog.png";
        } else if (weatherData.weather.indexOf("晴") > -1) {
          this.dayPictureUrl = "/static/images/sun.png";
        } else {
          this.localIcon = false;
          if (6 < date.getHours() && date.getHours() < 18) {
            this.dayPictureUrl = weatherData.dayPictureUrl;
          } else {
            this.dayPictureUrl = weatherData.nightPictureUrl;
          }
        }
      } else {
        if (weatherData.weather.indexOf("雨") > -1) {
          this.dayPictureUrl = "/static/images/nightRain.png";
        } else if (weatherData.weather.indexOf("雪") > -1) {
          this.dayPictureUrl = "/static/images/nightSnow.png";
        } else if (weatherData.weather.indexOf("云") > -1) {
          this.dayPictureUrl = "/static/images/nightCloud.png";
        } else if (weatherData.weather.indexOf("阴") > -1) {
          this.dayPictureUrl = "/static/images/nightCloud.png";
        } else if (weatherData.weather.indexOf("晴") > -1) {
          this.dayPictureUrl = "/static/images/nightSun.png";
        } else {
          this.localIcon = false;
          this.dayPictureUrl = weatherData.nightPictureUrl;
        }
      }
      this.temperature = weatherData.date.split("：")[1].split(")")[0];
    }
  },
  onPageScroll: function(e) {
    this.fjyh.clusername = "全城";
    setStorage("scrollY", e.scrollTop);
    if (e.scrollTop >= this.selectStartHeight) {
      this.showTop = true;
      if (this.isClick) {
        this.showPick1 = true;
        this.isClick = true;
        this.showSelectCont = true;
      }
    }
    if (e.scrollTop < this.selectStartHeight) {
      this.showTop = false;
      if (this.isClick) {
        this.showPick1 = false;
        this.isClick = false;
        this.showSelectCont = false;
      }
    }
  },
  async mounted() {
    wx.hideTabBar();
    // await this.hasauth();
    this.isBottom = false;

    let data;
    if (!this.$store.state.user.locationInfo) {
      data = await this.getPosition();
      this.isCurrent = "(附近)";
    } else {
      data = this.$store.state.user.locationInfo;
      this.isCurrent = "(当前)";
    }

    this.initData(data); //获取定位
    this.initShopCate();

    let communityCate = await this.$http.communityCate(
      this.$store.state.user.userInfo.openId
    );
    this.$store.commit("SET_COMMUNITY_CATE_LIST", communityCate);
  },

  async onPullDownRefresh() {},
  async onReachBottom() {
    // 如果是筛选后的结果
    this.page = this.page + 1;

    if (this.isBottom) return;
    await this.findlist();

    this.$store.commit("SET_IS_LOADING", false);
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街...",
      path: "/pages/home/home"
    };
  },
  async onShow() {
    setStorage("scrollY", 0);
    if (
      this.$store.state.user.clusterInfo &&
      (this.$store.state.user.clusterInfo.handleChange ||
        this.$store.state.user.clusterInfo.isCurrent)
    ) {
      this.clusterInfo = this.$store.state.user.clusterInfo;
      // this.selectcity = this.$store.state.user.clusterInfo.city;
    }
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
}
.border {
  border-bottom: 0px !important;
}
.cateclass {
  font-size: 15px;
}
</style>
<style scoped lang='scss'>
.startHeight {
  height: 1250px;
  width: 100%;
}
.magicBall {
  height: 81px;
  width: 71px;
  position: fixed;
  background-image: url("#{$imgUrl}magicball.png");

  z-index: 1000;
  .magicBallIn {
    height: 18px;
    width: 18px;
    position: absolute;
    top: 22px;
    right: 5px;
    background-image: url("#{$imgUrl}magicballIn.png");
  }
  .magicBallInJump {
    animation: jump ease-in-out 1s infinite alternate;
  }

  @keyframes jump {
    0% {
      transform: translateY(0px);
    }
    20% {
      transform: translateY(-1px);
    }
    40% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(-3px);
    }
    // 40%{transform:translateY(-4px)}
    // 50%{transform:translateY(-5px)}
    60% {
      transform: translateY(-2px);
    }
    80% {
      transform: translateY(-1px);
    }

    100% {
      transform: translateY(0px);
    }
  }
}

.nearlysearch {
  width: 100%;
  // max-height: calc(100vh - 50px);
  overflow-y: scroll;
  background: #ffffff;
}

.myToast {
  border: 0;
  z-index: 10;
  position: absolute;
  width: 100%;
  padding: 0 15px;
  background-color: #fff;
  text-align: center;
  top: 23px;
  margin-top: 0px;
  // border: 0;
  // position: relative;
  // width: 100%;
  // background-color: #fff;
  // text-align: center;

  // margin-top: 11.5px;
  .popcontent {
    max-height: 400px;
    overflow-y: scroll;
  }

  h3 {
    text-align: left;
    font-size: 14px;
    line-height: 40px;
    color: #9a9a9a;
    margin: 0 15px;
  }

  .t_main {
    overflow: hidden;

    li {
      float: left;
      height: 36px;
      line-height: 36px;
      min-width: 10px;
      padding: 0 10px;
      border-radius: 3px;
      background: #f2f2f2;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 15px;
      color: #b7b7b7;
      font-size: 14px;
    }

    .li_active {
      background: #ffe5e8;
      color: #ff455d;
    }
  }

  .f_main {
    text-align: left;
    overflow: hidden;
    position: relative;

    p {
      color: #9a9a9a;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 14px;
    }

    .van-slider {
      height: 10px !important;
    }

    .k_price {
      position: absolute;
      top: 86rpx;
      left: 28rpx;
      color: #9a9a9a;
      font-size: 14px;
      /*background: url("#{$imgUrl}btn_sliding.png") no-repeat center center;*/
    }
  }

  .f_button {
    width: 100%;
    margin-top: 30px;

    button {
      border: 0;
      background: #fff;
      float: left;
      width: 50%;
      font-size: 16px;
      color: #fff;
      margin: 0 auto;
      border-radius: 0;
    }

    .button-01 {
      background: #ff7e8f;
    }

    .button-02 {
      background: #ff455d;
    }
  }
}

.selectPop {
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}

.cuspos {
  position: fixed !important;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;
  min-height: 48px;
}
.nearlyHeaderHeight {
  height: 73px;
  box-shadow: 0px 1px 1px 0px rgba(23, 34, 49, 0.1);
}
.nearlyHeader {
  height: 73px;
  position: relative;
  background: #fff;
  box-shadow: 0px 1px 1px 0px rgba(23, 34, 49, 0.1);
  .result_page {
    height: 36px;
    // justify-content:space-around;
    // padding:0 15px;
    padding-left: 22px;

    li.lineRight {
      &::after {
        content: "";
        height: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
      }
    }
    li {
      padding-right: 20px;
      margin-right: 20px;
      text-align: left;
      line-height: 36px;
      font-size: 14px;
      color: #5e5e5e;
      // overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:first-of-type {
        overflow: hidden;
        max-width: 30%;
      }
      .ri_poins {
        display: inline-block;
        position: relative;
        top: 4px;
        width: 18px;
        height: 18px;
        left: -4px;
        background: url("#{$imgUrl}icon_arrow_down.png") no-repeat 100% 100%;
        background-size: cover;

        .poin_bottom_1 {
          margin-top: 3px;
          display: block;
          width: 0;
          height: 0;
          border: 5.5px solid #e8e8e8;
          border-color: #e8e8e8 transparent transparent transparent;
        }
      }

      .poin_top_show {
        transform: rotate(180deg);
      }

      .poin_top_show_2 {
        transform: rotate(180deg);
      }
    }
    li:last-child {
      margin-right: 0;
    }
    li.colorf45d {
      color: #ff455d;
    }
    .carIcon {
      position: relative;
      display: inline-block;
      width: 12px;
      height: 14px;
      margin-bottom: 3.5px;
      background: url("#{$imgUrl}icon_pep.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
  }

  .nearlyTitle {
    height: 20px;
    border-left: 3px solid #ff455d;
    padding-left: 7px;
    line-height: 20px;
  }

  .sortBy {
    position: absolute;
    right: 15px;
    top: 15px;
    line-height: 20px;

    .icon {
      width: 15px;
      height: 17px;
      background: url(#{$imgUrl}icon_screen.png) no-repeat center/cover;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

#topHeight {
  width: 100%;
}
.container {
  // padding-bottom: 94px;
  padding-bottom: 50px;
  width: 100%;
  position: relative;

  .homeHeader {
    height: 45px;
    padding: 12px 0;
    position: relative;
    background: #ff455d;
    .poin_address {
      display: inline-block;
      display: flex;
      align-items: center;
      height: 100%;
      position: relative;
      .w70 {
        width: 70px;
        position: relative;
      }
    }
    .searchBox {
      width: 150px;
      display: flex;
      height: 20px;
      justify-content: center;
      align-items: center;
      background: rgba(50, 50, 50, 0.2);
      border-radius: 20px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      .icon {
        width: 13px;
        height: 13px;
        display: inline-block;
        background: url("#{$imgUrl}icon_search@2x.png") no-repeat center center;
        background-size: contain;
      }
    }

    .city {
      line-height: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
    }

    .fontArrow {
      width: 10px;
      height: 14px;
      display: inline-block;
      // align-self: flex-end;
      background: url("#{$imgUrl}arrowFont.png") no-repeat center center;
      background-size: contain;
    }

    .adressIcon {
      width: 12px;
      height: 16px;
      display: inline-block;
      background: url("#{$imgUrl}icon_location.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
      .w70 {
        position: relative;
      }
    }

    .carIcon {
      position: absolute;
      right: 15px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 21px;
      height: 22px;
      background: url("#{$imgUrl}icon_shopping.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;

      .carIconIn {
        position: absolute;
        display: inline-block;
        width: 21px;
        height: 22px;

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

    .warther {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      position: absolute;
      right: 15px;
      top: 0px;
      height: 24px;
      bottom: 0;
      margin: auto;

      .weatherTemper {
        margin-right: 4px;
        line-height: 24px;
      }

      .dayPic {
        width: 33.5px;
        height: 24px;
      }

      .localIcon {
        width: 24px;
        height: 24px;
      }
    }
  }

  .searchBoxWraper {
    width: 100%;
    padding: 0 15px 5px 15px;
    background: #ff455d;
    .searchBox {
      position: relative;

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
        border: 0 solid #ff455d;
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
      width: 100%;
      border-radius: 15px;
      padding-left: 20px;
      padding-right: 20px;

      .searchIcon {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url("#{$imgUrl}icon_search@2x.png") no-repeat center center;
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

      .scan_ico {
        position: relative;
        width: 18px;
        height: 18px;
        background-image: url("#{$imgUrl}icon_sweep.@2x.png");
      }
    }
  }

  .sectionItem {
    padding: 15px 15px 5px 15px;

    .sectionTitle {
      height: 20px;
      // border-left: 3px solid #ff455d;
      // padding-left: 7px;
      line-height: 20px;
      position: relative;

      .num_r {
        width: 50px;
        font-weight: bold;
      }
    }

    .more {
      padding-right: 12px;
      position: relative;

      &::before {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-left-color: #9a9a9a;
      }
    }

    .more1 {
      &::before {
        content: "";
        border-left-color: #323232;
      }
    }

    .sectionSubtitle {
      height: 24px;
    }
  }

  .recommendContainer {
    width: 100%;

    .swiperContainer {
      padding: 0 15px;
      position: relative;

      .dots {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        top: 140px;
        display: flex;
        justify-content: center;
        .dot {
          margin: 0 3px;
          width: 13px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0px 1px 1px 0px rgba(23, 34, 49, 0.1);
          &.active {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 1px 0px rgba(23, 34, 49, 0.1);
          }
        }
      }
    }

    .swiperContainer swiper {
      height: 210px;
    }
    .banner {
      display: block;
      width: 345px;
      height: 150px;
      overflow: hidden;
    }

    .recommendContent {
      height: 65px;

      .contentTitle {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .mt8 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .week {
    width: 100%;

    .weekContent {
      overflow: hidden;
      scroll-view {
        white-space: nowrap;
        font-size: 0;
        line-height: 0;
      }

      .item:first-child {
        margin-left: 15px;
      }

      .item {
        display: inline-block;
        margin-right: 5px;
        width: 170px;
        overflow: hidden;
        line-height: 1;
        position: relative;

        .bg {
          width: 100%;
          height: 100px;
          border-radius: 5px;
          overflow: hidden;
        }

        .more {
          position: absolute;
          top: 85px;
          width: 80px;
          height: 22px;
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 22px;
          margin: 0 auto;
          right: 0;
          left: 0;
        }
      }
    }
    .hotContent {
      height: 133px;
      scroll-view {
        height: 143px;
      }
    }
    .brandNewsContent {
      height: 150px;
      scroll-view {
        height: 160px;
      }
      .item {
        width: 250px;
        position: relative;
      }

      .bg {
        width: 100%;
        height: 120px !important;
        border-radius: 5px;
        position: relative;
        box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.2);
        .r {
          position: absolute;
          z-index: 1;
          right: 10px;
          bottom: 7px;
          justify-content: flex-end;
          .ico {
            width: 14px;
            height: 12px;
            background-image: url("#{$imgUrl}icon_find.png");
            margin-right: 8px;
          }
        }
      }
    }
  }

  .hotCluster {
    padding: 0 15px 10px;

    .info_list1 {
      width: 100%;
      overflow: hidden;
      padding-bottom: 0;
      position: relative;

      .bgc_img {
        width: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 5px 5px 0px 0px;
        height: 130px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .scroll-view_H {
      margin-top: 10px;
      white-space: nowrap;
      font-size: 0;
      line-height: 0;
    }

    .hotswiper {
      height: 90px;
      margin-top: 10px;
    }

    .info_list {
      display: inline-block;
      vertical-align: middle;
      top: 0;
      bottom: 0;
      margin: auto;
      overflow: hidden;
      padding-bottom: 0;
      position: relative;
      .bgc_img {
        transition: all 0.3s ease;
        width: 105px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        top: 5px;
        border-radius: 5px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
        }

        .title_name {
          background: rgba(0, 0, 0, 0.2);
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          text-align: center;
          box-sizing: border-box;
          text-align: center;
          color: #fff;
          line-height: 1;

          h4 {
            color: #fff;
          }

          p {
            color: #fff;
            margin-top: 4px;
          }
        }
      }
    }

    .active + .info_list {
      .bgc_img {
        top: 0px;
        width: 115px;
        height: 90px;

        .title_name .f10 {
          font-size: 11px;
        }
        .title_name .f8 {
          font-size: 10px;
        }
      }
    }
  }

  .interestBrand {
    background: #fff3de;
    .picHeader {
      overflow: hidden;
    }
  }

  .toSale {
    position: relative;
    width: 100%;

    .saleContent {
      padding: 0 15px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .item:last-child {
        margin-right: 0px;
      }

      .item {
        padding: 15px 0 10px;
        width: 65px;
        margin-bottom: 15px;
        margin-right: 5px;
        border-radius: 3px;
        overflow: hidden;
        position: relative;
        background: #ffffff;
        box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.1);
        .picHeader {
          .bg {
            width: 42px;
            height: 42px;
            margin: 0 auto;
            overflow: hidden;
            display: block;
            position: relative;
          }

          .sale {
            margin: 10px auto 0px;
            width: 44px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            position: relative;

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
              border: 0 solid #ff455d;
              border-width: 2rpx;
              border-radius: 20px;
            }
          }
        }

        .goodsDetail {
          .goodsName {
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
          }
        }
      }
    }
  }

  .ChinaGoods {
    padding: 0 15px;
    width: 100%;

    .goodsHeader {
      height: 71px;
      padding-top: 16px;

      .goodsTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
    }

    .goodsContent {
      height: 228px;

      .goods {
        width: 345px;
        height: 170px;
        display: block;
        border-radius: 3px;
      }
    }

    .oldBrand {
      height: 127px;
      padding: 17px 15px 0 104px;
      position: relative;

      .left {
        position: absolute;
        left: 0;
        width: 91px;
        height: 91px;
        border-radius: 5px;
        overflow: hidden;

        img {
          display: block;
          width: 91px;
          height: 91px;
          border-radius: 5px;
        }
      }
    }
  }

  .nearly {
    width: 100%;
    padding: 0 5px;
    position: relative;
    background: #f2f2f2;
  }

  .custom {
    position: fixed;
    background: #fff;
    top: 0;
    z-index: 10000;
  }

  .custompoin {
    position: fixed;
    background: #fff;
    top: 0;
    z-index: 10000;
  }

  .nearlyHeader {
    height: 73px;
    position: relative;
    background: #fff;

    .nearlyTitle {
      height: 20px;
      border-left: 3px solid #ff455d;
      padding-left: 7px;
      line-height: 20px;
    }

    .sortBy {
      position: absolute;
      right: 15px;
      top: 15px;

      .icon {
        width: 15px;
        height: 17px;
        background: url(#{$imgUrl}icon_screen.png) no-repeat center/cover;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .fjyhgoodsContent {
    //不要修改此处的高度  避免附近优惠筛选的商家为0时，再次点击筛选，因为屏幕要滚到wx.pageScrollTo({scrollTop: 890})，fjyhgoodsContent高度太小，页面高度不够，筛选框无法出来的问题
    min-height: calc(100vh + 50px);
  }

  .goodsContent {
    overflow: hidden;
    .price {
      span {
        font-size: 10px;
        color: rgba(255, 119, 0, 1);
        padding: 0 5px;
        margin-left: 5px;
        line-height: 15px;
        background: rgba(255, 239, 225, 1);
        border-radius: 2px;
      }
    }
    .time {
      align-items: flex-end;
      .li {
        font-size: 10px;
        color: rgba(255, 69, 93, 1);
        padding: 0 5px;
        margin-top: 5px;
        line-height: 15px;
        background: rgba(255, 230, 233, 1);
        border-radius: 2px;
        margin-right: 5px;
      }
    }
    .item {
      background: #ffffff;
      position: relative;
      padding: 10px;
      display: flex;
      border-radius: 5px;
      margin-top: 5px;
      overflow: hidden;
      box-shadow: 0px 1px 2px 0px rgba(154, 154, 154, 0.2);
      .left {
        width: 75px;
        height: 75px;
        position: relative;
        // &::before {
        //   content: " ";
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   width: 200%;
        //   height: 200%;
        //   -webkit-transform: scale(0.5);
        //   transform: scale(0.5);
        //   -webkit-transform-origin: 0 0;
        //   transform-origin: 0 0;
        //   pointer-events: none;
        //   box-sizing: border-box;
        //   border: 0 solid #e8e8e8;
        //   border-width: 2rpx;
        //   border-radius: 3px;
        // }
      }

      img {
        width: 100%;
        height: 100%;
      }

      .right {
        margin-left: 15px;
        width: 0%;
        -webkit-flex: 1;
        flex: 1;
      }
    }
  }

  .pos_pop_wrap {
    background: rgba(255, 255, 255, 0);
    display: -webkit-flex;
    display: flex;
    flex-direction: column;

    .cont {
      background: #ffffff;
      flex: 1;
      display: flex;
      // align-items: center;
      justify-content: center;
    }

    .footH {
      height: 50px;
      width: 100%;
    }

    .pos_pop {
      margin: 1rem auto 0.2rem;
      text-align: center;
      width: 690rpx;

      img {
        width: 340rpx;
        height: 116rpx;
        display: block;
        margin: 0 auto;
      }

      div {
        text-align: center;
        margin-top: 78rpx;
        font-size: 28rpx;
      }

      button {
        margin: 60rpx auto 0;
      }
    }
  }
}
</style>
