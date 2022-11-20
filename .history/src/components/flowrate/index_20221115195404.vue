<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="FlowrateContain" id="">
		<div class="ChartHead">园区出入流量</div>
		<div class="ChartBody">
			<div class="FlowrateContain" id="FlowrateContain" ref="flrChart"></div>
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
					myChart = this.$echarts.init(this.$refs.flrChart)
					this.myChart = myChart
					this.getdata();
					this.draw();
		},
		methods: {
			
			getdata(){
					
					this.data = [
							{ value: 160, name: '1号楼',could: 300 },
							{ value: 245, name: '2号楼',could: 400 },
							{ value: 125, name: '3号楼' ,could: 500},
							{ value: 336, name: '4号楼' ,could: 600},
							{ value: 389, name: '5号楼' ,could: 500},
							{ value: 445, name: '6号楼' ,could: 600},
							{ value: 675, name: '7号楼',could: 700 },
							{ value: 536, name: '8号楼' ,could: 800},
							{ value: 389, name: '9号楼',could: 400 },
							{ value: 160, name: '10号楼',could: 300 },
							{ value: 160, name: '11号楼',could: 300 },
							{ value: 245, name: '12号楼',could: 400 },
							{ value: 125, name: '13号楼' ,could: 500},
							{ value: 336, name: '14号楼' ,could: 600},
							{ value: 389, name: '15号楼' ,could: 500},
							{ value: 445, name: '16号楼' ,could: 600},
							{ value: 675, name: '17号楼',could: 700 },
							{ value: 536, name: '18号楼' ,could: 800},
							{ value: 389, name: '19号楼',could: 400 },
							// { value: 60, name: '6号楼' },
						]
					
			},
			draw() {
				var _this = this

				var mcolor = _this.mcolor

				let myChart = _this.myChart
				// 绘制图表配置
				var datas = this.data
				option ={
					color: ["#1ce0da", "#074af6"],
					tooltip: {
					show: false,
					},
					legend: {
					icon: "rect",
					itemWidth: 10,
					itemHeight: 10,
					orient: "horizontal",
					right: "8%",
					textStyle: {
						color: "#000",
					},
					data: ["最高消耗", "最低消耗"],
					},
					grid: {
					left: "3%",
					right: "8%",
					bottom: "3%",
					top: "15%",
					containLabel: true,
					},
					xAxis: [
					{
						type: "category",
						boundaryGap: false,
						data: ["1月", "12月", "3月", "4月", "5月", "6月", "7月"],
						axisLine: {
						show: false,
						},
						axisTick: {
						show: false,
						},
						axisLabel: {
						color: "#000",
						interval: 0, //横坐标的数据完全显示
						},
					},
					],
					yAxis: [
					{
						type: "value",
						max: 100,
						min: 0,
						axisLine: {
						show: false,
						},
						axisTick: {
						show: false,
						},
						splitLine: {
						show: false,
						},
						axisLabel: {
						color: "#000",
						},
					},
					],
					series: [
					{
						name: "最高消耗",
						type: "line",
						stack: "消耗",
						areaStyle: {
						opacity: 0.5,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
							offset: 0,
							color: "#1ce0da",
							},
							{
							offset: 1,
							color: "#111A22",
							},
						]),
						},
						smooth: false,
						showSymbol: false,
						emphasis: {
						focus: "series",
						},
						data: [53, 56, 59, 43, 50, 48, 57],
					},
					{
						name: "最低消耗",
						type: "line",
						stack: "消耗",
						areaStyle: {
						opacity: 0.5,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
							offset: 0,
							color: "#074af6",
							},
							{
							offset: 1,
							color: "#111A22",
							},
						]),
						},
						smooth: false,
						showSymbol: false,
						emphasis: {
						focus: "series",
						},
						data: [33, 26, 27, 35, 18, 21, 29],
					},
					],
				};
				myChart.setOption(option);
				this.autoHeight = datas.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
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
  