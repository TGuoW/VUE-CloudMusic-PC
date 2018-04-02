<template> 
  <div class="main">
    <div class="lyric" id="lrc">
      <p v-for="(item, index) in lyrics" :key="index">{{item[1]}}</p>
    </div>          
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      lyrics: []
    }
  },
  props: ['lyric'],
  computed: {
  },
  mounted: function () {
    // this.lyrics = this.parseLyric(this.lyric)
  },
  methods: {
    getLyric: function () {
    },
    parseLyric: function (lrc) {
      var lyrics = lrc.split('\n')
      var lrcObj = []
      for (var i = 0; i < lyrics.length; i++) {
        lrcObj[i] = []
        var lyric = decodeURIComponent(lyrics[i])
        var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        var timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        var clause = lyric.replace(timeReg, '')
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k]
          var min = Number(String(t.match(/\[\d*/i)).slice(1))
          var sec = Number(String(t.match(/:\d*/i)).slice(1))
          var time = (min * 60 + sec)
          // lrcObj[time] = clause
          lrcObj[i][0] = time
          lrcObj[i][1] = clause
        }
      }
      return lrcObj
    },
    getSimiSong: function () {
      let self = this
      axios({
        url: 'http://39.108.221.165:3000/simi/song?id=' + self.playingSong.id,
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        self.simiSong = response.data.songs
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    lyric: function (val) {
      this.lyrics = this.parseLyric(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    position: relative;
    top: 0;
    left: 0;
    width: 400px;
    text-align: left;
    height: auto;
    .lyric{
      border-right: 1px solid #e0e0e0;
      height: 400px;
      width: 392px;
      overflow: scroll;
      overflow-x: hidden;
      line-height: 32px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #e1e1e2;
      }
    }
  }
</style>

