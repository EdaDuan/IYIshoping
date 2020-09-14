<template>
	<!-- 商品展示 -->
	<div class="showClothes" :class="{bgi:bgi}">
		<div class="showClothesbox" v-for="item in goodslist" :key="item.id" @click="showgoods(item.id)">
			<div class="shopClothes-img">
				<img :src="item.cover" alt="">
			</div>
			<div class="shopClothes-des">
				<p class="clothes-name">{{item.name}}</p>
				<!-- <p class="clothes-des">{{item.descp}}</p> -->
				<div class="clothes-inf">
					<p class="clothes-pri">{{item.price}}</p>
					<p class="clothes-rest">{{item.rest}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from "../../../bus/bus.js"
	export default {
		data: function() {
			return {
				kw: "",
				page: 1,
				ways: "id",
				goodslist: [],
				bgi: false
			}
		},
		created() {
			this.kw=this.$root.$children[0].$refs.topbar.kw;
			this.getProduct()
			bus.$on("showproduct", (kw) => {
					this.kw = kw
				}),
				//通过页码组件得到当前页码
				bus.$on("getpage", (val) => {
					this.page = val
				}),
				bus.$on("ways", (ways) => {
					this.ways = ways
				})
				if (this.goodslist.length == 0) {
					this.bgi = true
				} else {
					this.bgi = false
				}
		},
		methods: {
			showgoods(gid) {
				this.$router.push({
					path: "/detail",
					query: {
						gid
					}
				}); //跳转路由并传出商品id
			},
			getProduct() {

				console.log("传入到显示", this.kw, this.goodslist, this.page, this.ways)
				this.$http.get("/showproduct", {
					params: {
						kw: this.kw,
						page: this.page,
						ways: this.ways
					}
				}).then((r) => {
					this.goodslist = r.data
					bus.$emit("returnpages",this.goodslist.length)
				}).catch((e) => {
					console.log("程序请求出错")
				})
			
			}
		},
		watch: {
			kw() {
				this.getProduct()
			},
			page() {
				this.getProduct()
			},
			ways() {
				this.getProduct()
			},
			goodslist() {
				if (this.goodslist.length == 0) {
					this.bgi = true
				} else {
					this.bgi = false
				}
			}


		}
	}
</script>

<style scoped>
	.showClothes {
		width: 80%;
		height: 750px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.bgi {
		background-image: url(../../../assets/img/noproduct.png);
		background-repeat: no-repeat;
	}

	.showClothesbox {
		/* width: 240px; */
		width: 20%;
		height: 310px;
		padding: 10px 13px;
		margin: 12px 0;
		background-color: #FFFFFF;
	}

	.showClothesbox img {
		width: 100%;
		height: 250px;
	}

	.shopClothes-des {
		text-align: center;
		color: #B0B0B0;
		height: 60px;
		position: relative;
	}

	.clothes-name {
		color: black;
		font-size: 14px;
	}

	.clothes-des {
		font-size: 12px;

	}

	.clothes-pri {
		font-size: 14px;
		color: red;
	}

	.clothes-rest {
		font-size: 12px;
	}


	.clothes-rest {
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>
