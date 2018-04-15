<template>
	<div class="main">
    <carousel :height="carouselHeight" :img="img"></carousel>
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
    <div class="btn-2" id="newSong">
      <div class="btn-sty">最新音乐
        <span class="more">更多></span>
      </div>
      <ul v-for="(item, index) in newSong" :key="index">
        <li v-for="(i, o) in item" :key="o" @dblclick="setPlayingSong(i)">
          <span><i v-show="o!=4||index!=1">0</i>{{index * 5 + o + 1}}</span>
          <img :src="i.song.album.blurPicUrl">
          <div>
            <p>{{i.name}}</p>
            <p>
              <span v-for="(artist, m) in i.song.artists" :key="m">
                {{artist.name}}
                <i v-show="m!==i.song.artists.length - 1">/</i>
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-2" id="recommendMV">
      <div class="btn-sty">推荐MV
        <span class="more">更多></span>
      </div>
        <ul>
          <li v-for="(item, index) in recommendMV" :key="index">
            <span>
              <i class="fa fa-video-camera fa-lg"></i>
              {{item.playCount}}
            </span>
            <img :src="item.picUrl">
            <!-- <p>{{item.copywriter}}</p> -->
            <p>{{item.name}}</p>
            <p>{{item.artistName}}</p>
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
        exclusive: [],
        newSong: [[], []],
        recommendMV: [],
        carouselHeight: Number,
        img: ['http://p3.music.126.net/09hujI6_LSJD6DWK02qXwQ==/18964376555989719.jpg',
          'http://p4.music.126.net/j_cH-yjz5tTLIDFmz4sSiQ==/18833534674063637.jpg',
          'http://p4.music.126.net/I1zKnPl4g9snKbAA5zJi3Q==/18623527953173535.jpg',
          'http://p4.music.126.net/x9KxmTxNEXHQJS9n-oWRLw==/18623527953173527.jpg',
          'http://p3.music.126.net/U3y3VH4_3cX8pXECLFsHjA==/18624627464801303.jpg',
          'http://p4.music.126.net/F7yr2uUq982rTIWlwvaThg==/18964376555989729.jpg',
          'http://p4.music.126.net/qADzamZDC3c5whBibC_rAQ==/18906102439712983.jpg',
          'http://p3.music.126.net/tw17cN9NJfa5FmFDyS0A_g==/18624627464801294.jpg'
        ]
      }
    },
    components: {
      carousel
    },
    mounted: function () {
      this.getSonglist()
      this.getExclusive()
      this.getNewSong()
      this.getRecommendMV()
    },
    computed: {
      screenWidth: function () {
        return this.$store.state.screenWidth
      }
    },
    methods: {
      getSonglist: function () { // 推荐歌单
        axios({
          // url: 'http://tguow.ink:3000/recommend/resource',
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
      },
      getExclusive: function () { // 独家放送
        axios({
          // url: 'http://tguow.ink:3000/personalized/privatecontent',
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
      getNewSong: function () {
        axios({
          url: 'http://tguow.ink:3000/personalized/newsong',
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          let self = this
          for (let i = 0; i < response.data.result.length; i++) {
            if (i < 5) {
              self.newSong[0].push(response.data.result[i])
            } else {
              self.newSong[1].push(response.data.result[i])
            }
          }
          // console.log(self.newSong)
        }).catch((error) => {
          console.log(error)
        })
      },
      getRecommendMV: function () {
        axios({
          url: 'http://tguow.ink:3000/personalized/mv',
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          let self = this
          self.recommendMV = response.data.result
          // for (let i = 0; i < response.data.result.length; i++) {
          //   if (i < 5) {
          //     self.newSong[0].push(response.data.result[i])
          //   } else {
          //     self.newSong[1].push(response.data.result[i])
          //   }
          // }
          // console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      },
      setPlayingSong: function (song) {
        // console.log(song)
        let self = this
        if (song.copyrightId !== 1000 && song.copyrightId !== 5003) {
          axios({
            url: 'http://tguow.ink:3000/song/detail?ids=' + song.id,
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
    },
    watch: {
      screenWidth: function (val) {
        let imgWidth = (val - 204) * 0.9 * 0.6
        this.carouselHeight = imgWidth * 336 / 730 + 29
      }
    }
  }
</script>


<style lang="scss" scoped>
  .main{
    position: relative;
    left: 0;
    top: 0;
    margin-top: 30px;
    // bottom: 74px;
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
    margin: auto auto 64px auto;
    background: #fafafa;
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
  #newSong {
    width: 90%;
    // display: flex;
    ul {
      margin-top: 20px;
      width: 49%;
      box-sizing: content-box;
      display: inline-block;
      border: 1px solid #cecece;
      &:nth-child(2) {
        border-right: none;
      }
      li {
        list-style: none;
        height: 60px;
        width: 100%;
        &:nth-child(even) {
          background: #ececec;
        }
        &:hover {
          background: #e0e0e0;
        }
        &:after {
          content: " ";
          display: block; 
          height: 0; 
          clear: both;
        }
        span {
          float: left;
          display: block;
          height: 60px;
          line-height: 60px;
          padding: 0 10px;
        }
        img {
          float: left;
          margin: 10px 0;
          width: 40px;
          cursor: pointer;
        }
        div {
          // display: inline-block;
          float: left;
          width: 65%;
          height: 60px;
          font-size: 14px;
          padding-left: 8px;
          p {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 100%;
            color: #000;
            padding-top: 10px;
            height: 40px;
            margin-bottom: -24px;
            span {
              color: #6d6d6d;
              line-height: 30px;
              padding: 0;
            }
            i {
              font-style: normal;
            }
          }
        }
      }
    }
  }
  #recommendMV {
    ul {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      li {
        list-style: none;
        width: 240px;
        font-size: 14px;
        img {
          width: 240px;
        }
        span {
          position: relative;
          float: right;
          color: #fff;
          padding: 4px;
          margin-bottom: -22px;
        }
      }
    }
  }
</style>
