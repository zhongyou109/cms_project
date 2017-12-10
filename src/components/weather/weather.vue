<template>
		<div>
			<nav-bar title="天气预报"></nav-bar>
			<div id="cityinfo">
                <h4 class="wethercity">{{subject.area}}</h4>
                <p class="wethertime">{{subject.realtime}} 发布</p>
                <span :class="[subject.pm25class]" class="wethericon" id="aqi">{{subject.pm25}} {{subject.aqi}}</span>
            </div>
			<div class="wetherdetail">
                <strong id="temperature">{{subject.du}}°</strong><span id="weathertype">{{subject.tianqi}}</span>
                <ul class="clearfix">
                    <li><i class="icon-shi"></i>湿度 <span id="humidity">{{subject.humidity}}</span>%</li>
                    <li class="txt-r"><i class="icon-feng"></i><span id="winddir">{{subject.wind_direct}}</span> <span id="windpower">{{subject.wind_power}}</span></li>
                </ul>
            </div>
            <div class="mui-content">
			    <div class="mui-row"  v-for="(item, index) in weatherList" :key="index">
			        <div class="mui-col-xs-6" v-for="(item2, index2) in item" :key="index2">
			            <li class="mui-table-view-cell">
			                <p class="colora">周{{item2.week}} {{item2.date}}</p>
			                <p class="icon-tu"><i :class="[item2.class]"></i><br>{{item2.tianqi}}</p>
			                <p class="otherinfo"><span>{{item2.didu}}~{{item2.gaodu}}°</span>{{item2.windypower}}</p>
			            </li>
			        </div>
			    </div>
			</div>
		</div>
</template>
<script>
	export default {
		data(){
			return {
				subject: {
					area:'',
					realtime:'',
					pm25:'',
					aqi:'',
					du: '',
					tianqi: '',
					humidity: '',
					wind_direct: '',
					wind_power: '',
					pm25class:''
				},
				weatherList: []
			}
		},
		created(){
			function codeselect(e){var t=(new Date).getTime(),n=parseInt(e)+(new Date).getTime(),r=[t,n];return r}
			var t = codeselect(101280601);
			var that = this;
			this.jsonp('http://tq.360.cn/api/weatherquery/querys?app=tq360&code=101280601&t='+t[0]+'&c='+t[1]+'&_='+t,{},function(res){
				var linshi = {
					area: res.area[1][0],
					realtime: res.realtime.time,
					pm25: res.pm25.quality,
					aqi: res.pm25.aqi,
					du: res.realtime.weather.temperature,
					tianqi: res.realtime.weather.info,
					humidity: res.realtime.weather.humidity,
					wind_direct: res.realtime.wind.direct,
					wind_power: res.realtime.wind.power
				};
				var alertMap = [
					["youxiu", "空气优"],
					["liang", "空气良"],
					["qing", "轻度污染"],
					["zhong", "中度污染"],
					["zhongdu", "重度污染"],
					["yanzhong", "严重污染"]
				];
				for(var i=0;i<alertMap.length;i++){
					if(alertMap[i][1] === res.pm25.quality){
						linshi.pm25class = alertMap[i][0];
						break
					} 
				}
				that.subject = linshi;

				var attr = res.weather.slice(1,7);
				var temp = [];
				for(var i=0;i<attr.length;i++){
					var contains = {};
					var date = new Date(attr[i].date);
					var weekChina = ["日", "一", "二", "三", "四", "五", "六"];
					var weatherClass = {
						"晴": "icon-qing",
						"多云": "icon-duoyun",
						"阴": "icon-yintian",
						"雾": "icon-wu",
						"冰雹": "icon-bingbao",
						"扬沙": "icon-shachen",
						"沙尘": "icon-shachen",
						"浮尘": "icon-shachen",
						"霾": "icon-shachen",
						"大雨-暴雨": "icon-dayu",
						"雷阵雨": "icon-leizhenyu",
						"阵雨": "icon-zhenyu",
						"雨": "icon-xiaoyu",
						"小雨": "icon-xiaoyu",
						"中雨": "icon-zhongyu",
						"大雨": "icon-dayu",
						"暴雨": "icon-baoyu",
						"雨夹雪": "icon-yujiaxue",
						"阵雪": "icon-chenxue",
						"小雪": "icon-xiaoxue",
						"雪": "icon-xiaoxue",
						"中雪": "icon-zhongxue",
						"大雪": "icon-daxue",
						"暴雪": "icon-baoxue",
						"阵雪": "icon-baoyu"
					};
					for(var key in weatherClass){
						if(key === attr[i].info.day[1]){
							contains.tianqi = attr[i].info.day[1]; 
							contains.class = weatherClass[key];
							break;
						} 
					}
					contains.week = weekChina[date.getDay()];
					contains.date = (parseInt(date.getMonth())+1)+"月"+date.getDate()+"日";
					contains.didu = attr[i].info.night[2];
					contains.gaodu = attr[i].info.day[2];
					contains.windypower = attr[i].info.day[4];
					temp.push(contains);
				    if(temp.length == 2){
				    	that.weatherList.push(temp);
				    	temp = [];
				    }
				}
			});
		}
	}
