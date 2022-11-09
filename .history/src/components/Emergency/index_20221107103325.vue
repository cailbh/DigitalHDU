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
import { param } from 'server-mongdb/api'

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

				var mcolor = _this.mcolor

				let myChart = _this.myChart
				// 绘制图表配置
				var data = this.data
				let xData = data.map(function (item) {
						return item.name;
					})

				// cons
				const barOption = {
					xAxis: [
						{
						type: 'category',
						data: xData,
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
						color: '#fff'
						},
						axisTick: {
						show: false
						},
						axisLine: {
						show: false
						},
						z: 10
						}
					],
					yAxis: [
						{
						axisLabel: {
							color: '#fff'
						},
						type: 'value',
						data: data
						}
						
					],
					animationDurationUpdate: 1000,
					grid:{
						show:false,
						top:'15%',    // 一下数值可为百分比也可为具体像素值
						right:'5%',
						bottom:'10%',
						left:'10%'
					},		
					series: {
						type: 'bar',
						id: 'population',
						data: data,
						universalTransition: true,
						showBackground: true,
						itemStyle: {
							color: 
								new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color:  (param)=>{  
										console.log(param)
										let num = param.value; 
										if (num > 110) {
											return mcolor[0];
										}else if(num > 80){
											return mcolor[1];
										}
										return mcolor[2];
									}
								 },
								{ offset: 0.5, color: (param)=>{  
										console.log(param)
										let num = param.value; 
										if (num > 110) {
											return mcolor[1];
										}else if(num > 80){
											return mcolor[2];
										}
										return mcolor[3];
									} },
								{ offset: 1, color: (param)=>{  
										console.log(param)
										let num = param.value; 
										if (num > 110) {
											return mcolor[0];
										}else if(num > 80){
											return mcolor[1];
										}
										return mcolor[2];
									} }
							])
						},
						emphasis: {
							itemStyle: {
							color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: '#2378f7' },
								{ offset: 0.7, color: '#2378f7' },
								{ offset: 1, color: '#83bff6' }
							])
							}
						},
					}
				};
				// let currentOption = mapOption;
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
  