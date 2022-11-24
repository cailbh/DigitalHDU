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
import { max } from "_d3-array@1.2.4@d3-array";
export default {
		data() {
			return {
				geoCoordMap:{},
				FlowRateData:[],
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
		watch:{
			FlowRateData(v){
				this.draw();
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
					
				const _this = this;
					this.$http
					.get('/api/flowRate/getData', { params: {} }, {})
					.then((response) => {
						var body = response.body
						_this.FlowRateData = body
					})
					.catch(function (error) {
						console.log(error);
					});
					
			},
			draw() {
				var _this = this

				var mcolor = _this.mcolor

				let myChart = _this.myChart
				// 绘制图表配置
				var datas = this.FlowRateData
				const nameData = datas.map((item) => item.name);
				const inData = datas.map((item) => item.inValue);
				const outData = datas.map((item) => item.outValue);
				const max = Math.max(Math.ceil(Math.max(...outData)),(Math.ceil(Math.max(...inData))));
				let option ={
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
						color: "#fff",
					},
					data: ["入区", "出区"],
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
						data: nameData,
						axisLine: {
						show: false,
						},
						axisTick: {
						show: false,
						},
						axisLabel: {
						color: "#fff",
						interval: 0, //横坐标的数据完全显示
						},
					},
					],
					yAxis: [
					{
						type: "value",
						max: max,
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
						color: "#fff",
						},
					},
					],
					series: [
					{
						name: "入区",
						type: "line",
						// stack: "消耗",
						areaStyle: {
						opacity: 0.5,
						color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
						data: inData,
					},
					{
						name: "出区",
						type: "line",
						// stack: "消耗",
						areaStyle: {
						opacity: 0.5,
						color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
						data: outData,
					},
					],
				};
				myChart.setOption(option);
				// this.autoHeight = datas.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
				// myChart.resize({height:this.autoHeight}); 
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
  