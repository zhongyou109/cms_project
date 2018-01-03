<template>
	<div>
		<!-- 轮播图 -->
		<mt-swipe :auto="3000">
		  <mt-swipe-item v-for="(item,index) in subjects" :key="index">
		  	<img :src="item" alt="">
		  </mt-swipe-item>
		</mt-swipe>
		<!-- 九宫格 -->
		<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'movies.list'}">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">最新电影</div>
		                </router-link> 
		            </li>   
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'goods.list'}">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">商品展示</div>
		                </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'pic.share'}">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">美图分享</div>
		                </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'news.list'}">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">新闻</div>
		                </router-link>    
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'weather'}">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">天气</div>
		                </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'address'}">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">通讯录</div>
		                </router-link>
		            </li>
		        </ul> 
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				subjects:[]
			}
		},
		created(){
			// var that = this;
			// this.jsonp(
	  //       'http://api.douban.com/v2/movie/in_theaters?start=0&count=2', {},
	  //       function(data) {
	  //         that.subjects = data.subjects;
	  //       });
	  		this.subjects = [
	  							'../src/static/imgs/swipe/01.jpg',
	  							'../src/static/imgs/swipe/02.jpg',
	  							'../src/static/imgs/swipe/03.jpg',
	  						];
		}
	}
</script>
<style scoped>
	/*轮播图样式*/
	.mint-swipe {
		max-height: 187px;
		height: 187px;
	}
	.mint-swipe img{
		height: 100%;
		width: 100%;
	}
	/*九宫格样式*/
	.mui-table-view.mui-grid-view.mui-grid-9{
		background-color: white;
		margin-top: 0;
	}
	.mui-table-view.mui-grid-view.mui-grid-9 ul{
		border: 0;
	}
	.mui-table-view.mui-grid-view.mui-grid-9 li{
		border: 0;
	}

	/*九宫格清除字体图标*/
	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before{
	    content: '';
	}
	.mui-icon-home{
	    background-image: url('../../static/imgs/iconpic/movie.png');
	    background-repeat: round;
	}
	.mui-icon-email{
	    background-image: url('../../static/imgs/iconpic/shop.png');
	    background-repeat: round;
	}
	.mui-icon-chatbubble{
	    background-image: url('../../static/imgs/iconpic/pic.png');
	    background-repeat: round;
	}
	.mui-icon-location{
	    background-image: url('../../static/imgs/iconpic/news.png');
	    background-repeat: round;
	}
	.mui-icon-search{
	    background-image: url('../../static/imgs/iconpic/weather.png');
	    background-repeat: round;
	}
	.mui-icon-phone{
	    background-image: url('../../static/imgs/iconpic/lianxi.png');
	    background-repeat: round;
	}
	/*九宫格图标宽高*/
	.mui-icon{
	    height: 50px;
	    width:50px;
	}
</style>