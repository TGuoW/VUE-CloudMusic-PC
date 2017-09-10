<template>
	<div class="main">
    <div class="btn">
      <span class="btn-sty">个性推荐</span>
      <span class="btn-sty">歌单</span>
      <span class="btn-sty">主播电台</span>
      <span class="btn-sty">排行榜</span>
      <span class="btn-sty">歌手</span>
      <span class="btn-sty">最新音乐</span>
    </div>
    <rotate></rotate>
    <div class="btn-2">
      <span class="btn-sty">推荐歌单</span>
      <ul class="aa">
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
      </ul>
    </div>
    <div class="btn-2">
      <span class="btn-sty">独家放送</span>
      <ul class="aa">
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
      </ul>
    </div>
	</div>
</template>

<script>
  import rotate from './retail/rotate.vue'
  export default {
    name: 'mainBody',
    components: {
      rotate
    }
  }
</script>


<style type="text/css" scoped>
  .main{
    background: #fff;
    position: fixed;
    left: 15%;
    /*height: 32rem;*/
    top: 60px;
    bottom: 74px;
    width: 85%;
    overflow: scroll;
    overflow-x: hidden;
    text-align: center;
  }
  .main::-webkit-scrollbar {
    width: 8px;
  }
  .main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
  }
  .btn{
    margin: auto;
    background: #fff;
    border-bottom: 1px;
    border-color: #000;
    border-style: solid;
    height: 50px;
    width: 90%;
  }
  .btn-2{
    text-align: left;
    margin: 200px auto auto auto;
    background: #fff;
    border-bottom: 1px;
    border-color: #000;
    border-style: solid;
    height: 50px;
    width: 90%;
  }
  .btn-sty{
    line-height: 50px;
    margin: 20px;
    font-size: 18px;
  }
  .aa{
    width: 100%;
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
</style>
