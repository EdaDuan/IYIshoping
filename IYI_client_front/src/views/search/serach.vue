<!--  -->
<template>
	<div>
		<div class="content">

			<!-- 排序方式/销量/价格 -->
			<mode></mode>
			<!-- 商品显示 -->
			<showproduct></showproduct>
			<!-- 切换页码 -->
			<page></page>
	
			<adv></adv>
	
		</div>
		<bottom></bottom>
	
	</div>
</template>


<script>
	import bus from "../../bus/bus.js"
	import showproduct from "./searchcomponents/showproduct.vue"
	import mode from "./searchcomponents/mode.vue"
	import page from "./searchcomponents/page.vue"
	import adv from "./searchcomponents/adv.vue"
	import bottom from "../../components/bottom/bottom.vue"

	export default {
		name: 'search',
		components: {
			showproduct,
			mode,
			page,
			adv,
			bottom
		},
		data() {
			//这里存放数据
			return {
			};
		},
	}
</script>


<style scoped>
	/* @import url(); 引入公共css类 */
	body {
		background-color: #ccc;
	}

	.content {
		width: 80%;
		height: auto;
		margin: 0 auto;
		/* background-color: red; */
		position: relative;
	}
</style>
