<template>
    <div class="main" @click="closeStatus()">
        
        <div class="song">
            <div class="img-btn">
                <div class="song-img"></div>
                <div>
                    <ul>
                        <li  class="btn"></li>
                        <li  class="btn"></li>
                        <li  class="btn"></li>
                        <li  class="btn"></li>
                    </ul>
                </div>
            </div>
            <div class="lyrics">
                <h1>非酋</h1>
                <h2>
                    <span>专辑:任然</span>
                    <span>歌手：啊设计的</span>
                </h2>
                <p>歌词</p>
            </div>  
            <div class="close" @click="closeAllDetail()"></div>        
        </div>
        <div class="comment">
            <div class="title">
                <span>听友评论</span>
            </div>
            <input type="text" class="input">
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    closeAllDetail: function () {
      this.$store.commit('showAllDetail', false)
    },
    closeStatus: function () {
      this.$store.commit('showStatus', false)
    }
  }
}
</script>

<style scoped>
    .main{
        background: #000;
        position: fixed;
        width: 100%;
        /* height: 300px; */
        bottom: 73px;
        top: 60px;
        height: auto;
        text-align: center;
        overflow: scroll;
        overflow-x: hidden;
    }
    .main::-webkit-scrollbar {
        width: 8px;
    }
    .main::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #e1e1e2;
    }
    .close{
      background: #fff;
      margin: auto;
      /* float: right; */
      width: 50px;
      height: 50px;
    }
    .song{
        position: relative;
        /* background: #000; */
        display: flex;
        margin: auto;
        margin-right:100px;
        margin-top:10px;
        width: 1000px;
        height: 430px;
    }
    .img-btn{
        position: relative;
        /* background: #000; */
        /* float: left; */
        margin-right: 50px;
        width: 300px;
        height: 450px;
    }
    .song-img{
        background: url("http://p3.music.126.net/Kv0E_qQdJ9amNRu4_64Mxw==/18924794137514110.jpg?param=200y200") no-repeat;
        background-size: 100%;
        /* float: left; */
        position: relative;
        margin-top: 40px;
        width: 300px;
        height: 300px;
    }
    .lyrics{
        /* float: right; */
        position: relative;
        background: #fff;
        width: 300px;
        height: 300px;
    }
    h1{
        text-align: left;
        font-size: 24px;
        font-weight: normal;
    }
    h2{
        text-align: left;
        margin-top: 10px;
        font-size: 14px;
        font-weight: normal;
    }
    span{
        margin-right: 80px;
    }
    li{
        list-style: none;
    }
    .btn{
        background: #000;
        float: left;
        margin: 25px 17px auto 17px;
        height: 40px;
        width: 40px;
    }
    .comment{
        position: relative;
        width: 900px;
        /* left: 15%; */
        margin: auto;
        /* background: #000; */
    }
    .title{
        text-align: left;
        font-size: 24px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
        /* float: left; */
    }
    .input{
        margin-top: 20px;
        margin-bottom: 40px;
        border: 10px solid #e0e0e0;
        padding: 8px;
        font-size: 16px;
        width: 864px;
    }
</style>

