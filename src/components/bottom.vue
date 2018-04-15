<template>
	<div class="bottom" @mouseup="freeMouse();freeMouse2()" @mousemove="setX()">
		<div class="row">
			<li class="btn">
				<i class="fa fa-step-backward"></i>
			</li>
			<li class="btn" @click="play()">
				<i class="fa fa-pause" v-if="!isPaused"></i>
        <i class="fa fa-play" v-else></i>
			</li>
			<li class="btn">
				<i class="fa fa-step-forward"></i>
			</li>
		</div>
		<div class="time">
			<span>{{currentTime}}</span>
		</div>
		<div class="bar" @mousedown="selectMouse()" @mouseup="freeMouse2()">
      <div id="bar-red" @click="updateTimeBar(x)"></div>
      <div id="bar-grey" @click="updateTimeBar(x)"></div>
      <div id="pos-i">
        <div id="pos"></div>
      </div>
    </div>
    <div class="music-length">{{duration}}</div>
		<div class="volume">
			<i class="fa fa-fw fa-volume-up"></i>
			<div class="bar-volume" @mouseover="isVolumeBtnShow=true" @mouseout="isVolumeBtnShow=false">
        <div class="bar-red" id="volume-red"></div>
        <div class="bar-grey" id="volume-grey"></div>
        <div class="pos-i" id="volume-btn" v-show="isVolumeBtnShow" @mousedown="selectMouse2()">
          <div class="pos" ></div>
        </div>
      </div>
		</div>
		<div class="row2">
			<li class="btn">
			</li>
			<li class="btn">
				<i class="fa fa-fw"></i>
			</li>
				<i class="fa fa-file-text-o fa-fw" @click="isShowCurrPlaylist=!isShowCurrPlaylist"></i>
		</div>
    <curr-playlist @chileEvent="isShowCurrPlaylist=false" :playlist="playlist" v-show="isShowCurrPlaylist"></curr-playlist>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios'
