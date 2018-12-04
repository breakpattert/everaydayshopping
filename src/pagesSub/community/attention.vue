<template>
    <div class="container" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
       
        <div class="attention" v-if="list1.length>0">
            <div class="item lineTop" v-for="(item,index) in list1" :key="index">
                <div class="averterName">
                    <img class="averter" :src="item.avatar" alt="">
                  <!-- <open-data class="averter" type="userAvatarUrl"></open-data> -->

                    <div class="nikename">
                        <div class="name f14 ">
                           {{item.nickname}}
                        </div>
                        <div class="time f11 color9a mt2">{{item.createtime}}</div>
                    </div>
                </div>
                <div class="isAttention" v-if="!item.isfollow" @click="followPerson(item.isfollow,item.senderid,index)">
                    关注
                </div>
                <div class="hasAttention" v-if="item.isfollow" @click="followPerson(item.isfollow,item.senderid,index)">
                    已关注
                </div>
            </div>
            
        </div>
        <div class="mt10" v-if="list1&&list1.length>0">
                        <zan-loadmore v-if="!isBottom1" type="loading"></zan-loadmore>
                        <zan-loadmore v-if="isBottom1" type="text" text="暂无数据"></zan-loadmore>
            </div>
         <div class="empty3"  v-if="list1.length<=0">
                <img src="../../../static/images/img_focus.png">
                <div>您还没有被关注过哟o(∩_∩)o</div>
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
      page1: 1,
      prePage: 10,
      isBottom1: false,
      list1: []
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
    },
    async getMore() {
      if (this.isBottom1) return;
      let result1 = await this._to(
        this.$http.getSingleNews(
          "follow",
          this.$store.state.user.userInfo.openId,
          this.page1,
          this.prePage
        )
      );

      if (result1[1].error == 0) {
        if (result1[1].list instanceof Array) {
          if (result1[1].list.length < this.prePage) {
            this.isBottom1 = true;
          }
          result1[1].list.map(this._U.hasOverTime);
          this.list1 = [...this.list1, ...result1[1].list];
          this.page1++;
        }
      } else {
        console.log("加载失败");
      }
    },
    async followPerson(isfollow, memberid, index) {
      let data = await this.$http.personalFllow(
        memberid,
        this.$store.state.user.userInfo.openId
      );
      if (data.error == 0) {
        this.list1[index].isfollow = !isfollow;
        if (isfollow) {
          this.$tips.toast("关注成功");
        } else {
          this.$tips.toast("取消关注");
        }
      } else {
        this.$tips.toast(data.message, function() {}, "none", 1000);
      }
    }
  },
  async onReachBottom() {
    this.loadMoreTxt = "拼命加载中";
    this.getMore();
  },
  async mounted() {
    this.getMore();
    this.iphone_xsp();
  },

  onShow() {}
};
</script>

<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  padding-bottom: 10px;
  padding-top: 1px;
  .attention {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 60px;
      .averterName {
        margin-left: 15px;
        height: 100%;
        display: flex;
        align-items: center;
        .averter {
          width: 37px;
          height: 37px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .nikename {
          display: flex;
          justify-content: center;
          flex-direction: column;

          height: 100%;
        }
      }
      .isAttention {
        width: 54px;
        height: 26px;
        background: #ff455d;
        color: #fff;
        line-height: 26px;
        text-align: center;
        font-style: 14px;
        margin-right: 15px;
        border-radius: 5px;
      }
      .hasAttention {
        width: 54px;
        height: 26px;
        border: 0.5px solid #b7b7b7;
        color: #b7b7b7;
        line-height: 26px;
        text-align: center;
        font-style: 14px;
        margin-right: 15px;
        border-radius: 5px;
      }
    }
  }
}
</style>
