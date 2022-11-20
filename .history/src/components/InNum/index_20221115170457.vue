<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="inNumContain" id="">
		<div class="ChartHead">诈骗事件统计</div>
		<div class="ChartBody">
			<div class="inNumContain" id="inNumContain" ref="inNChart"></div>
		</div>
	</div>
</template>
  
<script>

import * as d3 from "d3";
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
				],
				autoHeight:100,
			}
		},
		mounted() {
			let myChart = this.myChart
					if (myChart != null && myChart != "" && myChart != undefined) {
						myChart.dispose();//销毁
					}
					myChart = this.$echarts.init(this.$refs.inNChart)
					this.myChart = myChart
					this.getdata();
					this.draw();
		},
		methods: {
			
			getdata(){
					
					this.data = [
							{ value: 160, name: '1月' },
							{ value: 245, name: '2月' },
							{ value: 15, name: '3月' },
							{ value: 136, name: '4月' },
							{ value: 89, name: '5月' },
							{ value: 245, name: '2月' },
							{ value: 15, name: '3月' },
							{ value: 136, name: '4月' },
							{ value: 89, name: '5月' },
							// { value: 60, name: '6月' },
						]
					
			},
			draw() {
				var _this = this

				var mcolor = _this.mcolor

				let myChart = _this.myChart
				// 绘制图表配置
				var datas = this.data
				const myColor = ["#51FC4E", "#4C5FF5", "#FFE660", "#79F1FF"].reverse();
				const xData = datas.map((item) => item.name);
				const yData = datas.map((item) => item.value);
				const max = Math.ceil(Math.max(...yData) * 1.2);
				const maxData = [max, max, max, max, max];
				console.log(myColor, xData, yData, max, maxData)
				let option = {
				grid: {
					left: "5%",
					right: "8%",
					bottom: "5%",
					top: "10%",
					containLabel: false,
				},
				xAxis: [
					{
						show: false,
					},
					{
						show: false,
					},
				],
				yAxis: [
					{
						show: false,
						inverse: true,
						data: yData,
					},
					{
						show: true,
						data: yData,
						offset: -45,
						position: "right",
						axisLabel: {
							lineHeight: 0,
							verticalAlign: "bottom",
							fontSize: 15,
							color: "#4bf3f9",
							formatter: "{value}人",
						},
						axisLine: {
							show: false,
						},
						splitLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
					},
				],
				series: [
					{
						name: "进度",
						show: true,
						type: "bar",
						barGap: "-100%",
						xAxisIndex: 1,
						barWidth: 3,
						itemStyle: {
							borderRadius: 3,
							color: (params) => {
							var num = myColor.length;
							return {
							type: "linear",
							x: 0,
							y: 0,
							x2: 1,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: "#0F1F45",
								},
								{
									offset: 1,
									color: myColor[params.dataIndex % num],
								},
							],
							};
							},
						},
						// max: 0,
						labelLine: {
							show: false,
						},
						z: 2,
						data: yData,
					},
					{
						name: "外圆",
						type: "scatter",
						emphasis: {
							scale: false,
						},
						xAxisIndex: 1,
						symbolSize: 10,
						itemStyle: {
							color: (params) => {
							var num = myColor.length;
							return myColor[params.dataIndex % num];
							},
							shadowColor: "rgba(255, 255, 255, 0.5)",
							shadowBlur: 5,
							borderWidth: 1,
							opacity: 1,
						},
						z: 2,
						data: yData,
					},
					{
						name: "年份",
						z: 1,
						show: true,
						type: "bar",
						xAxisIndex: 1,
						barGap: "-100%",
						barWidth: 4,
						itemStyle: {
							borderRadius: 4,
							color: "rgba(13, 55, 78, 1)",
						},
						label: {
							show: true,
							position: [0, -25],
							// rich: {
							//   //富文本
							//   white: {
							//     //自定义颜色
							//     color: "#fff",
							//   },
							// },
							fontSize: 14,
							color: "#fff",
							formatter: function (data) {
							return xData[data.dataIndex];
							},
						},
						data: maxData,
					},
				],
				};
				myChart.setOption(option);
				this.autoHeight = counts.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
				myChart.resize({height:this.autoHeight}); 
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
  