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
        <li>歌曲列表</li>
        <li>评论</li>
        <li>收藏者</li>
      </ul>
    </nav>
    <div style="width:100%;">
      <v-table
        class="table"
        :width="1000"
        :columns="columns"
        :table-data="data"
        :show-vertical-border="false"
      ></v-table>
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
        console.log(1)
        this.queryID = this.$route.query.id
        this.getSonglist()
        // val.createTime = timeFormat(val.createTime).split(' ')[0]
        // this.playlist = val
        // this.getSonglist()
        // this.playlist.playCount = renderPlayCount(this.playlist.playCount)
        // this.creator = this.playlist.creator
        // this.tags = this.playlist.tags
        // localStorage.set('playlist', this.playlist)
      }
    }
    // screenWidth (val) {
    //   if (!this.timer) {
    //     this.screenWidth = val
    //     this.timer = true
    //     let self = this
    //     setTimeout(function () {
    //       self.columns.forEach(element => {
    //         element.width = self.screenWidth / 2
    //       })
    //       self.timer = false
    //     }, 400)
    //   }
    // }
  },
  methods: {
    login: function () {
      console.log(this.$route.query.id)
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
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        .nickname {
          height: 40px;
          line-height: 40px;
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
        background: rgb(194, 26, 26);
        font-size: 14px;
        color: #fff;
        padding: 6px 16px;
      }
    }
  }
  .table {
    margin: 0 auto;
    text-align: left;
  }
</style>
