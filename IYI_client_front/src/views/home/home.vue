<!--  -->
<!--  -->
<template>
	<div class="home">
		<!-- 轮播图 -->
		<!-- 以下是乔丹官网扒下来的图片
		https://static.nike.com/a/images/f_auto/dpr_2.0/w_874,c_limit/0a00677f-75da-477d-8183-238f64b8f7df/jordan.jpg
    https://static.nike.com/a/images/f_auto/dpr_2.0/w_874,c_limit/8711edfa-8ece-4370-a19d-f5d203912b67/jordan.jpg
    https://static.nike.com/a/images/f_auto/dpr_2.0/w_874,c_limit/4ca1f37e-71c2-4251-8d2b-0ac30042752b/jordan.jpg 
		https://img.fishfay.com/anta-cn-web/descente/2020/08/19/f9b73c8e2b5aba259d727f59930cc090.jpg
		https://img.fishfay.com/theme/images/area/2020/0331/woman-01.jpg
    -->
		<banner></banner>
		<!-- 本页面使用了slot插槽，需要使用template进行插值，并请对照组件的代码进行操作 -->
		<!-- 首页推荐分类标签：本周热卖 -->
		<font>
			<template slot="fa">本周热卖</template>
			<template slot="son">Nike运动系列</template>
		</font>
		<!-- 页面热卖区域版心 -->
		<div class="content">
			<div class="hot">
				<!-- 方便操作详情页 设置一个button按钮 -->
				<goods v-for="item in hot" :key="item.id" :item="item" @click.native="goodDetail(item.id)"></goods>
			</div>
		</div>
		<!-- 首页推荐分类标签：男人的衣柜 -->
		<font>
			<template slot="fa">男人的衣柜</template>
			<template slot="son">精品男装系列</template>
		</font>
		<recom :recoms="this.manrecom" @click.native="toMan">
			<template slot="title">鲜衣怒马 逐梦前行</template>
			<template slot="tips">LOL联名系列</template>
		</recom>
		<!-- 首页推荐分类标签：女人的衣橱 -->
		<font>
			<template slot="fa">女人的衣橱</template>
			<template slot="son">精品女装系列</template>
		</font>
		<recom :recoms="this.womanrecom" @click.native="toWoman">
			<template slot="title">世界共振</template>
			<template slot="tips">集结多元年轻力 引爆潮力</template>
		</recom>
		<!-- 首页推荐分类标签：周年限定 -->
		<font>
			<template slot="fa">周年限定</template>
			<template slot="son">ANTA水花2</template>
		</font>
		<limit></limit>
		<!-- 首页推荐分类标签：猜你喜欢 -->
		<font>
			<template slot="fa">猜你喜欢</template>
			<template slot="son">我们懂你</template>
		</font>
		<!-- swiper自定义滑动：猜你喜欢 -->
		<guess :like="like"></guess>
		<!-- 底部 -->
		<bottom></bottom>
		<!-- 回到顶部 -->
		<gotop></gotop>

	</div>
</template>
<script>
	// 引入局部组件
	import banner from "./homechildcomps/banner.vue"
	import font from "./homechildcomps/font.vue"
	import goods from "./homechildcomps/goods.vue"
	import recom from "./homechildcomps/recom.vue"
	import limit from "./homechildcomps/limit.vue"
	import guess from "./homechildcomps/guesslike.vue"
	import gotop from "./homechildcomps/gotop.vue"
	import bottom from "../../components/bottom/bottom.vue"
	// 使用bus控制总线传值
	import bus from "../../bus/bus.js"
	export default {
		name: '',
		// 定义局部组件
		components: {
			banner,
			font,
			goods,
			recom,
			limit,
			guess,
			bottom,
			gotop
		},
		data: function () {
			return {
				// 热卖-循环渲染的数组
				hot: [],
				// 男女推-直接从数组中取出的对象
				manrecom: {},
				womanrecom: {},
				// 猜你喜欢-循环渲染的数组
				like: []
			}
		},
		mounted() {
			// axios请求获取goods表中type为热卖的商品信息
			this.$http.get("/getHot", {
				params: {
					type: "热卖"
				}
			}).then(res => {
				this.hot = res.data
			})
			// axios请求获取goods表中type为男推、女推的图片，可以通过点击跳转到导航栏的男女装
			// 注意！这里一次性请求了两种不同type的资源，需要男推图片取res.data[0]，女推则取res.data[1]即可
			this.$http.get("/getRecom", {
				params: {
					man: "男推",
					woman: "女推"
				}
			}).then(res => {
				this.manrecom = res.data[0]
				this.womanrecom = res.data[1]
			})
			// axios请求获取goods表中type为限定的图片信息
			this.$http.get("/getLimit", {
				params: {
					type: "限定"
				}
			}).then(res => {
				// bus传值给limit组件
				bus.$emit("limitimg", res.data[0].cover)
			})
			// 随机查询goods表type为男装女装的商品信息，添加到猜你喜欢
			this.$http.get("/getLike", {
				params: {
					man: "男装",
					woman: "女装"
				}
			}).then(res => {
				this.like = res.data
			})
		},
		methods: {
			// 跳转详情页方法  根据gid（商品id）
			goodDetail(gid) {
				this.$router.push({
					path: "/detail",
					query: {
						gid
					}
				})
			},
			// 点击首页的男推图片进入男装
			toMan() {
				this.$router.push("/classify/male")
			},
			// 点击首页的女推图片进入女装
			toWoman() {
				this.$router.push("/classify/female")
			}
		}

	}
</script>

<style scoped>
	/* @import url(); 引入公共css类 */
	/* 注意！已经从5000改过来了 */
	.home {
		height: auto;
	}

	.content {
		width: 1200px;
		height: auto;
		margin: 0 auto;
	}

	.hot {
		width: 100%;
		flex-wrap: wrap;
		display: flex;
		align-items: center;
		height: auto;
	}
</style>