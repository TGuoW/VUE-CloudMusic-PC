<template>
	<div class="bg">
		<div class="logo" @click="jj()">
			<router-link :to="{ path: '/'}">
				<div class="logo-wrap"></div>
			</router-link>
		</div>
		<input type="text" class="input" name="search" placeholder="搜索音乐，歌手，歌词，用户">
		<div class="tool">
			<router-link :to="{ path: '/information'}" @click="jj()">
				<div class="user-img"></div>
			</router-link>
			<span class="username" v-on:click="fade()">TGuoW&gt;</span>
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
					<div class="user-info">
						<div class="user-img"></div>
						<span class="nickname">TGuoW</span>
						<span class="check-in">签到</span>
					</div>
					<div class="follow">
          	<div class="row">0<p>动态</p></div>
            <div class="row line">3<p>关注</p></div>
            <div class="row">0<p>粉丝</p></div>
          </div>
					<div class="item">
						<p>会员中心</p>
						<p>等级</p>
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
		</transition>
	</div>
</template>
<script>
export default {
  name: 'top',
  data () {
    return {
      show: false
    }
  },
  methods: {
    fade: function () {
      if (this.$store.state.isShowStatus) {
        this.$store.commit('showStatus', false)
      } else {
        this.$store.commit('showStatus', true)
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
		background: url(http://img2.imgtn.bdimg.com/it/u=1972940345,1771388347&fm=214&gp=0.jpg);
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
	.username{
		font-weight: normal;
		cursor: pointer;
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
</style>
