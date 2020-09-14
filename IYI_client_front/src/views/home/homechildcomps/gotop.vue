<template>
	<div>
		<el-backtop :visibility-height="300" :right="40" :bottom="50">
			<img src="@/assets/img/gotop.png" class="gotop"/>
		</el-backtop>
	</div>
</template>

<script>
</script>

<style scoped>
	.el-backtop{
		width: 50px;
		height: 50px;
		background-color: white;
		text-align: center;
		line-height: 40px;
	}
	
	.gotop{
		width: 30px;
		height: 30px;
	}
</style>
