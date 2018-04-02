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
        <router-link v-for="(item, index) in songlist" :key="index" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="li" exact>
          <span>
            <i class="fa fa-headphones fa-fw"></i>
            {{item.playCount}}
          </span>
          <img :src="item.coverImgUrl">
          <p><i class="fa fa-user-o fa-fw"></i>{{item.creator.nickname}}</p>
          <p>{{item.name}}</p>
        </router-link>
      </ul>
    </div>
    <div class="page">
      <span @click="viewPage(currPage - 1)"><i class="fa fa-angle-left fa-fw"></i></span>
      <span :id="item" v-for="(item, index) in pages" :key="index" @click="viewPage(item)">{{item}}</span>
      <span @click="viewPage(currPage + 1)"><i class="fa fa-angle-right fa-fw"></i></span>
    </div>
  </div>
</template>
<<script>
import axios from 'axios'
import renderPlayCount from '../detail/renderPlayCount'
export default {
  data: function () {
    return {
      isShow: false,
      songlist: [],
      classification: [],
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currPage: 1
    }
  },
  mounted: function () {
    this.isShow = false
    let self = this
    self.viewPage(1)
    // axios({
    //   url: 'http://tguow.ink:3000/top/playlist?offset=0&limit=100&order=hot',
    //   xhrFields: {
    //     withCredentials: true
    //   }
    // }).then((response) => {
    //   console.log(response)
    //   self.songlist = response.data.playlists
    // }).catch((error) => {
    //   console.log(error)
    // })
    axios({
      url: '/submission/getClassification.php',
      method: 'post'
    }).then((response) => {
      console.log('getMsg +1拿到数据了')
      self.classification = response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    fade: function () {
      this.isShow = !this.isShow
    },
    viewPage: function (page) {
      let self = this
      if (page > 0 && page <= self.pages.length) {
        axios({
          url: 'http://tguow.ink:3000/top/playlist?offset=' + (page - 1) * 100 + '&limit=100&order=hot',
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          document.getElementById('main').scrollTop = 0
          document.getElementById(self.currPage).className = ''
          self.currPage = page
          document.getElementById(self.currPage).className = 'active-page'
          self.songlist = response.data.playlists
          self.songlist.forEach(element => {
            element.playCount = renderPlayCount(element.playCount)
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    position: relative;
    left: 0;
    z-index: 0;
    top: 0;
    margin: auto auto auto auto;
    bottom: 74px;
    width: 100%;
    height: auto;
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
    width: 92%;
    margin: auto;
    margin-top: 16px;
    height: auto;
    list-style-type:none;
    justify-content: space-between;
    &:after {
      content: " ";
      display: block; 
      height: 0; 
      clear: both;
    }
    li{
      cursor: pointer;
      text-align: left;
      float: left;
      width: 180px;
      margin:8px 14px;
      height: 240px;
      font-size: 14px;
      span {
        position: relative;
        color: #fff;
        padding: 4px;
        margin-bottom: -36px;
        float: right;
      }
      p {
        &:nth-child(3) {
          font-size: 12px;
          margin-top: -20px;
          color: #fff;
        }
      }
    }
  }
  img{
    width: 180px;
  }
  .page{
    height: 30px;
    span {
      cursor: pointer;
      font-size: 14px;
      margin: 0 6px;
      padding: 4px 8px;
      &:hover {
        background: #eeeeee;
        border: 1px solid #b3b1b1;
      }
    }
  }
  .active-page {
    color: #ca1c15;
    text-decoration: underline;
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

