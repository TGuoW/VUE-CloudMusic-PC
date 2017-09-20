<template>
  <div id="app">
    <top></top>
    <left></left>
    <bottom></bottom>
  </div>
</template>

<script>
import left from './components/left.vue'
import top from './components/top.vue'
import bottom from './components/bottom.vue'
import findMusic from './components/findMusic.vue'
export default {
  name: 'app',
  components: {
    left,
    top,
    bottom,
    findMusic
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
