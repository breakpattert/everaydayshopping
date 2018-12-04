<template>
	<div class="container lineBottom" :class="{'iphonex':iPhoneshow}" @click="stopFouces">
		<div class="fullPage2" style="opacity:0;" v-if="isFocus">
		</div>
		<isLoading :isLoading='isLoading'></isLoading>

		<div class="main_img">
			<!--<div class="swiperContainer">
				<swiper :indicator-dots="indicatorDots" :current="swiperCurrent" :autoplay="autoplay" :interval="interval" :duration="duration" @change="bannerSwiperChange" class="swiper">
					<block v-for="(item,index) in strategyDetail.cover_img" :key="index">
						<swiper-item>
							<div class="slide-image">
								<wux-image wux-class="image" shape="circle" :src="item">
								</wux-image>
							</div>
						</swiper-item>
					</block>
				</swiper>
				<div class="dots">
					<block v-for="(item,index) in strategyDetail.cover_img" :key="index" v-if="strategyDetail.cover_img.length>1">
						<view class="dot" :class="{'active':swiperCurrent == index}"></view>
					</block>
				</div>
			</div>-->
			<div class="swiperContainer">
				<img mode="widthFix" :src="strategyDetail['cover_img']?strategyDetail['cover_img'][0]:''" alt="" />
			</div>
			<button class="share_to" open-type='share' data-param='1'>
				<img src="../../../static/images/icon_share2.png" alt="" />
			</button>
		</div>
		<div class="w100 praise lineBottom praisebox">
			<div class="praiseInfo lineBottom parisebottom">
				<div class="praise_ico">
					<img :src="strategyDetail.thumb" alt="">
				</div>
				<div class="praisepl">
					<p class="color32 f16">{{strategyDetail.name}}</p>
				</div>
				<span class="islike f16" @click="shopLike(0,islike)" v-if="official==0">{{fllows?'已关注':'关注'}}</span>
			</div>
			<div class="praiseMains">
				<p class="color32 f12">
					<!-- <wxParse :content="strategyDetail.content" @preview="preview" @navigate="navigate" /> -->
				</p>
			</div>
		</div>
		<div class="w100 praise praise2">
			<div class="praBox">
				<div class="commentcounts lineBottom">
					<span class="color32 f16">评论（{{strategyDetail.respnum}}）</span>
					<div class="write" @click.stop="autoKeyWord">
						<i></i>
						<span class="color9a f14">写评论</span>
					</div>
				</div>
				<div class="lineBottom alllist" v-for="(items,index) in allResplist" :key="index">
					<div class="praiseInfo">
						<div class="praise_ico">
							<img :src="items.logo" alt="">
						</div>
						<div class="praisepl">
							<p class="color32 f14">{{items.name}}</p>
							<span class="color9a f10">{{items.createtime}}</span>
						</div>
						<div class="praiselike" @click="resplistLike(items.id,items.islike)">
							<i :class="{'likeActive3':items.islike}"></i>
							<span class="f10 color32" v-if="items.likenum>999">999+</span>
							<span class="f10 color32" v-else>{{items.likenum}}</span>
						</div>
					</div><br />
					<div class="praiseMains">
						<p class="color32 f12" @click.stop="poinset(items.id,items.openid,'',items.name)">
							{{items.content}}
						</p>
						<div class="praiseWrite" v-if="items.reply_list.length !==0">
							<p class="textFrist" v-for="(item2,index2) in items.reply_list" :key="index2" @click.stop="poinset(item2.commontid,item2.to_openid,item2.target_id,item2.to_name)" v-if="index2<3&&items.unfoldstatus==false">
								<span class="colorf45d f12">{{item2.to_name}}:</span>
								<span class="color32 f11" v-if="index2>0">回复</span>
								<span class="colorf45d f12" v-if="index2>0">{{item2.from_name}}</span>
								<span class="color32 f11">{{item2.content}}</span>
							</p>
							<p class="textFrist" v-for="(item2,index2) in items.reply_list" :key="index2" @click.stop="poinset(item2.commontid,item2.to_openid,item2.target_id,item2.to_name)" v-if="items.unfoldstatus">
								<span class="colorf45d f12">{{item2.to_name}}:</span>
								<span class="color32 f11" v-if="index2>0">回复</span>
								<span class="colorf45d f12" v-if="index2>0">{{item2.from_name}}</span>
								<span class="color32 f11">{{item2.content}}</span>
							</p>
							
							<div class="allWritelist" @click="unfold(index)" v-if="!items.unfoldstatus&&items.reply_list.length>3">
								<span>查看全部{{items.replynum}}条回复</span>
								<i></i>
							</div>
						</div>
					</div>
				</div>
				<div class="mt10" v-if="allResplist.length>0">
					<zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
					<zan-loadmore v-if="isBottom" type="text" :text="textdetil"></zan-loadmore>
				</div>
				<div class="searchBoxWraper lineBottom" v-if="showTop" :class="{'searchBoxcss':isFocus,'iphoneX2':iPhoneshow}">
					<div class="searchBox ">
						<span class="mr4 searchIcon">{{setnames}}</span>
						<input type="text" class="search" v-model="setcontent" cursor-spacing="16" :focus='isFocus' @focus="searchFocus" @click.stop="focusDel" @blur="searchblur" placeholder-class="placeholder" :placeholder="placeholder">
					</div>
					<div class="searchsend f14" @click.stop="setcomment()">
						发送
					</div>
				</div>
				<div class="tabBox lineTop" v-if="!showTop" :class="{'iphonexbars':iPhoneshow}">
					<div @click="shopLike(1,islike)">
						<span :class="{'likeActive2':statuslist.islike}"></span>
						<p class="mt5 color32 f12">
							<i class="mr5">赞</i>
							<i>{{strategyDetail.likenum}}</i>
						</p>
					</div>
					<div @click.stop="autoKeyWord">
						<span></span>
						<p class="mt5 color32 f12">
							<i class="mr5">评论</i>
							<i>{{strategyDetail.respnum}}</i>
						</p>
					</div>
					<div @click="shopLike(2,islike)">
						<span :class="{'likeActive':statuslist.isfollow}"></span>
						<p class="mt5 color32 f12">
							<i class="mr5">收藏</i>
							<i>{{strategyDetail.follownum}}</i>
						</p>
					</div>
					<div @click="toggleActivityPopup">
						<span></span>
						<p class="mt5 color32 f12">
							<i class="mr5">可购商品</i>
						</p>
					</div>
				</div>
			</div>
		</div>
		<van-popup :show="showActivitybottom" custom-class="bottom" @close="toggleActivityPopup" position="bottom">
			<div class="shopSwper" v-if="official==0">
				<scroll-view class="scroll-view_H" scroll-x>
					<view id="green" class="scroll-view-item_H" v-for="(item2,index2) in buyShopList" :key="index2" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item2.id }})">
						<div class="scrollimg">
							<wux-image wux-class="image" shape="circle" :src="item2.thumb">
							</wux-image>
						</div>
						<p class="over_hidden">{{item2.title}}</p>
						<div class="s_price f12 colorf45d">￥{{item2.price}}</div>
					</view>
				</scroll-view>
			</div>
			<div class="empty empty2" v-if="official==1">
				<img src="../../../static/images/icon_none.png">
				<p class="color9a">目前没有可购商品...</p>
			</div>
			<div class="tabBox2 lineTop" :class="{'iphonexbars':iPhoneshow}">
				<div @click="shopLike(1,islike)">
					<span :class="{'likeActive2':statuslist.islike}"></span>
					<p class="mt5 color32 f12">
						<i class="mr5">赞</i>
						<i>{{strategyDetail.likenum}}</i>
					</p>
				</div>
				<div @click.stop="autoKeyWord">
					<span></span>
					<p class="mt5 color32 f12">
						<i class="mr5">评论</i>
						<i>{{strategyDetail.respnum}}</i>
					</p>
				</div>
				<div @click="shopLike(2,islike)">
					<span :class="{'likeActive':statuslist.isfollow}"></span>
					<p class="mt5 color32 f12">
						<i class="mr5">收藏</i>
						<i>{{strategyDetail.follownum}}</i>
					</p>
				</div>
				<div @click="toggleActivityPopup">
					<span></span>
					<p class="mt5 color32 f12">
						<i class="mr5">可购商品</i>
					</p>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
