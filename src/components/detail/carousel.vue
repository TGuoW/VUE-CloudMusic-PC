
<template>
<div>
  <div class="carousel" ref="main">
    <transition-group tag='ul'
      class="clearfix slide"
      name='image'
      :enter-class="right?'imageR-enter':'imageL-enter'"
      :leave-active-class="right?'imageR-leave-active':'imageL-leave-active'">
      <li v-for='(image,index) in img' :key='index' v-show='index===(mark-1>=0?mark-1:mark+7)' :class="index==mark-1?'skip':''" class="left">
        <a><img :src="image"></a>
      </li>
      <li v-for='(image,index) in img' :key='index + 8' v-show='index===mark' :class="index==mark?'skip':''" class="middle">
        <a><img :src="image"></a>
      </li>
      <li v-for='(image,index) in img' :key='index + 16' v-show='index===(mark+1<=7?mark+1:mark-7)' :class="index==mark+1||index==mark-7?'skip-right':''" class="right">
        <a><img :src="image"></a>
      </li>
    </transition-group>
    <div class="prev-btn">
      <i class="fa fa-chevron-left" @click="prev()"></i>
    </div>
    <div class="next-btn">
      <i class="fa fa-chevron-right" @click="next()"></i>
    </div>
    <div class="bullet">
      <span v-for='(item,index) in img.length' :class="{'active':index===mark}" @mouseover='change(index)' :key="item.id"></span>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'rotate',
  data: function () {
    return {
      mark: 0,
      timer: null,
      right: true
    }
  },
  props: ['height', 'img'],
  mounted: function () {
    let imgWidth = (document.body.clientWidth - 204) * 0.9 * 0.6
    let carouselHeight = imgWidth * 336 / 730 + 29
    this.$refs.main.style.height = carouselHeight + 'px'
  },
  watch: {
    height: function (val) {
      this.$refs.main.style.height = val + 'px'
    }
  },
  methods: {
    change: function (i) {
      this.mark = i
    },
    prev: function () {
      this.right = false
      this.mark = this.mark - 1 < 0 ? this.mark + 7 : this.mark - 1
    },
    next: function () {
      this.right = true
      this.mark = this.mark + 1 > 7 ? this.mark - 7 : this.mark + 1
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
    },
    getPeddingContribution: function () {
      this.seeButtonNotUse = false
      this.seeButtonUse = false
      var self = this
      axios({
        url: '/submission/getMsg.php',
        method: 'post',
        data: {
          weixie: 'weixie',
          status: '1'}
      }).then((response) => {
        console.log('getMsg +1拿到数据了')
        console.log(response.data)
        for (var t = 0; t < response.data.length; t++) {
          response.data[t].seen = true
          if (response.data[t].img_url.length === 0) {
            response.data[t].haveImg = false
          } else {
            response.data[t].haveImg = true
          }
        }
        self.contribution = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style type="text/css" scoped>
  .clearfix {
    content: '';
    clear: both;
    display: block;
  }
  .carousel {
    width: 90%;
    z-index: 0;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .slide {
    position: relative;
    height: 100%;
    width: 100%;
  }
        
  li {
    position: absolute;
    list-style-type:none;
  }
  .left{
    position: absolute;
    left: 0;
    bottom: 29px;
    width: 54%;
  }
  .middle{
    position: absolute;
    bottom: 29px;
    left: 0;
    right: 0;
    margin: auto;
    width: 60%;
    z-index: 10;
  }
  .right{
    position: absolute;
    bottom: 29px;
    right: 0;
    width: 54%;
  }
  img {
    width: 100%;
  }
        
  .bullet {
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 0;
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
    position: absolute;
    cursor: pointer;
    height: 32px;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    font-size: 32px;
    z-index: 20;
  }   
  .next-btn{
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    right: 0;
    font-size: 32px;
    height: 32px;
    margin: auto;
    z-index: 20;
  }
  .active {
    background: #ca1c15;
  }

  .skip {
    z-index: 20;
  }      
  .skip-right {
    z-index: 19;
  }
  .image-enter-active {
    transform: translateX(0);
    transition: all 0.4s ease;
  }
        
  .imageR-leave-active {
    transform: scale3d(0.9,0.9,0.9) translateY(5.2%) translateX(-42.5%);
    transition: all 0.4s ease;
  }

  .imageL-leave-active {
    transform: scale3d(0.9,0.9,0.9) translateY(5.2%) translateX(42.5%);
    transition: all 0.4s ease;
  }
        
  .imageL-enter {
    transform: scale3d(0.9,0.9,0.9) translateY(5.2%) translateX(-42.5%);
  }

  .imageR-enter {
    transform: scale3d(0.9,0.9,0.9) translateY(5.2%) translateX(42.5%);
  }
        
  .image-leave {
    transform: translateX(0);
  }
</style>
