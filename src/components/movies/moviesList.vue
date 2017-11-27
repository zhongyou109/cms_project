<template>
	<div>
		<nav-bar title="电影列表"></nav-bar>
		<ul class="mui-table-view">
			<li v-for="item in subjects" :key="item.id" class="mui-table-view-cell mui-media">
				<router-link :to="{name:'movies.detail',query:{id:item.id}}">
					<img class="mui-media-object mui-pull-left" :src="item.images.small">
					<div class="mui-media-body">
						<span v-text="item.title"></span>
						<div class='movies-des'>
							<p>导演：{{item.directors[0].name}}</p>
							<p>发布年份：{{item.year}}</p>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		<img src="" alt="" id="test">
	</div>

</template>
<script>
	export default {
		data(){
			return {
				subjects: []
			}
		},
		created(){
			// var that = this;
			// this.jsonp(
	  //       'http://api.douban.com/v2/movie/in_theaters?start=0&count=30', {},
	  //       function(data) {
	  //         that.subjects = data.subjects;
	  //       });
	  		this.$ajax.get('https://bird.ioliu.cn/v1/?url=https://api.douban.com/v2/movie/in_theaters?count=20&start=0')
	  		.then(res=>{
	  			this.subjects = res.data.subjects;
	  		})
	  		.catch(err=>{
            	console.log(err);
        	});
		}
	}
</script>
<style scoped>
	.mui-media-body p{
		color: #0bb0f5;
	}
	.movies-des p:nth-child(1){
		float: left;
	}	
	.movies-des p:nth-child(2){
		float: right;
	}
</style>