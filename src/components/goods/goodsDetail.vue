<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="imgwrap">
            <img :src="prodInfo.pic_url" width="200" height="200" alt="">
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{prodInfo.title}}
                </span></li>
                <li class="price-li">
                    价格：<span>￥{{prodInfo.view_price}}</span></li>
                <li class="number-li">购买数量：<span @click="reduce">-</span><span>{{num}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
            <transition name="ball" @after-enter="afterEnter">
                <div class="ball" v-if="isShow"></div>
            </transition>
        <div class="product-props">
            <ul>
                <li>商品货号：{{prodInfo.nid}}</li>
                <li>库存情况：{{prodInfo.total}}件</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain >商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import connect from '../common/connect.js';
    //引入prod工具对象
import prodTools from '../common/prodTools.js';
    export default {
        data(){
            return {
                isShow:false,//控制小球是否显示
                prodInfo:{}, //商品信息
                num:1, //添加购物车的商品数量
            }
        },
        created(){
            //1:获取路由参数id
            let id = this.$route.query.id;
            this.$ajax({
                url:'/src/static/json/book/book.json',
                responseType: 'json'
             })
             .then(res=>{
                let goods = res.data.mods.itemlist.data.auctions;
                for (var i = 0; i<goods.length; i++) {
                	if(goods[i].nid===id){
                		this.prodInfo = goods[i];
                		break;
                	}
                }
             });
        },
        methods: {
        	add(){
        		if(this.num < this.prodInfo.total)
        		this.num++;
        	},
        	reduce(){
        		if(this.num > 1)
        			this.num --;
        	},
            addShopcart(){
                connect.$emit('addShopcart',this.num);
                this.isShow = true;
                //调用工具对象来添加商品
                prodTools.addOrUpdate({
                    id:this.prodInfo.nid,
                    num:this.num
                })
            },
            //处理过渡效果进入之后的行为
            afterEnter(){
                this.isShow = false;//移除元素
            },
        }
    }
</script>
<style scoped>
.ball-enter-active{
    animation: bounce-in .5s;
}

  @keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        /*x,y,z轴的位置*/
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}
.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
.imgwrap {
	text-align: center;
}
.product-desc-span {
	display: inline-block;
	white-space:nowrap; 
	overflow: hidden;
	text-overflow:ellipsis;
	width: 330px;
}
</style>
