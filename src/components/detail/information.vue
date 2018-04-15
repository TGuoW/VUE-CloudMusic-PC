<template>
  <div class="main">
    <div class="loading" v-if="!isLoading">
      <i class="fa fa-spinner fa-pulse"></i>
      <span class="load-text">载入中...</span>
    </div>
    <div v-if="isLoading">
      <div class="about" >
        <div class="img">
          <img v-bind:src=userInfo.profile.avatarUrl>
        </div>
        <div class="info">
          <div class="person">
            <span>{{userInfo.profile.nickname}}</span>
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
      <div class="my-playlist">
        <div class="my-songlist">我创建的歌单</div>
        <ul>
          <router-link v-for="(item, index) in playlist" :key="index" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="li" exact>
            <playlist-child :item="item" :artist="false" v-if="item.creator.userId==userInfo.account.id"></playlist-child>
          </router-link>
        </ul>
      </div>
      <div class="my-playlist">
        <div class="my-songlist">我收藏的歌单</div>
        <ul>
          <router-link v-for="(item, index) in playlist" :key="index" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="li" exact>
            <playlist-child :item="item" :artist="false" v-if="item.creator.userId!=userInfo.account.id"></playlist-child>
          </router-link>
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
      isLoading: false,
      playlist: []
    }
  },
  mounted: function () {
    this.userInfo = this.$store.state.userInfo
    console.log(this.userInfo)
    this.getPlaylist()
  },
  destroyed: function () {
    let self = this
    self.isLoading = false
  },
  methods: {
    getPlaylist: function () {
      let self = this
      axios({
        url: 'http://tguow.ink:3000/user/playlist?uid=' + self.$store.state.userInfo.account.id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.isLoading = true
        self.playlist = response.data.playlist
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
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
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
    // position: absolute;
    height: 240px;
    width: 94%;
    display: flex;
    left: 0;
    margin: 2% 3% 0 3%;
}
.img{
    background: #000;
    float: left;
    height: 200px;
    width: 200px;
    img {
      width: 100%;
    }
}
.info{
    flex: 1;
    text-align: left;
    margin-top: 10px;
    margin-left: 40px;
    height: 200px;
    width: 100%;
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
.my-playlist{
  width: 100%;
  ul {
    width: 94%;
    margin: auto;
    &::after {
      content: " ";
      display: block; 
      height: 0; 
      clear: both;
    }
    li {
      list-style: none;
      float: left;
    }
  }
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

  // .aa{
  //   width: 94%;
  //   display: inline-flex;
  //   margin: auto;
  //   margin-top: 10px;
  //   list-style-type:none;
  //   justify-content: space-between;
  //   /*background: #000;*/
  //   height: 100px;
  // }
  .bb{
    background: #000;
    width: 150px;
    height: 150px;
  }
  .loading{
    margin-top: 100px;
  }
</style>
