<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="emergencyContain" id="">
		<div class="ChartHead">诈骗事件统计</div>
		<div class="ChartBody">
			<div class="emergencyContain" id="emergencyContain" ref="emgChart"></div>
		</div>
	</div>
</template>
  
<script>
export default {
		data() {
			return {
				geoCoordMap:{},
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
					myChart = this.$echarts.init(this.$refs.emgChart)
					this.myChart = myChart
					this.getdata();
					this.draw();
		},
		methods: {
			
			getdata(){
					
					this.data = [
							{ value: 1600, name: '教师' },
							{ value: 445, name: '保洁' },
							{ value: 515, name: '保安' },
							{ value: 236, name: '厨师' },
							{ value: 989, name: '教辅' },
							{ value: 160, name: '职员' },
						]
					
			},
			draw() {
				var _this = this

				// var data = _this.convertData(this.data);

				let myChart = _this.myChart
				// 绘制图表配置
				console.log(data)
				const barOption = {
					xAxis: {
					type: 'value'
					},
					yAxis: {
					type: 'category',
					axisLabel: {
						rotate: 30
					},
					data: data,
					},
					animationDurationUpdate: 1000,
					series: {
					type: 'bar',
					id: 'population',
					data: data,
					universalTransition: true
					}
				};
				let currentOption = mapOption;
				myChart.setOption(barOption);
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
  