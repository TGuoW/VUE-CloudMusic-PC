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
        <router-link class="item-1" v-for="(item, index) in songlist" :key="index" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="li" exact>
          <img :src="item.picUrl">
          <span>{{item.name}}</span>
        </router-link>
      </ul>
    </div>
    <div class="btn-2">
      <div class="btn-sty">独家放送
        <span class="more">更多></span>
      </div>
      <ul class="list">
        <li class="item-2" v-for="(item, index) in exclusive" :key="index">
          <img :src="item.sPicUrl">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
  import carousel from '../detail/carousel.vue'
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
        // url: 'http://localhost:3000/recommend/resource',
        url: '/recommend/resource',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        var self = this
        self.songlist = response.data.recommend
      }).catch((error) => {
        console.log(error)
      })
      axios({
        // url: 'http://localhost:3000/personalized/privatecontent',
        url: '/personalized/privatecontent',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        var self = this
        self.exclusive = response.data.result
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
    }
  }
</script>


<style lang="scss" scoped>
  .main{
    position: relative;
    left: 0;
    top: 0;
    margin-top: 30px;
    bottom: 74px;
    width: 100%;
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
  .item-1{
    /* background: #000; */
    cursor: pointer;
    width: 150px;
    height: 150px;
    img {
    width: 150px;
    height: 150px;
    }
  }
  .item-2{
    cursor: pointer;
    width: 267px;
    height: 150px;
    img {
      width: 267px;
      height: 150px;
    }
  }
</style>
