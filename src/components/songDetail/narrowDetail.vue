<template>
  <div class="main" @mouseover="fadeIn()" @mouseout="fadeOut()">
    <div class="image" @click="showAllDetail()">
      <img :src="playingSong.al.picUrl" id="image">
    </div>
    <div class="text">
      {{playingSong.name}}
      <p>
        <span v-for="(item, index) in playingSong.ar" :key="index">
          {{item.name}}
          <i v-show="index!==playingSong.ar.length-1">/</i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      playingSong: {
        al: {}
      }
    }
  },
  computed: {
    getPlayingSong: function () {
      return this.$store.state.playingSong
    }
  },
  methods: {
    fadeIn: function () {
      document.getElementById('image').style.opacity = 0.7
    },
    fadeOut: function () {
      document.getElementById('image').style.opacity = 1
    },
    showAllDetail: function () {
      this.$store.commit('showAllDetail', true)
    }
  },
  watch: {
    getPlayingSong: function (val, oldVal) {
      this.playingSong = val[0]
    }
  }
}
</script>

<style scoped>
  .main{
    position: fixed;
    /* cursor: pointer; */
    
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    bottom: 73px;
    height: 60px;
    width: 204px;
    overflow: hidden;
    background: #f5f5f7;
  }
  img{
    width: 60px;
    cursor: pointer;
  }
  .image{
    background: #000;
    width: 60px;
    height: 60px;
  }
  .text{
    cursor: pointer;
    padding: 8px;
    text-align: left;
  }
  p{
    font-size: 14px;
  }
</style>
