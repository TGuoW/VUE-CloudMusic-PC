<template>
	<div class="main">
    <carousel></carousel>
    <div class="btn-2">
      <div class="btn-sty">推荐歌单</div>
      <ul class="aa">
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
      </ul>
    </div>
    <div class="btn-2">
      <div class="btn-sty">独家放送</div>
      <ul class="aa">
        <li class="bb"></li>
        <li class="bb"></li>
        <li class="bb"></li>
      </ul>
    </div>
	</div>
</template>

<script>
  import carousel from '../retail/carousel.vue'
  export default {
    name: 'findMusic',
    components: {
      carousel
    }
  }
</script>


<style type="text/css" scoped>
  .main{
    /* background: #fff; */
    position: fixed;
    left: 15%;
    /*height: 32rem;*/
    top: 120px;
    bottom: 74px;
    width: 85%;
    overflow: scroll;
    overflow-x: hidden;
    text-align: center;
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
    margin: auto auto auto auto;
    background: #fff;
    
    height: 250px;
    width: 90%;
  }
  .btn-sty{
    line-height: 50px;
    border-bottom: 1px;
    border-color: #000;
    border-style: solid;
    width: 100%;
    height: 50px;
    /* margin-bottom: 20px; */
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
