<template>
	<div class="bg">
		<div class="logo">
			<div class="logo-wrap"></div>
		</div>
		<input type="text" class="input" name="search" placeholder="搜索音乐，歌手，歌词，用户">
		<div class="row">
			<div class="jj"></div>
			<div class="jj"></div>
			<div class="jj"></div>
			<div class="jj"></div>
			<div class="jj"></div>
			<div class="jj"></div>
			<div class="jj"></div>
			<div class="jj"></div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'top',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
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
		background: #c62f2f;
		top: 0;
		width: 100%;
		height: 60px;
		position: fixed;
	}
	.logo{
		height: 60px;
	}
	.logo-wrap{
		background: url(http://www.pppoo.com/blog/upload/music163_logo.jpg);
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
    .row{
    	position: absolute;
    	right: 0;
    	top:20px;
    }
    .jj{
    	height: 20px;
    	width: 20px;
    	float: right;
    	margin-left: 20px;
    	background: #fff;
    }
	#top{
		font-size: 68px;
		color: #bbbbbb;
	}
</style>
