<template>
	<div id="left">
    <div id="list-head">推荐</div>
    <ul id="list">
       <li>发现音乐</li>
       <li>私人FM</li>
       <li>MV</li>
       <li>朋友</li>
    </ul>
    <div id="list-head">我的音乐</div>
    <ul id="list">
       <li>本地音乐</li>
       <li>下载管理</li>
       <li>我的音乐云盘</li>
       <li>我的歌手</li>
    </ul>
    <div id="list-head">我的音乐</div>
    <ul id="list">
       <li>本地音乐</li>
       <li>下载管理</li>
       <li>我的音乐云盘</li>
       <li>我的歌手</li>
    </ul>
	</div>
</template>

<script type="text/javascript">
	
</script>

<style type="text/css">

#left{
  text-align: left;
  position: fixed;
  top: 5rem;
  bottom: 4.6rem;
  width: 20rem;  
  background: #f5f5f7;
  overflow: scroll;
  overflow-x: hidden;
}
#left::-webkit-scrollbar {
  width: 8px;
  }
#left::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #e1e1e2;
  }
#list{
  margin-left: 50px;
}
#list-head{
  padding-left: 1rem;
  height: 3.2rem;
  line-height: 3.2rem;
  font-size: 1.3rem;
  text-align: left;
  cursor: default;
}
#left ul li{
  list-style-type:none;
  box-sizing: border-box;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  height: 3rem;
  color: #5e5e5e;
  vertical-align: middle;
  cursor: pointer;
}
#left ul li:hover {
    color:#000;
  }

</style>
