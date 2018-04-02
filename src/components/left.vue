<template>
  <div class="main" @click="jj()">
	  <div id="left">
      <div id="list-head">推荐</div>
      <ul id="list">
        <router-link :to="{ path: '/findMusic' }" tag="li">
          <i class="fa fa-music fa-fw"></i>发现音乐
        </router-link>
        <router-link :to="{ path: '/FM' }" tag="li">
          <i class="fa fa-podcast fa-fw"></i>私人FM
        </router-link>
        <router-link :to="{ path: '/MV' }" tag="li">
          <i class="fa fa-youtube-play fa-fw"></i>MV
        </router-link>
        <router-link :to="{ path: '/asa' }" tag="li">
          <i class="fa fa-user-o fa-fw"></i>朋友
        </router-link>
      </ul>
      <div id="list-head">我的音乐</div>
      <ul id="list">
        <li><i class="fa fa-music fa-fw"></i>本地音乐</li>
        <li><i class="fa fa-download fa-fw"></i>下载管理</li>
        <li><i class="fa fa-mixcloud fa-fw"></i>我的音乐云盘</li>
        <li><i class="fa fa-user-md fa-fw"></i>我的歌手</li>
      </ul>
      <div id="list-head">创建的歌单</div>
      <ul id="list">
        <router-link v-for="(item, index) in playlist" :key="index" @click.native="viewPlaylist(item)" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="li" exact>
          <i v-if="item.specialType" class="fa fa-heart-o fa-fw"></i>
          <i v-else class="fa fa-list fa-fw"></i>
          {{item.name}}
        </router-link>
      </ul>
      <div id="list-head">收藏的歌单</div>
      <ul id="list">
        <router-link v-for="(item, index) in orderedPlaylist" :key="index" @click.native="viewPlaylist(item)" :to="{path: '/playlistDetails',query: {id: item.id}}" tag="li" exact>
          <i v-if="item.specialType" class="fa fa-heart-o fa-fw"></i>
          <i v-else class="fa fa-list fa-fw"></i>
          {{item.name}}
        </router-link>
      </ul>
      <narrow-detail></narrow-detail>
	  </div>
    <div class="mainBody">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
import narrowDetail from './songDetail/narrowDetail'
// import timeFormat from './detail/time'
import axios from 'axios'
export default {
  data: function () {
    return {
      activeTab: 'findMusic',
      playlist: [],
      orderedPlaylist: [],
      currentPlaylist: {}
    }
  },
  mounted: function () {
    axios({
      // url: 'http://tguow.ink:3000/recommend/resource',
      url: '/user/playlist',
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      var self = this
      self.playlist = response.data.playlist.filter(function (item) {
        // item.createTime = timeFormat(this.playlist.createTime).split(' ')[0]
        return !item.ordered
      })
      self.orderedPlaylist = response.data.playlist.filter(function (item) {
        return item.ordered
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  components: {
    narrowDetail
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    jj: function () {
      this.$store.commit('showStatus', false)
    },
    viewPlaylist: function (msg) {
      this.currentPlaylist = msg
    }
  }
}
</script>

<style lang="scss" scoped>
.link-active{
  color: #000 !important;
  background: #b4b4b4;
  padding-left: 15px;
  border-left: 5px;
  border-color: #ca1c15;
  border-style: solid;
}
.main {
  width: 100%;
  // background: #000;
  flex: 1;
  overflow:auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
.tes {
  width: 100px;
  height: 100px;
  background: #fff;
}
#left{
  float: left;
  text-align: left;
  position: absolute;
  top: 0;
  bottom: 60px;
  width: 204px;  
  border-right: 1px solid #e0e0e0;
  background: #f5f5f7;
  overflow: scroll;
  overflow-x: hidden;
}
#left::-webkit-scrollbar {
  width: 8px;
  }
#left::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #e1e1e2;
  }
#list{
  /*margin-left: 18px;*/
  /*vertical-align: middle;*/
}
#list-head{
  padding-left: 1rem;
  height: 3.2rem;
  line-height: 3.2rem;
  font-size: 14px;
  text-align: left;
  cursor: default;
}
#left ul li{
  list-style-type:none;
  box-sizing: border-box;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  line-height: 2.5rem;
  font-size: 14px;
  height: 2.5rem;
  color: #5e5e5e;
  vertical-align: middle;
  cursor: pointer;
}
li{
  padding-left: 20px;
}
#left ul li:hover {
  color:#000;
  }
  .mainBody {
    margin-left: 204px;
    height: 100%;
    position: relative;
  }
</style>
