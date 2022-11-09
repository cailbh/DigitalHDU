<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="workersContain" id="">
		<div class="ChartHead">教职工占比</div> 
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
				mcolor:[
					"#0000CC",
					"#0033CC",
					"#0066CC",
					"#0099CC",
					"#00CCCC",
					"#00FFCC",
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
				var data = {
					"教师":2600,
					"保安":700,
					"食堂":500,
					"保洁":300,
				}
				var k=0;
				for(let i in data){
					_this.totalNum += data[i]
					k++
				}
				_this.WorkersData = data
				_this.dataLen = k
				}, 
			draw() {
				var _this = this
				var data=_this.data
				// var data = _this.convertData(this.data);

				let myChart = _this.myChart
				// 绘制图表配置
				
				let option = {
					backgroundColor: '#fff',
					title: {
						text: '次数分布',
						left: 'center',
						top: 0,
						textStyle: {
						color: 'black',
						fontFamily: '黑体',
						fontSize: 28
						}
					},
					legend: {
						orient: 'vertical',
						x: 32,
						y: 74,
						textStyle: {
						color: 'black',
						fontFamily: '黑体',
						fontSize: 14
						}
					}, 
					series: [
						{
						name: 'Nightingale Chart',
						type: 'pie',
						label: {
							show: true,
							formatter: '{b}:{c}\n{d}%',
							//饼图里面标签设置占比的格式
							position: 'inside',
							color: 'black'
						},
						radius: [60, 215],
						center: ['42%', '57%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 8
						},
						color: ['	#FFC0CB','#D8BFD8','#B0C4DE','#87CEEB', '#B0E0E6', '#AFEEEE','#98FB98'],
						//颜色设置
						data: [
							{ value: 499, name: '10秒以内' },
							{ value: 445, name: '11秒-20秒' },
							{ value: 515, name: '21秒-30秒' },
							{ value: 236, name: '31秒-40秒' },
							{ value: 189, name: '41秒-50秒' },
							{ value: 16, name: '51秒-1分钟' },
							{ value: 108, name: '1分钟以上' }
						]
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
  