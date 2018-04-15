<template>
  <div class="main">
    <div class="close">
      <i class="fa fa-remove fa-fw" @click="closeThis()"></i>
    </div>
    <div class="phone-signIn" v-if="isShow" @click="hide()">手机号登录</div>
    <form action="" v-else>
      <div class="input">
        <i class="fa fa-mobile-phone fa-lg"></i>
        <input type="text" name="phoneNumber" placeholder="请输入手机号">
        <i class="fa fa-lock fa-lg"></i>
        <input type="password" name="password" placeholder="请输入密码">
      </div>
      <div class="login-btn" @click="login()">登录</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'signIn',
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    login: function () {
      let self = this
      // let url = 'http://tguow.ink:3000/login/cellphone?phone=' + document.getElementsByName('phoneNumber')[0].value + '&password=' + document.getElementsByName('password')[0].value
      axios({
        url: 'http://tguow.ink:3000/login/cellphone?phone=15768620356&password=WZpolongbingtang',
        xhrFields: {
          withCredentials: true
        }
      }).then((response) => {
        console.log(response.data)
        self.$store.commit('login', response.data)
        self.$emit('child-say', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    closeThis: function () {
      this.$emit('child-say', false)
    },
    hide: function () {
      this.isShow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main {
    background: #fff;
    width: 360px;
    height: 500px;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 10px #dddddd;
    // font-size: 14px;
    .close {
      cursor: pointer;
      float: right;
      padding: 10px;
      clear: both;
    }
    .phone-signIn {
      cursor: pointer;
      margin: auto;
      border: 1px solid rgb(248, 44, 44);
      color: rgb(248, 44, 44);
      border-radius: 18px;
      line-height: 36px;
      font-size: 16px;
      width: 220px;
      &:hover {
        background: rgb(243, 162, 162);
      }
    }
    .input {
      border: 1px solid #c0c0c0;
      text-align: left;
      border-radius: 5px;
      margin: 30px auto;
      width: 220px;
      i {
        padding:0 0 0 10px;
        width: 20px;
      }
      input {
        text-align:left;
        outline: none;
        font-size: 14px;
        padding: 0 10px;
        width: 165px;
        line-height: 36px;
        &:nth-child(1){
          border-bottom: 1px solid #c0c0c0;
        }
      }
    }
    .login-btn {
      background: rgb(253, 59, 59);
      cursor: pointer;
      color: #fff;
      margin: 30px auto;
      border-radius: 5px;
      height: 40px;
      line-height: 40px;
      width: 222px;
      &:hover {
        background: rgb(209, 32, 32);
      }
    }
  }
</style>

