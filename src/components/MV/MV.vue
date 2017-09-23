<template>
<div class="main">
    <div class="check">
        <span>MV精选</span><span>网易出品</span><span>全部MV</span>
    </div>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
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
    
}
.check{
    margin-top: 20px;

}
span{
    background: #fff;
    border: 1px solid #e0e0e0;
    font-size: 14px;
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
