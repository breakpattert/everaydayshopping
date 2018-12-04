<template>
  <div class="container lineTop" :class="{'iphonebottom':iPhoneshow}">
    <isLoading :isLoading='isLoading'></isLoading>
    <div class="userInfoMain">
      <div class="theIcon">
        <img :src="personInfo.avatar" alt="" />
      </div>
      <div class="infoList">
        <ul>
          <li>
            <p class="color32 f14 bold">{{personInfo.likednum}}</p>
            <p class="color9a f12 mt3">被赞</p>
          </li>
          <li>
            <p class="color32 f14 bold">{{personInfo.fansnum}}</p>
            <p class="color9a f12 mt3">粉丝</p>
          </li>
          <li>
            <p class="color32 f14 bold">{{personInfo.follownum}}</p>
            <p class="color9a f12 mt3">关注</p>
          </li>
        </ul>
        <div v-if="isSelf" class="Recommen" @click="$router.push({ path: '/pagesSub/userInfo/userInfo' })">编辑个人资料</div>
        <div v-else class="userRecommen" @click="shopLike(0)">{{personInfo.isfollow?'已关注':'+关注'}}</div>
      </div>
    </div>
    <div class="userCharacter lineBottom">
      <h3 class="f16 color32">{{personInfo.name||personInfo.nickname}}</h3>
      <p class="f12" v-if="personInfo.type==1">
        <span class="m_ico"></span>天天认证:{{personInfo.goven_describe}}</p>
      <p class="f12">
        <span class="color9a f12">{{personInfo.self_describe?personInfo.self_describe:'该用户暂未设置个性签名'}}</span>
      </p>
    </div>
    <div class="articles">
      <div>
        <span class="color32 f16">文章</span>
        <span class="f12 color9a ml4">（{{ins}}）</span>
      </div>
      <div class="pageico" @click="tabIco" :class="{'pageico2':showIco}">
      </div>
    </div>
    <div class="allArticles w100">
      <div v-if="!showIco">
        <allList :textList='textList' :iStype='iStype' :isSelf="isSelf">
        </allList>

        <!--空页面-->
        <div class="mt10" v-if="textList.length>0">
          <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
          <zan-loadmore v-if="isBottom" type="text" text="暂无数据"></zan-loadmore>
        </div>
        <div v-if="textList.length<=0" class="empty5">
          <img src="../../../static/images/img_publish.png">
       
          <div>{{isSelf?'你':'他'}}还没有发布过文章哟o(∩_∩)o</div>
          <div class="empbutton" v-if="isSelf" @click="$router.push({path: '/pagesSub/community/experience'})">
            写文章
          </div>
        </div>
      </div>
      <div  v-if="showIco" class="w100">
        <focusList ref="focusList" type="personal" :authorOpenid="authorOpenid"></focusList>
      </div>
       
    </div>
  </div>
