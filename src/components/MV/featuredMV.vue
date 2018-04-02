<template>
    <div class="main">
        <div class="newMV">
            <div class="title">
                <span class="big-font">最新MV</span>
                <span>内地</span>
                <router-link :to="{ path: '/MV/allMV'}" class="more" tag="span">更多</router-link>
            </div>
            <ul v-for="(i, id) in newMV" :key="id">
              <li v-for="(item, index) in i" :key="index">
                <span>
                  <i class="fa fa-video-camera fa-lg"></i>
                  {{item.playCount}}
                </span>
                <img :src="item.cover">
                <p>{{item.briefDesc}}</p>
                <p>{{item.name}}</p>
                <p>{{item.artistName}}</p>
              </li>
            </ul>
        </div>
        <div class="newMV">
            <div class="title">
                <span class="big-font">热播MV</span>
                <router-link :to="{ path: '/MV/allMV'}" class="more" tag="span">更多</router-link>
            </div>
            <ul v-for="(i, id) in hotMV" :key="id">
              <li v-for="(item, index) in i" :key="index">
                <span>
                  <i class="fa fa-video-camera fa-lg"></i>
                  {{item.playCount}}
                </span>
                <img :src="item.picUrl">
                <p>{{item.copywriter}}</p>
                <p>{{item.name}}</p>
                <p>{{item.artistName}}</p>
              </li>
            </ul>
        </div>
        <div class="topMV">
            <div class="title">
                <span class="big-font">MV排行榜</span>
                <span>内地</span>
                <router-link :to="{ path: '/MV/allMV'}" class="more" tag="span">更多</router-link>
            </div>
            <div class="rank">
                <ol>
                  <li v-for="(item, index) in topMV" :key="index">
                    <img :src="item.cover">
                    <div>
                      <p>{{item.name}}</p>
                      <p>{{item.artistName}}</p>
                      <p>{{item.briefDesc}}</p>
                    </div>
                  </li>
                </ol>
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
      newMV: [[], []],
      hotMV: [[], []],
      topMV: []
    }
  },
  mounted: function () {
    axios({
      // url: 'http://tguow.ink:3000/recommend/resource',
      url: '/mv/first',
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      let self = this
      for (let i = 0; i < response.data.data.length; i++) {
        response.data.data[i].playCount = renderPlayCount(response.data.data[i].playCount)
        if (i < 3) {
          self.newMV[0].push(response.data.data[i])
        } else {
          self.newMV[1].push(response.data.data[i])
        }
      }
    }).catch((error) => {
      console.log(error)
    })
    axios({
      // url: 'http://tguow.ink:3000/recommend/resource',
      url: '/personalized/mv',
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      let self = this
      for (let i = 0; i < response.data.result.length; i++) {
        response.data.result[i].playCount = renderPlayCount(response.data.result[i].playCount)
        if (i < 3) {
          self.hotMV[0].push(response.data.result[i])
        } else {
          self.hotMV[1].push(response.data.result[i])
        }
      }
    }).catch((error) => {
      console.log(error)
    })
    axios({
      // url: 'http://tguow.ink:3000/recommend/resource',
      url: '/top/mv',
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      let self = this
      console.log(response)
      for (let i = 0; i < response.data.data.length; i++) {
        response.data.data[i].playCount = renderPlayCount(response.data.data[i].playCount)
        self.topMV = response.data.data
      }
      console.log(self.topMV)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
    .main{
        position: relative;
        margin: auto;
        text-align: left;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;
    }
    .newMV{
        width: 90%;
        margin: auto;
    }
    .title{
        position: relative;
        /* background: #000; */
        margin: auto;
        height: 32px;
        border-bottom: 1px solid #e0e0e0;
        width: 96%;
    }
    .big-font{
        font-size: 20px;
    }
    .more{
      cursor: pointer;
        float: right;
        line-height: 32px;
        text-align: right;
    }
    ul{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      li{
        cursor: pointer;
        list-style: none;
        margin: auto;
        width: 300px;
        height: 210px;
        margin-bottom: 20px;
        span {
          position: relative;
          color: #fff;
          font-size: 14px;
          padding: 5px;
          float: right;
          margin-bottom: -30px;
        }
        p {
          padding: 2px;
          text-align: left;
          font-size: 14px;
          &:nth-child(3) {
            color: #fff;
            font-size: 12px;
            margin-top:-26px;
          }
          &:nth-child(4) {
            color: #000;
          }
        }
        img {
          // background: #000;
          width: 300px;
          height: 169px;
        }
      }
    }
    .topMV{
      width: 90%;
      margin: auto;
      .rank {
        ol {
          li {
            cursor: pointer;
            float: left;
            margin: 15px 0 15px 2%;
            width: 48%;
            list-style: none;
            img {
              float: left;
              width: 200px;
              height: auto;
              // display: inline-block;
            }
            div {
              float: left;
              width: 250px;
              height: 116.44px;
              // display: inline-block;
              p {
                padding: 2px 8px;
                font-size: 14px;
                margin-top: 4px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                // width: 240px;
                &:nth-child(1) {
                  color: #000;
                }
                &:nth-child(3) {
                  margin-top: 6px;
                  color: rgb(172, 171, 171);
                }
              }
            }
          }
        }
      }
    }
</style>
