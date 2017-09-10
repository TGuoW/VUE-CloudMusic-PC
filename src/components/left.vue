<template>
	<div id="left">
    <div id="list-head">推荐</div>
    <ul id="list">
       <li><i class="fa fa-music fa-fw"></i>发现音乐</li>
       <li><i class="fa fa-podcast fa-fw"></i>私人FM</li>
       <li><i class="fa fa-youtube-play fa-fw"></i>MV</li>
       <li><i class="fa fa-user-o fa-fw"></i>朋友</li>
    </ul>
    <div id="list-head">我的音乐</div>
    <ul id="list">
       <li><i class="fa fa-music fa-fw"></i>本地音乐</li>
       <li><i class="fa fa-download fa-fw"></i>下载管理</li>
       <li><i class="fa fa-mixcloud fa-fw"></i>我的音乐云盘</li>
       <li><i class="fa fa-user-md fa-fw"></i>我的歌手</li>
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

<style type="text/css" scoped>

#left{
  text-align: left;
  position: fixed;
  top: 60px;
  bottom: 4.6rem;
  width: 15%;  
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
  margin-left: 18px;
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
