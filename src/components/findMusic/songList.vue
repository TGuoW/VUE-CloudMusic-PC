<template>
  <div class="main">
    <div class="drop-down">华语</div>
    <div class="classification">
      热门标签：
      <span>华语</span>
    </div>
    <div>
      <ul class="list">
        <li class="item" v-for="(item, index) in songlist" :key="index">
          <img :src="item.imgUrl">
          <p>{{item.songlistName}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      songlist: []
    }
  },
  mounted: function () {
    axios({
      url: '/submission/getSonglist.php',
      method: 'post'
    }).then((response) => {
      console.log('getMsg +1拿到数据了')
      var self = this
      self.songlist = response.data
      console.log(self.songlist)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .main{
    position: fixed;
    left: 15%;
    /* margin-top: 60px; */
    margin: 60px auto auto auto;
    bottom: 74px;
    width: 85%;
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
    padding: 0 10px 0 10px;
  }
  .list{
    width: 92%;
    /* background: #000; */
    /* display: inline-flex; */
    margin: auto;
    margin-top: 10px;
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
</style>

