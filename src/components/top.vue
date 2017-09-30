<template>
	<div class="bg">
		<div class="logo" @click="jj()">
			<router-link :to="{ path: '/'}">
				<div class="logo-wrap"></div>
			</router-link>
		</div>
		<input type="text" class="input" name="search" placeholder="搜索音乐，歌手，歌词，用户">
		<div class="tool">
			<router-link :to="{ path: '/information'}">
				<div class="user-img" @click="jj()">
          <img v-bind:src=userInfo.img>
        </div>
			</router-link>
			<span class="username" v-on:click="fade()">{{userInfo.nickName}}</span>
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
			<div class="top-status" v-show="isShow()">
				<div class="triangle"></div>
				<div class="rectangle">
          <div class="loading" v-if="!isLoading">
            <i class="fa fa-spinner fa-pulse"></i>
            <!-- <p class="load-text">载入中...</p> -->
          </div>
          <div v-show="isLoading">
					  <div class="user-info">
						  <div class="user-img">
                <img v-bind:src=userInfo.img>
              </div>
						  <span class="nickname">{{userInfo.nickName}}</span>
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
import axios from 'axios'
export default {
  name: 'top',
  data () {
    return {
      show: false,
      userInfo: {},
      isLoading: false
    }
  },
  mounted: function () {
    this.login()
  },
  methods: {
    login: function () {
      axios({
        url: '/submission/userInfo.php',
        method: 'post'
      }).then((response) => {
        var self = this
        self.userInfo = response.data
        self.$store.commit('login', self.userInfo)
        self.isLoading = true
        console.log(self.userInfo)
      }).catch((error) => {
        console.log(error)
      })
    },
    fade: function () {
      if (this.$store.state.isShowStatus) {
        this.$store.commit('showStatus', false)
        setTimeout(() => {
          this.isLoading = false
        }, 200)
      } else {
        this.$store.commit('showStatus', true)
        this.login()
      }
    },
    isShow: function () {
      return this.$store.state.isShowStatus
    },
    jj: function () {
      this.$store.commit('showStatus', false)
    }
  }
}
</script>
<style scoped>
.fa {
  vertical-align: middle;
  margin-left: 1.2rem;
  cursor: pointer;
	height: 1.2rem;
}
  .fa-search {
    color: #c87676;
    cursor: pointer;
   
  }
  .fa-yelp {
    margin-left: 2.5rem;
    font-size: 1.6rem;
    cursor: pointer;
    color: #e7a8a3;
    vertical-align: middle;
  }
	.bg{
		background: #ca1c15;
		top: 0;
		z-index: 1;
		width: 100%;
		/* opacity: 0.5; */
		height: 60px;
		position: fixed;
	}
	.logo{
		height: 60px;
	}
	.logo-wrap{
		background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507384086&di=af3f2dbad88ad08a346bee44153ceaad&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.pppoo.com%2Fblog%2Fupload%2Fmusic163_logo.jpg);
		height: 60px;
		background-size: 250px;
    	background-position: -10px;
    	background-repeat: no-repeat;
	}
	.input{
		color: #fff;
		width: 250px;
		height: 20px;
		background: #d73f3f;
		position: absolute;
		top: 20px;
		border-radius: 10px;
		border: none;
		outline: none;
		padding-left: 10px;
		left:300px;
	}
	input::-webkit-input-placeholder{
    	color: #fff;opacity:1;
  }
  .user-img{
    	background: #fff;
    	width: 40px;
    	height: 40px;
    	border-radius: 20px;
    	vertical-align: middle;
    	display: inline-flex;
  }
  img{
    width: 40px;
    border-radius: 20px;
  }
	.username{
		font-weight: normal;
    color: #e0e0e0;
    font-size: 12px;
		cursor: pointer;
	}
  .username:hover{
    color: #fff;
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
    .top-status{
			position: absolute;
			
			z-index: 999 !important;
    	/* height: 200px;
    	width: 270px; */
			margin-top: -16px;
    	margin-left: 860px;
    }
		.triangle{
			position: relative;
			margin: auto;
			width: 0;
    	height: 0;
    	border-left: 15px solid transparent;
    	border-right: 15px solid transparent;
    	border-bottom: 16px solid #fafafa;
		}
	.rectangle{
		width: 270px;
		height: 400px;
		border-left:1px solid #cccccc;
		border-right:1px solid #cccccc;
		border-bottom:1px solid #cccccc;
		border-radius: 6px;
		box-shadow: 0px 2px 5px #666666;
		background: #fafafa;
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
		margin: 5px 15px 0 0;
		border-radius: 5px;
		padding: 3px 10px 3px 10px;
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
  /* text-align: right; */
  margin-left: 20px;
}
  /* .fa {
    color: #c62f2f;
    font-size: 30px;
  } */
</style>
