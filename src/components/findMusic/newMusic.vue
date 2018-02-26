<template>
  <div class="main">
    <div class="title">
      <span>新碟速递</span>
    </div>
    <div class="list">
      <p class="head">全部新碟</p>
      <ul>
        <router-link v-for="(item, index) in albums" :key="index" :to="{path: '/albumDetails',query: {id: item.id}}" tag="li" exact>
          <img :src="item.blurPicUrl" alt="">
          <div class="msk"></div>
          <p>{{item.name}}</p>
          <p>
            <span v-for="(i, o) in item.artists" :key="o">
              {{i.name}}
              <i v-if="o!==item.artists.length-1">/</i>
            </span>
          </p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      albums: []
    }
  },
  mounted: function () {
    axios({
      url: 'http://localhost:3000/top/album?offset=0&limit=30',
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      let self = this
      self.albums = response.data.albums
      // console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>


<style lang="scss" scoped>
  .main{
    position: fixed;
    font-size: 14px;
    left: 15%;
    margin-top: 60px;
    bottom: 74px;
    width: 85%;
  }
  .title {
    text-align: center;
    width: 100%;
    span {
      line-height: 36px;
      background: #fff;
      border: 1px solid #e0e0e0;
      padding: 6px 36px;
      border-radius: 6px;
    }
  }
  .list {
    text-align: left;
    height: auto;
    margin: auto;
    width: 90%;
    .head {
      padding-bottom: 4px;
      font-size: 24px;
      border-bottom: 2px solid rgb(196, 4, 4);
    } 
    ul {
      margin-top: 10px;
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
        margin: 9px;
        width: 153px;
        height: 160px;
        margin-bottom: 32px;
        img {
          width: 130px;
        }
        .msk {
          margin-top: -133px;
          background: url(http://s2.music.126.net/style/web2/img/coverall.png?badf00d015339a79cfa340721158636c);
          width: 153px;
          height: 130px;
          background-position: 0 -845px;
        }
        p {
          padding-top: 4px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:nth-child(3) {
            width: 130px;
            color: #000;
          }
          &:nth-child(4) {
            width: 130px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
