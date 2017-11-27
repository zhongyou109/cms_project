<template>
	<div>
		<nav-bar title="图文分享"></nav-bar>
		<div class="photo-header">
			<ul>
				<li v-for="(category,index) in categorys" :key="index">
					<a href="#">{{category}}</a>
				</li>
			</ul>
		</div>
		<div class="photo-list">
			<ul>
				<li v-for="(item, index) in subjects" :key="item.id">
					<a href="">
						<img :src="'/src/static/imgs/photoshare/0'+index+'.jpg'" alt="图片加载失败">
						<p>
							<span>{{item.title}}</span>
							<br>
							<span>{{item.directors[0].name}}</span>
						</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				subjects: [],
				categorys: ['家居生活','摄影设计','明星美女','空间设计','户型装饰','广告摄影','摄影学习']
			}
		},
		created(){
			var that = this;
			this.$(
	        'https://api.douban.com/v2/movie/top250?start=0&count=10', {},
	        function(data) {
	          that.subjects = data.subjects;
	        });
	        this.$ajax.get('https://cnodejs.org/api/v1/topics/?tab=share&page=1&limit=20')
	        .then(res=>{
	        	console.log(res);
	        });
		}
	}
</script>
<style scoped>
	.photo-header li{
		list-style: none;
		display: inline-block;
		margin-left: 10px;
		height: 30px;
	}
	.photo-header ul{
		white-space: nowrap;
		overflow-x: auto;
		padding-left: 0px;
		margin: 5;
	}
	/*下面的图片*/
	.photo-list li {
		list-style: none;
		position: relative;
	}
	.photo-list li img {
		width: 100%;
		height: 230px;
		vertical-align: top;
	}
	.photo-list ul{
		padding-left: 0;
		margin: 0;
	}
	.photo-list p{
		position: absolute;
		bottom: 0px;
		color: white;
		background-color: rgba(0,0,0,0.3);
		margin-bottom: 0px
	}
	.photo-list p span:nth-child(1) {
		font-weight: bold;
		font-size: 16px;
	}
</style>