<template>
	<!-- 按功能展示 -->
	<div class="head">
		<!-- 不同排序显示不同数据 -->
		<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @click.native="mode" background-color="#545c64"
		 text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">综合排序</el-menu-item>
			<el-menu-item index="1">销量</el-menu-item>
			<el-menu-item index="1">价格</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import bus from "../../../bus/bus.js"
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				ways: "id", //默认排序方式
			}
		},
		methods: {
			// 根据不同排序方式来显示商品
			mode(e) {
				let ways = this.ways;
				let text = e.target.innerHTML
				switch (text) {
					case "综合排序":
						ways = "desimg"
						break;
					case "销量":
						ways = "sales"
						break;
					case "价格":
						ways = "price"
						break;
				}
				bus.$emit("ways", ways)
			}
		},
	}
</script>

<style scoped>
	.mode {
		width: 74%;
		height: 40px;
	}

	.mode span {
		line-height: 40px;
		padding: 0 20px;
	}
</style>
