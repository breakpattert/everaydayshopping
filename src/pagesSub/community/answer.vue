<template>
<div class="container" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
  <div class="feedback">
    <textarea v-model="feedbackDesc" placeholder="写下你的答案，笔触专业，条理清晰更能获得活人的青睐哟~"></textarea>
    <div class="imgContainer">
      <div class="imgitem" v-for="(item,index) in feedbackImgs" :key="index" :style="{backgroundImage:'url(' + item + ')'}">
      </div>
      <div v-if="feedbackImgs&&feedbackImgs.length<3" class="imgitem imgitem2" @click="addImg">
      	<span>添加照片</span>
      </div>      
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
      windowHeight: 0,
      openId: null,
      questionid: "",
      feedbackDesc: "",
      feedbackImgs: [],
      iPhoneshow: false,
      iphoneheight: ""
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
          });
        });
      } else {
        chooseImage("camera").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data => {
            this.feedbackImgs.push(JSON.parse(data.data).result.url);
          });
        });
      }
    },
    //提交
    async feedbackSubmit(e) {
      if (!this.feedbackDesc) {
        this.$tips.alert("请输入回答描述");
        return;
      }

      await this.$http
        .postAnswer(
          this.openId,
          this.questionid,
          this.feedbackDesc,
          this.feedbackImgs
        )
        .then(res => {
          if (!res.error) {
            this.$tips.toast("回答成功");
            this.$bus.$emit("answerNum", { id: this.questionid, type: 1 });

            setTimeout(() => {
              this.feedbackDesc = "";
              this.feedbackImgs = [];
              this.$router.back();
            }, 1000);
          } else {
            this.$tips.toast(res.message || "提交失败");
          }
        });
    }
  },
  async onShow() {},
  async mounted() {
    const systemInfo = getSystemInfoSync();
    if (systemInfo.model == "iPhone X") {
      this.windowHeight = systemInfo.windowHeight - 34;
    } else {
      this.windowHeight = systemInfo.windowHeight;
    }

    this.openId = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openId
      : "";
    this.questionid = this.$route.query.id;
  }
};
</script>
<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  .feedback {
    width: 100%;
    background: #f2f2f2;
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
    textarea {
      display: block;
      width: 100%;
      height: 150px;
      padding: 12px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
      font-size: 14px;
    }
    .rich-text {
      display: block;
      width: 100%;
      margin-top: 15px;
      height: 150px;
      padding: 12px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
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
      padding: 30px 15px;

      display: flex;
      .imgitem {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        background: #ffffff url(#{$imgUrl}icon_upload.png) no-repeat center
          center;
        background-size: contain;
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
