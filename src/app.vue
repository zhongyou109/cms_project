<template>
	<div>
		<mt-header title="生活助手"></mt-header>
		<transition name="router" mode="out-in">
            <router-view class="content"></router-view>
        </transition>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" :to="{name:'home'}">
				<span class="mui-icon icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'member'}">
				<span class="mui-icon icon-huiyuan"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'shopcart'}">
				<span class="mui-icon icon-qicheqianlian-"><span class="mui-badge">{{pickNum}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'seach'}">
				<span class="mui-icon icon-iconfontsousuo"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	import connect from './components/common/connect.js';
	//引入prodTools
    import prodTools from './components/common/prodTools.js';
	export default {
		data(){
			return {
				pickNum: prodTools.getTotalCount()
			}
		},
		created(){
			connect.$on('addShopcart',num=>{
				this.pickNum += num;
			});
		}
	}
</script>
<style scoped>
	.content {
		padding-bottom: 50px;
	}
	.router-enter-active,.router-leave-active{
	    transition: opacity .5s 
	}
	.router-enter,.router-leave-to{
	    opacity: 0;
	}
</style>