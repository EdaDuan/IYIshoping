<template>
	<!-- 右侧广告页 -->
	<div class="adv">
		<h2>热卖</h2>
		<div class="hot" v-for="item in advlist" :key="item.id" @click="showgoods(item.id)">
			<img :src="item.cover" alt="">
			<div>
				<span class="price">￥{{item.price}}</span>
				<span class="hot num">销量：{{item.sales}}</span>
			</div>
		</div>
	
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				advlist:[],//右侧广告栏
			}
		},
		created(){
			this.$http.get("/advsale")
			.then((r)=>{
				this.advlist=r.data
			})
		},
		methods:{
			showgoods(gid){
				this.$router.push({
					path: "/detail",
					query: {
						gid
					}
				}); 
			}
		}
	}
</script>

<style scoped>
	.adv {
		position: absolute;
		right: 0;
		top: 72px;
		width: 20%;
		height: auto;
		/* background-color: #ff9ee1; */
	}

	.hot .price{
		font-size: 20px;
		color: red;
	}
	.hot img{
		width: 100%;
	}
	.hot .num{
		color: #ccc;
		display: inline-block;
		position: absolute;
		right: 0;
		/* background-color: skyblue; */
	}
</style>
