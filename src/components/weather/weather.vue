<template>
	<div>
		天气
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		created(){
			var t = (new Date()).getTime();
			this.jsonp('http://tq.360.cn/api/weatherquery/querys?app=tq360&code=101280601&t='+t+'&c='+t+'&_='+t,{},function(res){
				console.log(res);
			});
		}
	}
</script>
<style>
	
</style>