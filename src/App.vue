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
  components: {
    left,
    top,
    bottom,
    findMusic,
    allDetail
  },
  methods: {
    isShow: function () {
      // console.log(3)
      // top.data().show = false
      // if (this.$refs.isShowStatus.show) {
      //   this.$refs.isShowStatus.fade()
      // }
      return this.$store.state.isShowAllDetail
    }
  }
}
</script>

<style>
*{padding:0px;margin:0px;border:0px;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin-top: 60px;
}
.top-layer {
  z-index: 0;
}
</style>
