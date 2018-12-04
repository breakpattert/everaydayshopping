<template>
	<div class="container">
		<!-- <isLoading :isLoading='isLoading'></isLoading> -->
		<div class="swiper">

			<scroll-view scroll-x="true" class="navbar" :scroll-left="scrollLeft">
				<block v-for="(item,index) in tabs" :key="index">
					<div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item lineTop" @click="tabClick">
						<div class="navbar_title">{{item.name}}</div>
					</div>
				</block>
			</scroll-view>

			<swiper class="content" :duration="duration" @change="swiperChange" :current="currentTab">
				<swiper-item>
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
						<div class="w100 orderAll" id="item1">
              <div class="w100" v-if="list&&list.length>0">
								<div class="item orderitem" v-for="(itm,key) in list" :key='key' @click="go(1, itm.id)">
									<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index'>
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<!-- 待付款 -->
										<div v-if="itm.status=='0'" class="mr15 flex flex_hc">
											<span class="cancel" @click.stop="go(2,itm.id,true)">取消订单</span>
											<span class="colorf45d confirm" @click.stop="go(3,itm.id)">去支付</span>
										</div>
										<!-- 代发货 -->
										<div v-if="itm.status=='1'" class="mr15 flex flex_hc">
                      
										</div>
										<!-- 待收货 -->
										<div v-if="itm.status=='2'" class="mr15 flex flex_hc">
											<span class="colorf45d confirm" @click.stop="go(4,itm.id)">查看物流</span>
										</div>
										<!-- 待评价 -->
										<div v-if="itm.status=='3'" class="mr15 flex flex_hc">
											<span class="cancel" @click.stop="go(5,itm.id)">再来一单</span>
											<span class="colorf45d confirm" @click.stop="go(4,itm.id)">查看物流</span>
											<span class="colorf45d confirm" @click.stop="go(6,itm.id)">快去评价</span>
										</div>
										<!-- 退换货 -->
										<div v-if="itm.status=='4'" class="mr15 flex flex_hc">
											<span class="colorf45d confirm" @click.stop="go(7,itm.id)">查看售后详情</span>
										</div>
										<!-- 已关闭 -->
										<div v-if="itm.status=='-1'" class="mr15 flex flex_hc">
											<span class="cancel" @click.stop="go(5,itm.id)">重新下单</span>
										</div>
									</div>
								</div>

								<div class="mt10">
                  <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom" type="text" text="暂无数据"></zan-loadmore>
                </div>
							</div>

							<div class="noOrderwrap" v-if="list&&list.length<=0">
								<div class="noOrder">

								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>
				</swiper-item>
				<swiper-item>
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">		
						<div class="w100 orderAll" id="item2">
              <div class="w100" v-if="list1&&list1.length>0">
								<div class="item orderitem" v-for="(itm,key) in list1" :key='key'>
									<div class="orderStatus colorf45d">待支付</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})">
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<div class="mr15 flex flex_hc">
											<span class="cancel" @click.stop="go(2,itm.id)">取消订单</span>
											<span class="colorf45d confirm" @click.stop="go(3,itm.id)">去支付</span>
										</div>
									</div>
								</div>
							 	<div class="mt10">
                  <zan-loadmore v-if="!isBottom1" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom1" type="text" text="暂无数据"></zan-loadmore>
                </div>
              </div>

							<div class="noOrderwrap" v-if="list1&&list1.length<=0">
								<div class="noOrder">

								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>
				</swiper-item>
				<swiper-item>
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
						<div class="w100 orderAll" id="item3">
              <div class="w100" v-if="list2&&list2.length>0">
								<div class="item orderitem" v-for="(itm,key) in list2" :key='key'>
									<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})">
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<div class="mr15 flex flex_hc">
										</div>
									</div>
								</div>

								<div class="mt10">
                  <zan-loadmore v-if="!isBottom2" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom2" type="text" text="暂无数据"></zan-loadmore>
                </div>
							</div>

							<div class="noOrderwrap" v-if="list2&&list2.length<=0">
								<div class="noOrder">

								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
						<div class="w100 orderAll" id="item4">
              <div class="w100" v-if="list3&&list3.length>0">
								<div class="item orderitem" v-for="(itm,key) in list3" :key='key'>
									<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})">
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<div class="mr15 flex flex_hc">
											<span class="colorf45d confirm" @click.stop="go(4,itm.id)">查看物流</span>
										</div>
									</div>
								</div>

								<div class="mt10">
                  <zan-loadmore v-if="!isBottom3" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom3" type="text" text="暂无数据"></zan-loadmore>
                </div>
							</div>

							<div class="noOrderwrap" v-if="list3&&list3.length<=0">
								<div class="noOrder">

								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>					
				</swiper-item>
				<swiper-item>
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
						<div class="w100 orderAll" id="item5">
							<div class="w100" v-if="list4&&list4.length>0">
								<div class="item orderitem" v-for="(itm,key) in list4" :key='key'>
									<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})">
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<div class="mr15 flex flex_hc">
                      <span class="cancel" @click.stop="go(5,itm.id)">再来一单</span>
                      <span class="colorf45d confirm" @click.stop="go(4,itm.id)">查看物流</span>
                      <span class="colorf45d confirm" @click.stop="go(6,itm.id)">快去评价</span>
                    </div>
									</div>
								</div>

								<div class="mt10">
                  <zan-loadmore v-if="!isBottom4" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom4" type="text" text="暂无数据"></zan-loadmore>
                </div>
							</div>

							<div class="noOrderwrap" v-if="list4&&list4.length<=0">
								<div class="noOrder">

								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>					
				</swiper-item>
				<swiper-item id="item7">
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">
						<div class="w100 orderAll" id="item6">
							<div class="w100" v-if="list5&&list5.length>0">
								<div class="item orderitem" v-for="(itm,key) in list5" :key='key'>
									<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})">
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<div class="mr15 flex flex_hc">
											<span class="colorf45d confirm" @click.stop="go(7,itm.id)">查看售后详情</span>
										</div>
									</div>
								</div>

								<div class="mt10">
                  <zan-loadmore v-if="!isBottom5" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom5" type="text" text="暂无数据"></zan-loadmore>
                </div>
							</div>

							<div class="noOrderwrap" v-if="list5&&list5.length<=0">
								<div class="noOrder">

								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>
				</swiper-item>
				<swiper-item id="item8">
          <scroll-view scroll-y="true" :lower-threshold="lowerThreshold" @scrolltolower="reachBottom">	
						<div class="w100 orderAll" id="item7">
							<div class="w100" v-if="list6&&list6.length>0">
								<div class="item orderitem" v-for="(itm,key) in list6" :key='key'>
									<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
									<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})">
										<div class="shopName lineBottom">
											<div class="logo">
												<img :src="i.logo" alt="">
											</div>
											<div class="name">{{i.shopname}}</div>
										</div>
										<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pagesSub/userInfo/orderdetil',query:{id:itm.id}})" :key='indexIn'>
											<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
										</div>
									</div>
									<div class="acturPay h40 lineBottom">
										<div class="fl ml15">实付：</div>
										<div class="fr mr15">
											<span class="colorf45d mr11"> ￥{{itm.price}}</span>
											<span class="color9a">（免运费）</span>
										</div>
									</div>
									<div class="confirmWrap">
										<div class="mr15 flex flex_hc">
											<span class="cancel" @click.stop="go(5,itm.id)">重新下单</span>
										</div>
									</div>
								</div>

								<div class="mt10">
                  <zan-loadmore v-if="!isBottom6" type="loading"></zan-loadmore>
                  <zan-loadmore v-if="isBottom6" type="text" text="暂无数据"></zan-loadmore>
                </div>
							</div>

							<div class="noOrderwrap" v-if="list6&&list6.length<=0">
								<div class="noOrder">
								</div>
								<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
							</div>
						</div>
          </scroll-view>
				</swiper-item>
			</swiper>
			<div v-if="iPhoneshow" class="h34"></div>
		</div>
	</div>
