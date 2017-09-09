<template>
	<div class="bottom">
		<div class="row">
			<li class="btn"></li>
			<li class="btn"></li>
			<li class="btn"></li>
		</div>
		<div class="time">
			<span >0:00</span>
		</div>
		<div class="bar"></div>
		<div class="volume">
			<div class="logo-volume"></div>
			<div class="bar-volume"></div>
		</div>
		<div class="row2">
			<li class="btn"></li>
			<li class="btn"></li>
			<li class="btn"></li>
		</div>
	</div>
</template>

<script type="text/javascript">
	
</script>

<style type="text/css" scoped>
.bottom{
	background: #fff;
	border-top: 1px;
	border-color: #000aaa;
	border-style: solid;
	bottom: 0;
	height: 73px;
	width: 100%;
	position: fixed;
}
.row{
	width: 300px;
	left: 10px;
	display: inline-flex;
	list-style-type: none;
}
.btn{
	border-radius: 20px;
	background: #000;
    margin: 0 10px 0 20px;
	height: 40px;
	width: 40px;
}
.time{
	line-height: 73px;
    position: absolute;
    left: 340px;
}
.bar{
	background: #000;
	position: absolute;
	margin: auto;
	border-radius: 5px;
	width: 40%;
	height: 10px;
	top: 31.5px;
	left: 380px;
}
.volume{
	display: inline-flex;
	width: 15%;
	position: absolute;
	height: 20px;
	/*background: #000;*/
	left: 950px;
	top: 26px;
}
.logo-volume{
	background: #000aaa;
	width: 20px;
	height: 20px;
}
.bar-volume{
	margin: auto;
	background: #000;
	border-radius: 5px;
	width: 80%;
	height: 10px;
}
.row2{
	position: absolute;
	width: 300px;
	top: 16px;
	left: 1150px;
	display: inline-flex;
	list-style-type: none;

}
</style>
