<template>
  <div class="container" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <div class="feedback">
      <div class="imgContainer">
        <div class="imgitem" v-for="(item,index) in feedbackImgs" :key="index" :style="{backgroundImage:'url(' + item + ')'}">
        </div>
        <div v-if="feedbackImgs&&feedbackImgs.length<3" class="imgitem imgitem2" @click="addImg">
          <span>添加照片</span>
        </div>
      </div>
      <div class="titileInput lineBottom">
        <input type="text" v-model="exTitle" placeholder="添加标题">
      </div>
      <div class="textarea lineBottom">
        <textarea placeholder="写下你的心得吧..." maxlength='200' @input="descInput" v-model="feedbackDesc"></textarea>
        <div class="fontNum">{{remFont}}/200</div>
      </div>
      <div class="allspan lineBottom" v-if="tags.length==0" @click='$router.push({path: "/pagesSub/community/labelSearch"})'>
        <div></div>
        <p class="f16 color9a">添加标签(让更多人看到你）</p>
      </div>
      <div class="allspan lineBottom flex" v-else @click='$router.push({path: "/pagesSub/community/labelSearch"})'>
        <scroll-view class="scroll-view_H" scroll-x>
          <view class="item f16 color32" v-for="(item,index) in tags" :key='index'>
              # {{item.name}}        
          </view>
        </scroll-view>
      </div>
      <div class="main_large_btn mt30 f18" @click="feedbackSubmit">发布</div>
    </div>
  </div>
</template>
<script>
import { getSystemInfoSync } from "@/utils/wechat";
import { uploadFile, chooseImage, showActionSheet } from "@/utils/wechat";
export default {
  data() {
    return {
      openId:null,
      windowHeight: 0,      
      iPhoneshow: false,
      iphoneheight: "",
      remFont: 200,
      feedbackDesc: "",
      feedbackImgs: [],
      exTitle: "",
      tags:[],
    };
  },
  components: {},
  created() {},
  methods: {
    //添加多张图片
    async addImg(e) {
      const [err, res] = await this._to(
        showActionSheet(["从相册中选择", "拍照"])
      );
      if (res == 0) {
        chooseImage("album").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data => {
            this.feedbackImgs.push(JSON.parse(data.data).result.url);
            console.log(this.feedbackImgs);
          });
        });
      } else if (res == 1) {
        chooseImage("camera").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data => {
            this.feedbackImgs.push(JSON.parse(data.data).result.url);
          });
        });
      }
      console.log(this.feedbackImgs, 888);
    },
    //提交
    async feedbackSubmit(e) {
      if (this.feedbackImgs.length==0) {
        this.$tips.alert("请添加照片");
        return;
      }

      if (!this.exTitle) {
        this.$tips.alert("请输入心得标题");
        return;
      }

      if (!this.feedbackDesc) {
        this.$tips.alert("请输入心得描述");
        return;
      }

      let tagsStringId=this.tags.map(val=>{
        return val.id;
      });

      let that = this;
      await this.$http
        .postFeeling(this.exTitle, this.feedbackImgs.join(","), this.feedbackDesc, tagsStringId, this.openId)
        .then(function(res) {
          if (!res.error) {
            that.$tips.toast("发布成功");
            setTimeout(function() {
              that.feedbackDesc= "";
              that.feedbackImgs= [];
              that.exTitle= "";
              that.tags=[];
              that.$store.commit("SET_IS_RESULT",that.tags);
              that.$router.back();
            }, 1000);
          } else {
            that.$tips.toast(res.msg || "提交失败");
          }
        });
    },
    descInput() {
      this.remFont = 200 - this.feedbackDesc.length;
    }
  },
  async onShow() {
    this.tags=this.$store.state.user.resultList||[];
  },
  async mounted() {
    const systemInfo = getSystemInfoSync();
    if (systemInfo.model == "iPhone X") {
      this.windowHeight = systemInfo.windowHeight - 34;
    } else {
      this.windowHeight = systemInfo.windowHeight;
    }

    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "sns_wa_oUnEr5GA3q-i17_y18F8nMGNKGOU";
  }
};
</script>
<style scoped lang='scss'>
.container {
  background: #fff;
  .scroll-view_H {
    margin: 0 auto;
    white-space: nowrap;
    line-height: 30px;
    height: 30px;
    width: 100%;
    white-space: nowrap;
    font-size: 0;
    line-height: 0;
    .item {
      display: inline-block;
      margin-right: 15px;
      height: 30px !important;
      overflow: hidden;
      line-height: 30px;
      position: relative;
    }
  }
  .feedback {
    width: 100%;
    background: #fff;
    p {
      margin-top: 24px;
      font-size: 14px;
      line-height: 1;
    }
    .p2 {
      margin-top: 10px;
      font-size: 12px;
      color: #9a9a9a;
    }

    input {
      display: block;
      width: 100%;
      margin-top: 15px;
      height: 40px;
      padding: 0 12px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
    }
    .nobg {
      background: transparent;
    }
    .arrowdown {
      background-color: #ffffff;
      background-image: url(#{$imgUrl}img_cut.png);
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 12px auto;
    }
    .textarea {
      width: 100%;
      height: 200px;
      background-color: #fff;
      border-radius: 2px;

      padding: 12px 15px;
      box-sizing: border-box;
      position: relative;
      > textarea {
        font-size: 16px;
        width: 100%;
        height: 100%;
      }
      .fontNum {
        position: absolute;
        right: 12px;
        bottom: 9px;
        font-size: 14px;
        color: #323232;
      }
    }
    .titileInput {
      input {
        margin-top: 0;
        color: #323232;
        font-size: 16px;
        padding: 0 15px;
      }
    }
    .allspan {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 50px;
      padding: 0 15px;
      > div {
        width: 20px;
        height: 20px;
        background: #ffffff url(#{$imgUrl}icon_add.png) no-repeat center center;
        background-size: contain;
        margin-right: 11px;
      }
      > p {
        margin-top: 0;
      }
    }
    input:after {
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
      border: 0 solid #e8e8e8;
      border-width: 2rpx;
      border-radius: 20rpx;
    }
    textarea:after {
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
      border: 0;
      border-width: 2rpx;
      border-radius: 20rpx;
    }
    .imgContainer {
      background: #fff;
      padding: 15px 15px;

      display: flex;
      .imgitem {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        margin-right: 10px;
        background: #ffffff url(#{$imgUrl}icon_upload.png) no-repeat center
          center;
        background-size: cover;
      }
      .imgitem2 {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        background: #ffffff url(#{$imgUrl}img_addphoto.png) no-repeat center
          center;
        background-size: contain;
        position: relative;
        span {
          position: absolute;
          bottom: 8px;
          left: 10px;
          right: 10px;
          color: #404040;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
  .popup {
    display: block;
    width: 280px;
    max-height: 600px;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
    padding: 0 15px;
    h3 {
      line-height: 45px;
      font-size: 18px;
    }
  }

  .item {
    position: relative;
    height: 45px;
    display: flex;
    align-items: center;
    .left {
      width: 0%;
      -webkit-flex: 1;
      flex: 1;
      font-size: 16px;
      color: #9a9a9a;
    }
    .right {
      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(#{$imgUrl}icon_wxz.png) no-repeat center center;
        background-size: cover;
      }
    }
  }
  .item.active span {
    background: url(#{$imgUrl}icon_choose.png) no-repeat center center;
    background-size: cover;
  }
  .item.active .left {
    color: #ff455d;
  }
}
</style>
