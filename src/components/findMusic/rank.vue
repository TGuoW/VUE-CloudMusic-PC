<template>
  <div class="main">
    <div class="official-rank">
      <div class="title">官方榜</div>
      <div class="diff-rank">
        <ul>
          <li class="item">
            <div>
              <div class="img"></div>
              <ul>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <div>
              <div class="img"></div>
              <ul>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <div>
              <div class="img"></div>
              <ul>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <div>
              <div class="img"></div>
              <ul>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <div>
              <div class="img"></div>
              <ul>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
                <li class="retail">asdasdasdasd</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="global-rank">
      <div class="title">官方榜</div>
      <div>
      <ul class="list">
        <li class="item2">
          <img class="img2">
          <p>sadasdasdasd</p>
        </li>
        <li class="item2">
          <img class="img2">
          <p>sadasdasdasd</p>
        </li>
        <li class="item2">
          <img class="img2">
          <p>sadasdasdasd</p>
        </li>
        <li class="item2">
          <img class="img2">
          <p>sadasdasdasd</p>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>
<style scoped>
  .main{
    position: relative;
    left: 0;
    margin-top: -60px;
    bottom: 74px;
    width: 100%;
    height: auto;
    text-align: center;
  }
  .official-rank{
    height: 860px;
  }
  .title{
    position: relative;
    margin: auto;
    margin-top: 24px;
    padding-bottom: 10px;
    font-size: 20px;
    width: 90%;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }
  .diff-rank{
    position: relative;
    margin: auto;
    /* margin-top: 20px; */
    width: 90%;
  }
  ul{
    /* display: flex;
    justify-content: flex-start; */
  }
  li{
    /* background: #000; */
    list-style: none;
  }
  .item{
    float: left;
    width: 300px;
    height: 400px;
    margin-top: 20px;
    margin-right: 65px;
  }
  li:nth-child(3){
    margin-right: 0;
  }
  .img{
    background: #000;
    width: 300px;
    height: 100px;
  }
  .retail{
    text-align: left;
    line-height: 36px;
  }  
  .list{
    width: 90%;
    display: inline-flex;
    margin: auto;
    margin-top: 10px;
    list-style-type:none;
    justify-content: space-between;
    /*background: #000;*/
    height: 200px;
  }
  .item2{
    /* background: #000; */
    width: 150px;
    height: 150px;
  }
  .img2{
    width: 150px;
    height: 150px;
  }
</style>