</script>
<style scoped>
	.clearfix:before,.clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
    /*天气地区*/
	#cityinfo {
		text-align: center;
		background-color: #C9CABB;
	}
	.wethercity {
	    color: #818496;
	    font-size: 24px;
	}
	.wethertime {
	    color: rgba(255,255,255,.6);
	    font-size: 16px;
	}
	.qing {
	    background-color: #db7e06;
	    border: 1px solid #dcb37d;
	}
	.wethericon {
	    border-radius: 2px;
	    line-height: 28px;
	    padding: 0 8px;
	}
	/*天气详细*/
	.wetherdetail {
	    margin-top: 10px;
	    text-align: center;
	    background-color: #C9CABB;
	}
	.wetherdetail, .wethericon {
	    color: #fff;
	    font-size: 16px;
	}
	.wetherdetail strong {
	    font: 400 94px/94px arial;
	}
	#weathertype {
	    font-size: 28px;
	    padding-left: 20px;
	}
	.wetherdetail ul {
	    border-top: 1px solid rgba(255,255,255,.4);
	    padding-top: 2px;
	}
	.wetherdetail li {
		list-style: none;
	    float: left;
	    width: 125px;
	}

	/*未来天气*/
    .mui-content {
    	text-align: center;
    	background-color: #fff;
    }
	.mui-content li{
		list-style: none;
		/*margin-left: 10px;*/
		margin-bottom: 1px;
		background-color: #C9CABB;
	}
	.icon-tu i {
	    background: url(http://p3.qhmsg.com/t011dcb216f11476b0f.png) no-repeat;
	    display: inline-block;
	    height: 70px;
	    margin-bottom: 10px;
	    width: 70px;
	}
	i.icon-duoyun {
	    background-position: -72px 0;
	}
	/*天气图标样式*/
	i.icon-qing {
		background-position:0 0
	}
	i.icon-duoyun {
		background-position:-72px 0
	}
	i.icon-yintian {
		background-position:-144px 0
	}
	i.icon-wu {
		background-position:-216px 0
	}
	i.icon-bingbao {
		background-position:-288px 0
	}
	i.icon-shachen {
		background-position:-360px 0
	}
	i.icon-leizhenyu {
		background-position:0 -72px
	}
	i.icon-zhenyu {
		background-position:-72px -72px
	}
	i.icon-xiaoyu {
		background-position:-144px -72px
	}
	i.icon-zhongyu {
		background-position:-216px -72px
	}
	i.icon-dayu {
		background-position:-288px -72px
	}
	i.icon-baoyu {
		background-position:-360px -72px
	}
	i.icon-yujiaxue {
		background-position:0 -144px
	}
	i.icon-chenxue {
		background-position:-72px -144px
	}
	i.icon-xiaoxue {
		background-position:-144px -144px
	}
	i.icon-zhongxue {
		background-position:-216px -144px
	}
	i.icon-daxue {
		background-position:-288px -144px
	}
	i.icon-baoxue {
		background-position:-360px -144px
	}
	i.icon-yewanqing {
		background-position:0 -216px
	}
	i.icon-yewanduoyun {
		background-position:-72px -216px
	}
	i.icon-wuxinxi {
		background-position:-144px -216px
	}
	i.icon-kulian {
		background-position:-216px -216px
	}

	.icon-feng,.icon-shi {
		background:url(http://p4.qhmsg.com/t012dd226c54bd13f0e.png) no-repeat;
		margin-right:5px;
		vertical-align:middle;
		width:29px
	}
	.icon-shi {
		background-position:0 -28px
	}
	.icon-feng, .icon-shi, .wethericon {
	    height: 28px;
	    display: inline-block;
	}

	/*污染程度*/
	.yanzhong {
		background-color:#9a1c8d;
		border:1px solid #b962b0
	}
	.zhongdu {
		background-color:#8f08bb;
		border:1px solid #a554bf
	}
	.zhong {
		background-color:#a71811;
		border:1px solid #ab4c48
	}
	.qing {
		background-color:#db7e06;
		border:1px solid #dcb37d
	}
	.liang {
		background-color:#ffc000;
		border:1px solid #fcda74
	}
	.youxiu {
		background-color:#33c704;
		border:1px solid #92d47e
	}
</style>