<template>
	<div class="main">
    <carousel></carousel>
    <div class="btn-2">
      <div class="btn-sty">推荐歌单
        <router-link :to="{ path: '/findMusic/songList'}">
          <span class="more">更多></span>
        </router-link>
      </div>
      <ul class="list">
        <li class="item" v-for="(item, index) in songlist" :key="index">
          <img :src="item.imgUrl">
          <span>{{item.songlistName}}</span>
        </li>
      </ul>
    </div>
    <div class="btn-2">
      <div class="btn-sty">独家放送
        <span class="more">更多></span>
      </div>
      <ul class="list">
        <li class="item" v-for="(item, index) in exclusive" :key="index">
          <img :src="item.imgUrl">
          <span>{{item.songlistName}}</span>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
  import carousel from '../retail/carousel.vue'
  import axios from 'axios'
  export default {
    name: 'findMusic',
    data: function () {
      return {
        songlist: [],
        exclusive: []
      }
    },
    components: {
      carousel
    },
    mounted: function () {
      axios({
        url: '/submission/getRecommendList.php',
        method: 'post'
      }).then((response) => {
        console.log('getMsg +1拿到数据了')
        var self = this
        self.songlist = response.data
        console.log(self.songlist)
      }).catch((error) => {
        console.log(error)
      })
      axios({
        url: '/submission/exclusive.php',
        method: 'post'
      }).then((response) => {
        console.log('getMsg +1拿到数据了')
        var self = this
        self.exclusive = response.data
        console.log(self.exclusive)
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
    }
  }
</script>


<style type="text/css" scoped>
  .main{
    position: fixed;
    left: 15%;
    margin-top: 60px;
    bottom: 74px;
    width: 85%;
    text-align: center;
  }
  .btn{
    margin: auto;
    background: #fff;
    border-bottom: 1px;
    border-color: #000;
    border-style: solid;
    height: 50px;
    width: 90%;
  }
  .btn-2{
    text-align: left;
    margin: auto auto 40px auto;
    background: #fafafa;
    /* padding-top: 20px; */
    height: 250px;
    width: 90%;
  }
  .btn-sty{
    line-height: 50px;
    border-bottom: 1px;
    border-color: #e0e0e0;
    border-style: solid;
    width: 100%;
    height: 50px;
    /* margin-bottom: 20px; */
    font-size: 18px;
  }
  img{
    width: 150px;
    height: 150px;
  }
  span{
    font-size: 14px;
  }
  .more{
    float: right;
    cursor: pointer;
    color: gray;
  }
  .more:hover{
    color: #000;
  }
  .list{
    width: 100%;
    display: inline-flex;
    margin: auto;
    margin-top: 10px;
    list-style-type:none;
    justify-content: space-between;
    /*background: #000;*/
    height: 100px;
  }
  .item{
    /* background: #000; */
    width: 150px;
    height: 150px;
  }
</style>
