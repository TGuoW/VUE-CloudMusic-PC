<template>
  <div class="main" @click="login()">
    <header>
      <img :src="artist.img1v1Url" alt="">
      <div>
        <p style="font-size:24px">
          <span class="playlist-text">歌手</span>
          <span>{{artist.name}}</span>
        </p>
        <p style="padding:0 48px 14px 48px">
          <span style="font-size:14px" v-for="(item, index) in artist.alias" :key="index">{{item}}</span>
        </p>
        <p>单曲数：{{artist.musicSize}}</p>
        <p>专辑数：{{artist.albumSize}}</p>
        <p>专辑数：{{artist.mvSize}}</p>
      </div>
    </header>
    <nav>
      <ul>
        <li class="active-page" id="playlist" @click="viewPage(1)">专辑</li>
        <li id="mv" @click="viewPage(2)">MV</li>
        <li id="singer-detail" @click="viewPage(3)">歌手详情</li>
        <li id="singer-same" @click="viewPage(4)">相似歌手</li>
      </ul>
    </nav>
    <div id="albumlist" v-show="page===1">
      <div>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519054086639&di=a7486624b4cc0a99707063906f7ee16a&imgtype=0&src=http%3A%2F%2Fp3.music.126.net%2FeSXJexcoihfSe8ERgOdMnQ%3D%3D%2F2920302885027135.jpg" alt="">
      </div>
      <div>
        <p>热门50首</p>
        <ul>
          <li v-for="(item, index) in hotSongs" :key="index" v-if="index<10||hotSongs.isShowAll">
            <span>
              <i v-show="index<9">0</i>
              {{index+1}}
            </span>
            <span>{{item.name}}</span>
            <span>{{durationFormat(item.dt)}}</span>
          </li>
        </ul>
        <p class="view-all" v-show="!hotSongs.isShowAll" @click="viewAllAlbumSong()">
          查看全部{{hotSongs.length}}首<i class="fa fa-chevron-right fa-fw"></i>
        </p>
      </div>
    </div>
    <div id="albumlist" v-for="(item, index) in album" :key="index" v-show="page===1">
      <div>
        <router-link style="cursor:pointer;" :src="item.blurPicUrl" :to="{path: '/albumDetails',query: {id: item.id}}" tag="img" exact></router-link>
        <!-- <img :src="item.blurPicUrl" alt=""> -->
        <p>{{timeFormat(item.publishTime).split(' ')[0]}}</p>
      </div>
      <div>
        <p>{{item.name}}</p>
        <ul>
          <!-- v-show="m<albumSong[item.id].showNum" -->
          <li v-for="(i, m) in albumSong[index]" :key="m" v-if="albumSong[index].isShowAll||m<10">
            <span>
              <i v-show="m<9">0</i>
              {{m+1}}
            </span>
            <span>{{i.name}}</span>
            <span>{{durationFormat(i.dt)}}</span>
          </li>
        </ul>
        <p class="view-all" v-show="!albumSong[index].isShowAll&&albumSong[index].length>10" @click="viewAllAlbumSong(index)">
          查看全部{{albumSong[index].length}}首<i class="fa fa-chevron-right fa-fw"></i>
        </p>
      </div>
    </div>
    <div class="mvs" v-show="page===2">
      <ul>
        <li v-for="(item, index) in mvs" :key="index">
          <span>
            <i class="fa fa-video-camera fa-lg"></i>
            {{renderPlayCount(item.playCount)}}
          </span>
          <img :src="item.imgurl">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="introduction" v-show="page===3">
      <div>
        <h3>{{artist.name}}简介</h3>
        <pre>{{desc.briefDesc}}</pre>
      </div>
      <div v-for="(item, index) in desc.introduction" :key="index">
        <h3>{{item.ti}}</h3>
        <pre>{{item.txt}}</pre>
      </div>
    </div>
    <div v-show="page===4">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import timeFormat from './time'
