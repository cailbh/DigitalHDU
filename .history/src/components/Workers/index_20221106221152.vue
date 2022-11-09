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
				var data = [
							{ value: 2600, name: '教师' },
							{ value: 445, name: '保洁' },
							{ value: 515, name: '保安' },
							{ value: 236, name: '厨师' },
							{ value: 989, name: '教辅' },
							{ value: 160, name: '职员' },
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
					legend: {
						orient: 'vertical',
						x: 32,
						y: 74,
						textStyle: {
						color: 'white',
						fontFamily: '黑体',
						fontSize: 14
						}
					}, 
					series: [
						{
						name: 'Chart',
						type: 'pie',
						label: {
							show: true,
							formatter: '{b}:{c}\n{d}%',
							//饼图里面标签设置占比的格式
							position: 'inside',
							color: 'white'
						},
						radius: [10, 125],
						center: ['60%', '57%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 8
						},
						color: _this.mcolor,
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
  