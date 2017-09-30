<template>
  <div class="main">
    <div class="loading" v-if="!isLoading">
      <i class="fa fa-spinner fa-pulse"></i>
      <span class="load-text">载入中...</span>
    </div>
    <div v-if="isLoading">
      <div class="about" >
        <div class="img">
          <img v-bind:src=userInfo.img>
        </div>
        <div class="info">
          <div class="person">
            <span>{{userInfo.nickName}}</span>
            <span class="edit">编辑个人信息</span>
          </div>
          <div class="follow">
            <div class="row">0<p>动态</p></div>
            <div class="row line">3<p>关注</p></div>
            <div class="row">0<p>粉丝</p></div>
          </div>
          <div class="introduce">
            <p>个人介绍：<span>暂无介绍</span></p>
            <p>社交网络：<span>暂无</span></p>
            <p>所在地区：<span>广东省 广州市</span></p>
          </div>
        </div>
      </div>
      <div class="my-create">
        <div class="my-songlist">我创建的歌单</div>
        <ul class="aa">
                <li class="bb"></li>
                <li class="bb"></li>
                <li class="bb"></li>
                <li class="bb"></li>
                <li class="bb"></li>
        </ul>
      </div>
      <div class="my-collect">
        <div class="my-songlist">我收藏的歌单</div>
        <ul class="aa">
                <li class="bb"></li>
                <li class="bb"></li>
                <li class="bb"></li>
                <li class="bb"></li>
                <li class="bb"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userInfo: {},
      isLoading: false
    }
  },
  mounted: function () {
    let self = this
    self.login()
  },
  destroyed: function () {
    let self = this
    self.isLoading = false
  },
  methods: {
    login: function () {
      axios({
        url: '/submission/userInfo.php',
        method: 'post'
      }).then((response) => {
        var self = this
        self.userInfo = response.data
        self.$store.commit('login', self.userInfo)
        self.isLoading = true
        console.log(self.userInfo)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.main{
    position: fixed;
    left: 15%;
    top: 60px;
    bottom: 73px;
    width: 85%;
    height: auto;
    overflow: scroll;
    overflow-x: hidden;
    background-color: #fafafa;
}
.main::-webkit-scrollbar {
    width: 8px;
}
.main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
}
.about{
    position: absolute;
    height: 200px;
    width: 94%;
    display: inline;
    left: 0;
    margin: 2% 3% 0 3%;
}
.img{
    background: #000;
    float: left;
    height: 200px;
    width: 18%;
}
.info{
    float: right;
    text-align: left;
    margin-top: 10px;
    /* margin-right: 0px; */
    height: 200px;
    width: 78%;
}
.person{
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: 1px #e0e0e0 solid;
}
.edit{
    float: right;
    font-size: 14px;
    padding: 2px 10px 2px 10px;
    background: #fff;
    border: 1px #e0e0e0 solid;
    border-radius: 4px;
}
.follow{
    margin-top: 10px;
    margin-left: -20px;
    font-size: 28px;
}
p{
    font-size: 14px;
    padding: 2px;
}
.row{
    display: inline-block;
    padding-right: 50px;
    padding-left: 20px;
}
.line{
    border-right: 1px #e0e0e0 solid;
    border-left: 1px #e0e0e0 solid;
}
.introduce{
    font-size: 20px;
    margin-top: 10px;
}
.my-create{
    position: absolute;
    width: 100%;
    margin-top: 250px;
}
.my-collect{
    position: absolute;
    width: 100%;
    margin-top: 470px;
}
.my-songlist{
    width: 100%;
    padding-left: 3%;
    text-align: left;
    font-size: 14px;
    border-top: 1px #e0e0e0 solid;
    border-bottom: 1px #e0e0e0 solid;
    background: #fcfcfc;
    line-height: 30px;
    height: 30px;
}

  .aa{
    width: 94%;
    display: inline-flex;
    margin: auto;
    margin-top: 10px;
    list-style-type:none;
    justify-content: space-between;
    /*background: #000;*/
    height: 100px;
  }
  .bb{
    background: #000;
    width: 150px;
    height: 150px;
  }
  .loading{
    margin-top: 100px;
  }
</style>
