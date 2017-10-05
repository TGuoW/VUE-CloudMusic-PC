<template>
  <div class="main">
    <div class="drop-down">
      <span @click="fade()">
        全部歌单
        <i class="fa fa-angle-down fa-fw"></i>
      </span>
    </div>
    <transition>
      <div class="option" v-show="isShow">
        <div class="triangle-1">
          <div class="triangle-2"></div>
        </div>
        <div class="rectangle">
          <div class="tags">
            <span>全部标签</span>
          </div>
          <div class="all-song-list">
            <span>全部歌单</span>
            <div>
              <i class="fa fa-check"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="classification">
      热门标签：
      <span v-for="(cl, index) in classification" :key="index">{{cl.Classification}}</span>
    </div>
    <div>
      <ul class="list">
        <li class="item" v-for="(item, index) in songlist" :key="index">
          <img :src="item.imgUrl">
          <p>{{item.songlistName}}</p>
        </li>
      </ul>
    </div>
    <div class="page">
      <span>1 2 3 4 5 6 7 8 9 10</span>
    </div>
  </div>
</template>
<<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      isShow: false,
      songlist: [],
      classification: [],
      page: 1
    }
  },
  mounted: function () {
    this.isShow = false
    axios({
      url: '/submission/getSonglist.php',
      method: 'post',
      data: {
        page: this.page
      }
    }).then((response) => {
      console.log('getMsg +1拿到数据了')
      var self = this
      self.songlist = response.data
      console.log(self.songlist)
    }).catch((error) => {
      console.log(error)
    })
    axios({
      url: '/submission/getClassification.php',
      method: 'post'
    }).then((response) => {
      console.log('getMsg +1拿到数据了')
      var self = this
      self.classification = response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    fade: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped>
  .main{
    position: relative;
    left: 0;
    z-index: 0;
    /* margin-top: 60px; */
    top: 0;
    margin: auto auto auto auto;
    bottom: 74px;
    width: 100%;
    height: auto;
    /* text-align: center; */
  }
  .drop-down{
    text-align: left;
    font-size: 14px;
    margin-top: 20px;
    margin-left: 5%;
    /* background: #000; */
  }
  .drop-down span{
    color: #000;
    cursor: pointer;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    background: #fff;
  }
  .drop-down span:hover{
    background: #e0e0e0;
  }
  .classification{
    /* position: absolute; */
    margin-top: 16px;
    font-size: 14px;
    text-align: left;
    margin-left: 5%;
    
  }
  .classification span{
    color: gray;
    border-left: 1px solid #e0e0e0;
    padding: 0 15px 0 15px;
  }
  .classification span:nth-child(1){
    border-left: none;
  }
  .list{
    /* position: absolute; */
    width: 92%;
    /* background: #000; */
    /* display: inline-flex; */
    margin: auto;
    margin-top: 16px;
    height: 5700px;
    list-style-type:none;
    justify-content: space-between;
    /*background: #000;*/
    /* height: 100px; */
  }
  img{
    width: 180px;
  }
  item{
    display: block;
    margin: auto;
    /* width: 140px; */
  }
  li{
    float: left;
    width: 150px;
    margin:8px 28px 8px 28px;
    font-size: 14px;
  }
  .page{
    /* position: absolute; */
    background: #000;
    /* width: 1000px;
    height: 100px; */
  }
  .option{
    position: relative;
    /* background: #000; */
    width: 0;
    height: 0;
    /* float: left; */
    z-index: 2;
  }
  .triangle-1{
		position: relative;
		margin: auto;
    left: 80px;
    top: 5px;
		width: 0;
  	height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 11px solid #cccccc;
	}
  .triangle-2{
		position: relative;
		margin: auto;
    left: -12px;
    top: 0.5px;
		width: 0;
  	height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 10px solid #fafafa;
	}
	.rectangle{
		width: 540px;
		height: 400px;
    margin-top: 5px;
    margin-left: 56px;
		border-left:1px solid #cccccc;
		border-right:1px solid #cccccc;
		border-bottom:1px solid #cccccc;
		border-radius: 6px;
		box-shadow: 0px 0px 5px #b4b4b4;
		background: #fafafa;
	}
  .tags{
    /* background: #000; */
    text-align: left;
    height: 50px;
    padding-left: 18px;
    color: #000;
    line-height: 50px;
    border-bottom: 1px solid #e0e0e0;
  }
  .rectangle .all-song-list{
    cursor: pointer;
    margin: auto;
    margin-top: 10px;
    font-size: 14px;
    line-height: 36px;
    width: 500px;
    height: 36px;
    border: 1px solid #ca1c15;
    /* background: #000; */
  }
  .rectangle .all-song-list div{
    border-left: 18px solid transparent;
    border-bottom: 18px solid #ca1c15;
    width: 0;
    height: 10px;
    margin-top: -28px;
    margin-left: 482px;
    font-size: 10px;
  }
  .rectangle .all-song-list div i{
    margin-left: -12px;
    margin-top: 17px;
    color: #fff;
    font-weight: lighter;
  }
</style>