import { setStorage, getStorage, getSystemInfoSync } from "@/utils/wechat";
import wxParse from "mpvue-wxparse";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
      imgs: [
        "https://sh.szwfy.com.cn/attachment/images/3/2018/09/B3Z3plH3S4X48KXf3x396rkszKV9uk.jpg",
        "https://sh.szwfy.com.cn/attachment/images/3/2018/10/Nwj6yZXeakH0X6gJ5aEA6hyhKqwxk8.jpg"
      ],
      swiperCurrent: 0,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      iPhoneshow: false,

      placeholder: "说点什么呢~",
      showTop: false,
      pf: "",

      pics: "",
      setcontent: "",
      i_h: "",
      p_h: "",
      list_h: "",

      showActivitybottom: false,
      autokeyword: false,
      shopId: null,
      strategyDetail: {},
      page: 1,
      pagesize: 10,
      statuslist: "",
      allResplist: "",
      setstatus: "直接评论",
      commontid: "",
      from_openid: "",
      target_id: "",
      fllows: "",
      isBottom: false,
      loadMoreOne: true,
      textdetil: "没有更多评论",
      buyShopList: "",
      setnames: "",
      push_pages: "",
      respnum: "",
      setint: null,

      isFocus: false,
      monty: true,
      official: ""
    };
  },
  components: {
    isLoading,
    wxParse
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
      }
    },
    bannerSwiperChange(e) {
      this.swiperCurrent = e.mp.detail.current;
    },
    //			获取元素高度
    clientHeights() {
      setTimeout(() => {
        let query = wx.createSelectorQuery();
        query
          .select(".main_img")
          .boundingClientRect(res => {
            this.i_h = res.height;
          })
          .exec();
        query
          .select(".praisebox")
          .boundingClientRect(res => {
            this.p_h = res.height;
          })
          .exec();
        query
          .select(".praise")
          .boundingClientRect(res => {
            this.list_h = res.height;
          })
          .exec();
      }, 500);
    },
    autoKeyWord() {
      this.showActivitybottom = false;
      this.isFocus = true;
      this.setstatus == "直接评论";
      this.setnames = "";
      let pageScroll = parseInt(this.i_h + this.p_h + 12);
      if (this.allResplist.length < 5) {
        this.showTop = true;
      } else {
        this.showTop = true;
        wx.pageScrollTo({
          scrollTop: pageScroll,
          duration: 300
        });
      }
    },

    toggleActivityPopup() {
      this.getBuyShoping();
      this.showActivitybottom = !this.showActivitybottom;
    },
    searchFocus() {
      this.placeholder = "";
      //			      this.isFocus=true;
    },
    focusDel() {
      this.isFocus = true;
    },
    searchblur() {
      this.isFocus = false;
    },
    async getstrategyDetail() {
      let List = await this._to(
        this.$http.strategyDetail(
          this.$route.query.id,
          this.$route.query.merchid,
          this.$store.state.user.userInfo
            ? this.$store.state.user.userInfo.openId
            : ""
        )
	  );
	  
      this.statuslist = List[1];
      this.strategyDetail = List[1].detail;
      this.fllows = List[1].merch_follow;
    },
    async styResplist() {
      this.isBottom = false;
      let Data = await this.$http.strategyResplist(
        this.$route.query.id,
        this.page,
        10,
        ''
      );

	  this.allResplist = Data.list.map(v => {
		v.createtime = this._U.formatDate(v.createtime, "MM月dd日 HH:mm");
		v['unfoldstatus']= false;
        return v;
      });
      if (this.allResplist.length < this.pagesize) {
        this.isBottom = true;
      }
      this.push_pages = this.allResplist.length;
      this.$store.commit("SET_IS_LOADING", false);
    },
    async styResplist2(type) {
      this.isBottom = false;
      let pagesize = "";
      if ((type = 1 && this.allResplist.length !== 0)) {
        pagesize = this.allResplist.length + 1;
      } else {
        if (this.allResplist.length == 0) {
          pagesize = 10;
        } else {
          pagesize = this.allResplist.length;
        }
      }
      let Data = await this.$http.strategyResplist(
        this.$route.query.id,
        1,
        pagesize,
        ''
      );

      this.allResplist = Data.list.map(v => {
		v.createtime = this._U.formatDate(v.createtime, "MM月dd日 HH:mm");
		v['unfoldstatus']= false;
        return v;
      });
      if (this.allResplist.length < this.pagesize) {
        this.isBottom = true;
      }
    },
    async getBuyShoping() {
      let Data = await this._to(this.$http.buyShoping(this.$route.query.id));
      this.buyShopList = Data[1].list;
    },
    async initData() {
      this.$store.commit("SET_IS_LOADING", true);
      this.setstatus = "直接评论";
      this.getstrategyDetail();
      this.styResplist();
    },
    async shopLike(type, islike) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (type == 0) {
          islike = "关注";
          if (this.fllows == true) {
            await this.$http.getfollow(
              this.$route.query.merchid,
              this.$store.state.user.userInfo.openId,
              0
            );
          }
          if (this.fllows == false) {
            await this.$http.getfollow(
              this.$route.query.merchid,
              this.$store.state.user.userInfo.openId,
              1
            );
          }

          this.getstrategyDetail();
        }
        if (type == 1) {
          islike = "点赞";
          if (this.statuslist.islike == false) {
            let List = await this._to(
              this.$http.strategyLike(
                this.$route.query.id,
                this.$store.state.user.userInfo.openId
              )
            );
            this.getstrategyDetail();
            this.$tips.toast("点赞成功");
          }
          if (this.statuslist.islike == true) {
            let List = await this._to(
              this.$http.strategyLike(
                this.$route.query.id,
                this.$store.state.user.userInfo.openId
              )
            );
            this.getstrategyDetail();
            this.$tips.toast("取消点赞");
          }

          this.getstrategyDetail();
        }
        if (type == 2) {
          if (this.statuslist.isfollow == false) {
            let List = await this._to(
              this.$http.strategyFollow(
                this.$route.query.id,
                this.$store.state.user.userInfo.openid
              )
            );
            this.getstrategyDetail();
            this.$tips.toast("收藏成功");
          }
          if (this.statuslist.isfollow == true) {
            let List = await this._to(
              this.$http.strategyFollow(
                this.$route.query.id,
                this.$store.state.user.userInfo.openid
              )
            );
            this.getstrategyDetail();
            this.$tips.toast("取消收藏");
          }
        }
      }
    },
    async setcomment() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (this.setcontent == "") {
          this.placeholder = "输入不能为空";
          return;
        }
        if (this.setstatus == "楼层回复") {
          this.setfloorReply();
          this.isFocus = false;

          return;
        }
        if (this.setstatus == "直接评论") {
          let set = await this._to(
            this.$http.strategyAdd(
              this.$route.query.id,
              this.$store.state.user.userInfo.openId,
              this.setcontent
            )
          );
          this.getstrategyDetail();
          this.styResplist2(1);
          this.$tips.toast("发送成功");
          this.setcontent = "";
          this.isFocus = false;
        }
      }
    },
    async poinset(c_id, f_openid, t_id, name) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (this.$store.state.user.userInfo.openId == f_openid) {
          this.$tips.toast("您不能回复自己哦..", function() {}, "none", 2000);
          return;
        }
        this.showTop = true;
        this.isFocus = true;
        this.setstatus = "楼层回复";
        this.commontid = c_id;
        this.target_id = t_id;
        this.from_openid = f_openid;
        this.setnames = "回复:" + name;
      }
    },
    async setfloorReply() {
      let ids = {
        strategyid: this.$route.query.id,
        commontid: this.commontid,
        from_openid: this.from_openid,
        to_openid: this.$store.state.user.userInfo.openId,
        target_id: this.target_id,
        content: this.setcontent
      };
      this.$http.floorReply(
        ids.strategyid,
        ids.commontid,
        ids.from_openid,
        ids.to_openid,
        ids.target_id,
        ids.content
      );

      this.push_pages = this.page;
      this.styResplist2();
      this.setcontent = "";
      this.$tips.toast("回复楼层成功");
    },
    unfold(index) {
      this.allResplist[index]['unfoldstatus']= true;
    },
    async resplistLike(commentid, islike) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      } else {
        if (islike == false) {
          let List = await this._to(
            this.$http.floorReplyLike(
              this.$route.query.id,
              commentid,
              this.$store.state.user.userInfo.openid
            )
          );
          this.styResplist2();
          this.$tips.toast("点赞成功");
        }
        if (islike == true) {
          let List = await this._to(
            this.$http.floorReplyLike(
              this.$route.query.id,
              commentid,
              this.$store.state.user.userInfo.openid
            )
          );
          this.styResplist2();
          this.$tips.toast("取消点赞");
        }
      }
    },
    stopFouces() {
      this.isFocus = false;
    }
  },
  mounted() {
    this.iphone_xsp();
    this.clientHeights();
  },
  onPageScroll: function(e) {
    setStorage("scrollY", e.scrollTop);
    let pageScroll = parseInt(this.i_h + this.p_h + 10);
    let pageScroll_2 = parseInt(this.i_h - 40);
    if (e.scrollTop >= pageScroll) {
      this.showTop = true;
      wx.setNavigationBarTitle({
        title: "全部评论（" + this.strategyDetail.respnum + "）"
      });
    }
    if (e.scrollTop < pageScroll) {
      this.showTop = false;
      wx.setNavigationBarTitle({
        title: "穿搭攻略"
      });
    }
  },
  watch: {
    shopId(v) {
      this.initData();
    },
    respnum: {
      handler(v) {
        this.styResplist2();
      },
      immediate: false
    }
  },
  async onShow() {
    this.setstatus = "直接评论";
    this.shopId = this.$route.query.id;
    this.showActivitybottom = false;
    this.push_pages = "";
    this.page = 1;
    this.official = this.$route.query.official;

	this.setint = setInterval(() => {
      this.styResplist2();
    }, 20000);
  },
  async onHide() {
    clearInterval(this.setint);
    this.setint = null;
    this.showTop = false;
  },
  async onReachBottom() {
    this.isFocus = false;
    if (this.isBottom) return;
    let Data = await this.$http.strategyResplist(
      this.$route.query.id,
      ++this.page,
      this.pagesize,
      this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : null
    );

    if (Data.list.length < this.pagesize) {
      this.isBottom = true;
    }
    this.allResplist = [...this.allResplist, ...Data.list];
    this.allResplist = this.allResplist.map(v => {
	  v.createtime = this._U.formatDate(v.createtime, "MM月dd日 HH:mm");
	  v['unfoldstatus']= false;
      return v;
    });
    this.push_pages = this.allResplist.length;
  }
};
</script>
<style scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
.container {
  background: #f2f2f2;
  margin-bottom: 50px;
  .empty2 {
    margin-bottom: 100px !important;
  }
  .main_img {
    width: 100%;
    border-radius: 5px;
    position: relative;
    .share_to {
      z-index: 100;
      position: absolute;
      right: 15px;
      top: 15px;
      width: 35px;
      height: 35px;
      background-color: #9a9a9a;
      opacity: 0.6;
      overflow: hidden;
      line-height: 40px;
      border-radius: 50%;
      text-align: center;
      padding: 0 9px;
      img {
        width: 18px;
        height: 18px;
        margin: 0 auto;
      }
    }
    .swiperContainer {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      /*.swiper {
              width: 100%;
              height: 238px;
              .slide-image {
                width: 100%;
                height: 100%;
              }
            }
            .dots {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 9px;
              display: flex;
              justify-content: center;
              .dot {
                margin: 0 4px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                transition: all 0.6s;
                border: 1.5px solid #fff;
                &.active {
                  width: 16px;
                  background: #fff;
                  border-radius:3px;
                }
              }
            }*/
    }
  }
  .praise {
    background: #ffffff;
    padding: 0px 15px 0 15px;

    .praiseInfo {
      position: relative;
      display: flex;
      padding: 11.5px 0;
      padding-bottom: 0;
      align-items: center;
      width: 100%;
      .praise_ico {
        width: 30px;
        height: 30px;

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
      .islike {
        display: inline-block;
        position: absolute;
        padding: 0 12px;
        height: 25px;
        line-height: 25px;
        background-color: #ff455d;
        border-radius: 13px;
        right: 0;
        color: #fff;
        text-align: center;
      }
    }
    .parisebottom {
      padding-bottom: 11.5px;
    }
    .praiseMains {
      margin-bottom: 15px;
      margin-top: 4px;

      > p {
        line-height: 28px;
      }
    }
  }
  .shopSwper {
    width: 100%;
    height: 204px;
    padding: 20px 15px;
    background: #fff;
    > h4 {
      font-weight: 700;
      font-size: 14px;
      color: #323232;
      padding-bottom: 20px;
    }
    .scroll-view_H {
      width: 100%;
      height: 110px;
      white-space: nowrap;
    }

    .scroll-view-item_H {
      width: 70px;
      margin-right: 10px;
      display: inline-block;
      background: #fff;
      .scrollimg {
        width: 70px;
        height: 70px;
        border-radius: 2px;
        border: solid 0.5px #e8e8e8;
        img {
          width: 100%;
          height: 100%;
        }
      }
      > p {
        text-align: center;
        color: #323232;
        font-size: 12px;
        margin-top: 6px;
      }
      .s_price {
        margin-top: 4px;
        text-align: center;
      }
    }
  }
  .praise2 {
    margin-top: 10px;
    padding-bottom: 48px;
    .commentcounts {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 0;
      .write {
        text-align: right;
        position: absolute;
        right: 0px;

        > i {
          width: 16px;
          margin-right: 8px;
          height: 15px;
          position: relative;
          top: 3.5px;
          display: inline-block;
          background: url("#{$imgUrl}icon_writeacomment.png") no-repeat 100%
            100%;
          background-size: cover;
        }
      }
    }
    .searchBoxWraper {
      width: 100%;
      padding: 10px 5px 10px 15px;
      display: flex;
      z-index: 1000;
      justify-content: space-between;
      background: #fff;
      align-items: center;
      position: fixed;
      bottom: 0px;
      left: 0;
      .searchBox {
        .placeholder {
          color: #b7b7b7;
          font-size: 10px;
          vertical-align: middle;
        }
        background: #e8e8e8;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 100%;
        border-radius: 15px;
        padding-left: 12px;
        .searchIcon {
          display: inline-block;
          padding: 0 4px;
          vertical-align: middle;
        }
        .search {
          display: inline-block;
          width: 170px;
          height: 20px;
          line-height: 20px;
          vertical-align: middle;
        }
      }
      .searchsend {
        line-height: 30px;
        color: #fff;
        width: 55px;
        height: 30px;
        background-color: #ff455d;
        border-radius: 0 15px 15px 0;
        text-align: center;
        position: relative;
        right: 12px;
      }
    }
    .searchBoxcss {
      padding: 10px 0px 10px 0px;
      border-radius: 0;
      .searchBox {
        border-radius: 0;
      }
      .searchsend {
        right: 0;
        border-radius: 0;
      }
    }
    .iphoneX2 {
      padding-bottom: 34px;
    }
    .tabBox {
      display: flex;
      padding: 10px 15px;
      justify-content: space-between;
      align-items: center;
      height: 54px;
      background: #fff;
      z-index: 1000;
      position: fixed;
      bottom: 0px;
      left: 0;

      div {
        width: 25%;
        height: auto;
        text-align: center;
        span {
          display: block;
          margin: 0 auto;
          width: 18px;
          margin-top: 2px;
          height: 18px;
          background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
          background-size: 100% 100%;
        }
        p {
          i {
            display: inline-block;
          }
        }
      }
      div:nth-child(1) {
        span {
          background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
          background-size: 100% 100%;
        }
        .likeActive2 {
          background: url("#{$imgUrl}icon_fabulous_act.png") no-repeat center
            center !important;
          background-size: 100% 100% !important;
        }
      }
      div:nth-child(2) {
        span {
          background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;
          background-size: 100% 100%;
        }
      }
      div:nth-child(3) {
        span {
          background: url("#{$imgUrl}icon_kindheart.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .likeActive {
          background: url("#{$imgUrl}icon_kindheart_act.png") no-repeat center
            center !important;
          background-size: 100% 100% !important;
        }
      }
      div:nth-child(4) {
        span {
          background: url("#{$imgUrl}icon_commodity.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
      .likeActive {
        background: url("#{$imgUrl}icon_kindheart_act.png") no-repeat center
          center !important;
        background-size: 100% 100% !important;
      }
    }
    .iphonexbars {
      height: 86px !important;
      display: flex;
      padding: 10px 15px;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      z-index: 1000;
      position: fixed;
      bottom: 0px;
      left: 0;
    }
    .alllist {
      padding: 15px 0;
      padding-bottom: 8px;
    }

    .praiseInfo {
      .praise_ico {
        width: 30px;
        height: 30px;
        border: 0.5px solid #e8e8e8;
        border-radius: 50%;
      }
      .praisepl {
        span {
          border: 0;
        }
      }
      .praiselike {
        width: 60px;
        position: absolute;
        right: 0;
        top: 10px;
        text-align: right;
        i {
          width: 15px;
          height: 16px;
          display: inline-block;
          background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100% 100%;
          background-size: cover;
          margin-right: 6px;
          position: relative;
          top: 2px;
        }
        .likeActive3 {
          background: url("#{$imgUrl}icon_fabulous_act.png") no-repeat 100% 100%;
          background-size: cover;
        }
      }
    }
    .praiseMains {
      margin-bottom: 0px;
      padding-left: 39px;
      p {
        line-height: 24px;
      }
      .praiseWrite {
        margin-top: 4px;
        width: 307px;
        background-color: #f2f2f2;
        padding: 7.5px 18px;
        padding-left: 10px;
        > p {
          line-height: 18px;
          span {
            margin: 0 2px;
          }
        }
        .allWritelist {
          margin-top: 8px;
          span {
            color: #9a9a9a;
            font-size: 12px;
          }
          i {
            display: inline-block;
            width: 18px;
            height: 16px;
            transform: rotate(270deg);
            position: relative;
            top: 3.5px;
            background: url("#{$imgUrl}icon_arrow_down.png") no-repeat center
              center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .tabBox2 {
    width: 100%;
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    background: #fff;
    z-index: 1000;
    position: fixed;
    bottom: 0px;
    left: 0;

    div {
      width: 25%;
      height: auto;
      text-align: center;
      span {
        display: block;
        margin: 0 auto;
        width: 18px;
        margin-top: 2px;
        height: 18px;
        background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
        background-size: 100% 100%;
      }

      p {
        i {
          display: inline-block;
        }
      }
    }
    div:nth-child(1) {
      span {
        background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
        background-size: 100% 100%;
      }
      .likeActive2 {
        background: url("#{$imgUrl}icon_fabulous_act.png") no-repeat center
          center !important;
        background-size: 100% 100% !important;
      }
    }
    div:nth-child(2) {
      span {
        background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
    div:nth-child(3) {
      span {
        background: url("#{$imgUrl}icon_kindheart.png") no-repeat center center;
        background-size: 100% 100%;
      }
      .likeActive {
        background: url("#{$imgUrl}icon_kindheart_act.png") no-repeat center
          center !important;
        background-size: 100% 100% !important;
      }
    }
    div:nth-child(4) {
      span {
        background: url("#{$imgUrl}icon_commodity.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .iphonexbars {
    width: 100%;
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    z-index: 1000;
    position: fixed;
    bottom: 0px;
    left: 0;
    height: 86px !important;
  }
}
</style>