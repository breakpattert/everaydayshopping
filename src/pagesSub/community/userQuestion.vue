<template>
<div class="container" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
  <div class="feedback" v-if="!showpublice">
    <div class="textarea lineBottom">
        <textarea placeholder="提出问题，让大家给你推荐什么值得买吧，并使用句号结尾哦~" maxlength='200' @input="descInput" v-model="feedbackDesc"></textarea>
        <div class="fontNum">{{remFont}}/200</div>
    </div>
    <div class="main_large_btn mt30 f18" @click="nextsub">下一步</div>
  </div>
  <div class="feedback" v-if="showpublice">
    <div class="textarea lineBottom">
        <textarea placeholder="请填写问题相关描述信息（选填）" maxlength='200' @input="descInput2" v-model="feedbackDescdetil"></textarea>
        <div class="fontNum">{{remFont2}}/200</div>
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
      feedbackDesc: "",
      iPhoneshow: false,
      iphoneheight: "",
      remFont: 200,
      remFont2: 200,
      showpublice: false,
      feedbackDescdetil: ""
    };
  },
  components: {},
  created() {},
  methods: {
    //下一步
    nextsub() {
      this.showpublice = true;
    },
    //提交
    async feedbackSubmit(e) {
      if (!this.feedbackDesc) {
        this.$tips.alert("请输入回答描述");
        return;
      }
      let that = this;
      //    this.$store.state.user.userInfo.openid
      //    let openId = 'sns_wa_oUnEr5PG1_Uo6Eti6WxT5joZgV3A'
      await this.$http
        .postQuestion(
          this.$store.state.user.userInfo.openid,
          this.feedbackDesc,
          this.feedbackDescdetil
        )
        .then(function(res) {
          if (res.result == true) {
            that.$tips.toast("回答成功");
            setTimeout(function() {
              that.feedbackDesc = "";
              that.feedbackDescdetil = "";
              this.$bus.$emit("upDateAskList");
              that.$router.back();
            }, 1000);
          } else {
            that.$tips.toast(res.message || "提交失败");
          }
        });
    },
    descInput() {
      this.remFont = 200 - this.feedbackDesc.length;
    },
    descInput2() {
      this.remFont2 = 200 - this.feedbackDescdetil.length;
    }
  },
  async onShow() {
    this.showpublice = false;
    this.feedbackDesc = "";
    this.feedbackDescdetil = "";
  },
  async mounted() {
    const systemInfo = getSystemInfoSync();
    if (systemInfo.model == "iPhone X") {
      this.windowHeight = systemInfo.windowHeight - 34;
    } else {
      this.windowHeight = systemInfo.windowHeight;
    }
  }
};
</script>
<style scoped lang='scss'>
.container {
  background: #fff;
  .feedback {
    width: 100%;
    background: #fff;
    .textarea {
      width: 100%;
      height: 200px;
      background-color: #fff;
      border-radius: 2px;

      padding: 12px 15px;
      box-sizing: border-box;
      position: relative;
      > textarea {
        font-size: 14px;
        // color:#FFB7B7B7;
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
  }
}
</style>
