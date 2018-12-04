<template>
   <div class="w100 mainBox">  
   	<slot></slot>
		<div class="likeAll" id="item2">
              <div class="w100">
                <div class="w100 item-wrap active_f">
                  <div class="active_box1">
                    <div class="item active_fiex" v-for="(item,index) in cover_img" :key="index" v-if="index%2 !==1">
                      <div class="item_box_1">
                        <a href="">
                          <wux-image wux-class="image" :src="item">
                          </wux-image>
                        </a>
                        <div class="item_text item_text2">
                           	美女一枚送给你，走过路过不要错过
                        
                        </div>
                        <div class="item_ico flex flex_hc">
                          <div class="lis_1">
                            <img  src="../../../static/images/icon_official.png" alt="" />
                          </div>
                          <p class="f12 flex1">讯商好货推荐</p>
                          <div class="lis_2 flex flex_hc">
                            <span class="ico"></span>
                            <i class="f10">100</i>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!--官方推荐样式-->
                    <div class="item active_fiex offiCial" v-for="(item,index) in cover_img" :key="index" v-if="index%2 !==1">
                      <div class="item_box_1">
                        <div class="offiCialImg">
                          <wux-image wux-class="image" :src="item">
                          </wux-image>
                        </div>
                        <div class="offiCialText">
                        	<p class="f12 color32">讯商好货推荐</p>
                        	<div class="textTitle color9a f11 mt6 mb6">
          					 美女一枚送给你，走过路过不要错过
      
                        	</div>
                        	<div class="offiCialGo">
                        		去看看>
                        	</div>
                        	<div class="headerIco">
                        		<img src="../../../static/images/icon_official.png" alt="" />
                        		<span></span>
                        	</div>
                        </div>
                
                  
                      </div>
                    </div>
                   	

                  </div>
                  <div class="active_box2">
                    <div class="item active_fiex" v-for="(item,index) in cover_img" :key="index" v-if="index%2 ==1">
                      <div class="item_box">
                       
                        <a href="">
                          <wux-image wux-class="image" :src="item">
                          </wux-image>
                        </a>
                        <div class="item_text item_text2">
          					 美女一枚送给你，走过路过不要错过
      
                        </div>
                        <div class="item_ico flex flex_hc">
                          <div class="lis_1">
                            <img  src="../../../static/images/icon_official.png" alt="" />
                          </div>
                          <p class="f12 flex1">讯商好货推荐</p>
                          <div class="lis_2 flex flex_hc">
                            <span class="ico"></span>
                            <i class="f10">999+</i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--官方推荐-->
                    <div class="item active_fiex offiCial" v-for="(item,index) in cover_img" :key="index" v-if="index%2 ==1">
                      <div class="item_box">
                      	<div class="offiCialImg">
                          <wux-image wux-class="image" :src="item">
                          </wux-image>
                        </div>
                        <div class="offiCialText">
                        	<p class="f12 color32">讯商好货推荐</p>
                        	<div class="textTitle color9a f11 mt6 mb6">
          					 美女一枚送给你，走过路过不要错过
      
                        	</div>
                        	<div class="offiCialGo">
                        		去看看>
                        	</div>
                        	<div class="headerIco">
                        		<img src="../../../static/images/icon_official.png" alt="" />
                        		<span></span>
                        	</div>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
              <div class="empty3" v-if="false">
                <img src="../../../static/images/img_focus.png">
                <div>您还没有收藏过穿搭哟o(∩_∩)o</div>
              </div>
            </div>
                     
  
   </div>
