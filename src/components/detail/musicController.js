const musicController = function (url, volume = 1, autoplay = false) {
  let audio = document.createElement('audio')
  audio.src = url
  audio.autoplay = autoplay
  audio.volume = volume
  document.body.appendChild(audio)
  let obj = {
    get isPaused () {
      return audio.paused
    },
    get isEnded () {
      return audio.ended
    },
    get duration () {
      return audio.duration * 1000
    }, // 音频长度
    get volume () {
      return audio.volume
    }, // 音量
    get currentTime () {
      return audio.currentTime * 1000
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
    },
    j: function () {
      console.log(audio.src)
    },
    fastSeek: function (t) {
      audio.currentTime = t
    },
    setVolume: function (value) {
      audio.volume = value
    }
  }
  return obj
}
module.exports = musicController
