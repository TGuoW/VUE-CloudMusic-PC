<template>
	<div class="bottom" @mouseup="freeMouse()" @mousemove="setX()">
		<div class="row">
			<li class="btn">
				<i class="fa fa-step-backward"></i>
			</li>
			<li class="btn">
				<i class="fa fa-pause" @click="play()" v-show="!isPaused()"></i>
        <i class="fa fa-play" @click="play()" v-show="isPaused()"></i>
			</li>
			<li class="btn">
				<i class="fa fa-step-forward"></i>
			</li>
		</div>
		<div class="time">
			<span>{{currentTime}}</span>
		</div>
		<div class="bar">
      <div id="bar-red"></div>
      <div id="bar-grey"></div>
      <div id="pos-i" @mousedown="selectMouse()">
        <div id="pos" ></div>
      </div>
    </div>
    <div class="music-length">{{duration}}</div>
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
      currentTime: '00:00',
      duration: '00:00',
      isSelectedMouse: false,
      x: 0
    }
  },
  created: function () {
    let self = this
    self.currentTime = self.standardizedTime(music.currentTime)
    setTimeout(function () {
      self.duration = self.standardizedTime(music.duration)
    }, 180)
  },
  methods: {
    play: function () { // 播放或暂停
      let self = this
      self.duration = self.standardizedTime(music.duration)
      if (music.isPaused) {
        music.run()
        this.showTime()
        this.$store.commit('pause', false)
      } else {
        music.pause()
        this.$store.commit('pause', true)
      }
    },
    isPaused: function () {
      return this.$store.state.isPaused
    },
    standardizedTime: function (t) { // 标准化时间
      let minute = parseInt(t / 60)
      let second = parseInt(t % 60)
      if (minute / 10 < 1) {
        minute = '0' + minute.toString()
      } else {
        minute = minute.toString()
      }
      if (second / 10 < 1) {
        second = '0' + second.toString()
      } else {
        second = second.toString()
      }
      return minute + ':' + second
    },
    showTime: function () { // 计算已播放歌曲的时间
      let self = this
      console.log(music.duration)
      let p = setInterval(function () {
        console.log(1)
        self.currentTime = self.standardizedTime(music.currentTime)
        document.getElementById('bar-red').style.width = music.currentTime / music.duration * 500 + 4 + 'px'
        document.getElementById('bar-grey').style.width = 496 - music.currentTime / music.duration * 500 + 'px'
        document.getElementById('pos-i').style.left = music.currentTime / music.duration * 486 + 'px'
        if (music.isPaused) {
          clearInterval(p)
        }
      }, 100)
    },
    selectMouse: function () {
      var self = this
      self.isSelectedMouse = true
      let p = setInterval(function () {
        if (self.isSelectedMouse) {
          let x = self.x
          if (x <= 386) {
            x = 386
          } else if (x >= 880) {
            x = 880
          }
          console.log(x)
          self.updateBar(x)
        } else {
          clearInterval(p)
        }
      }, 10)
    },
    updateBar: function (x) {
      let self = this
      document.getElementById('bar-red').style.width = x - 386 + 'px'
      document.getElementById('bar-grey').style.width = 886 - x + 'px'
      document.getElementById('pos-i').style.left = x - 390 + 'px'
      let time = (x - 386) / 494 * music.duration
      self.currentTime = self.standardizedTime(time)
    },
    setX: function () {
      let ev = window.event
      this.x = ev.screenX
    },
    freeMouse: function () {
      let self = this
      self.isSelectedMouse = false
      self.$store.commit('showStatus', false)
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
  color: #000;
  font-size: 14px;
  left: 330px;
}
.bar{
  /* background: #ca1c15; */
	position: absolute;
	margin: auto;
	width: 500px;
	height: 4px;
	top: 34px;
	left: 380px;
}
#bar-red{
	background: #ca1c15;
  display: flex;
	position: relative;
	/* margin: auto; */
	border-radius: 3px;
	width: 4px;
	height: 4px;
	top: 0px;
	left: 0px;
}
#bar-grey{
  background: #b4b4b4;
  display: flex;
	position: absolute;
	margin: auto;
	border-radius: 3px;
	width: 496px;
	height: 4px;
	top: 0px;
	right: 0px;
}
.music-length{
  line-height: 73px;
  position: absolute;
  color: #000;
  font-size: 14px;
  left: 890px;
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
#pos-i{
  position: relative;
  /* background: #e0e0e0; */
  cursor: pointer;
  top: -10px;
  border: 1px solid #b4b4b4;
  border-radius: 7px;
  height: 14px;
  width: 14px;
}
#pos-i:hover{
  box-shadow: 0px 0px 4px #666666;
}
#pos{
  margin: auto;
  background: #ca1c15;
  border: 5px solid #fff;
  border-radius: 8px;
  height: 4px;
  width: 4px;
}
</style>
