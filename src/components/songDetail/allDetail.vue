<template> 
  <div class="main" @click="closeStatus()">    
    <div class="song">
      <div class="img-btn">
        <div class="disc"> 
          <div class="needle" :class="isPaused() ? 'needle-pause' : 'needle-play'"></div>
          <div :class="isPaused() ? '' : 'record-rotate'"> 
            <div class="song-img">
              <div class="record"></div>
            </div>
          </div>
        </div>
        <div>
          <ul>
            <li class="btn" @click="jj()">
              <span>
                <i class="fa fa-fw fa-heart"></i>
                喜欢
              </span>
            </li>
            <li class="btn">
              <span>
                <i class="fa fa-folder-open-o fa-fw"></i>
                收藏
              </span>
            </li>
            <li class="btn">
              <span>
                <i class="fa fa-cloud-download fa-fw"></i>
                下载
              </span>
            </li>
            <li class="btn">
              <span>
                <i class="fa fa-share-square-o fa-fw"></i>
                分享
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="lyrics">
        <h1>非酋</h1>
        <h2>
          <span>专辑:任然</span>
          <span>歌手：啊设计的</span>
        </h2>
        <div class="lyric" id="lrc">
          <p v-for="(item, index) in lyric" :key="index">{{item[1]}}</p>
        </div>
      </div>  
      <!-- <div class="close" @click="closeAllDetail()"></div>         -->
    </div>
    <div class="about">
      <div class="comment">
        <div class="title">
          <span>听友评论</span>
        </div>
        <input type="text" class="input">
      </div>
      <div class="other-song">
        <div class="contain-song">
          <div class="title">
            <p>包含这首歌的歌单</p>
          </div>
        </div>
        <div class="contain-song">
          <div class="title">
            <p>相似歌曲</p>
          </div>
        </div>
        <div class="contain-song">
          <div class="title">
            <p>喜欢这首歌的人</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      lyric: []
    }
  },
  mounted: function () {
    var self = this
    axios({
      url: '/submission/getLyric.php',
      method: 'post'
    }).then((response) => {
      // console.log(response.data.lrc.lyric)
      self.lyric = self.parseLyric(response.data.lrc.lyric)
      console.log(self.lyric)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    jj: function () {
      axios({
        url: 'https://bird.ioliu.cn/netease/song?id=473940941',
        method: 'get',
        type: 'jsonp'
      }).then((response) => {
        // console.log(response.data.lrc.lyric)
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    parseLyric: function (lrc) {
      var lyrics = lrc.split('\n')
      var lrcObj = []
      for (var i = 0; i < lyrics.length; i++) {
        lrcObj[i] = []
        var lyric = decodeURIComponent(lyrics[i])
        var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        var timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        var clause = lyric.replace(timeReg, '')
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k]
          var min = Number(String(t.match(/\[\d*/i)).slice(1))
          var sec = Number(String(t.match(/:\d*/i)).slice(1))
          var time = (min * 60 + sec)
          // lrcObj[time] = clause
          lrcObj[i][0] = time
          lrcObj[i][1] = clause
        }
      }
      return lrcObj
    },
    isPaused: function () {
      return this.$store.state.isPaused
    },
    closeAllDetail: function () {
      this.$store.commit('showAllDetail', false)
    },
    closeStatus: function () {
      this.$store.commit('showStatus', false)
    }
  }
}
</script>

<style lang="scss" scoped>
    .main{
        background: #fff;
        position: fixed;
        width: 100%;
        /* height: 300px; src="http://on99ebnkk.bkt.clouddn.com/play_needle.png" http://on99ebnkk.bkt.clouddn.com/disc-ip6.png*/
        bottom: 73px;
        top: 60px;
        height: auto;
        text-align: center;
        overflow: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: #e1e1e2;
        }
    }

    .close{
      background: #000;
      position: absolute;
      margin: auto;
      /* float: right; */
      left: 800px;
      top: 50px;
      width: 50px;
      height: 50px;
    }
    .song{
        position: relative;
        // background: #000; 
        display: flex;
        justify-content: space-between;
        margin: auto;
        margin-top:10px;
        width: 1000px;
        height: 460px;
    }
    .img-btn{
        position: relative;
        width: 360px;
        height: 400px;
    }
    .disc{
      position: relative;
      /* background: #000; */
      width: 360px;
      height: 360px;
      margin: auto;
    }
    .needle{
      position: relative;
      background: url(http://on99ebnkk.bkt.clouddn.com/play_needle.png) no-repeat;
      /* background: #000; */
      background-size: 100%;
      transform-origin: 14px 12px;
      transition: All 0.4s ease-in-out;
      // transform: rotate(-45deg);
      z-index: 3;
      margin: auto;
      margin-top: -24px;
      width: 80px;
      height: 120px;
    }
    .needle-play{
      transform: rotate(0deg);
    }
    .needle-pause{
      transform: rotate(-45deg);
    }
    .record-rotate{
      transform-origin: 180px 130px;
      animation: myfirst 12s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes myfirst {
      from {
        transform: rotate(0deg)
      }
      to {
        transform: rotate(360deg)
      }
    }
    .record{
      position: relative;
      background: url(http://on99ebnkk.bkt.clouddn.com/disc-ip6.png) no-repeat center;
      display: table-cell;
      vertical-align: middle;
      text-align: center;  
      background-size: 100%;
      z-index: 2;
      width: 360px;
      height: 360px;
    }
    .song-img{
        position: relative;
        background: url("http://p3.music.126.net/Kv0E_qQdJ9amNRu4_64Mxw==/18924794137514110.jpg?param=200y200") no-repeat center;
        background-size: 65%;
        margin: auto;
        z-index: -1;
        top: -50px;
        border-radius: 50%;
        width: 360px;
        height: 360px;
    }
    .lyrics{
        /* float: right; */
        position: relative;
        // background: #000;
        width: 640px;
        height: 300px;
        .lyric{
          border-right: 1px solid #e0e0e0;
          height: 400px;
          width: 640px;
          overflow: scroll;
          overflow-x: hidden;
          line-height: 32px;
          &::-webkit-scrollbar {
            width: 8px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #e1e1e2;
          }
        }
    }
    
    h1{
        text-align: left;
        font-size: 24px;
        font-weight: normal;
    }
    h2{
        text-align: left;
        margin-top: 10px;
        font-size: 14px;
        font-weight: normal;
    }
    span{
        /* margin-right: 80px; */
    }
    li{
        list-style: none;
        cursor: pointer;
    }
    .btn{
      position: relative;
      z-index: 2;
        float: left;
        margin: 100px 14px auto 14px;
    }
    .btn:nth-child(1){
      margin-left: 0;
    }
    .btn:nth-child(4){
      margin-right: 0;
    }
    .about{
      position: relative;
      width: 900px;
      display: flex;
      /* background: #000; */
      margin: auto;
      top: 100px;
    }
    .comment{
      position: relative;
      margin-left: 0;
      /* left: 0; */
      width: 600px;
      /* display: flex; */
      /* background: #000; */
    }
    .title{
        text-align: left;
        font-size: 24px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
        /* float: left; */
    }
    .input{
        margin-top: 20px;
        margin-bottom: 40px;
        border: 10px solid #e0e0e0;
        padding: 8px;
        font-size: 16px;
        width: 560px;
    }
    li span{
      background: #e0e0e0;
      cursor: pointer;
      padding: 4px 8px 4px 8px;
      border-radius: 4px;
      border: 1px solid #b4b4b4;
      line-height: 24px;
      font-size:14px;
    }
    .other-song{
      position: relative;
      margin-left: 40px;
      height: auto;
      width: 300px;
    }
    .contain-song .title{
      font-size: 22px;
      width: 300px;
      font-weight: lighter;
      line-height: 31px;
      border-bottom: 1px solid #e0e0e0;
    }
</style>

