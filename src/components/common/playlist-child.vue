<template>
  <div>
    <span>
      <i class="fa fa-headphones fa-fw"></i>
      {{item.playCount}}
    </span>
    <img :src="item.coverImgUrl">
    <p :style="artists?'':'opacity:0;'"><i class="fa fa-user-o fa-fw"></i>{{item.creator.nickname}}</p>
    <p>{{item.name}}</p>
  </div>
</template>

<script>
export default {
  props: ['item', 'artists']
}
</script>

<style lang="scss" scoped>
  div {
    cursor: pointer;
    text-align: left;
    width: 180px;
    margin:8px 14px;
    height: 240px;
    font-size: 14px;
    span {
      position: relative;
      color: #fff;
      padding: 4px;
      margin-bottom: -36px;
      float: right;
    }
    p {
      &:nth-child(3) {
        font-size: 12px;
        margin-top: -20px;
        color: #fff;
      }
    }
  }
  img{
    width: 180px;
  }
</style>
