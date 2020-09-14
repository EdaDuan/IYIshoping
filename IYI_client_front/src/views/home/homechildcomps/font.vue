<template>
	<div class="font">
		<p class="big">
			<slot name="fa"></slot>
		</p>
		<p class="small">
			---------------------------<slot name="son"></slot>---------------------------
		</p>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.font{
		text-align: center;
		width: 100%;
		height: auto;
		margin: 50px auto;
	}
	
	p{
		margin: 10px auto;
	}
	
	.big{
		font-size: 40px;
		font-weight: 400;
	}
	
	.small{
		font-size: 14px;
		color: #cccccc;
	}
</style>
