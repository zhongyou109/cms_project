<template>
    <div class="tmpl" style="height:577px;">
        <nav-bar title="商品列表" ></nav-bar>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
    <!-- 上啦完毕调用该元素的onBottomLoaded函数， -->
        <ul class="mui-table-view mui-grid-view">
            <li v-for="prod in prods" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link :to="{name:'goods.detail',query:{id:prod.nid} }">
                    <img class="mui-media-object" :src="prod.pic_url">
                    <div class="mui-media-body">{{prod.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{prod.view_price}}</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageIndex:1,//页码
            prods:[],//商品列表数据
            allLoaded:false, //是否禁止触发上拉函数
            isAutoFill:false,//是否自动触发上拉函数
        }
    },
    created(){
       this.loadMore();//1
    },
    methods:{
        loadBottom(){
            //console.log('上啦触发了');
            this.loadmoreConcat();
        },
        loadMore(){
             this.$ajax({
                url:'/src/static/json/book/book.json',
                responseType: 'json'
             })
             .then(res=>{
                this.prods = res.data.mods.itemlist.data.auctions;
             });
        }, //追加数据
        loadmoreConcat(){
             this.$ajax.get('getgoods?pageindex='+ (++this.pageIndex))
            .then(res=>{
                this.prods = this.prods.concat(res.data.message);
                // console.log(this.$refs.loadmore.onBottomLoaded());
                //判断是否还有数据
                if(res.data.message.length != 10){
                    //数据不到10条，就是剩余的所有了
                    this.allLoaded = true;//禁止调用上拉函数了
                }
                // 通知上啦操作已经完结
                this.$refs.loadmore.onBottomLoaded();

            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}

</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