</template>
<script>
import focusList from "@/pagesCommunity/components/focusList";
import allList from "@/pagesCommunity/components/allList";
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getLocation
} from "@/utils/wechat";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
      iPhoneshow: false,
      showIco: false,
      personInfo: "",
      openId: "",
      textList: [],
      iStype: 0,
      page: 1,
      pagesize: 10,
      isBottom: false,
      ins: 0,
      memberId: null,
      authorOpenid: null,
      isSelf: false
    };
  },
  components: {
    focusList,
    allList,
    isLoading
  },
  methods: {
    tabIco() {
      this.showIco = !this.showIco;
    },
    async getPersonalInfo() {
      if (this.$store.state.user.loginStatus == false) {
        this.openId = "";
      } else {
        this.openId = this.$store.state.user.userInfo.openId;
      }
      let Data = await this.$http.getPersonalInfo(this.memberId, this.openId);
      this.personInfo = Data.memberdata;
      this.authorOpenid = Data.memberdata.author_openid;
      this.fllows = Data.memberdata.isfollow;
      if (Data.memberdata.author_openid == this.openId) {
        this.isSelf = true;
      } else {
        this.isSelf = false;
      }
    },
    // 关注点赞
    async shopLike(type) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      if (type == 0) {
        await this.$http.personalFllow(this.memberId, this.openId);
        this.getPersonalInfo();

        this.personInfo.isfollow = !this.personInfo.isfollow;
      }
    },
    async personalList() {
      // this.$store.commit("SET_IS_LOADING", false);
      // this.$store.commit("SET_IS_LOADING", true);
      let data = await this.$http.personalList(
        this.memberId,
        this.personInfo.author_openid,
        this.page,
        this.pagesize
      );
      if (!data.error) {
        if (
          data.list instanceof Array &&
          data.list.length > 0 &&
          data.list.length < this.pagesize
        ) {
          this.isBottom = true;
        }

        data.list && data.list.map(this._U.hasOverTime);
        this.textList = [...this.textList, ...data.list];
        // this.$store.commit("SET_IS_LOADING", false);
        this.page++;
      } else {
        console.log("加载失败");
      }
      this.ins = data.total;
    },
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    upDateSignature() {
      console.log(this.personInfo, " this.personInfo");
      // this.$bus.$off("upDateSignature");
      this.$bus.$on("upDateSignature", e => {
        if (e.signature) {
          this.personInfo.self_describe = e.signature;
        }
      });
    }
  },
  beforeDestroy() {
    this.$bus.$off("upDateSignature");
  },
  async mounted() {
    this.upDateSignature();
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  watch: {
    async memberId(v) {
      this.textList = [];
      this.personInfo = {};
      this.showIco = false;
      await this.getPersonalInfo();
      this.personalList();
    }
  },
  async onReachBottom() {
    if (!this.showIco) {
      if (this.isBottom) return;
      this.personalList();
    }
  },
  async onShow() {
    this.page = 1;
    this.pagesize = 10;
    this.iphone_xsp();
    this.memberId = this.$route.query.memberid;
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") +
        "给您分享天天逛街精美文章" +
        options.target.dataset.title,
      path:
        "/pagesSub/community/communitydetail?id=" +
        options.target.dataset.id +
        "&memberid=" +
        options.target.dataset.memberid
    };
  }
};
</script>
<style scoped>
.container >>> .focusMains {
  margin-top: 0px !important;
}
.container >>> .mainBox {
  margin-top: 0;
}
</style>
<style scoped lang='scss'>
.iphonebottom {
  margin-bottom: 34px !important;
}
.container {
  background-color: #f2f2f2;

  .userInfoMain {
    background: #fff;

    width: 100%;
    padding: 13px 6px 13px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 106px;
    .theIcon {
      width: 84px;
      height: 84px;

      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .infoList {
      height: 100%;
      width: 236px;
      position: relative;
      > ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row-reverse;
        li {
          padding: 0 20px;
          text-align: center;
        }
      }
      .userRecommen {
        width: 56px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #ff455d;
        border-radius: 12px;
        color: #fff;
        position: absolute;
        right: 15px;
        bottom: 2px;
      }
      .Recommen {
        width: 164px;
        height: 24px;
        border-radius: 12px;
        border: solid 1px #323232;
        color: #323232;
        font-size: 14px;
        position: absolute;
        right: 15px;
        bottom: 2px;
        text-align: center;
      }
    }
  }
  .userCharacter {
    background: #fff;

    width: 100%;
    padding: 0 15px;
    padding-bottom: 13px;
    h3 {
      text-align: left;
      padding-bottom: 8px;
    }
    p {
      text-align: left;
      color: #656464;
      .m_ico {
        width: 11px;
        height: 11px;
        margin-right: 3px;
        display: inline-block;
        background: url("#{$imgUrl}icon_authentication@2x.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
  }

  .articles {
    height: 46px;
    line-height: 46px;
    width: 100%;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .pageico {
      width: 18px;
      height: 15px;
      background: url("#{$imgUrl}icon_transformation.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
    .pageico2 {
      width: 18px;
      height: 15px;
      background: url("#{$imgUrl}icon_transformation1.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
}
</style>