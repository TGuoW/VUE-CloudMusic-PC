<template>
  <div id="app">
    <top></top>
    <left></left>
    <all-detail class="top-layer" v-show="isShow()"></all-detail>
    <bottom></bottom>
  </div>
</template>

<script>
import left from './components/left.vue'
import top from './components/top.vue'
import bottom from './components/bottom.vue'
import findMusic from './components/findMusic.vue'
import allDetail from './components/songDetail/allDetail.vue'
export default {
  name: 'app',
  data: function () {
    return {
      screenWidth: document.body.clientWidth,
      timer: false
    }
  },
  components: {
    left,
    top,
    bottom,
    findMusic,
    allDetail
  },
  mounted: function () {
    let self = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        self.screenWidth = window.screenWidth
        self.$store.commit('setScreenWidth', self.screenWidth)
      })()
    }
    (function (doc, win) {
      var docEl = doc.documentElement
      var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
      var recalc = function () {
        var clientWidth = docEl.clientWidth
        if (clientWidth === undefined) return
        docEl.style.fontSize = 10 * (clientWidth / 320) + 'px'
        console.log(docEl.style.fontSize)
      }
      if (doc.addEventListener === undefined) return
      win.addEventListener(resizeEvt, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)
  },
  watch: {
    // screenWidth (val) {
    //   console.log(val)
    //   // if (!this.timer) {
    //   //   this.screenWidth = val
    //   //   this.timer = true
    //   //   let self = this
    //   //   setTimeout(function () {
    //   //     self.screenWidth = val
    //   //     console.log(val)
    //   //     self.timer = false
    //   //   }, 400)
    //   // }
    // }
  },
  methods: {
    isShow: function () {
      return this.$store.state.isShowAllDetail
    }
  }
}
</script>

<style>
*{padding:0px;margin:0px;border:0px;}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
  user-select: none;
  display: flex;
  flex-direction: column;
}
.top-layer {
  z-index: 0;
}
</style>
