<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="workersContain" id="">
		<div class="ChartHead">学院占比</div> 
		<div class="ChartBody">
			<div class="workersContain" id="workersContain" ref="wokChart"></div>
		</div>
	</div>
</template>
  
<script>
const chinaJson = require("@/assets/json/China.json");//获取中国地图的json数据
import * as d3 from "d3";
export default {
		data() {
			return {
				WorkersData:{},
				data:[],
				myChart:null,
				// mcolor:[
				// 	"#0000CC",
				// 	"#0033CC",
				// 	"#0066CC",
				// 	"#0099CC",
				// 	"#00CCCC",
				// 	"#00FFCC",
				// ]
				mcolor:[
					"#ADC8FF",
					"#84A9FF",
					"#6690FF",
					"#254EDB",
					"#1939B7",
					"#091A7A",
				]
			}
		},
		watch: {
			WorkersData(val){//接收数据后绘制
				this.draw();
			}
		},
		mounted() {
			let myChart = this.myChart
					if (myChart != null && myChart != "" && myChart != undefined) {
						myChart.dispose();//销毁
					}
					myChart = this.$echarts.init(this.$refs.wokChart)
					this.myChart = myChart
			this.getData();
			this.draw();
		},
		methods: {
			getData() {
				const _this = this;
					this.$http
					.get('/api/workers/getData', { params: {} }, {})
					.then((response) => {
						var data = {}
						var body = response.body
						_this.WorkersData = body
					})
					.catch(function (error) {
					console.log(error);
					});
				}, 
			draw() {
				var _this = this
				var data= JSON.parse(JSON.stringify( _this.WorkersData))
				// var data = _this.convertData(this.data);
				let mcolor = _this.mcolor
				let myChart = _this.myChart
				// 绘制图表配置
				var normalize = d3.scaleLinear().domain([0, 3000]).range([0, 1]);
				let option = {
					// backgroundColor: '#fff',
					// title: {
					// 	text: '次数分布',
					// 	left: 'center',
					// 	top: 0,
					// 	textStyle: {
					// 	color: 'black',
					// 	fontFamily: '黑体',
					// 	fontSize: 28
					// 	}
					// },
					
					series: [
						{
						name: 'Chart',
						type: 'pie',
						label: {
							show: true,
							// alignTo:'edge',
							fontSize: 10,
 							// margin:50,
							formatter: '{b}:\n{d}%',
							//饼图里面标签设置占比的格式
							position: 'outside',
							// padding:[0,50,0,0], //调整左右位置
							color: 'white'
						},
						radius: [10, 105],
						center: ['50%', '60%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 4,
							color:(param)=>{  
								let num = param.value; 

								let cor1 = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(num-50))
								let cor2 = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(num))
								let cor3 = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(num+50))
								return  new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: cor3 },
								{ offset: 0.5, color: cor2 },
								{ offset: 1, color:	cor1 }
							])
							// ])
								},
						},
						
						//颜色设置
						data: data
						}
					]
					};
				
				// let currentOption = mapOption;
				myChart.setOption(option);
				// setInterval(function () {
				// 	currentOption = currentOption === mapOption ? barOption : mapOption;
				// 	myChart.setOption(currentOption, true);
				// }, 2000);
				// myChart.setOption(option);
				setTimeout(function() {
					window.onresize = function() {
						myChart.resize();
					}
				}, 200)
			},
		}
  }
  </script>
  <style>
  @import './index.css';
  </style>
  