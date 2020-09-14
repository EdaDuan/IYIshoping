<template>
	<div class="hotgoods">
		<div class="goodsdiv"><img :src="item.cover" class="goodsimg"/></div>
		<p class="name">{{item.name}}</p>
		<p class="descp">{{item.descp}}</p>
		<p class="price">￥{{item.price}}</p>
	</div>
</template>

<script>
	export default {
		props:["item"]
	}
</script>

<style scoped>
	.hotgoods{
		margin: 20px 10px;
		border: 1px solid white;
		border-radius: 3px;
		cursor: pointer;
	}
	
	.hotgoods:hover{
		border: 1px solid #ccc;
		box-shadow: 0px 0px 5px #ccc;
		transition: all 0.2s linear; 
	}
	
	.hotgoods:hover .goodsimg{
		width: 485px;
		height: auto;
		transition: all 0.2s linear; 
		
	}
	
	.goodsdiv{
		width: 375px;
		height: 375px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.goodsimg{
		width: 375px;
		height: auto;
	}
	
	p{
		margin: 10px auto;
	}
	
	.name{
		font-size: 20px;
	}
	
	.descp{
		font-size: 14px;
		color: gray;
		height: 40px;
	}
	
	.price{
		font-size: 16px;
	}
</style>
