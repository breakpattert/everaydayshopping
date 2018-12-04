<template>
  <div class="container lineTop">
  	<div class="w100 mains">
			<h4 class="f12 color9a">有趣的个人介绍会吸引更多的粉丝喔</h4>
			
	    <div class="textarea">
        <textarea maxlength='200' @input="descInput" v-model="signature"></textarea>
        <div class="fontNum">{{remFont}}/200</div>
    	</div>
    	<div class="newAress f14" @click="upDateSignature" :class="{'iphonex2':iPhoneshow}">确认修改</div>
		</div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      remFont: 200,
      desc: "",
      iPhoneshow: false,
      signature: ""
    };
  },
  methods: {
    descInput() {
      this.remFont = 200 - this.signature.length;
    },
    upDate() {
      console.log("修改成功");
    },
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    async upDateSignature() {
      let res = await this.$http.upDateSignature(
        this.$store.state.user.userInfo.openId,
        this.signature
      );

      if (res.error == 0) {
        this.$tips.toast("修改成功", () => {
          this.$bus.$emit("upDateSignature", { signature: this.signature });
          this.$router.back();
        });
      } else {
        this.$tips.toast("修改失败", () => {});
      }
    }
  },
  computed: {},
  mounted() {},
  async onShow() {
    this.iphone_xsp();
    this.signature = this.$route.query.signature;
  }
};
</script>
<style  scoped lang='scss'>
.container {
  background: #f2f2f2;
  .mains {
    h4 {
      text-align: left;
      padding: 7.5px;
    }
    .textarea {
      width: 100%;
      height: 200px;
      background-color: #fff;
      border-radius: 2px;

      padding: 12px;
      box-sizing: border-box;
      position: relative;
      > textarea {
        width: 100%;
        height: 100%;
      }
      .fontNum {
        position: absolute;
        right: 12px;
        bottom: 9px;
        font-size: 10px;
        color: #b7b7b7;
      }
    }
    .newAress {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background: #ff455d;
      text-align: center;
      display: block !important;
      position: fixed;
      bottom: 0px;
    }
    .iphonex2 {
      bottom: 34px;
    }
  }
}
</style>
