<template>
  <div id="app">
    <top></top>
    <left></left>
    <!-- <mainBody></mainBody> -->
    <bottom></bottom>

<!--     <img src="./assets/logo.png">
    <router-view></router-view> -->

  </div>
</template>

<script>
import left from './components/left.vue'
import top from './components/top.vue'
import bottom from './components/bottom.vue'
import mainBody from './components/mainBody.vue'
export default {
  name: 'app',
  components: {
    left,
    top,
    bottom,
    mainBody
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
</style>
