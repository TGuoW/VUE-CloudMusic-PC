
<template>
  <div class="carousel">
    <transition-group tag='ul' class="clearfix slide" name='image'>
      
      <li v-for='(image,index) in img' :key='index' v-show='index===(mark-1>=0?mark-1:mark+3)' class="left">
        <a><img :src="image"></a>
      </li>
      <li v-for='(image,index) in img' :key='index' v-show='index===mark' class="middle">
        <a><img :src="image"></a>
      </li>
      <li v-for='(image,index) in img' :key='index' v-show='index===(mark+1<4?mark+1:mark-3)' class="right">
        <a><img :src="image"></a>
      </li>
      
    </transition-group>
    <div class="bullet">
      <span v-for='(item,index) in img.length' :class="{'active':index===mark}" @mouseover='change(index)' :key="item.id"></span>
    </div>
    <div class="prev-btn">
      <i class="fa fa-chevron-left"></i>
    </div>
    <div class="next-btn">
      <i class="fa fa-chevron-right"></i>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .bg{
    position: absolute;
    margin: 0 5% 0 5%;
    background: #000;
    width: 100px;
    z-index: 20;
    height: 200px;
  }
  .clearfix {
    content: '';
    clear: both;
    display: block;
  }
  .carousel {
    width: 900px;
    height: 320px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .slide {
    width: 500px;
    height: 300px;
  }
        
  li {
    position: absolute;
    list-style-type:none;
  }
  .left{
    margin-left: 0px;
  }
  .middle{
    margin-left: 200px;
    z-index: 10;
  }
  .right{
    margin-left: 400px;
  }
  img {
    width: 500px;
    height: 300px;
  }
        
  .bullet {
    width: 100%;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    text-align: center;
    z-index: 10;
  }
        
  span {
    width: 20px;
    height: 3px;
    cursor: pointer;
    background: gainsboro;
    display: inline-block;
    margin-right: 10px;
  }
  .prev-btn{
    position: relative;
    top: -170px;
    font-size: 32px;
    float: left;
    z-index: 20;
  }   
  .next-btn{
    position: relative;
    top: -170px;
    font-size: 32px;
    float: right;
    z-index: 20;
  }
  .active {
    background: #ca1c15;
  }
        
  .image-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 0.5s ease;
  }
        
  .image-leave-active {
    transform: translateX(-20%) scale(0.9,0.9);
    opacity: 0.5;
    transition: all 0.5s ease;
    
  }
        
  .image-enter {
    transform: translateX(20%);
    opacity: 1;
  }
        
  .image-leave {
    transform: translateX(0)  scale(0.9,0.9);
    opacity: 0.5;
  }
</style>


<script>
export default {
  name: 'rotate',
  data: function () {
    return {
      mark: 0,
      timer: null,
      img: ['http://p3.music.126.net/09hujI6_LSJD6DWK02qXwQ==/18964376555989719.jpg',
        'http://p4.music.126.net/j_cH-yjz5tTLIDFmz4sSiQ==/18833534674063637.jpg',
        'http://p4.music.126.net/I1zKnPl4g9snKbAA5zJi3Q==/18623527953173535.jpg',
        'http://p4.music.126.net/x9KxmTxNEXHQJS9n-oWRLw==/18623527953173527.jpg',
        'http://p3.music.126.net/U3y3VH4_3cX8pXECLFsHjA==/18624627464801303.jpg',
        'http://p4.music.126.net/F7yr2uUq982rTIWlwvaThg==/18964376555989729.jpg',
        'http://p4.music.126.net/qADzamZDC3c5whBibC_rAQ==/18906102439712983.jpg',
        'http://p3.music.126.net/tw17cN9NJfa5FmFDyS0A_g==/18624627464801294.jpg'
      ]
    }
  },
  created: function () {
    // this.play()
  },
  methods: {
    change: function (i) {
      this.mark = i
    },
    change1: function (i) {
      this.mark = this.mark + i > 3 ? this.mark - 3 : this.mark + 1
    },
    autoPlay: function () {
      this.mark++
      if (this.mark === 4) {
        this.mark = 0
        return
      }
    },
    play: function () {
      setInterval(this.autoPlay, 3000)
    }
  }
}
</script>