</template>
<script>
import GoodsDetail from "@/components/goodsDetail";
import tab_bar from "@/components/tab_bar";
import isLoading from "@/components/isLoading";
import { showActionSheet, requestPayment } from "@/utils/wechat";
export default {
  data() {
    return {
      openId: "",
      lowerThreshold: 100,
      tabs: [
        {
          name: "全部",
          type: "0",
          checked: true
        },
        {
          name: "待付款",
          type: "1",
          checked: true
        },
        {
          name: "待发货",
          type: "2",
          checked: true
        },
        {
          name: "待收货",
          type: "3",
          checked: true
        },
        {
          name: "待评价",
          type: "4",
          checked: true
        },
        {
          name: "售后中",
          type: "5",
          checked: true
        },
        {
          name: "已关闭",
          type: "6",
          checked: true
        }
      ],
      activeIndex: 0,
      currentTab: 0,
      scrollLeft: 0,
      duration: 50,
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      orderHeight: 0,
      contentHeight: "",
      page: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      prePage: 4,
      isBottom: false,
      isBottom1: false,
      isBottom2: false,
      isBottom3: false,
      isBottom4: false,
      isBottom5: false,
      isBottom6: false,
      toglestatus: false,
      iPhoneshow: false
    };
  },
  components: {
    isLoading,
    GoodsDetail
  },
  methods: {
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
      this.duration = 500;
    },
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
      }
    },
    async go(num, id, isAll) {
      // num 1 去订单详情    2 取消订单    3 去支付   4 查看物流  5 重新下单   6去评价    7 查看售后详情
      // isAll true 全部订单list    false||undefined||null||'' 待付款list1
      switch (num) {
        case 1:
          this.$router.push({
            path: "/pagesSub/userInfo/orderdetil",
            query: { id: id }
          });
          break;
        case 2:
          let authkey = this.$store.state.user.userInfo.authkey;
          let cancel = await this._to(
            this.$http.poinscancel(id, this.openId, authkey)
          );

          if (isAll) {
            this.list = this.list.filter(function(val, i) {
              return val.id != id;
            });
          } else {
            this.list1 = this.list1.filter(function(val, i) {
              return val.id != id;
            });
          }
          break;
        case 3:
          const [err, res] = await this._to(
            showActionSheet(["微信支付", "余额支付"])
          );
          if (res == 0) {
            this.$http.orderPay(id, this.openId).then(payInfo => {
              return requestPayment(
                payInfo.wechat.payinfo.timeStamp,
                payInfo.wechat.payinfo.nonceStr,
                payInfo.wechat.payinfo.package,
                payInfo.wechat.payinfo.signType,
                payInfo.wechat.payinfo.paySign
              );
            });
          } else {
            this.$tips.alert("您当前余额为0！");
          }
          break;

        case 4:
          this.$tips.alert("查看物流");
          break;
        case 5:
          this.$tips.alert("重新下单");
          break;
        case 6:
          this.$tips.alert("去评价");
          break;
        case 6:
          this.$tips.alert("查看售后详情");
          break;
      }
    },
    async swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
      this.duration = 500;
      if (this.currentTab > 3) {
        this.scrollLeft = 600;
      } else {
        this.scrollLeft = 0;
      }
      this.initData();
    },
    async initData() {
      this.$store.commit("SET_IS_LOADING", false);
      this.$store.commit("SET_IS_LOADING", true);
      await this.getMore();
    },
    async getMore() {
      // status=0#  0 待付款  1待发货  2待收货   3确认收货了-已完成（待评价）   4退换货  -1已关闭订单   status不传为全部订单列表
      switch (this.activeIndex) {
        case 0:
          if (this.isBottom) return;
          this.$http.getOrderList(this.openId, "", this.page).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom = true;
              }
              this.list = [...this.list, ...res.list];
              this.page++;
            } else {
              console.log("加载失败");
            }
          });
          break;
        case 1:
          if (this.isBottom1) return;
          this.$http.getOrderList(this.openId, 0, this.page1).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom1 = true;
              }
              this.list1 = [...this.list1, ...res.list];
              this.page1++;
            } else {
              console.log("加载失败");
            }
          });
          break;
        case 2:
          if (this.isBottom2) return;

          this.$http.getOrderList(this.openId, 1, this.page2).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom2 = true;
              }
              this.list2 = [...this.list2, ...res.list];
              this.page2++;
            } else {
              console.log("加载失败");
            }
          });
          break;
        case 3:
          if (this.isBottom3) return;

          this.$http.getOrderList(this.openId, 2, this.page3).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom3 = true;
              }
              this.list3 = [...this.list3, ...res.list];
              this.page3++;
            } else {
              console.log("加载失败");
            }
          });
          break;
        case 4:
          if (this.isBottom4) return;

          this.$http.getOrderList(this.openId, 3, this.page4).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom4 = true;
              }
              this.list4 = [...this.list4, ...res.list];
              this.page4++;
            } else {
              console.log("加载失败");
            }
          });
          break;
        case 5:
          if (this.isBottom5) return;

          this.$http.getOrderList(this.openId, 4, this.page5).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom5 = true;
              }
              this.list5 = [...this.list5, ...res.list];
              this.page5++;
            } else {
              console.log("加载失败");
            }
          });
          break;
        case 6:
          if (this.isBottom6) return;

          this.$http.getOrderList(this.openId, -1, this.page6).then(res => {
            if (!res.error) {
              if (
                res.list instanceof Array &&
                res.list.length >= 0 &&
                res.list.length < this.prePage
              ) {
                this.isBottom6 = true;
              }
              this.list6 = [...this.list6, ...res.list];
              this.page6++;
            } else {
              console.log("加载失败");
            }
          });
          break;
      }
      this.$store.commit("SET_IS_LOADING", false);
    },
    reachBottom: function() {
      console.log("加载更多");
      this.getMore();
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  mounted() {
    var res = wx.getSystemInfoSync();
    this.iphone_xsp();
  },
  async onShow() {
    this.list = [];
    this.list1 = [];
    this.list2 = [];
    this.list3 = [];
    this.list4 = [];
    this.list5 = [];
    this.list6 = [];
    this.page = 1;
    this.page1 = 1;
    this.page2 = 1;
    this.page3 = 1;
    this.page4 = 1;
    this.page5 = 1;
    this.page6 = 1;
    this.isBottom = false;
    this.isBottom1 = false;
    this.isBottom2 = false;
    this.isBottom3 = false;
    this.isBottom4 = false;
    this.isBottom5 = false;
    this.isBottom6 = false;
    this.openId = this.$store.state.user.userInfo.openId;
    if (this.$route.query.orderType !== undefined) {
      this.currentTab = parseInt(this.$route.query.orderType);
      this.activeIndex = parseInt(this.$route.query.orderType);
    }
    await this.initData();
  }
};
</script>
<style scoped lang='scss'>
.btnb7 {
  display: inline-block;
  width: 71px;
  height: 25px;
  border: 1px solid #b7b7b7;
  color: #9a9a9a;
  text-align: center;
  line-height: 25px;
  vertical-align: middle;
  border-radius: 2px;
}
.noOrderwrap {
  min-height: 100vh;
}
.noOrder {
  width: 95px;
  height: 69px;
  background: url(#{$imgUrl}img_orderforgoods_none.png) no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 200px;
  left: 133px;
}

.noOrderTitle {
  text-align: center;
  margin-top: 0px;
  font-size: 16px;
  color: #9a9a9a;
  position: relative;
  top: 225px;
}
.container {
  background-color: #f2f2f2;
  .swiper {
    width: 100%;
    padding-top: 42px;
    .navbar {
      transition: all ease 0.5s;
      padding: 0;
      background: #fff;
      white-space: nowrap;
      position: fixed;
      top: 0px;
      left: 0;
      z-index: 99;
      height: 40px;
      line-height: 40px;
      background: #fff;
      .navbar_item_on {
        color: #ff455d;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: auto;
          bottom: 0px;
          z-index: 1;
          width: 48px;
          height: 3px;
          background-color: #ff455d;
          border-radius: 2px;
        }
      }
      .navbar_item {
        display: inline-block;
        width: 65px;
        height: 40px;
        text-align: center;
        position: relative;
        .navbar_title {
          color: #323232;
          display: inline-block;
          font-size: 15px;
        }
        .selective {
          color: #ff455d;
        }
      }
    }
    .content {
      box-sizing: border-box;
      width: 100%;
      height: calc(100vh - 40px);
      padding-top: 10px;
      -webkit-overflow-scrolling: touch;
      scroll-view {
        height: 100%;
      }
      .orderAll {
        overflow: hidden;
        .orderitem {
          position: relative;
          margin-bottom: 10px;
        }
        .noOrder {
          width: 95px;
          height: 69px;
          background: url(#{$imgUrl}img_orderforgoods_none.png) no-repeat center
            center;
          background-size: cover;
          position: absolute;
          top: 110px;
          left: 133px;
        }
        .noOrderTitle {
          text-align: center;
          font-size: 16px;
          color: #9a9a9a;
        }
      }
      .orderStatus {
        position: absolute;
        right: 15px;
        top: 10px;
        z-index: 9;
      }
      .shopName {
        background: #fff;
        display: flex;
        height: 40px;
        .logo {
          width: 21px;
          height: 20px;
          margin: 10px 22px 0 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          line-height: 40px;
          font-size: 14px;
        }
      }
      .h40 {
        background-color: #fff;
      }
      .confirmWrap {
        background-color: #fff;
        > div {
          height: 40px;
          justify-content: flex-end;
        }
        span {
          min-width: 70px;
          padding: 0 5px;
          height: 25px;
          text-align: center;
          margin-left: 15px;
          line-height: 25px;
          border-radius: 2px;
        }
        .cancel {
          border: 1px solid #09bb07;
          color: #09bb07;
        }
        .confirm {
          border: 1px solid #ff455d;
          color: #ff455d;
        }
      }
    }
  }
}
</style>