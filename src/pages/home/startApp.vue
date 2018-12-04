<template>
  <div class="container">
    <button class="startApp" v-if="!isHasauth" style="z-index:9" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo"  >
    </button> 
    <div class="startApp" v-if="isHasauth" @click="goHome">

    </div>
  </div>
</template>
<script>
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  set,
  get,
  clear
} from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isHasauth: false
    };
  },
  methods: {
    ...mapActions(["getUserInfo", "getAllProducts"]),
    async bindGetUserInfo({ mp }) {
      const { detail } = mp;

      if (detail.rawData) {
        // console.log("快捷登录")
        const encryptedData = detail.encryptedData;
        const iv = detail.iv;
        this.user_Info = detail.userInfo;
        await this.getUserInfo();

        const userInfo = this.$store.state.user.userInfo;
        let authInfo = "";

        try {
          authInfo = await this.$http.doAuth(
            userInfo.openid,
            encryptedData,
            iv,
            userInfo.session_key,
            userInfo.authkey
          );
        } catch (error) {
          this.$tips.alert(error);
        }

        authInfo["openid"] = "sns_wa_" + authInfo.openId;
        authInfo.openId = "sns_wa_" + authInfo.openId;

        this.$store.commit("SET_HANDLE_LOGIN_OUT", false);
        this.$store.commit("SET_USER_INFO", authInfo);
        this.$store.commit("SET_DO_AUTH", true);
        this.$store.commit("SET_LOGIN_STATUS", "wx");
        this.isNoticeAuth = true;
        clear();

        set("userInfo", authInfo, 2592000000);
        set("handleLoginOut", false, 2592000000);
        set("loginStatus", "wx", 2592000000);

        if (authInfo) {
          this.$router.push({ path: "/pages/home/home", isTab: true });
        }
      } else {
        console.log("用户按了拒绝按钮");
        return;
      }
    },
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
      this.isHasauth = true;
      console.log("用户已经授权过");

      this.$store.commit("SET_LOGIN_STATUS", "wx");

      await this.getAuthInfo();
      this.$router.push({ path: "/pages/home/home", isTab: true });
    },
    async goHome() {
      await this.getAuthInfo();
      this.$router.push({ path: "/pages/home/home", isTab: true });
    },
    async getAuthInfo() {
      if (!this.$store.state.user.userInfo) {
        await this.getUserInfo();
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

      if (authInfo.error !== 0) {
        this.$store.commit("SET_HANDLE_LOGIN_OUT", get("handleLoginOut"));
        this.$store.commit("SET_USER_INFO", get("userInfo"));
        this.$store.commit("SET_LOGIN_STATUS", get("loginStatus"));
        return;
      }
      authInfo.openId = "sns_wa_" + authInfo.openId;
      authInfo["openid"] = authInfo.openId;

      this.$store.commit("SET_USER_INFO", authInfo);
      this.$store.commit("SET_DO_AUTH", true);
      this.user_Info = authInfo;
    }
  },

  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街附近商场...",
      path: this.$route.fullPath
    };
  },
  async onReachBottom() {},
  async onShow() {
    this.hasauth();
  }
};
</script>

<style scoped lang='scss'>
.container {
  .startApp {
    width: 100%;
    height: 100vh;
    display: block;
    background: url("#{$imgUrl}img_backgroud.png") no-repeat center center;
    background-size: cover;
    border-radius: 0px;
    padding: 0;
    position: relative;
  }
}
</style>