import Mc from './detail/musicController.js'
import currPlaylist from './detail/currPlaylist'
export default {
  data: function () {
    return {
      currentTime: '00:00',
      duration: '00:00',
      isSelectedMouse: false,
      isSelectedMouse2: false,
      playingSong: {},
      playlist: [],
      isVolumeBtnShow: false,
      isShowCurrPlaylist: false,
      music: null,
      isFirstMusic: Boolean,
      x: 0,
      x2: 0
    }
  },
  components: {
    currPlaylist
  },
  computed: {
    isPaused: function () {
      return this.$store.state.isPaused
    },
    getPlayingSong: function () {
      return this.$store.state.playingSong
    },
    getPlaylist: function () {
      return this.$store.state.playlist
    },
    getVolume: function () {
      return this.$store.state.volume
    }
  },
  mounted: function () {
    let self = this
    if (!self.$store.state.playingSong.id) {
      self.isFirstMusic = true
      let lastSong = JSON.parse(localStorage.getItem('lastSong'))
      self.$store.commit('setPlayingSong', lastSong)
    }
  },
  methods: {
    play: function () { // 播放或暂停
      let self = this
      if (self.music.isPaused) {
        self.music.run()
        self.showTime()
        self.$store.commit('pause', false)
      } else {
        self.music.pause()
        self.$store.commit('pause', true)
      }
    },
    standardizedTime: function (t) { // 标准化时间
      t = Math.floor(t / 1000)
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
      // console.log(music.duration)
      let p = setInterval(function () {
        if (!self.isSelectedMouse) {
          self.currentTime = self.standardizedTime(self.music.currentTime)
          let t = self.music.currentTime / self.music.duration
          document.getElementById('bar-red').style.width = t * 496 + 2 + 'px'
          document.getElementById('bar-grey').style.width = 498 - t * 496 + 'px'
          document.getElementById('pos-i').style.left = t * 486 + 'px'
        }
        if (self.music.isPaused) {
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
          } else if (x >= 886) {
            x = 886
          }
          self.updateTimeBar(x)
        } else {
          clearInterval(p)
        }
      }, 10)
    },
    selectMouse2: function () {
      var self = this
      self.isSelectedMouse2 = true
      let p = setInterval(function () {
        if (self.isSelectedMouse2) {
          let x2 = self.x - 980
          if (x2 <= 0) {
            x2 = 0
          } else if (x2 >= 106) {
            x2 = 106
          }
          // self.updateTimeBar2(x2)
          self.$store.commit('setVolume', x2 / 106)
        } else {
          clearInterval(p)
        }
      }, 10)
    },
    updateTimeBar: function (x) {
      let self = this
      document.getElementById('bar-red').style.width = x - 386 + 'px'
      document.getElementById('bar-grey').style.width = 886 - x + 'px'
      document.getElementById('pos-i').style.left = x - 390 + 'px'
      let time = (x - 386) / 494 * self.music.duration
      self.currentTime = self.standardizedTime(time)
    },
    updateTimeBar2: function (x) {
      x = x * 106
      document.getElementById('volume-red').style.width = x + 'px'
      document.getElementById('volume-grey').style.width = 106 - x + 'px'
      document.getElementById('volume-btn').style.marginLeft = x + 'px'
    },
    setX: function () {
      let ev = window.event
      this.x = ev.screenX
    },
    freeMouse: function () {
      let self = this
      if (self.isSelectedMouse) {
        let time = (self.x - 386) / 494 * self.music.duration / 1000
        self.isSelectedMouse = false
        self.music.fastSeek(time)
      }
      self.$store.commit('showStatus', false)
    },
    freeMouse2: function () {
      let self = this
      if (self.isSelectedMouse2) {
        // let time = (self.x - 386) / 494 * self.music.duration / 1000
        self.isSelectedMouse2 = false
        // self.music.fastSeek(time)
      }
      // self.$store.commit('showStatus', false)
    },
    getMusicUrl: function (id) {
      let self = this
      axios({
        url: 'http://tguow.ink:3000/music/url?id=' + id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        let musicUrl = response.data.data[0].url
        self.music = new Mc(musicUrl, self.$store.state.volume)
        if (!self.isFirstMusic) {
          self.play()
        }
        // self.$store.commit('pause', false)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    getPlaylist: function (val, oldVal) {
      console.log(val)
      this.playlist = val
    },
    getPlayingSong: function (val, oldVal) {
      let obj = JSON.stringify(val)
      localStorage.setItem('lastSong', obj)
      this.duration = this.standardizedTime(val[0].dt)
      this.playingSong = val[0]
      if (this.music) {
        this.music.delete()
      }
      this.getMusicUrl(this.playingSong.id)
    },
    getVolume: function (val, oldVal) {
      if (this.music) {
        this.music.setVolume(val)
      }
      this.updateTimeBar2(val)
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
.bottom{
	background: rgb(243, 243, 243);
  font-size: 14px;
  // background: #808080;
	border-top: 1px;
	border-color: #bdbdbd;
	border-style: solid;
	// bottom: 0;
	height: 73px;
	width: 100%;
	position: relative;
  overflow: hidden;
}
.row{
	width: 180px;
	left: 1rem;
	top: 20px;
	position: absolute;
	display: inline-flex;
	list-style-type: none;
}
.btn{
	color: #fff;
	border-radius: 20px;
	background: #ca1c15;
  margin: 0 10px 0 10px;
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
  #pos-i{
  position: relative;
  /* background: #e0e0e0; */
  cursor: pointer;
  top: -9px;
  background: #fff;
  border: 1px solid #b4b4b4;
  border-radius: 7px;
  height: 14px;
  width: 14px;
  #pos{
    position: relative;
    top: 4px;
    margin: auto;
    background: #ca1c15;
    border-radius: 8px;
    height: 4px;
    width: 4px;
  }
  &:hover{
    box-shadow: 0px 0px 4px #666666;
  }
}
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
	width: 150px;
	position: absolute;
	height: 40px;
	// background: #000;
	left: 950px;
	top: 15px;
  .bar-volume{
    margin: auto;
    margin-left: 10px;
    margin-top: 12px;
    border-radius: 3px;
    width: 140px;
    height: 16px;
    .bar-red{
      margin-left: 7px;
      margin-top: 6px;
      background: #ca1c15;
      float: left;
      // position: relative;
      border-radius: 3px;
      width: 110px;
      height: 4px;
      top: 0px;
      left: 0px;
    }
    .bar-grey {
      float: left;
      margin-top: 6px;
      background: #b4b4b4;
      // position: relative;
      border-radius: 3px;
      width: 0px;
      height: 4px;
      top: 0px;
      left: 0px;
      
    }
    .pos-i{
      clear: both;
      float: left;
      /* background: #e0e0e0; */
      cursor: pointer;
      margin-top: -9px;
      margin-left: 106px;
      background: #fff;
      border: 1px solid #b4b4b4;
      border-radius: 7px;
      height: 14px;
      width: 14px;
      .pos{
        position: relative;
        top: 4px;
        margin: auto;
        background: #ca1c15;
        border-radius: 8px;
        height: 4px;
        width: 4px;
      }
      &:hover{
        box-shadow: 0px 0px 4px #666666;
      }
    }
  }
}

.row2{
	position: absolute;
	width: 300px;
	top: 16px;
	left: 1150px;
	display: inline-flex;
	list-style-type: none;
}

</style>
