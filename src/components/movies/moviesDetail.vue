<template>
	<div>
		<nav-bar title="电影详情"></nav-bar>
		<div class="tmpl">
			<div class="movies-name">
				<p>{{movie.title}}</p>
				<p><img :src="movie.images.large" alt=""></p>
				<P>{{movie.summary}}</P>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				movie: {
					images:{}//如果不设置images属性在img第一次渲染large会报未定义(异步获取数据)
				}
			}
		},
		created(){
			// let id = this.$route.query.id;
			// var that = this;
			// this.jsonp(
	  //       'http://api.douban.com/v2/movie/subject/'+id, {},
	  //       function(data) {
	  //         that.movie = data;
	  //       });
			let id = this.$route.query.id;
			this.$ajax.get('https://bird.ioliu.cn/v1/?url=https://api.douban.com/v2/movie/subject/'+id)
			.then(res=>{
				this.movie = res.data;
			})
			.catch(err=>{
				console.log(err);
			});
		}
	}
</script>
<style scoped>
	.movies-name {
		text-align: center;
	}
	.movies-name p:nth-child(1){
		text-align: center;
		color: #0a87f8;
		font-style: 20px;
		font-weight: bold;
	}
	.tmpl{
		margin-top: 10px;
	}
</style>