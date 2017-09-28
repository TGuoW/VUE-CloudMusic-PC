<template>
  <div class="main">
    <div class="drop-down">华语</div>
    <div class="classification">
      热门标签：
      <span v-for="(cl, index) in classification" :key="index">{{cl.Classification}}</span>
    </div>
    <div>
      <ul class="list">
        <li class="item" v-for="(item, index) in songlist" :key="index">
          <img :src="item.imgUrl">
          <p>{{item.songlistName}}</p>
        </li>
      </ul>
    </div>
    <div class="page">
      <span>1 2 3 4 5 6 7 8 9 10</span>
    </div>
  </div>
</template>
<<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      songlist: [],
      classification: [],
      page: 1
    }
  },
  mounted: function () {
    axios({
      url: '/submission/getSonglist.php',
      method: 'post',
      data: {
        page: this.page
      }
    }).then((response) => {
      console.log('getMsg +1拿到数据了')
      var self = this
      self.songlist = response.data
      console.log(self.songlist)
    }).catch((error) => {
      console.log(error)
    })
    axios({
      url: '/submission/getClassification.php',
      method: 'post'
    }).then((response) => {
      console.log('getMsg +1拿到数据了')
      var self = this
      self.classification = response.data
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .main{
    position: relative;
    left: 0;
    /* margin-top: 60px; */
    top: 0;
    margin: auto auto auto auto;
    bottom: 74px;
    width: 100%;
    /* text-align: center; */
  }
  .drop-down{
    text-align: left;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 5%;
    width: 40px;
    padding: 3px 10px 3px 10px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    background: #fff;
    /* background: #000; */
  }
  .classification{
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    margin-left: 5%;
    
  }
  span{
    color: gray;
    border-left: 1px solid #e0e0e0;
    padding: 0 15px 0 15px;
  }
  span:nth-child(1){
    border-left: none;
  }
  .list{
    width: 92%;
    /* background: #000; */
    /* display: inline-flex; */
    margin: auto;
    margin-top: 10px;
    height: 5700px;
    list-style-type:none;
    justify-content: space-between;
    /*background: #000;*/
    /* height: 100px; */
  }
  img{
    width: 180px;
  }
  item{
    display: block;
    margin: auto;
    /* width: 140px; */
  }
  li{
    float: left;
    width: 150px;
    margin:8px 28px 8px 28px;
    font-size: 14px;
  }
  .page{
    background: #000;
    /* width: 1000px;
    height: 100px; */
  }
</style>

