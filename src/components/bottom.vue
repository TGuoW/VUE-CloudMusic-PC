<template>
	<div class="bottom" @click="jj()">
		<div class="row">
			<li class="btn">
				<i class="fa fa-step-backward"></i>
			</li>
			<li class="btn">
				<i class="fa fa-play" @click="play()"></i>
			</li>
			<li class="btn">
				<i class="fa fa-step-forward"></i>
			</li>
		</div>
		<div class="time">
			<span >{{currentTime}}</span>
		</div>
		<div class="bar">
      <div class="pos-i">
        <div id="pos"></div>
      </div>
    </div>
		<div class="volume">
			<i class="fa fa-fw fa-volume-up"></i>
			<div class="bar-volume"></div>
		</div>
		<div class="row2">
			<li class="btn">
				
			</li>
			<li class="btn">
				<i class="fa fa-fw"></i>
			</li>
				<i class="fa fa-file-text-o fa-fw" ></i>
		</div>
	</div>
</template>

<script type="text/javascript">
import Mc from './detail/musicController.js'
var musicUrl = 'http://39.108.221.165/src.mp3'
var music = new Mc(musicUrl)
export default {
  data: function () {
    return {
      currentTime: 0
    }
  },
  mounted: function () {
    // if (music.isPaused) {
    //   clearInterval(p)
    // } else {
    var self = this
    setInterval(function () {
      console.log(self.currentTime)
      self.currentTime = music.currentTime
      // document.getElementById('pos').style.left = music.currentTime + 'px'
    }, 100)
    // }
  },
  methods: {
    jj: function () {
      this.$store.commit('showStatus', false)
    },
    ct: function () {
      return music.currentTime
    },
    play: function () {
      console.log(1)
      if (music.isPaused) {
        music.run()
      } else {
        music.pause()
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.bottom{
	background: #fff;
	border-top: 1px;
	border-color: #bdbdbd;
	border-style: solid;
	bottom: 0;
	height: 73px;
	width: 100%;
	position: fixed;
}
.row{
	width: 300px;
	left: 10px;
	top: 20px;
	position: absolute;
	display: inline-flex;
	list-style-type: none;
}
.btn{
	color: #fff;
	border-radius: 20px;
	background: #ca1c15;
    margin: 0 10px 0 20px;
	height: 40px;
	width: 40px;
	cursor: pointer;
}
.fa{
	line-height: 40px;
	font-size: 16px;
	vertical-align: middle;
	cursor: pointer;
}
.time{
	line-height: 73px;
    position: absolute;
    left: 340px;
}
.bar{
	background: #ca1c15;
	position: absolute;
	margin: auto;
	border-radius: 3px;
	width: 40%;
	height: 4px;
	top: 34px;
	left: 380px;
}
.volume{
	display: inline-flex;
	width: 15%;
	position: absolute;
	height: 40px;
	/*background: #000;*/
	left: 950px;
	top: 15px;
}
.bar-volume{
	margin: auto;
	background: #ca1c15;
	border-radius: 3px;
	width: 80%;
	height: 6px;
}
.row2{
	position: absolute;
	width: 300px;
	top: 16px;
	left: 1150px;
	display: inline-flex;
	list-style-type: none;
}
.pos-i{
  position: relative;
  /* background: #e0e0e0; */
  top: -6px;
  border: 1px solid #b4b4b4;
  border-radius: 7px;
  height: 14px;
  width: 14px;
}
#pos{
  margin: auto;
  border: 5px solid #fff;
  border-radius: 8px;
  height: 4px;
  width: 4px;
}
</style>
