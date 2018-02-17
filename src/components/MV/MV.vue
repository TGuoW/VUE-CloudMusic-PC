<template>
<div class="main">
    <div class="check">
        <router-link :to="{ path: '/MV/featuredMV'}"  tag="span">
        个性推荐
        </router-link>
        <router-link :to="{ path: '/findMusic/recommend'}"  tag="span">
        网易出品
        </router-link>
        <router-link :to="{ path: '/MV/allMV'}"  tag="span">
        全部MV
        </router-link>
    </div>
    <div  class="router-view">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
.link-active{
    color: #fff;
    background: #7c7d85;
}
.router-view{
    width: 100%;
    position: relative;
    /* background: #000; */
    margin-top: 24px;
    /* margin: auto; */
    /* height: auto; */
    height: 1800px;
}
.main{
    position: absolute;
    background: #fafafa;
    left: 15%;
    top:60px;
    bottom: 73px;
    height: auto;
    margin: auto;
    text-align: center;
    width: 85%;
    overflow: scroll;
    overflow-x: hidden;
}
  .main::-webkit-scrollbar {
    width: 8px;
  }
  .main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
  }
.check{
    margin-top: 20px;

}
span{
    background: #fff;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    cursor: pointer;
    padding: 8px 40px 8px 40px;
}
span:nth-child(1){
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: none;
}
span:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: none;
}
li{
    list-style: none;
    /* display: inline; */
}
</style>
