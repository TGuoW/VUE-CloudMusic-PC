
<template>
  <div class="main">
    <div class="title">
      <span>播放列表</span>
      <i class="fa fa-remove fa-fw" @click="closeThis()"></i>
    </div>
    <div class="head">
      <span>总{{playlist.length}}首</span>
      <span>清空</span>
      <span>收藏全部</span>
    </div>
    <div class="details">
      <ul>
        <li v-for="(item, index) in playlist" :key="index" @dblclick="setPlayingSong(item)">
          <p>{{item.name}}</p>
          <p>
            <span v-for="(i, o) in item.artists||item.ar" :key="o">
              {{i.name}}
              <i style="font-style:normal;" v-show="o!==(item.artists?item.artists.length:item.ar.length-1)">/</i>
            </span>
          </p>
          <p>{{durationFormat(item.duration||item.dt)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'rotate',
  data: function () {
    return {
      mark: 0,
      timer: null
    }
  },
  props: ['playlist'],
  created: function () {
    // this.play()
  },
  methods: {
    closeThis: function () {
      this.$emit('chileEvent')
    },
    durationFormat: function (time) {
      let temp = Math.floor(time / 1000)
      let minute = Math.floor(temp / 60).toString()
      let second = temp % 60 < 10 ? '0' + temp % 60 : temp % 60
      return minute + ':' + second
    },
    setPlayingSong: function (song) {
      let self = this
      if (song.copyrightId !== 1000 && song.copyrightId !== 5003) {
        axios({
          url: 'http://tguow.ink:3000/song/detail?ids=' + song.id,
          xhrFields: {
            withCredentials: true
          }
        }).then((response) => {
          self.$store.commit('setPlayingSong', response.data.songs)
        }).catch((error) => {
          console.log(error)
        })
      } else {
        let dialog = document.createElement('div')
        dialog.style.cssText = 'position:fixed; width:600px; height:150px; background:#000; left:0; right:0; top:0; bottom:0; margin:auto; border-radius:10px; color:#fff; text-align:center; line-height:150px; opacity:0.8; font-size:24px;'
        dialog.innerText = '因网易云合作方要求，该资源已下架'
        document.body.appendChild(dialog)
        setTimeout(function () {
          document.body.removeChild(dialog)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .main {
    position: fixed;
    right: 0;
    background: #f0f0f0;
    bottom: 102px;
    width: 500px;
    height: 480px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 4px #e0e0e0;
    /* display: block; */
  }
  .title {
    margin-top: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    span {
      margin-left: 24px;
      border-radius: 4px;
      padding: 6px 30px;
      background: #868686;
      color: #fff;
    }
    i {
      cursor: pointer;
      float: right;
      margin-right: 10px;
      line-height: 24px;
    }
  }
  .head {
    &:after {
      content: " ";
      display: block; 
      height: 0; 
      clear: both;
    }
    font-size: 14px;
    line-height: 28px;
    height: 28px;
    span {
      &:nth-child(1) {
        float: left;
        margin-left: 20px;
      }
      &:nth-child(2) {
        float: right;
        margin-right: 10px;
      }
      &:nth-child(3) {
        float: right;
        margin-right: 10px;
      }
    }
  }
  .details {
    overflow: scroll;
    overflow-x: hidden;
    width: 100%;
    background: #fff;
    height: 442px;
    ul {
      li {
        &:after {
          content: " ";
          display: block; 
          height: 0; 
          clear: both;
        }
        &:nth-child(even) {
          background: #f5f5f5;
        }
        height: 28px;
        font-size: 14px;
        text-align: left;
        list-style: none;
        p {
          line-height: 28px;
          display: inline-block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &:nth-child(1) {
            margin-left: 20px;
            width: 300px;
          }
          &:nth-child(2) {
            width: 120px;
          }
        }
      }
    }
  }
  .details::-webkit-scrollbar {
    width: 8px;
  }
  .details::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
  }
</style>
