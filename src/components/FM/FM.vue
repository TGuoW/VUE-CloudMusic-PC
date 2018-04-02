<template>
  <div class="main">
    <div class="song">
      <div class="img-btn">
        <img :src="playingSong.album.blurPicUrl" alt="">
        <div>
          <ul>
            <li  class="btn"></li>
            <li  class="btn"></li>
            <li  class="btn"></li>
            <li  class="btn"></li>
          </ul>
        </div>
      </div>
      <div class="lyrics">
        <h1>{{playingSong.name}}</h1>
        <p class="author">
          <span>专辑:{{playingSong.album.name}}</span>
          <span>歌手：
            <span v-for="(item, index) in playingSong.artists" :key="index">
              {{item.name}}<i v-show="index!==(playingSong.artists.length-1)">/</i>
            </span>
          </span>
        </p>
        <div class="lyric" id="lrc">
          <p v-for="(item, index) in lyric" :key="index">{{item[1]}}</p>
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="title">
        <span>听友评论</span>
      </div>
      <input type="text" class="input">
      <ul id="hotComments">
        <li>精彩评论</li>
        <li v-for="(item, index) in hotComments" :key="index">
          <img :src="item.user.avatarUrl" alt="">
          <div>
            <p>
              <span>{{item.user.nickname}}</span>
              :
              <span>{{item.content}}</span>
            </p>
            <p>{{timeFormat(item.time)}}</p>
          </div>
          <p class="thumb"><i class="fa fa-thumbs-o-up fa-fw"></i>({{item.likedCount}})</p>
        </li>
      </ul>
      <ul id="hotComments">
        <li>最新评论</li>
        <li v-for="(item, index) in comments" :key="index">
          <img :src="item.user.avatarUrl" alt="">
          <div>
            <p>
              <span>{{item.user.nickname}}</span>
              :
              <span>{{item.content}}</span>
            </p>
            <p>{{timeFormat(item.time)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import timeFormat from '../detail/time'
export default {
  data: function () {
    return {
      lyric: [],
      playingSong: {},
      playlist: [],
      hotComments: [],
      comments: []
    }
  },
  created: function () {
    this.getFm()
  },
  methods: {
    timeFormat: timeFormat,
    getFm: function () {
      let self = this
      axios({
        url: 'http://tguow.ink:3000/personal_fm',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.playlist = response.data.data
        self.playingSong = self.playlist[0]
        self.getLyric()
        self.getComment()
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    getLyric: function () {
      var self = this
      axios({
        url: 'http://tguow.ink:3000/lyric?id=' + self.playingSong.id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.lyric = self.parseLyric(response.data.lrc.lyric)
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
    getComment: function () {
      let self = this
      axios({
        url: 'http://tguow.ink:3000/comment/music?id=' + self.playingSong.id,
        // url: '/user/playlist',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        console.log(response)
        self.comments = response.data.comments
        self.hotComments = response.data.hotComments
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .main{
        /* background: #000; */
        position: absolute;
        left: 0;
        width: 100%;
        /* height: 300px; */
        bottom: 0;
        top: 0;
        height: auto;
        text-align: center;
        overflow: scroll;
        overflow-x: hidden;
    }
    .main::-webkit-scrollbar {
        width: 8px;
    }
    .main::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #e1e1e2;
    }
    .song{
        position: relative;
        /* background: #000; */
        display: flex;
        justify-content: space-between;
        margin: auto;
        margin-top:10px;
        width: 70%;
        // height: 430px;
        .img-btn{
          position: relative;
          width: 300px;
          height: 450px;
          img {
            margin-top: 40px;
            width: 300px;
          }
        }
        li {
          list-style: none;
        }
    }

    .lyrics{
      width: 400px;
      text-align: left;
      height: auto;
      .author {
        font-size: 14px;
      }
      .lyric{
        border-right: 1px solid #e0e0e0;
        height: 360px;
        width: 360px;
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
    .comment{
        position: relative;
        width: 900px;
        /* left: 15%; */
        margin: auto;
        /* background: #000; */
    }
  #hotComments {
    font-size: 14px;
    text-align: left;
    li {
      position: relative;
      list-style: none;
      width: 90%;
      height: auto;
      margin: auto;
      padding: 16px 0;
      border-bottom: 1px solid #e0e0e0;
      img {
        position: absolute;
        display: inline-block;
        margin: auto;
        width: 40px;
        border-radius: 20px;
      }
      div {
        position: relative;
        top: 0;
        width: 80%;
        height: auto;
        display: inline-block;
        margin-left: 50px;
        p {
          // position: relative;
          span {
            &:nth-child(1) {
              cursor: pointer;
              color: rgb(80, 156, 255);
            }
          }
          line-height: 24px;
          width: 100%;
        }
      }
      .thumb {
        color: #868686;
        cursor: pointer;
        display: inline-block;
      }
    }
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
        width: 864px;
    }
</style>

