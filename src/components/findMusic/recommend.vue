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
    <div class="btn-2" id="newSong">
      <div class="btn-sty">最新音乐
        <span class="more">更多></span>
      </div>
      <ul v-for="(item, index) in newSong" :key="index">
        <li v-for="(i, o) in item" :key="o">
          <span><i v-show="o!=4||index!=1">0</i>{{index * 5 + o + 1}}</span>
          <img :src="i.song.album.blurPicUrl">
          <div>
            <p>{{i.name}}</p>
            <!-- <p> -->
              <span v-for="(artist, m) in i.song.artists" :key="m">
                {{artist.name}}
                <i v-show="m!==i.song.artists.length - 1">/</i>
              </span>
            <!-- </p> -->
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
        recommendMV: []
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
    methods: {
      getSonglist: function () { // 推荐歌单
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
      },
      getExclusive: function () { // 独家放送
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
      getNewSong: function () {
        axios({
          url: 'http://localhost:3000/personalized/newsong',
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
          console.log(self.newSong)
        }).catch((error) => {
          console.log(error)
        })
      },
      getRecommendMV: function () {
        axios({
          url: 'http://localhost:3000/personalized/mv',
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
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
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
    ul {
      margin-top: 20px;
      width: 50%;
      display: inline-block;
      border: 1px solid #cecece;
      &:nth-child(2) {
        border-right: none;
      }
      li {
        list-style: none;
        height: 60px;
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
          height: 60px;
          font-size: 14px;
          padding-left: 8px;
          p {
            color: #000;
            // height: 30px;
            padding-top: 10px;
          }
          span {
            height: 30px;
            line-height: 30px;
            padding: 0;
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
