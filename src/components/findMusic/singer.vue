<template>
    <div class="main">
        <div class="all">
            <div class="title">
                <p>
                    <span>地区：</span>
                </p>
                <p>
                    <span>类型：</span>
                </p>
                <p>
                    <span>上升最快：</span>
                </p>
            </div>
            <ul>
              <router-link v-for="(item, index) in artists" :key="index" :to="{path: '/singerDetails',query: {id: item.id}}" tag="li" exact>
                <img :src="item.img1v1Url" alt="">
                <p>{{item.name}}</p>
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
      artists: [],
      page: 1
    }
  },
  mounted: function () {
    axios({
      url: 'http://localhost:3000/top/artists?offset=' + (this.page - 1),
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      let self = this
      // console.log(response)
      if (this.page === 1) {
        self.artists = response.data.artists
      }
      // console.log(self.artists)
      // for (let i = 0; i < response.data.data.length; i++) {
      //   response.data.data[i].playCount = renderPlayCount(response.data.data[i].playCount)
      //   self.topMV = response.data.data
      // }
      // console.log(self.topMV)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
    .main{
      position: fixed;
      /* background: #000; */
      left: 15%;
      margin-top: 60px;
      bottom: 74px;
      width: 85%;
      text-align: left;
      .all{
        width: 96%;
        margin: auto;
        .title{
          position: relative;
          /* background: #000; */
          margin: auto;
          margin-top: 8px;
          height: 110px;
          border-bottom: 1px solid #e0e0e0;
          width: 93%;
        }
        ul{
          margin: 30px auto;
          width: 94%;
          &:after {
            content: " ";
            display: block; 
            height: 0; 
            clear: both;
          }
          li{
            float: left;
            list-style: none;
            width: 150px;
            height: 170px;
            margin-right: 22px;
            margin-bottom: 20px;
            img{
              cursor: pointer;
              width: 150px;
              height: 150px;
            }
            p {
              cursor: pointer;
              font-size: 14px;
              margin-top: -6px;
            }
          }
        }
      }
    }
    span{
        text-align: left;
        font-size: 14px;
        /* padding-left: 10px; */
    }
    p{
        line-height: 32px;
    }
    .big-font{
        font-size: 20px;
    }
    .more{
        float: right;
        line-height: 32px;
        text-align: right;
    }

</style>

