<template>
    <div class="container " :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
       <div class="wraper">
           <div class="zan lineTop" @click="$router.push({ path: '/pagesSub/community/praise'})">
               <div class="zanIcon ico mr5">
                   <div class="brand" v-if="unreadlist.like>0">{{unreadlist.like>99?'99':unreadlist.like}}</div>
               </div>
               点赞
               <div class="iconArrow"></div>
           </div>
           <div class="comment lineTop" @click="$router.push({ path: '/pagesSub/community/commentlist'})">
               <div class="commentIcon ico mr5">
                   <div class="brand" v-if="unreadlist.comment>0">{{unreadlist.comment>99?'99':unreadlist.comment}}</div>
               </div>
               评论
               <div class="iconArrow"></div>
           </div>
           <div class="notice lineTop" @click="$router.push({ path: '/pagesSub/community/notice'})">
               <div class="noticeIcon ico mr5">
                   <div class="brand" v-if="unreadlist.system>0">{{unreadlist.system>99?'99':unreadlist.system}}</div>
               </div>
               通知
               <div class="iconArrow"></div>
           </div>
           <div class="attention lineTop" @click="$router.push({ path: '/pagesSub/community/attention'})">
               <div class="attentionIcon ico mr5">
                   <div class="brand" v-if="unreadlist.follow>0">{{unreadlist.follow>99?'99':unreadlist.follow}}</div>
               </div>
               关注
               <div class="iconArrow"></div>
           </div>
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
      unreadlist: [],
      setint: ""
    };
  },
  components: {
    isLoading
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  watch: {},
  methods: {
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    }
  },
  async mounted() {
    this.iphone_xsp();
    // let getNewsNumList = await this.$http.getNewsNumList(
    //   this.$store.state.user.userInfo.openId
    // );
    // this.unreadlist = getNewsNumList.unreadlist;

    // if (this.setint) return;
    // this.setint = setInterval(async () => {
    //   let getNewsNumList = await this.$http.getNewsNumList(
    //     this.$store.state.user.userInfo.openId
    //   );
    //   this.unreadlist = getNewsNumList.unreadlist;
    // }, 5000);
  },
  async onHide() {
    // clearInterval(this.setint);
    // this.setint = null;
  },

  async onShow() {
    let getNewsNumList = await this.$http.getNewsNumList(
      this.$store.state.user.userInfo.openId
    );
    this.unreadlist = getNewsNumList.unreadlist;
  }
};
</script>

<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  padding-bottom: 10px;
  padding-top: 1px;
  .wraper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 16px;
      height: 75px;
      .iconArrow {
        position: absolute;
        right: 15px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 12px;
        height: 12px;
        background: url("#{$imgUrl}icon_ret.png") no-repeat 100% 100%;
        background-size: contain;
      }
      .ico {
        width: 40px;
        height: 40px;
        margin-left: 15px;
        position: relative;
        .brand {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff455d;
          color: #fff;
          font-size: 12px;
          position: absolute;
          top: -3.5px;
          right: -3.5px;
          text-align: center;
          line-height: 16px;
        }
      }
      .zanIcon {
        background-image: url("#{$imgUrl}icon_zan.png");
      }
      .commentIcon {
        background-image: url("#{$imgUrl}icon_comments.png");
      }
      .noticeIcon {
        background-image: url("#{$imgUrl}icon_notices.png");
      }
      .attentionIcon {
        background-image: url("#{$imgUrl}icon_follow.png");
      }
    }
  }
}
</style>