</template>
<script>
export default {
props: [
'types',
'allList'
],
    data() {
      return {
      	cover_img:[
				'https://sh.szwfy.com.cn/attachment/images/3/2018/09/B3Z3plH3S4X48KXf3x396rkszKV9uk.jpg',
				'https://sh.szwfy.com.cn/attachment/images/3/2018/10/Nwj6yZXeakH0X6gJ5aEA6hyhKqwxk8.jpg'
		],
   		swiperCurrent: 0,
   		autoplay: true,
   		interval: 3000,
   		duration: 1000,
      };
   },
   async onShow(){

   },
   created() {

  },
  methods: { 
        bannerSwiperChange(e) {
			  this.swiperCurrent = e.mp.detail.current;
		}
  },
  computed: {
  
  },
  mounted() {
  	
  }
};
</script>
<style  scoped lang='scss'>
         #item2 {
             	margin-bottom:36px;
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


              }
              .item_ico {
                padding:0 6px 5px 6px;
                height: 30px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                position: relative;
                line-height: 30px;

                .lis_1 {
                	margin-right:6px;
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
					background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100% 100%;
					background-size: cover;
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
           		padding-right:4px;
           		padding-bottom: 8px;
              .item_box_1 {
                position:relative;
                border-radius: 5px;
                background: #fff;
                overflow: hidden;
                box-shadow: 0px 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);
                
                .item_text2 {
                  width: 100%;
                  height: auto;

                }
                .item_ico {
                  padding:0px 6px 5px 6px;
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
                      margin-right:6px;
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
                    justify-content:flex-end;
                    span {
	                    display: inline-block;
	                    margin-right: 5px;
	                    position:relative;
	                    width: 11px;
						height: 12px;
						background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100% 100%;
						background-size: cover;
                    }
                    i {
                      display: inline-block;
                      color: #9a9a9a;
                    }
                  }
                }
              }
            }
            /*官方样式*/
           .offiCial{
           		.item_box_1{
           			.offiCialImg{
           				width:100%;
           				height:169px;
           			}
           			.offiCialText{
           				position: relative;
           				padding:20px 14px 10px 14px;
           				p{
           					line-height: 15px;
           					text-align: center;
           				}
           				.offiCialGo{
           					width: 55px;
							height: 19px;
							border-radius: 10px;
							border: solid 1px #ff455d;
							font-family: PingFang-SC-Medium;
							font-size: 12px;
							text-align: center;
							color: #ff455d;
							margin:0 auto;

           				}
           				.headerIco{
           					border-radius: 50%;
           					position: absolute;
           					top:-17px;
           					left:0px;
           					right:0px;
           					margin:auto;
           					width:34px;
           					height:34px;
           					
           					img{
           						width:100%;
           						height:100%;
           						border-radius: 50%;
           					}
           					span{
           						display: inline-block;
           						width:11px;
           						height:11px;
           						background: url("#{$imgUrl}icon_authentication@2x.png") no-repeat center center;
								background-size: 100% 100%;
								position: absolute;
								right:0px;
								bottom:0px;
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
            .active_fiex{
            	padding-left:4px;
            	padding-bottom:8px;
            }
            .offiCial{
            	  .item_box{
           			.offiCialImg{
           				width:100%;
           				height:169px;
           			}
           			.offiCialText{
           				position: relative;
           				padding:20px 14px 10px 14px;
           				p{
           					line-height: 15px;
           					text-align: center;
           				}
           				.offiCialGo{
           					width: 55px;
							height: 19px;
							border-radius: 10px;
							border: solid 1px #ff455d;
							font-family: PingFang-SC-Medium;
							font-size: 12px;
							text-align: center;
							color: #ff455d;
							margin:0 auto;

           				}
           				.headerIco{
           					border-radius: 50%;
           					position: absolute;
           					top:-17px;
           					left:0px;
           					right:0px;
           					margin:auto;
           					width:34px;
           					height:34px;
           					
           					img{
           						width:100%;
           						height:100%;
           						border-radius: 50%;
           					}
           					span{
           						display: inline-block;
           						width:11px;
           						height:11px;
           						background: url("#{$imgUrl}icon_authentication@2x.png") no-repeat center center;
								background-size: 100% 100%;
								position: absolute;
								right:0px;
								bottom:0px;
           					}
           					
           				}
           			}
           		}
            }
          }
        }
      }



</style>
