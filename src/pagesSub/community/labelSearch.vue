<template>
<div class="container">
		<div class="headerMains">
		  <div class="searchBox" :class="{'searchBox_bgc':!showresult}">
		  <span class="searchIcon mr15"></span>
		  <input type="text" class="search" placeholder-class="placeholder" @input="searchs()" @confirm="searchs" confirm-type="search" :placeholder="placeholder_2" v-model="userword">
		</div>
		<div class="laberButton">
			  <div class="weekContent hotContent">
                <scroll-view class="scroll-view_H" scroll-x>
                  <view class="item" v-for="(item,index) in labelList" :key='index'>
                  		<div class="itemButton" @click="removeLabel(index)">
                  			<span>{{item.name}}</span>
                  			<span class="delButton"></span>
                  		</div>
                  		
                    
                  </view>
                </scroll-view>
        	 </div>
		</div>
	
	</div>
	
		<div class="buttonList mt10">
			<div class="listbut_1" v-if="!showresult">
				<p>推荐标签</p>
				<div class="recommentButton" v-for="(item,index) in allLabList" @click="poinLabel(item)" :key="index">
					<span class="colorf45d f16 bold"># </span>
					<span class="color32 f16 bold">{{item.name}}</span>
				</div>
			</div>
			<div class="listbut_1" v-if="showresult">
				<p>搜索结果</p>
				<div class="recommentButton flex flex_hc" v-for="(item,index) in searchListLab" :key="index" @click="creatLable" v-if="index==0&&item.id==''&&item.name==userword">
					<div class="flex1">
						<span class="colorf45d f16 bold"># </span>
						<span class="color32 f16 bold">{{item.name}}</span>
					</div>	
					<div class="color9a f12">创建</div>
				</div>
				<div class="recommentButton flex flex_hc" v-for="(item,index) in searchListLab" :key="index" @click="poinLabel(item)" v-if="item.id!=''">
					<div class="flex1">
						<span class="colorf45d f16 bold"># </span>
						<span class="color32 f16 bold">{{item.name}}</span>
					</div>
				</div>
			</div>
		</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userword: "",
      placeholder_2: "搜索话题",
      openid: "sns_wa_oUnEr5ALt3sAJwA2tLMT_Ez7S-EU",
      allLabList: [],
      searchListLab: [],
      showresult: false,
      labelList: []
    };
  },
  components: {},
  created() {},
  methods: {
    async LabList() {
      let result = await this.$http.recommentLabList(
        1,
        this.$store.state.user.userInfo.openid
      );
      this.allLabList = result.list;
      console.log(this.allLabList);
    },

    async searchs() {
      this.showresult = true;
      if (this.userword.replace(/\s+/g, "") == "") {
        this.$tips.toast("搜索内容不能为空哟..", function() {}, "none", 2000);
        return false;
      } else {
        let result = await this.$http.searchTag(
          this.userword,
          this.$store.state.user.userInfo.openid
        );

				this.searchListLab = this._U.uniqueArrObj([{
					createtime:parseInt(new Date().getTime() / 1000),
					enabled:"1",
					id:'',
					name:this.userword,
					recommend:"1",
					uniacid:"3"
				}, ...result.list], "name");
      }
    },
    poinLabel(item) {
			this.labelList = this._U.uniqueArrObj([item, ...this.labelList], "id");
			let labelList = this.labelList.slice()
      this.$store.commit("SET_IS_RESULT", labelList);
    },
    removeLabel(index) {
			let labelList = this.labelList.slice()
			labelList.splice(index, 1);
			this.labelList=labelList;
      this.$store.commit("SET_IS_RESULT", labelList);
		},
		async creatLable(){
			let result = await this.$http.creatLabel(
				this.$store.state.user.userInfo.openid,
				this.userword
			);

			this.searchListLab[0]['id']=result.msg;
			this.poinLabel(this.searchListLab[0])
		}
  },
  async onShow() {
    this.LabList();
    if (this.$store.state.user.resultList.length > 0) {
      this.labelList = this.$store.state.user.resultList;
    } else {
      this.labelList = [];
    }
  },
  async mounted() {}
};
</script>
<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  .headerMains {
    width: 100%;
    /*height:93px;*/
    padding-bottom: 10px;
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .searchBox {
      background: #fff;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      width: 345px;
      border-right: 0;
      padding-left: 14px;
      position: relative;
      border-radius: 30px;
      border: 0.5px solid #b7b7b7;
      .searchIcon {
        display: inline-block;
        width: 13.5px;
        height: 14px;
        background: url("#{$imgUrl}search.png") no-repeat center center;
        background-size: cover;
        vertical-align: middle;
      }
      .search {
        display: inline-block;
        width: 238px;
        height: 15px !important;
        color: #323232;
        vertical-align: middle;
      }
    }
    .laberButton {
      /*	  	height:32px;*/
      width: 100%;
      margin-top: 13px;
      padding: 0 15px;

      .weekContent {
        overflow: hidden;
        /*    height: 30px;*/
        width: 100%;
        .scroll-view_H {
          margin: 0 auto;
          white-space: nowrap;
          line-height: 30px;

          width: 100%;
          white-space: nowrap;
          font-size: 14;
          line-height: 0;
          /*.item:first-child {
		        margin-left: 15px;
		      }*/

          .item {
            display: inline-block;
            margin-right: 5px;
            /* width: 170px !important;*/
            height: 30px !important;
            overflow: hidden;
            line-height: 1;
            position: relative;

            .itemButton {
              padding: 0 10px;
              height: 30px;
              line-height: 30px;
              color: #fff;
              background: rgba(255, 69, 93, 1);
              border-radius: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              > span {
                color: #fff;
                font-size: 14px;
              }
              .delButton {
                display: inline-block;
                height: 10px;
                width: 10px;
                margin-left: 10px;

                background: url("#{$imgUrl}icon_fork2.png") no-repeat center
                  center;
                background-size: cover;
              }
            }
          }
        }
      }
    }
  }

  .buttonList {
    background: #fff;
    width: 100%;
    padding: 15px;
    .listbut_1 {
      width: 100%;
      height: 100%;
      p {
        padding-top: 15px;
        font-size: 14px;
        color: #b7b7b7;
      }
      .recommentButton {
        line-height: 40px;
        height: 40px;
      }
    }
  }
}
</style>
