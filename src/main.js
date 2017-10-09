// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
// import fse from 'fs-extra'
import router from './router'

Vue.use(Vuex)
// Vue.use(fse)
Vue.use(axios)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    isShowStatus: false,
    isShowAllDetail: false,
    isLogin: false,
    isPaused: true,
    // isSelectedMouse: false,
    userInfo: {}
  },
  mutations: {
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
