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
		mounted() {
			let myChart = this.myChart
					console.log("12123123",myChart)
					if (myChart != null && myChart != "" && myChart != undefined) {
						console.log("111111")
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
				// this.$http
				// 	.get("/api/test/getData", { params: { name: "12345" } }, {})
				// 	.then((response) => {
				// 	// 响应成功回调
				// 	console.log(response);
				// 	});
				var data = [
							{ value: 3600, name: '机械工程学院' },
							{ value: 1445, name: '管理学院' },
							{ value: 2515, name: '电子信息学院' },
							{ value: 3236, name: '计算机学院' },
							{ value: 1989, name: '自动化学院' },
							{ value: 1160, name: '通信工程学院' },
							{ value: 1260, name: '外国语学院' },
							{ value: 2160, name: '会计学院' },
							{ value: 1160, name: '经济学院' },
							{ value: 1160, name: '材料与环境工程学院' },
							{ value: 2160, name: '网络空间安全学院' },
							{ value: 800, name: '人文艺术与数字媒体学院' },
							{ value: 545, name: '法学院' },
						]
				var k=0;
				
				_this.WorkersData = data
				_this.dataLen = k
				}, 
			draw() {
				var _this = this
				var data=_this.WorkersData
				// var data = _this.convertData(this.data);

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
							formatter: '{b}:{d}%',
							//饼图里面标签设置占比的格式
							position: 'outside',
							// padding:[0,50,0,0], //调整左右位置
							color: 'white'
						},
						radius: [10, 105],
						center: ['50%', '60%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 4
						},
						color:(param)=>{  
								console.log(param)
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
								}
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
  