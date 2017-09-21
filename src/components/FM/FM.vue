<template>
    <div class="main">
        <div class="song">
            <div class="song-img"></div>
            <div class="lyrics">
                <h1>非酋</h1>
                <h2>
                    <span>专辑</span>
                    <span>歌手</span>
                </h2>
                <p>歌词</p>
            </div>
        </div>
        <div class="comment"></div>
    </div>
</template>

<script>
export default {
//
}
</script>

<style scoped>
    .main{
        /* background: #000; */
        position: absolute;
        left: 15%;
        width: 85%;
        /* height: 300px; */
        bottom: 73px;
        top: 60px;
        height: auto;
        text-align: center;
        overflow: scroll;
        overflow-x: hidden;
    }
    .song{
        position: relative;
        background: #000;
        margin: auto;
        margin-top:10px;
        width: 660px;
        height: 430px;
    }
    .song-img{
        background: url("http://p3.music.126.net/Kv0E_qQdJ9amNRu4_64Mxw==/18924794137514110.jpg?param=200y200") no-repeat;
        background-size: 100%;
        float: left;
        position: relative;
        margin-top: 40px;
        width: 300px;
        height: 300px;
    }
    .lyrics{
        float: right;
        position: relative;
        background: #fff;
        width: 300px;
        height: 300px;
    }
    .comment{
        background: #000;
        position: relative;
        margin: auto;
        margin-top:10px;

        height: 200px;
        width: 500px;
    }
</style>

