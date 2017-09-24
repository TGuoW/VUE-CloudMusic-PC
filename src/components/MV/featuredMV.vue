<template>
    <div class="main">
        <div class="newMV">
            <div class="title">
                <span class="big-font">最新MV</span>
                <span>内地</span>
                <span class="more">更多</span>
            </div>
            <ul>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
            </ul>
            <ul>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
            </ul>
        </div>
        <div class="newMV">
            <div class="title">
                <span class="big-font">热播MV</span>
                <span class="more">更多</span>
            </div>
            <ul>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
            </ul>
            <ul>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
                <li class="item">
                    <div class="img"></div>
                    <span>他们不只唱得好,写得也非常nice他们不只唱得好,写得也非常nice</span>
                </li>
            </ul>
        </div>
        <div class="newMV">
            <div class="title">
                <span class="big-font">MV排行榜</span>
                <span>内地</span>
                <span class="more">更多</span>
            </div>
            <div class="rank">
                <!-- <div class=""> -->
            </div>
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
        /* background: #000; */
        margin: auto;
        text-align: left;
        margin-top: -60px;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    .newMV{
        width: 90%;
        margin: auto;
    }
    .title{
        position: relative;
        /* background: #000; */
        margin: auto;
        height: 32px;
        border-bottom: 1px solid #e0e0e0;
        width: 96%;
    }
    span{
        text-align: left;
        font-size: 14px;
        /* padding-left: 10px; */
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
        margin-top: 10px;
    }
    li{
        list-style: none;
        width: 300px;
        height: 200px;
    }
    .item{
        margin: auto;
        margin-bottom: 40px;
        width: 300px;
        height: 240px;
    }
    .img{
        background: #000;
        width: 300px;
        height: 200px;
    }
</style>
