<template>
	<div class="guesslike">
		<!-- 以下是swiper轮播图，有必要提及vue的引入方式 -->
		<!-- 
			首先在cnpm中下载：cnpm i swiper@4.4.1 --save-dev;  
			一定要加版本，不加就是最新版6.0以上，node_modules里swiper目录下没有dist目录，于是引入的css就不起作用，最好是5.0以下
			main.js中引入：import 'swiper/dist/css/swiper.css'; 
			要使用的组件内引入：import Swiper from 'swiper';
		-->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!-- 循环渲染商品，每个商品设置点击事件，并将商品的id当做参数传入点击事件 -->
				<div class="swiper-slide" v-for="item in list" @click="toDetail(item.id)">
					<!-- 注意！:key的value不能重复，由于随机数会有重复，所以将key放在里面一层即可 -->
					<div v-if="like.length" :key="item.id">
						<img :src="item.cover" />
					</div>
				</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>

			<!-- 如果需要导航按钮 -->
			<div class="swiper-button-prev swiper-button-black"></div>
			<div class="swiper-button-next swiper-button-black"></div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		data: function () {
			return {
				// 定义一个空数组，来过滤出要展示在'猜你喜欢'区域的商品
				list: [],
				count: [],
			}
		},
		mounted() {
			// 等待dom生成后执行函数-再生成swiper轮播图
			this.$nextTick(() => {
				this.initSwiper()
			})
			// 可以传入参数自定义"猜你喜欢"区域展示商品的数量
			this.show(10)
		},
		// home传来的所有type为男装、女装的商品信息，注意--props里的like是和data同级，所以可以用this.like得到
		props: ["like"],
		methods: {
			// 点击"猜你喜欢"区域的商品跳转到商品详情页并传递商品的id值
			toDetail(gid) {
				this.$router.push({
					path: "/detail",
					query: {
						gid
					}
				})
			},
			// 利用随机数随机展示goods表中type为男装、女装的商品到"猜你喜欢"区域-可传参数设置展示商品数量
			show(count) {
				// 先将随机数放入数组
				setTimeout(() => {
					for (let i = 0; i < count; i++) {
						this.count.push(Math.ceil(Math.random() * this.like.length))
					}
				}, 100)
				// 再遍历数组，将元素当做like数组的下标(注意！此处item应该-1，不然会报错，找不到id)
				setTimeout(() => {
					this.count.forEach(item => {
						this.list.push(this.like[item - 1])
					})
				}, 200)
			},
			initSwiper() {
				// 设置计时器异步创建mySwiper
				// 由于home组件的axios请求的返回值还没有接收到就被swiper循环渲染，只来得及渲染一张图片，所以设置计时器等待返回值全部传递过来以后再创建swiper
				setTimeout(() => {
					let mySwiper = new Swiper('.swiper-container', {
						direction: 'horizontal', // 垂直切换选项
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						slidesPerView: 3,
						slidesPerGroup: 3,
						speed: 1800,
					})
				}, 300)
			}
		}
	}
</script>

<style scoped>
	.swiper-container {
		width: 1000px;
		height: 350px;
	}

	.swiper-slide img {
		width: 320px;
		height: 95%;
		display: block;
		margin: auto auto;
		cursor: pointer;
	}
</style>