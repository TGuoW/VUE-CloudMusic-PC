// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
// import fse from 'fs-extra'
import router from './router'

// import 'vue-easytable/libs/themes-base/index.css'
// // 导入 table 和 分页组件
// import {VTable, VPagination} from 'vue-easytable'
import playlistChild from './components/common/playlist-child.vue'
import mvChild from './components/common/mv-child.vue'

// 注册到全局
// Vue.component(VTable.name, VTable)
// Vue.component(VPagination.name, VPagination)
Vue.component('playlist-child', playlistChild)
Vue.component('mv-child', mvChild)
Vue.use(Vuex)
// Vue.use(fse)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    isShowStatus: false,
    isShowAllDetail: false,
    isLogin: false,
    isPaused: true,
    playmode: 1, // 'loop', 'order', 'single', 'random'
    volume: 1,
    userInfo: {},
    playingSong: {},
    playlist: [],
    screenWidth: Number
  },
  mutations: {
    setScreenWidth (state, n) {
      state.screenWidth = n
    },
    showStatus (state, n) {
      // 变更状态
      state.isShowStatus = n
    },
    closeAll (state, n) {
      state.isShowStatus = false
    },
    showAllDetail (state, n) {
      state.isShowAllDetail = n
    },
    login (state, n) {
      state.userInfo = n
      state.isLogin = true
    },
    pause (state, n) {
      state.isPaused = n
    },
    setPlayingSong (state, n) {
      state.playingSong = n
    },
    setPlaylist (state, n) {
      state.playlist = n
    },
    setVolume (state, n) {
      state.volume = n
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
