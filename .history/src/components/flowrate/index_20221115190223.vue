<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="inNumContain" id="">
		<div class="ChartHead">在寝人数统计</div>
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
				const myColor = mcolor.reverse();
				const xData = datas.map((item) => item.name);
				const yData = datas.map((item) => item.value);
				const max = Math.ceil(Math.max(...yData) * 1.2);
				const maxData = datas.map((item) => item.could);
				console.log(myColor, xData, yData, max, maxData)
				var normalize = d3.scaleLinear().domain([0, max]).range([0, 1]);
				let option = {
					grid: {
						left: "15%",
						right: "20%",
						bottom: "5%",
						top: "5%",
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
						// inverse: true,
						data: yData,
						offset: -55,
						position: "left",
					},
					{
						show: true,
						data: yData,
						offset: -5,
						position: "right",
						axisLabel: {
							lineHeight: 0,
							verticalAlign: "bottom",
							fontSize: 15,
							color: "#4bf3f9",
							formatter: "{value}",
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
					{
						show: true,
						data: maxData,
						offset: 20,
						position: "right",
						axisLabel: {
							lineHeight: 0,
							verticalAlign: "bottom",
							fontSize: 15,
							color: "#4bf3f9",
							formatter: "/{value}",
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
						barWidth: 15,
						itemStyle: {
							borderRadius: 0,
							color: (params) => {
								console.log(params)


								let num = params.value; 

								let cor1 = d3.interpolateRgb(mcolor[0], mcolor[5])(normalize(num-50))
								let cor2 = d3.interpolateRgb(mcolor[0], mcolor[5])(normalize(num))
								let cor3 = d3.interpolateRgb(mcolor[0], mcolor[5])(normalize(num+50))
								return  new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
								{ offset: 0, color: cor1 },
								{ offset: 0.7, color: cor2 },
								{ offset: 1, color:	cor3 }
							])


							// var num = myColor.length;
							// return "rgba(0,0,255,0.2)"
							},
						},
						// max: 0,
						labelLine: {
							show: false,
						},
						z: 2,
						data: yData,
					},
					// {
					// 	name: "外圆",
					// 	type: "scatter",
					// 	emphasis: {
					// 		scale: false,
					// 	},
					// 	xAxisIndex: 1,
					// 	symbolSize: 10,
					// 	itemStyle: {
					// 		color: (params) => {
					// 		var num = myColor.length;
					// 		return myColor[params.dataIndex % num];
					// 		},
					// 		shadowColor: "rgba(255, 255, 255, 0.5)",
					// 		shadowBlur: 5,
					// 		borderWidth: 1,
					// 		opacity: 1,
					// 	},
					// 	z: 2,
					// 	data: yData,
					// },
					{
						name: "应到",
						z: 1,
						show: true,
						type: "bar",
						xAxisIndex: 1,
						barGap: "-100%",
						barWidth: 15,
						itemStyle: {
							borderRadius: 0,
							color: "rgba(34, 34, 34, 0.5)",
							
						},
						label: {
							show: true,
							position: [-50, 0],
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
  