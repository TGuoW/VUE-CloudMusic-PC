<template>
	<div class="main" id="main">
    <div class="btn">
      <router-link :to="{ path: '/findMusic/recommend'}"  tag="li">
        个性推荐
      </router-link>
      <router-link :to="{ path: '/findMusic/songList'}"  tag="li">
        歌单
      </router-link>
      <router-link :to="{ path: '/findMusic/transceiver'}"  tag="li">
        主播电台
      </router-link>
      <router-link :to="{ path: '/findMusic/rank'}"  tag="li">
        排行榜
      </router-link>
      <router-link :to="{ path: '/findMusic/singer'}"  tag="li">
        歌手
      </router-link>
      <router-link :to="{ path: '/findMusic/newMusic'}"  tag="li">
        最新音乐
      </router-link>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
	</div>
</template>

<script>
  // import recommend from './findMusic/recommend'
  export default {
    name: 'findMusic'
    // components: {
    //   recommend
    // }
  }
</script>


<style type="text/css" scoped>
  .link-active{
    color:#ca1c15;
    border-bottom: 3px;
    border-style: solid;
    border-color: #ca1c15;
  }
  .main{
    background: #fafafa;
    position: absolute;
    left: 0;
    height: auto;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
    text-align: center;
  }
  .main::-webkit-scrollbar {
    width: 8px;
  }
  .main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
  }
  .btn{
    /* position: relative; */
    margin: auto;
    background: #fafafa;
    border-bottom: 1px;
    border-color: #e0e0e0;
    border-style: solid;
    height: 1.25rem;
    width: 90%;
  }
  li{
    width: 2rem;
    line-height: 1.21rem;
    display: inline-block;
    margin: 0 0.5rem 0 0.5rem;
    font-size: 0.4rem;
    text-decoration: none;
    cursor: pointer;
  }
  li:hover{
    color: #ca1c15;
  }
  .aa{
    width: 100%;
    display: inline-flex;
    margin: auto;
    margin-top: 10px;
    list-style-type:none;
    justify-content: space-between;
    /*background: #000;*/
    height: 100px;
  }
  .router-view{
    text-align: center;
    top: 60px;
  }
</style>
