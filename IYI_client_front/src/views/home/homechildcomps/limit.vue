<template>
	<!-- 由于之前的recom我用的img，所以这里使用background-image，不过recom更适合bgi，因为有文字描述 -->
	<div class="limit">
		<div :style="{backgroundImage:tup}" class="indiv">

		</div>
	</div>
</template>

<script>
	// 使用bus控制总线接收值-和home组件对应
	import bus from "../../../bus/bus.js"
	export default {
		data: function () {
			return {
				tup: ""
			}
		},
		mounted() {
			// bus从home.vue接收参数-限定区域的图片
			bus.$on("limitimg", urls => {
				this.tup = `url(${urls})`
			})
		}
	}
</script>

<style>
	.limit {
		width: 100%;
		height: 500px;
		overflow: hidden;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.indiv {
		width: 1520px;
		height: 100%;
		margin: 0 auto;
	}
</style>