<template>
  <div class="main">
    <div class="official-rank">
      <div class="title">官方榜</div>
      <div class="diff-rank">
        <ul>
          <li class="item">
              <div class="img"></div>
              <ul>
                <li class="detail" v-for="(item, index) in upRank" :key="index">
                  <span>{{index + 1}}</span>
                  <span>{{item.ratio}}</span>
                  <span>{{item.name}}</span>
                  <span>{{item.artists}}</span>
                </li>
                <li class="more">
                  <router-link :to="{path: '/playlistDetails',query: {id: upRankAll.id}}" tag="span" exact>
                    查看全部<i class="fa fa-angle-right fa-fw"></i>
                  </router-link>
                </li>
              </ul>
          </li>
          <li class="item">
            <div class="img"></div>
            <ul>
              <li class="detail" v-for="(item, index) in newSongRank" :key="index">
                <span>{{index + 1}}</span>
                <span>{{item.ratio}}</span>
                <span>{{item.name}}</span>
                <span>{{item.artists}}</span>
              </li>
              <li class="more">
                <router-link :to="{path: '/playlistDetails',query: {id: newSongRankAll.id}}" tag="span" exact>
                  查看全部<i class="fa fa-angle-right fa-fw"></i>
                </router-link>
              </li>
            </ul>   
          </li>
          <li class="item">
            <div class="img"></div>
            <ul>
              <li class="detail" v-for="(item, index) in originalRank" :key="index">
                <span>{{index + 1}}</span>
                <span>{{item.ratio}}</span>
                <span>{{item.name}}</span>
                <span>{{item.artists}}</span>
              </li>
              <li class="more">
                <router-link :to="{path: '/playlistDetails',query: {id: originalRankAll.id}}" tag="span" exact>
                  查看全部<i class="fa fa-angle-right fa-fw"></i>
                </router-link>
              </li>
            </ul>   
          </li>
          <li class="item">
            <div class="img"></div>
            <ul>
              <li class="detail" v-for="(item, index) in hotRank" :key="index">
                <span>{{index + 1}}</span>
                <span>{{item.ratio}}</span>
                <span>{{item.name}}</span>
                <span>{{item.artists}}</span>
              </li>
              <li class="more">
                <router-link :to="{path: '/playlistDetails',query: {id: hotRankAll.id}}" tag="span" exact>
                  查看全部<i class="fa fa-angle-right fa-fw"></i>
                </router-link>
              </li>
            </ul>   
          </li>
        </ul>
      </div>
    </div>
    <div class="global-rank">
      <div class="title">全球榜</div>
      <div>
        <ul class="list">
          <router-link class="item" v-for="(item, index) in otherRank" :key="index" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="span" exact>
            <span>
              <i class="fa fa-headphones fa-fw"></i>
              {{item.playCount}}
            </span>
            <img :src="item.coverImgUrl" alt="">
            <p>{{item.name}}</p>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import renderPlayCount from '../detail/renderPlayCount'
