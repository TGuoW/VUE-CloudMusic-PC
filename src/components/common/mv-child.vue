<template>
  <div>
    <span>
      <i class="fa fa-video-camera fa-lg"></i>
      {{item.playCount}}
    </span>
    <img :src="item.cover||item.picUrl">
    <p>{{item.briefDesc||item.copywriter}}</p>
    <p>{{item.name}}</p>
    <p>{{item.artistName}}</p>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped>
  div {
    cursor: pointer;
    margin: auto;
    width: 300px;
    height: 210px;
    margin-bottom: 20px;
    span {
      position: relative;
      color: #fff;
      font-size: 14px;
      padding: 5px;
      float: right;
      margin-bottom: -30px;
    }
    p {
      padding: 2px;
      text-align: left;
      font-size: 14px;
      width: 300px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      &:nth-child(3) {
        color: #fff;
        font-size: 12px;
        margin-top:-26px;
      }
      &:nth-child(4) {
        color: #000;
      }
    }
    img {
      width: 300px;
      height: 169px;
    }
  }
</style>
