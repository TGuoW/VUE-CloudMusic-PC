<template>
	<div class="bottom" @click="jj()">
		<div class="row">
			<li class="btn">
				<i class="fa fa-step-backward"></i>
			</li>
			<li class="btn">
				<i class="fa fa-play"></i>
			</li>
			<li class="btn">
				<i class="fa fa-step-forward"></i>
			</li>
		</div>
		<div class="time">
			<span >0:00</span>
		</div>
		<div class="bar"></div>
		<div class="volume">
			<i class="fa fa-fw fa-volume-up"></i>
			<div class="bar-volume"></div>
		</div>
		<div class="row2">
			<li class="btn">
				
			</li>
			<li class="btn">
				<i class="fa fa-fw"></i>
			</li>
				<i class="fa fa-file-text-o fa-fw" ></i>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
  methods: {
    jj: function () {
      this.$store.commit('showStatus', false)
    }
  }
}
</script>

<style type="text/css" scoped>
.bottom{
	background: #fff;
	border-top: 1px;
	border-color: #bdbdbd;
	border-style: solid;
	bottom: 0;
	height: 73px;
	width: 100%;
	position: fixed;
}
.row{
	width: 300px;
	left: 10px;
	top: 20px;
	position: absolute;
	display: inline-flex;
	list-style-type: none;
}
.btn{
	color: #fff;
	border-radius: 20px;
	background: #ca1c15;
    margin: 0 10px 0 20px;
	height: 40px;
	width: 40px;
	cursor: pointer;
}
.fa{
	line-height: 40px;
	font-size: 16px;
	vertical-align: middle;
	cursor: pointer;
}
.time{
	line-height: 73px;
    position: absolute;
    left: 340px;
}
.bar{
	background: #ca1c15;
	position: absolute;
	margin: auto;
	border-radius: 3px;
	width: 40%;
	height: 6px;
	top: 31.5px;
	left: 380px;
}
.volume{
	display: inline-flex;
	width: 15%;
	position: absolute;
	height: 40px;
	/*background: #000;*/
	left: 950px;
	top: 15px;
}
.bar-volume{
	margin: auto;
	background: #ca1c15;
	border-radius: 3px;
	width: 80%;
	height: 6px;
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