export default {
  data: function () {
    return {
      upRank: [],
      upRankAll: {},
      newSongRank: [],
      newSongRankAll: {},
      originalRank: [],
      originalRankAll: {},
      hotRank: [],
      hotRankAll: {},
      otherRank: []
    }
  },
  mounted: function () {
    this.getUpRank()
    this.getNewSongRank()
    this.getOriginalRank()
    this.getHotRank()
    this.getOtherRank()
  },
  methods: {
    getUpRank: function () {
      axios({
        url: 'http://localhost:3000/top/list?idx=3',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        let self = this
        self.upRankAll = response.data.playlist
        for (let i = 0; i < 8; i++) {
          self.upRank[i] = {}
          self.upRank[i].ratio = self.upRankAll.trackIds[i].ratio + '%'
          self.upRank[i].name = self.upRankAll.tracks[i].name
          self.upRank[i].artists = self.upRankAll.tracks[i].ar.reduce(function (a, b) {
            return a + '/' + b.name
          }, '').substr(1)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getNewSongRank: function () {
      axios({
        url: 'http://localhost:3000/top/list?idx=0',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        let self = this
        self.newSongRankAll = response.data.playlist
        for (let i = 0; i < 8; i++) {
          self.newSongRank[i] = {}
          if (self.newSongRankAll.trackIds[i].lr === undefined) {
            self.newSongRank[i].ratio = 'new'
          } else if (self.newSongRankAll.trackIds[i].lr > i) {
            self.newSongRank[i].ratio = '\u2191'
          } else if (self.newSongRankAll.trackIds[i].lr < i) {
            self.newSongRank[i].ratio = '\u2193'
          } else {
            self.newSongRank[i].ratio = '-'
          }
          self.newSongRank[i].name = self.newSongRankAll.tracks[i].name
          self.newSongRank[i].artists = self.newSongRankAll.tracks[i].ar.reduce(function (a, b) {
            return a + '/' + b.name
          }, '').substr(1)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getOriginalRank: function () {
      axios({
        url: 'http://localhost:3000/top/list?idx=2',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        let self = this
        self.originalRankAll = response.data.playlist
        for (let i = 0; i < 8; i++) {
          self.originalRank[i] = {}
          if (self.originalRankAll.trackIds[i].lr === undefined) {
            self.originalRank[i].ratio = 'new'
          } else if (self.originalRankAll.trackIds[i].lr > i) {
            self.originalRank[i].ratio = '\u2191'
          } else if (self.originalRankAll.trackIds[i].lr < i) {
            self.originalRank[i].ratio = '\u2193'
          } else {
            self.originalRank[i].ratio = '-'
          }
          self.originalRank[i].name = self.originalRankAll.tracks[i].name
          self.originalRank[i].artists = self.originalRankAll.tracks[i].ar.reduce(function (a, b) {
            return a + '/' + b.name
          }, '').substr(1)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getHotRank: function () {
      axios({
        url: 'http://localhost:3000/top/list?idx=1',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        let self = this
        self.hotRankAll = response.data.playlist
        for (let i = 0; i < 8; i++) {
          self.hotRank[i] = {}
          if (self.hotRankAll.trackIds[i].lr === undefined) {
            self.hotRank[i].ratio = 'new'
          } else if (self.hotRankAll.trackIds[i].lr > i) {
            self.hotRank[i].ratio = '\u2191'
          } else if (self.hotRankAll.trackIds[i].lr < i) {
            self.hotRank[i].ratio = '\u2193'
          } else {
            self.hotRank[i].ratio = '-'
          }
          self.hotRank[i].name = self.hotRankAll.tracks[i].name
          self.hotRank[i].artists = self.hotRankAll.tracks[i].ar.reduce(function (a, b) {
            return a + '/' + b.name
          }, '').substr(1)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getOtherRank: function () {
      let self = this
      for (let i = 0; i < 20; i++) {
        self.otherRank[i] = {}
        axios({
          url: 'http://localhost:3000/top/list?idx=' + (i + 4),
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          // let self = this
          self.otherRank[i].id = response.data.playlist.id
          self.otherRank[i].name = response.data.playlist.name
          self.otherRank[i].coverImgUrl = response.data.playlist.coverImgUrl
          self.otherRank[i].playCount = renderPlayCount(response.data.playlist.playCount)
        }).catch((error) => {
          console.log(error)
        })
      }
      console.log(self.otherRank)
    }
  }
}
</script>


<style lang="scss" scoped>
  .main{
    position: relative;
    left: 0;
    margin-top: -60px;
    bottom: 74px;
    width: 100%;
    height: auto;
    text-align: center;
  }
  .official-rank{
    height: auto;
    &:after {
      content: " ";
      display: block; 
      height: 0; 
      clear: both;
    }
    .title{
      position: relative;
      margin: auto;
      margin-top: 24px;
      padding-bottom: 10px;
      font-size: 20px;
      width: 90%;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
    }
    .diff-rank{
      position: relative;
      margin: auto;
      /* margin-top: 20px; */
      width: 90%;
    }
    li{
      /* background: #000; */
      list-style: none;
    }
    .item{
      float: left;
      width: 300px;
      height: auto;
      margin-top: 20px;
      margin-right: 65px;
      .img{
        background: #000;
        width: 300px;
        height: 100px;
      }
      li {
        &:nth-child(odd) {
          background: rgb(231, 231, 231);
        }
      }
      .detail{
        padding: 0 10px;
        font-size: 14px;
        text-align: left;
        width: 300px;
        overflow: hidden;
        line-height: 32px;
        span {
          overflow: hidden; 
          text-overflow: ellipsis; 
          -o-text-overflow: ellipsis;
          white-space:nowrap;
          height: 24px;
          line-height: 36px;
          &:nth-child(1) {
            padding-right: 4px;
            font-size: 16px;
            font-style:italic;
          }
          &:nth-child(2) {
            text-align: center;
            display: inline-block;
            font-size: 12px;
            width: 36px;
          }
          &:nth-child(3) {
            font-size: 12px;
            display: inline-block;
            color: #000;
            width: 140px;
          }
          &:nth-child(4) {
            text-align: right;
            font-size: 12px;
            float: right;
            width: 80px;
          }
        }
        &:hover {
          background: rgb(189, 189, 189);
        }
      }  
      .more {
        height: 40px;
        span {
          cursor: pointer;
          float: right;
          font-size: 14px;
          line-height: 40px;
          padding-right: 10px;
        }
        &:hover {
          color: #000;
        }
      }
    }
    li:nth-child(3){
      margin-right: 0;
    }
    .list{
      width: 90%;
      display: inline-flex;
      margin: auto;
      margin-top: 10px;
      list-style-type:none;
      justify-content: space-between;
      /*background: #000;*/
      height: 200px;
    }
    .item2{
      /* background: #000; */
      width: 150px;
      height: 150px;
    }
    .img2{
      width: 150px;
      height: 150px;
    }
  }
  .global-rank{
    width: 90%;
    margin: auto;
    &:after {
      content: " ";
      display: block; 
      height: 0; 
      clear: both;
    }
    .title{
      position: relative;
      margin: auto;
      margin-top: 24px;
      padding-bottom: 10px;
      font-size: 20px;
      width: 100%;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
    }
    .item {
      cursor: pointer;
      margin: 10px 10px 10px 0px;
      list-style: none;
      float: left;
      text-align: left;
      height: 180px;
      font-size: 13px;
      span {
        position: relative;
        color: #fff;
        padding: 4px;
        margin-left: -80px;
        margin-bottom: -36px;
        float: right;
      }
      img {
        width: 160px;
      }
    }
  }
</style>
