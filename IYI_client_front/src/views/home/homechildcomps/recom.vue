<template>
	<div class="recom">
		<!-- 推荐的主图 -->
		<div class="mainimg">
			<img :src="recoms.cover"/>
		</div>
		<!-- 推荐的文本 -->
		<div class="text">
			<p class="title"><slot name="title"></slot></p>
			<p class="tips"><slot name="tips"></slot></p>
			<!-- 推荐文本中的固定样式 -->
			<div class="fix">
				<img src="@/assets/img/长箭头.png" class="arrow"/>
				<span>开启新世界</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		// 父向子传值，home.vue使用axios请求到的推荐的主图对象
		props:["recoms"]
	}
</script>

<style scoped>
	.recom{
		position: relative;
	}
	
	.mainimg{
		width: 100%;
		height: 100%;
		cursor: pointer;
		overflow: hidden;
	}
	
	img{
		width: 100%;
		margin: 0 auto;
		display: block;
		height: 100%;
	}
	
	p{
		margin: 15px auto;
	}
	
	.title{
		font-size: 40px;
		font-weight: 500;
	}
	
	.tips{
		font-size: 20px;
	}
	
	.text{
		width: 350px;
		height: auto;
		position: absolute;
		right: 5%;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.arrow{
		width: 150px;
		height: auto;
	}
	
	.fix{
		width: 300px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	span{
		font-size: 20px;
		display: inline-block;
	}
</style>
