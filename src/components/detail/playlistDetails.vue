<template>
  <div class="main" @click="login()">
    <header>
      <img :src="playlist.coverImgUrl" alt="">
      <div>
        <p>
          <span class="playlist-text">歌单</span>
          <span>{{playlist.name}}</span>
        </p>
        <div>
          <img :src="creator.avatarUrl" alt="">
          <span class="nickname">{{creator.nickname}}</span>
          <span class="createTime">{{playlist.createTime}}创建</span>
        </div>
        <div class="btn-group">
          <span class="btn"><i class="fa fa-play-circle-o fa-fw"></i>播放全部</span>
          <span class="btn"><i class="fa fa-folder-o fa-fw"></i>收藏</span>
          <span class="btn"><i class="fa fa-share-square-o fa-fw"></i>分享</span>
          <span class="btn"><i class="fa fa-download fa-fw"></i>下载全部</span>
        </div>
        <p>
          <span v-for="(item, index) in tags" :key="index">
            {{item}}
          </span>
        </p>
      </div>
      <div class="count">
        <span><i class="fa fa-music fa-fw"></i>{{playlist.trackCount}}</span>
        <span><i class="fa fa-play-circle-o fa-fw"></i>{{playlist.playCount}}</span>
      </div>
    </header>
    <nav>
      <ul>
        <li class="active-page" id="playlist" @click="viewPage(1)">歌曲列表</li>
        <li id="commend" @click="viewPage(2)">评论</li>
        <li id="collect" @click="viewPage(3)">收藏者</li>
      </ul>
    </nav>
    <div id="playlist-details" v-show="page===1">
      <div class="title">
        <p></p>
        <!-- <p>操作</p> -->
        <p>音乐标题</p>
        <p>歌手</p>
        <p>专辑</p>
        <p>时长</p>
      </div>
      <ul>
        <li v-for="(item, index) in songlist" :key="index" @dblclick="setPlayingSong(item)">
          <p>
            <i v-show="index<9">0</i>{{index+1}}
          </p>
          <p :style="(item.copyrightId!==1000&&item.copyrightId!==5003)?'color:#000':'color:#b0b0b0'">{{item.name}}</p>
          <p>
            <span v-for="(i, o) in item.artists" :key="o">
              {{i.name}}<i v-show="o!==(item.artists.length-1)">/</i>
            </span>
          </p>
          <p>{{item.album.name}}</p>
          <p>{{durationFormat(item.duration)}}</p>
        </li>
      </ul>
      <!-- <v-table
        class="table"
        :width="1000"
        :columns="columns"
        :table-data="data"
        :show-vertical-border="false"
      ></v-table> -->
    </div>
    <div v-show="page===2">

    </div>
    <div v-show="page===3">

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
      screenWidth: document.body.clientWidth * 0.85,
      queryID: this.$route.query.id,
      playlist: {},
      creator: {},
      tags: [],
      data: [],
      columns: [
        { title: '', field: '', width: 100 },
        { title: '', field: 'id', width: 100 },
        { title: '音乐标题', field: 'name', width: 200 },
        { title: '歌手', field: 'artists', width: 200 },
        { title: '专辑', field: 'album', width: 200 },
        { title: '时长', field: 'duration' }
      ],
      songlist: []
    }
  },
  // props: ['parentPlaylist'],
  beforeMount: function () {
    this.playlist = localStorage.get('playlist')
    this.creator = this.playlist.creator
  },
  mounted: function () {
    let self = this
    self.getSonglist()
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        self.screenWidth = window.screenWidth * 0.85
      })()
    }
  },
  watch: {
    $route: {
      handler: function (val, oldval) {
        this.queryID = this.$route.query.id
        this.getSonglist()
        localStorage.set('playlist', this.playlist)
      }
    }
  },
  methods: {
    login: function () {
      // console.log(this.$route.query.id)
    },
    getSonglist: function () {
      let self = this
      axios({
        url: 'http://localhost:3000/playlist/detail?id=' + self.queryID,
        // url: '/user/playlist',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.playlist = response.data.result
        self.playlist.createTime = timeFormat(self.playlist.createTime).split(' ')[0]
        self.playlist.playCount = renderPlayCount(self.playlist.playCount)
        self.creator = response.data.result.creator
        self.tags = response.data.result.tags
        self.songlist = response.data.result.tracks
        self.updateSonglist(self.songlist)
      }).catch((error) => {
        console.log(error)
      })
    },
    updateSonglist: function (songlist) {
      let self = this
      self.data = []
      for (let i = 0; i < songlist.length; i++) {
        self.data[i] = {}
        self.data[i].id = (i + 1) / 10 < 1 ? '0' + (i + 1) : i + 1
        self.data[i].name = songlist[i].name
        self.data[i].artists = songlist[i].artists.reduce((a, b) => {
          return a + '/' + b.name
        }, '').substr(1)
        self.data[i].album = songlist[i].album.name
        self.data[i].duration = self.durationFormat(songlist[i].duration)
      }
    },
    durationFormat: function (time) {
      let temp = Math.floor(time / 1000)
      let minute = Math.floor(temp / 60).toString()
      let second = temp % 60 < 10 ? '0' + temp % 60 : temp % 60
      return minute + ':' + second
    },
    viewPage: function (num) {
      document.getElementById('playlist').className = num === 1 ? 'active-page' : ''
      document.getElementById('commend').className = num === 2 ? 'active-page' : ''
      document.getElementById('collect').className = num === 3 ? 'active-page' : ''
      this.page = num
    },
    setPlayingSong: function (song) {
      let self = this
      if (song.copyrightId !== 1000 && song.copyrightId !== 5003) {
        axios({
          url: 'http://localhost:3000/song/detail?ids=' + song.id,
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          self.$store.commit('setPlayingSong', response.data.songs)
        }).catch((error) => {
          console.log(error)
        })
      } else {
        let dialog = document.createElement('div')
        dialog.style.cssText = 'position:fixed; width:600px; height:150px; background:#000; left:0; right:0; top:0; bottom:0; margin:auto; border-radius:10px; color:#fff; text-align:center; line-height:150px; opacity:0.8; font-size:24px;'
        dialog.innerText = '因网易云合作方要求，该资源已下架'
        document.body.appendChild(dialog)
        setTimeout(function () {
          document.body.removeChild(dialog)
        }, 2000)
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
    text-align: center;
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
        font-size: 24px;
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
      .btn-group {
        .btn {
          cursor: pointer;
          background: #fff;
          font-size: 14px;
          padding: 5px 14px;
          margin-right: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          &:nth-child(1) {
            i {
              color: rgb(207, 25, 25);
            }
          }
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
    // background: #000;
    border-bottom: 1px solid rgb(194, 26, 26);
    ul {
      margin-left: 40px;
      li {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        padding: 6px 16px;
      }
      .active-page {
        background: rgb(194, 26, 26);
        color: #fff;
      }
    }
  }
  #playlist-details {
    width: 100%;
    margin: auto;
    font-size: 13px;
    .title {
      width: 100%;
      height: 28px;
      line-height: 28px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
      p {
        border-left: 1px solid #e0e0e0;
        padding: 0 8px;
        height: 28px;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        &:nth-child(1) {
          border-left: none;
          width: 72px;
          padding: 0 32px;
        }
        &:nth-child(2) {
          width: 30%;
        }
        &:nth-child(3) {
          width: 20%;
        }
        &:nth-child(4) {
          width: 20%;
        }
      }
    }
    ul {
      li {
        width: 100%;
        height: 28px;
        line-height: 28px;
        list-style: none;
        text-align: left;
        &:nth-child(even) {
          background: #f1f1f1;
        }
        i {
          font-style: normal;
        }
        p {
          padding: 0 8px;
          display: inline-block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &:nth-child(1) {
            width: 72px;
            padding: 0 32px;
          }
          &:nth-child(2) {
            width: 30%;
          }
          &:nth-child(3) {
            width: 20%;
          }
          &:nth-child(4) {
            width: 20%;
          }
        }
      }
    }
  }
  .table {
    margin: 0 auto;
    text-align: left;
  }
</style>