import localStorage from './localStorge'
import renderPlayCount from './renderPlayCount'
export default {
  data () {
    return {
      page: 1,
      artist: {},
      hotSongs: [],
      album: [],
      albumSong: [],
      isShowAll: [],
      mvs: [],
      desc: {}
    }
  },
  // props: ['parentPlaylist'],
  beforeMount: function () {
    this.playlist = localStorage.get('playlist')
    this.creator = this.playlist.creator
  },
  created: function () {
    this.getSonglist()
    this.getAlbum()
  },
  watch: {
    $route: {
      handler: function (val, oldval) {
        this.queryID = this.$route.query.id
        this.getSonglist()
        // localStorage.set('playlist', this.playlist)
      }
    }
  },
  methods: {
    renderPlayCount: renderPlayCount,
    timeFormat: timeFormat,
    login: function () {
      // console.log(this.$route.query.id)
    },
    getSonglist: function () {
      let self = this
      axios({
        url: 'http://localhost:3000/artists?id=' + self.$route.query.id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.artist = response.data.artist
        self.hotSongs = response.data.hotSongs
        self.hotSongs.isShowAll = false
      }).catch((error) => {
        console.log(error)
      })
    },
    getAlbum: function () {
      let self = this
      axios({
        url: 'http://localhost:3000/artist/album?id=' + self.$route.query.id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        let self = this
        let promises = []
        // self.album = response.data.hotAlbums
        response.data.hotAlbums.forEach(element => {
          promises.push(self.getAlbumSong(element))
        })
        Promise.all(promises).then(function (values) {
          self.album = response.data.hotAlbums
          self.albumSong = values
          self.albumSong.forEach(element => {
            element.isShowAll = false
          })
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    getAlbumSong: function (element) {
      return new Promise(function (resolve, reject) {
        axios({
          url: 'http://localhost:3000/album?id=' + element.id,
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          resolve(response.data.songs)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    viewAllAlbumSong: function (id) {
      if (id) {
        let newValue = this.albumSong[id]
        newValue.isShowAll = true
        this.albumSong.splice(id, 1, newValue)
      } else {
        let newValue = [...this.hotSongs]
        newValue.isShowAll = true
        this.hotSongs = newValue
      }
    },
    getMV: function () {
      let self = this
      axios({
        url: 'http://localhost:3000/artist/mv?id=' + self.artist.id + '&limit=30',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.mvs = response.data.mvs
        // console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    getDesc: function () {
      let self = this
      axios({
        url: 'http://localhost:3000/artist/desc?id=' + self.artist.id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.desc = response.data
        // console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    getSimiSinger: function () {
      // let self = this
      axios({
        url: 'http://localhost:3000/simi/artist?id=6452',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        // self.desc = response.data
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    durationFormat: function (time) {
      let temp = Math.floor(time / 1000)
      let minute = Math.floor(temp / 60).toString()
      let second = temp % 60 < 10 ? '0' + temp % 60 : temp % 60
      return minute + ':' + second
    },
    viewPage: function (num) {
      document.getElementById('playlist').className = num === 1 ? 'active-page' : ''
      document.getElementById('mv').className = num === 2 ? 'active-page' : ''
      document.getElementById('singer-detail').className = num === 3 ? 'active-page' : ''
      document.getElementById('singer-same').className = num === 4 ? 'active-page' : ''
      this.page = num
      if (num === 2) {
        this.getMV()
      } else if (num === 3) {
        this.getDesc()
      } else if (num === 4) {
        this.getSimiSinger()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-table-class{
   font-size: 14px;
}
  .main{
    background: #fafafa;
    position: absolute;
    left: 15%;
    height: auto;
    /* background: #000; */
    height: auto;
    top: 60px;
    bottom: 74px;
    width: 85%;
    overflow: scroll;
    overflow-x: hidden;
    text-align: left;
  }
  .main::-webkit-scrollbar {
    width: 8px;
  }
  .main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
  }
  header {
    padding: 20px 40px;
    display: flex;
    // justify-content: space-between;
    img {
      width: 200px;
      height: 200px;
    }
    div {
      text-align: left;
      margin-left: 36px;
      p {
        padding-bottom: 14px;
        font-size: 14px;
        .playlist-text {
          background: rgb(165, 20, 20);
          font-size: 14px;
          color: #fff;
          border-radius: 2px;
          padding: 4px 7px;
        }
      }
      div {
        margin: 20px 0;
        height: 40px;
        img {
          float: left;
          // display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        .nickname {
          float: left;
          font-size: 14px;
          margin-top: 10px;
          margin-left: 20px;
        }
        .createTime {
          float: left;
          font-size: 14px;
          margin-top: 10px;
          margin-left: 20px;
        }
      }
    }
    .count {
      padding-top: 20px;
      span {
        font-size: 14px;
        padding-right: 24px;
      }
    }
  }
  nav {
    text-align: left;
    height: 32px;
    // background: #000;
    border-bottom: 1px solid rgb(194, 26, 26);
    ul {
      margin-left: 40px;
      &:after {
        content: " ";
        height: 0;
        display: block;
        clear: both;
      }
      li {
        list-style: none;
        cursor: pointer;
        float: left;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        height: 32px;
        // line-height: 32px;
        font-size: 14px;
        padding: 6px 32px;
      }
      .active-page {
        border: none;
        background: rgb(194, 26, 26);
        color: #fff;
      }
    }
  }
  #albumlist {
    font-size: 14px;
    display: block;
    text-align: left;
    margin: 20px auto;
    width: 91%;
    height: auto;
    &:after {
      content: " ";
      display: block; 
      height: 0; 
      clear: both;
    }
    div {
      float: left;
      &:nth-child(1) {
        width: 16%;
      }
      &:nth-child(2) {
        width: 70%;
        margin-left: 60px;
      }
      img {
        width: 100%;
      }
      p {
        float: left;
        clear: both;
        padding: 0 0 10px 0;
      }
      ul {
        position: relative;
        border: 1px solid #e0e0e0;
        float: left;
        width: 100%;
        height: auto;
        margin-bottom: 16px;
        li {
          float: left;
          list-style: none;
          clear: both;
          width: 100%;
          padding: 4px;
          &:after {
            content: " ";
            display: block; 
            height: 0; 
            clear: both;
          }
          &:nth-child(even) {
            background: #f1f1f1;
          }
          span {
            padding: 2px 8px;
            &:nth-child(2) {
              display: inline-block;
              width: 80%;
            }
            &:nth-child(3) {
              padding-right: 40px;
            }
          }
          i {
            font-style: normal;
            margin-right: -4px;
          }
        }
      }
      .view-all {
        cursor: pointer;
        font-size: 12px;
        &:hover {
          color: #727272;
        }
      }
    }
  }
  .mvs {
    font-size: 14px;
    display: block;
    text-align: left;
    margin: 20px auto;
    width: 91%;
    height: auto;
    ul {
      &:after {
        content: " ";
        display: block; 
        height: 0; 
        clear: both;
      }
      li {
        cursor: pointer;
        list-style: none;
        float: left;
        margin: 8px auto;
        margin-right: 36px;
        width: 169px;
        height: 150px;
        span {
          position: relative;
          float: right;
          color: #fff;
          margin-bottom: -18px;
        }
        img {
          width: 169px;
        }
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .introduction {
    width: 91%;
    // font-size: 14px;
    line-height: 32px;
    display: block;
    text-align: left;
    margin: 20px auto;
    width: 91%;
    height: auto;
    pre {
      font-size: 16px;
      // text-indent: 32px;
      width: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    div {
      margin-top: 24px;
    }
  }
  .table {
    margin: 0 auto;
    text-align: left;
  }
</style>
