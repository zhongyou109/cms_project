'use strict'

//引入第三方包
import Vue from 'vue';
import store from './store/store';
// import VueMaterial  from 'vue-material';
import VueTouch from 'vue-touch';

//引入路由对象
import VueRouter from 'vue-router';
//安装插件
Vue.use(VueRouter);
//引入mint-ui
//import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
//安装插件
//Vue.use(Mint);
// mint-ui 按需引入 开始
import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
//引入mui css
import './static/css/mui.css';
//引入全局样式
import './static/css/global.css'

//引入axios
import Axios from 'axios';
// Axios.defaults.headers = {
//  accept: 'defaults';
// }//范围广，权利小（比具体某个请求中的设置权利小）
//拦截器(每一次请求都有效)
Axios.interceptors.request.use(function(config) {
    // config.headers.accept = {
    //  accept: 'interceptor';
    // }//最优先，范围广，权利大
    //请求前显示loading
    Indicator.open();
    return config; //return config才会有请求
});
Axios.interceptors.response.use(function(config) {
    Indicator.close();
    return config;
});
//挂载原型
Vue.prototype.$ajax = Axios;
//Axios.defaults.baseURL = "";

Vue.prototype.jsonp = jsonp;

//引入第三方包
import Moment from 'moment';
//定义全局过滤器
Vue.filter('converDate', function(value) {
    return Moment(value).format('YYYY-MM-DD');
});

//默认配置
//定义全局组件
Vue.component('navBar', NavBar);


import NavBar from './components/common/navBar.vue';
import jsonp from './http.js';
import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import Seach from './components/seach/seach.vue';
import MoviesList from './components/movies/moviesList.vue';
import MoviesDetail from './components/movies/moviesDetail.vue';
import PhotoShare from './components/photo/photoShare.vue';
import PicShare from './components/pic/picShare.vue';
import PicDetail from './components/pic/picDetail.vue';
import GoodsList from './components/goods/goodsList.vue';
import GoodsDetail from './components/goods/goodsDetail.vue';
import NewsList from './components/news/newsList.vue';
import Weather from './components/weather/weather.vue';
import Address from './components/address/address.vue';


//创建对象并配置路由规则
let router = new VueRouter({
    linkActiveClass: "mui-active",
    routes: [
        { path: '/', redirect: { name: 'home' } }, //重定向
        { name: 'home', path: '/home', component: Home }, //首页
        { name: 'member', path: '/member', component: Member }, //会员
        { name: 'shopcart', path: '/shopcart', component: Shopcart }, //购物车
        { name: 'seach', path: '/seach', component: Seach }, //查找
        { name: 'movies.list', path: '/movies/list', component: MoviesList }, //新闻列表
        { name: 'movies.detail', path: '/movies/detail', component: MoviesDetail }, //新闻详情
        { name: 'photo.share', path: '/photo/share', component: PhotoShare }, //
        { name: 'pic.share', path: '/pic/share', component: PicShare }, //
        { name: 'pic.detail', path: '/pic/detail', component: PicDetail },
        { name: 'goods.list', path: '/goods/list', component: GoodsList },
        { name: 'goods.detail', path: '/goods/detail', component: GoodsDetail },
        { name: 'news.list', path: '/news/list', component: NewsList },
        { name: 'weather', path: '/weather', component: Weather },
        { name: 'address', path: '/address', component: Address }
    ]
})
/*老版本vue-touch不兼容2.0，会报错 Cannot read property 'priority' of undefined，请使用vue-touch@next版本*/
Vue.use(VueTouch, { name: 'v-touch' })

//创建vue实例
new Vue({
    el: '#app',
    router,
    store,
    render: c => c(App)
});