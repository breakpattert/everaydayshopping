<template>
    <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
         <!-- <isLoading :isLoading='isLoading'></isLoading> -->
        <div class="brandDetail">
            <div class="brandHeader">
                <div class="logo">
                    <div class="logoIcon">
                        <wux-image wux-class="image" shape="rounded" :src="brandInfo.images">
                        </wux-image>
                    </div>
                    
                </div>
                <div class="detail">
                    <div class="title f16">{{brandInfo.brand}}</div>
                    <div class="country mt4">
                        <span class="mr16 f13">品牌产地： {{country}} </span>
                        <span class="f13">当前城市： {{city}} </span>
                        
                    </div>
                </div>
            </div>
            <div class="brandContent" >
                <div class="icon"></div>
                 <!-- <div class="clickMore ">
                    <span class="threeDots"> ...</span>
                    <span class="color32 ">【查看更多】</span>
                  </div> -->
                 
                <div class="textContent" >
                    {{brandInfo.introduction}}
                     <span class="color32 " v-if="isMore" @click="getTextMore">{{moreOrNoMore}}</span>
                   
                </div>
            </div>
        </div>
        <div class="brandList mt10" v-if="brandList&&brandList.length>0">
            <div class="otherShop mb15">
                    
                <div> <span class="f16 mr8 bold">相关分店</span> <span  class="f14 color9a">•天天逛街共收录{{merch_num}}家分店</span> </div>
            </div>
            <div class="list">
                <div class="item" 
                v-for="(item,index) in brandList" :key="index"
                >
                    <div class="logo">
                       <wux-image wux-class="image" shape="rounded" :src='item.logo' >
                       </wux-image>
                    
                    </div>
                    <div class="shopDetail">
                        <div class="shopName mt5 f14 over_hidden">{{item.merchname}}</div>
                        <div class="adress mt6  over_hidden" @click="openLocation(item.lat,item.lng)">
                            
                            <span>{{item.jl}}km</span>
                            <span class="ml2 mr2 f10" style="transform:scaleY(0.8)">|</span>
                            <span>{{item.address}}</span>
                            
                        </div>
                        <div class="goShop">
                            <div @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id:item.id}})" class="shopClick f10">立即进店></div>
                            <div class="hot">
                                <div class="icon mr4"></div>
                                <div class="f12">{{item.view||0}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt10"  v-if="brandList.length>0" >
              <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
              <zan-loadmore v-if="isBottom" type="text" text="暂无数据"></zan-loadmore>
        </div>
        <div v-if="brandList.length<=0" class="empty">
            <img src="../../../static/images/icon_none.png">
            <div>暂无相关店铺列表</div>
        </div>
    </div>
</template>

<script>

import isLoading from "@/components/isLoading";

export default {
  data() {
    return {      
          
      iPhoneshow: false,
      iphoneheight: "",
      page:1,
      prePage:10,
      isBottom:false,
      brandId:'',
      brandInfo:{},
      brandList:[],
      merch_num:'',
      country:'',
      city:'',
      moreOrNoMore:'【查看更多】',
      isloadMore:false,
      allText:'',
      isMore:true 
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
      brandId(v){
          this.isBottom = false;
          this.page = 1;
         
          this.prePage = 10;
          this.isMore=true
          this.moreOrNoMore =''
          this.brandList=[]
          this.getData();
      }
  },
  methods: {
    iphone_xsp() {
      if (this.$store.state.user.iphoneX ) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    openLocation(lat,lng) {
      var that = this;
      let [latitude, longitude] = this._U.bMapTransqqMap(
        parseFloat(lat),
        parseFloat(lng)
      );
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      });
    },
   async getData(){
            let arr =[
                this.brandId,
                this.$store.state.user.clusterInfo.city,
                this.$store.state.user.locationInfo.latitude,
                this.$store.state.user.locationInfo.longitude,
                this.page,    
                this.prePage
            ]
     
            
        // let arr =[10,'深圳市',30.54,114.56]
        this.$store.commit("SET_IS_LOADING", false);
        this.$store.commit("SET_IS_LOADING", true);
        let data = await this.$http.brandInfoList(
            ...arr
        )
         this.$store.commit("SET_IS_LOADING", false);

        if (data.status==1) {
            if (data.result.merchList instanceof Array && data.result.merchList.length > 0 && data.result.merchList.length < this.prePage) {
                this.isBottom = true;
                
            }
            
            // if(this.brandList<5){
            //     this.isloadMore=false
            // }else{
            //     this.isloadMore=true
            // }
            
            this.brandInfo =data.result.brandInfo
            this.brandList = [...this.brandList, ...data.result.merchList];
            this.merch_num =data.result.merch_num
            this.country= data.result.brandInfo.location.split('·')[0]
            this.city= data.result.brandInfo.location.split('·')[1]

            this.page ++;
            setTimeout(() => {
                this.mitulineHide()
            }, 500);
        } else {
             
            console.log("加载失败");
        }
      

       
    },
    mitulineHide(){
        let num =85
        
         if(this.brandInfo.introduction.length>num){
             this.allText = this.brandInfo.introduction
             this.moreOrNoMore ='【查看更多】'
            this.brandInfo.introduction = this.brandInfo.introduction.substring(0,num-1)+"...";
        }else{
         
                 this.isMore=false
                 
             
        }
    },
    getTextMore(){
         let num =85
         if(this.moreOrNoMore=='【查看更多】'){
              this.brandInfo.introduction=this.allText
              this.moreOrNoMore='【收起更多】'
         }else{
            this.brandInfo.introduction = this.allText.substring(0,num-1)+"...";
            this.moreOrNoMore='【查看更多】'
         }
         
    }
    
      
  },
  async mounted() {
   
    this.iphone_xsp();
    
  },
  async onReachBottom() {
     
    if (this.isBottom) return;
    this.getData()
   
  },
  onShow(){
       this.$store.commit("SET_IS_LOADING", false);
       this.brandId= this.$route.query.id;
    //    let screenWidth = this.$store.state.user.systemInfo.screenWidth;
      
    //     if(screenWidth<=320){
    //          this.num=85
    //     }else if(screenWidth<=320){
    //          this.num=90
    //     }else if(screenWidth<=360){
    //          this.num=90
    //     }else if(screenWidth<=375){
    //          this.num=90
    //     }else if(screenWidth<=414){
    //          this.num=90
    //     }
  }
};
</script>

<style scoped lang='scss'>
    .container{
        background: #f2f2f2;
        padding-bottom: 10px;
        .brandDetail{
            width: 100%;
            background: #fff;
            .brandHeader{
                height: 90px;
                width:100%;
                background: url("#{$imgUrl}img_branddetails_backg.png") no-repeat 100% 100%;
                background-size: cover;
                padding-top: 32px;
                display: flex;
                
                .logo{
                   display: flex;
                   justify-content: center;
                    width: 72px;
                    .logoIcon{
                         width: 42px;
                        height: 42px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                }
                .title{
                    font-family: PingFang-SC-Bold;
                    font-weight:bold;

                }
            }
            
            .brandContent{
                position: relative;
                padding: 20px 25px;
                .icon{
                    width: 39px;
                    height: 36px;
                    background: url("#{$imgUrl}img_cornermark.png") no-repeat 100% 100%;
                    background-size: cover;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .textContent{
                    position: relative;
                     text-indent:26px;
                     font-size: 13px;
                     line-height: 22px;
                     color: #9a9a9a;
                    // overflow:hidden;
                    // text-overflow:ellipsis;
                    // display:-webkit-box;
                    // -webkit-box-orient:vertical;
                    // -webkit-line-clamp:4;
                   
                }
                 .clickMore{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        background: #fff;
                        .threeDots{
                            font-weight:bold;
                            position:absolute;
                            bottom:0;
                            color: #9a9a9a;
                            left:-30px;
                            padding-left:20px;
                            background: -webkit-linear-gradient(left, transparent, #fff 62%);
                            background: -o-linear-gradient(right, transparent, #fff 62%);
                            background: -moz-linear-gradient(right, transparent, #fff 62%);
                            background: linear-gradient(to right, transparent, #fff 62%);
                        }
                    }
               
            }
        }
        .brandList{
            padding: 20px 0;
            width: 100%;
            background:#fff;
           .otherShop{
               margin: 0 15px;
               margin-bottom: 15px;
           }
            .list{
               
                // background: #fff;
                .item{
                     margin: 0 15px;
                    margin-bottom: 10px;
                    height: 75px;
                    display: flex;
                    .logo{
                        height: 75px;
                        width: 140px;
                        border-radius: 3px;
                        overflow: hidden;
                        margin-right: 15px;
                    }
                    .shopDetail{
                        width: 190px;
                        .shopName{
                            width: 100%;
                        }
                        .adress{
                            transform:translateY(-5px);
                            >span{
                                color:#9a9a9a;
                                font-size: 12px;
                            }
                            width: 100%;
                            
                        }
                        .goShop{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            .shopClick{
                                width: 55px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                background: #f2f2f2;
                               
                            }
                            .hot{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            
                             .icon{
                                   
                                    width: 11px;
                                    height: 13px;
                                    background: url("#{$imgUrl}icon_degreeofheat.png") no-repeat 100% 100%;
                                    background-size: cover;
                                    
                                }
                            }
                        }
                        
                        
                    }
                }
            }

        }

    }
</style>
