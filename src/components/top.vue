<template>
	<div class="bg">
    <sign-in v-on:child-say="renewData" v-show="signInIsShow"></sign-in>
		<div class="logo" @click="jj()">
			<router-link :to="{ path: '/'}">
				<div class="logo-wrap"></div>
			</router-link>
		</div>
		<input type="text" class="input" name="search" placeholder="搜索音乐，歌手，歌词，用户">
		<div class="tool">
			<router-link :to="{ path: '/information'}">
				<div class="user-img" @click="cc()">
          <img v-bind:src=userInfo.profile.avatarUrl>
        </div>
			</router-link>
			<span class="username" v-on:click="fade()">
        {{userInfo.profile.nickname}}
        <i class="fa fa-caret-down fa-fw"></i>
      </span>
			<i class="fa fa-yelp" id="yelp" @click="jj()"></i>
      <i class="fa fa-envelope-o" @click="jj()"></i>
      <i class="fa fa-cog" @click="jj()"></i>
		</div>
		<div class="set" @click="jj()">
			<i class="fa fa-external-link"></i>
       	<i class="fa fa-minus"></i>
        <i class="fa fa-square-o"></i>
        <i class="fa fa-close"></i>
		</div>
		<transition name="fade">
			<div class="top-status" v-show="isShowStatus">
				<div class="triangle"></div>
				<div class="rectangle">
          <div class="loading" v-if="isLoading">
            <i class="fa fa-spinner fa-pulse"></i>
            <!-- <p class="load-text">载入中...</p> -->
          </div>
          <div v-else>
					  <div class="user-info">
						  <div class="user-img">
                <img v-bind:src=userInfo.img>
              </div>
						  <span class="nickname">
                {{userInfo.profile.nickname}}
              </span>
						  <span class="check-in">签到</span>
					  </div>
					  <div class="follow">
          	  <div class="row">0<p>动态</p></div>
              <div class="row line">3<p>关注</p></div>
              <div class="row">0<p>粉丝</p></div>
            </div>
					  <div class="item">
						  <p>会员中心</p>
						  <p>等级：{{userInfo.level}}</p>
						  <p>积分商城</p>
					  </div>
					  <div class="item">
						  <p>个人信息设置</p>
						  <p>绑定社交账号</p>
						  <p>导入歌单</p>
					  </div>
					  <div class="sign-out">
						  <p>退出登录</p>
					  </div>
          </div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
// import axios from 'axios'
import signIn from './top/signIn'
export default {
  name: 'top',
  components: {
    signIn
  },
  data () {
    return {
      show: false,
      userInfo: {
        profile: {
          nickname: '未登录'
        }
      },
      signInIsShow: false,
      isShowStatus: false,
      isLoading: false
    }
  },
  mounted: function () {
    // this.login()
  },
  methods: {
    renewData: function (data) {
      this.userInfo = data
      this.signInIsShow = false
    },
    fade: function () {
      let self = this
      if (self.$store.state.isLogin) {
        if (self.isShowStatus) {
          // this.$store.commit('showStatus', false)
          self.isShowStatus = false
        } else {
          self.isShowStatus = true
          self.isLoading = true
          setTimeout(_ => {
            self.isLoading = false
          }, 200)
          // this.$store.commit('showStatus', true)
        }
      } else {
        self.signInIsShow = true
      }
    },
    isShow: function () {
      return this.$store.state.isShowStatus
    },
    jj: function () {
      this.$store.commit('showStatus', false)
    },
    cc: function () {
      this.jj()
      this.$store.commit('showAllDetail', false)
    }
  }
}
</script>
<style lang="scss" scoped>
$red-color: #ca1c15;
	.fa {
  	cursor: pointer;
		height: 1.2rem;
		margin-left: 1.2rem;
		vertical-align: middle;
	}
	.bg {
		background: $red-color;
		height: 60px;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}
	.logo {
		height: 60px;
		.logo-wrap {
			background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507384086&di=af3f2dbad88ad08a346bee44153ceaad&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.pppoo.com%2Fblog%2Fupload%2Fmusic163_logo.jpg);
    	background-position: -10px;
    	background-repeat: no-repeat;
			background-size: 250px;
			height: 60px;
		}
	}
	.input {
		background: #d73f3f;
		border: none;
		border-radius: 10px;
		color: #fff;
		height: 20px;
		left:300px;
		outline: none;
		padding-left: 10px;
		position: absolute;
		top: 20px;
		width: 250px;
		&::-webkit-input-placeholder{
   	 	color: #fff;opacity:1;
  	}
	}
  .user-img{
    background: #fff;
		border-radius: 20px;
		display: inline-flex;
    height: 40px;
    vertical-align: middle;
    width: 40px;
		img {
			border-radius: 20px;
    	width: 40px;
  	}
  }
	.username{
		font-weight: normal;
    color: #e0e0e0;
    font-size: 14px;
		cursor: pointer;
    i {
      margin-left: -4px;
    }
		&:hover{
    	color: #fff;
  	}
	}
    .set{
    	position: absolute;
    	vertical-align: middle;
    	right: 0;
    	top:20px;
    	color: #fff;
    	right: 10px;
    	border-left: solid;
    	border-width: 2px;
    }
    .tool{
      position: absolute;
    	vertical-align: middle;
    	right: 0;
    	top:10px;
    	color: #fff;
    	right: 180px;
    }
  .top-status {
		position: absolute;
		z-index: 999 !important;
		margin-top: -16px;
    margin-left: 860px;
		.triangle {
			position: relative;
			margin: auto;
			width: 0;
    	height: 0;
    	border-left: 15px solid transparent;
    	border-right: 15px solid transparent;
    	border-bottom: 16px solid #fafafa;
		}
		.rectangle {
			width: 270px;
			height: 400px;
			border-left:1px solid #cccccc;
			border-right:1px solid #cccccc;
			border-bottom:1px solid #cccccc;
			border-radius: 6px;
			box-shadow: 0px 2px 5px #666666;
			background: #fafafa;
	  }
  }
	.user-info{
		text-align: left;
		padding-top: 20px;
		padding-left: 20px;
		/* line-height: 40px; */
		width: 250px;
	}
	.nickname{
		padding-left: 5px;
	}
	.check-in{
		float: right;
		background: #fff;
		font-size: 14px;
		border: 1px solid #e0e0e0;
		/* padding-left: 50px; */
		cursor: pointer;
		margin: 5px 15px 0 0;
		border-radius: 5px;
		padding: 3px 10px 3px 10px;
		&:hover{
			background: #b4b4b4;
		}
	}
	#top{
		font-size: 68px;
		color: #bbbbbb;
	}
	.follow{
    margin-top: 10px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
    font-size: 20px;
}
p{
    font-size: 14px;
    padding: 2px;
}
.row{
    display: inline-block;
    padding-right: 25px;
    padding-left: 25px;
}
.line{
    border-right: 1px #e0e0e0 solid;
    border-left: 1px #e0e0e0 solid;
}
.item{
	text-align: left;
	padding-left: 30px;
	line-height: 32px;
	border-bottom: 1px solid #e0e0e0;
}
.sign-out{
	text-align: left;
	padding-left: 30px;
	font-size: 14px;
	line-height: 44px;
}
.loading {
  position: absolute;
  top: 0;
  /* background: #000; */
  left: 110px;
  /* transform: translateX(-50%); */
  margin-top: 50px;
  text-align: center;
}
.load-text{
  margin-left: 20px;
}
</style>
