<template>
    <div class="main">
        <div class="all">
            <div class="title">
                <p>
                    <span>地区：</span>
                </p>
                <p>
                    <span>类型：</span>
                </p>
                <p>
                    <span>上升最快：</span>
                </p>
            </div>
            <ul>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<<script>
export default {
}
</script>

<style scoped>
    .main{
      position: fixed;
      /* background: #000; */
      left: 15%;
      margin-top: 60px;
      bottom: 74px;
      width: 85%;
      text-align: left;
    }
    .all{
        width: 96%;
        margin: auto;
    }
    .title{
        position: relative;
        /* background: #000; */
        margin: auto;
        margin-top: 8px;
        height: 110px;
        border-bottom: 1px solid #e0e0e0;
        width: 93%;
    }
    span{
        text-align: left;
        font-size: 14px;
        /* padding-left: 10px; */
    }
    p{
        line-height: 32px;
    }
    .big-font{
        font-size: 20px;
    }
    .more{
        float: right;
        line-height: 32px;
        text-align: right;
    }
    ul{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        width: 100%;
    }
    li{
        list-style: none;
        width: 150px;
        height: 200px;
    }
    .item{
        margin: auto;
        margin-bottom: 40px;
        width: 150px;
        height: 240px;
    }
    .img{
        background: #000;
        width: 150px;
        height: 150px;
    }
</style>

