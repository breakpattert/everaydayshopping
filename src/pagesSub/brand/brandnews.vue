<template>
 <wux-refresher id="wux-refresher" @pulling="onPulling" @refresh="onRefresh">
    <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
      <div class="nearly">
        <div class="goodsContent">
          <div class="w100" v-if="brandNewsList&&brandNewsList.length>0">
            <div class="item lineBottom" v-for="(item,index) in brandNewsList" :key="index" @click="$router.push({ path:'/pagesSub/recommend/recommendone',query: { id: item.id,type:'newFlash'}})">
              <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
              <div class="left">
                <wux-image wux-class="image" shape="rounded" :src="item.thumb">
                </wux-image>
              </div>
              <div class="right flex1">
                <div class="title f14 color32 ellip2">
                  {{item.title}}
                </div>
                <div class="time flex flex_hc">
                  <div class="l border">
                    <wux-image wux-class="image" shape="circle" :src="item.brandlogo">
                    </wux-image>
                  </div>
                  <div class="c f10 flex1">{{item.brandname}}</div>
                  <div class="r over_hidden flex flex_hc">
                    <span class="ico"></span>
                    <p class="f10 color9a">{{item.view}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt10">
              <zan-loadmore v-if="(hasFindSale=='click')?!findlistIsBottom:!isBottom" type="loading"></zan-loadmore>
              <zan-loadmore v-if="(hasFindSale=='click')?findlistIsBottom:isBottom" type="text" text="暂无数据"></zan-loadmore>
            </div>
          </div>

          <div v-if="hasLoading&&brandNewsList&&brandNewsList.length<=0" class="empty">
            <img src="../../../static/images/icon_none.png">
            <div>暂无相关品牌快讯</div>
          </div>

        </div>
      </div>
    </div>
  </wux-refresher>  
</template>

<script>
import {
  getSystemInfoSync,
} from "@/utils/wechat";
import isLoading from "@/components/isLoading";

export default {
  data() {
    return {
      openId:'',
      brandNewsList: [],      
      iPhoneshow: false,
      iphoneheight: "",
      page:1,
      prePage:10,
      isBottom:false,
       hasLoading: false
    };
  },
  components: {
    isLoading
  },
  computed: {   
    isLoading() {
      return this.$store.state.user.isLoading;
    },
  },
  watch: {
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
        this.$http.getBrandNewsList(this.page,this.perPage),
      )
      
      if (brandNewsList.status==1) {
        if (brandNewsList.result.data instanceof Array &&  brandNewsList.result.data.length < this.prePage) {
          this.isBottom = true;
        }
        this.brandNewsList = [...this.brandNewsList, ...brandNewsList.result.data];
         this.hasLoading = true;
        this.page++;
      } else {
        this.brandNewsList = brandNewsList.result.data || [];
        console.log("加载失败");
      }

      this.$store.commit("SET_IS_LOADING", false);
    } ,
    async onRefresh() {
      this.page=1
      this.brandNewsList= [] 
      this.isBottom=false
      await this.initData();
      this._U.stopRefresh();
    }   
  },
  async mounted() {
  
    this.iphone_xsp();
    this.initData(); 
  },
  async onReachBottom() {
    if (this.isBottom) return;
    this.initData();

    this.$store.commit("SET_IS_LOADING", false);
  }  
};
</script>

<style scoped lang='scss'>
.container {
  padding-bottom: 50px;
  width: 100%;
  position: relative;

  .nearly {
    width: 100%;
    position: relative;
    background: #ffffff;
  }

  .goodsContent {
    overflow: hidden;
    .item {
      position: relative;
      padding: 10px 15px;
      display: flex;
      overflow: hidden;
      .left {
        width: 125px;
        height: 80px;
        position: relative;
        border-radius:5px;
        box-shadow:0px 1px 2px 0px rgba(50,50,50,0.1);
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
        .title{
          flex: 1 0 auto;
        }
        .time{
          flex: 0 0 auto;
          margin-bottom: 2px;
          .l{
            width: 24px;
            height: 24px;
            border-radius: 100%;
            overflow: hidden;
            margin-right: 8px;
            &::before {              
              border-radius: 100%;
            }
          }
          .r{
            width: 50px;
            margin-left: 8px;
            justify-content:flex-end;
            .ico{
              width:14px;
              height:12px;
              background-image: url("#{$imgUrl}icon_find_gray.png");
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
