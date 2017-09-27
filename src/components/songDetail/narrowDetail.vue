<template>
  <div class="main" @mouseover="fadeIn()" @mouseout="fadeOut()">
    <div class="image">
      <img src="http://p3.music.126.net/Kv0E_qQdJ9amNRu4_64Mxw==/18924794137514110.jpg?param=200y200" id="image">
    </div>
    <div class="text">
      非酋
      <p>朱河/华盛顿</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fadeIn: function () {
      document.getElementById('image').style.opacity = 0.7
    },
    fadeOut: function () {
      document.getElementById('image').style.opacity = 1
    }
  }
}
</script>

<style scoped>
  .main{
    position: fixed;
    /* cursor: pointer; */
    
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    bottom: 73px;
    height: 60px;
    width: 14.9%;
    background: #f5f5f7;
  }
  img{
    width: 60px;
    cursor: pointer;
  }
  .image{
    background: #000;
    width: 60px;
    height: 60px;
  }
  .text{
    cursor: pointer;
    padding: 8px;
    text-align: left;
  }
  p{
    font-size: 14px;
  }
</style>
