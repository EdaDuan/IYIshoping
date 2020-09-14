<template>
	<div class="banner">
		<!-- 使用element ui的走马灯标签 -->
		<el-carousel :interval="3000" arrow="hover" height="500px">
			<el-carousel-item v-for="item in banners" :key="item.id">
				<img :src="item.imgsrc" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				banners: [],
				// goods: [],
			}
		},

		created() {
			// 向数据库请求轮播图图片
			this.$http.get("/getBanner", {

			}).then(res => {
				this.banners = res.data
			})
		},
		mounted() {

		},
		watch: {

		},

	}
</script>

<style scoped="scoped">
	.banner {
		cursor: pointer;
		width: 100%;
		height: auto;
	}

	/* 设置轮播图样式 */
	.el-carousel {
		overflow: hidden;
	}

	.el-carousel__item img {
		width: 1520px;
		height: 100%;
		margin: 0 auto;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.9;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
