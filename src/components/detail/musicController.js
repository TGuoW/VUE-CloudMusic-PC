const musicController = function (url, autoplay = false, loop = false) {
  let audio = document.createElement('audio')
  audio.src = url
  audio.autoplay = autoplay
  audio.loop = loop
  document.body.appendChild(audio)
  let obj = {
    get isPaused () {
      return audio.paused
    },
    get isEnded () {
      return audio.ended
    },
    get duration () {
      return audio.duration
    }, // 音频长度
    get volume () {
      return audio.volume
    }, // 音量
    get currentTime () {
      return audio.currentTime
    }, // 当前播放位置
    run: function () {
      audio.play()
    },
    pause: function () {
      audio.pause()
    },
    delete: function () {
      document.body.removeChild(audio)
    },
    restart: function () {
      audio.currentTime = 0
      audio.play()
    }
  }
  return obj
}
module.exports = musicController
