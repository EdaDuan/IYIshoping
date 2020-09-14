<template>
	<!-- 分页 -->
	<div class="page">
		<el-pagination 
		background layout="prev, pager, next" 
		:total="page" 
		:current-page="pagenum" 
		:page-size="8"
		 @current-change="handleCurrentChange">
		</el-pagination>
	</div>

</template>

<script>
	import bus from "../../../bus/bus.js"
	export default {
		data(){
			return {
				pagenum:1,
				page:40,
			}
		},
		// created (){
		// 	bus.$on("returnpages",(pages)=>{
		// 		this.page=pages
		// 	})
		// },
		methods:{
			handleCurrentChange(val) {
				this.pagenum=val;
				bus.$emit("getpage",this.pagenum)//把页码传到mode.vue
			}
		},
	}
</script>

<style>
	.page{
		width: 100%;
		height: 150px;
		text-align: center;
		/* position: absolute; */
		/* left: 300px; */
		/* bottom: 350px; */
	}

</style>
