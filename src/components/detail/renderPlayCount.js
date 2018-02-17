let render = function (playCount) {
  if (playCount > 99999) {
    playCount = Math.round(playCount / 10000).toString() + '万'
  }
  return playCount
}

export default render
