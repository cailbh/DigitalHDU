<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="studentsContain" id="">
		<div class="ChartHead">学生来源分布</div>
		<div class="ChartBody">
			<div class="studentsContain" id="studentsContain" ref="stdChart"></div>
		</div>
	</div>
</template>
  
<script>
const chinaJson = require("@/assets/json/China.json");//获取中国地图的json数据
import * as d3 from "d3";
export default {
		data() {
			return {
				geoCoordMap:{},
				data:[],
				myChart:null
			}
		},
		mounted() {
			
			this.$echarts.registerMap("china", chinaJson);
			this.getdata();
			this.draw();
		},
		methods: {
			convertData(data) {
				var geoCoordMap = this.geoCoordMap
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
					});
					}
				}
				return res;
			},
			getdata(){
					this.geoCoordMap = {
					台湾: [121.5135, 25.0308],
					黑龙江: [127.9688, 45.368],
					内蒙古: [110.3467, 41.4899],
					吉林: [125.8154, 44.2584],
					北京: [116.4551, 40.2539],
					辽宁: [123.1238, 42.1216],
					河北: [114.4995, 38.1006],
					天津: [117.4219, 39.4189],
					山西: [112.3352, 37.9413],
					陕西: [109.1162, 34.2004],
					甘肃: [103.5901, 36.3043],
					宁夏: [106.3586, 38.1775],
					青海: [101.4038, 36.8207],
					新疆: [87.9236, 43.5883],
					西藏: [91.11, 29.97],
					四川: [103.9526, 30.7617],
					重庆: [108.384366, 30.439702],
					山东: [117.1582, 36.8701],
					河南: [113.4668, 34.6234],
					江苏: [118.8062, 31.9208],
					安徽: [117.29, 32.0581],
					湖北: [114.3896, 30.6628],
					浙江: [119.5313, 29.8773],
					福建: [119.4543, 25.9222],
					江西: [116.0046, 28.6633],
					湖南: [113.0823, 28.2568],
					贵州: [106.6992, 26.7682],
					云南: [102.9199, 25.4663],
					广东: [113.12244, 23.009505],
					广西: [108.479, 23.1152],
					海南: [110.3893, 19.8516],
					上海: [121.4648, 31.2891],
					};
					this.data= [
					{ name: "北京", value: 199 },
					{ name: "天津", value: 42 },
					{ name: "河北", value: 102 },
					{ name: "山西", value: 81 },
					{ name: "内蒙古", value: 47 },
					{ name: "辽宁", value: 67 },
					{ name: "吉林", value: 82 },
					{ name: "黑龙江", value: 666 },
					{ name: "上海", value: 24 },
					{ name: "江苏", value: 92 },
					{ name: "浙江", value: 114 },
					{ name: "安徽", value: 456 },
					{ name: "福建", value: 116 },
					{ name: "江西", value: 91 },
					{ name: "山东", value: 119 },
					{ name: "河南", value: 137 },
					{ name: "湖北", value: 116 },
					{ name: "湖南", value: 114 },
					{ name: "重庆", value: 91 },
					{ name: "四川", value: 125 },
					{ name: "贵州", value: 62 },
					{ name: "云南", value: 83 },
					{ name: "西藏", value: 9 },
					{ name: "陕西", value: 80 },
					{ name: "甘肃", value: 56 },
					{ name: "青海", value: 10 },
					{ name: "宁夏", value: 18 },
					{ name: "新疆", value: 180 },
					{ name: "广东", value: 123 },
					{ name: "广西", value: 59 },
					{ name: "海南", value: 1 },
					{ name: "台湾", value: 1 },
					];
					// let myChart = this.myChart
					// console.log("12123123",myChart)
					// if (myChart != null && myChart != "" && myChart != undefined) {
					// 	console.log("111111")
					// 	myChart.dispose();//销毁
					// }
					// myChart = this.$echarts.init(this.$refs.stdChart)
					// this.myChart = myChart
			},
			draw1() {
				var _this = this
				var data= [
					{ name: "北京", value: 199 },
					{ name: "天津", value: 42 },
					{ name: "河北", value: 102 },
					{ name: "山西", value: 81 },
					{ name: "内蒙古", value: 47 },
					{ name: "辽宁", value: 67 },
					{ name: "吉林", value: 82 },
					{ name: "黑龙江", value: 666 },
					{ name: "上海", value: 24 },
					{ name: "江苏", value: 92 },
					{ name: "浙江", value: 114 },
					{ name: "安徽", value: 456 },
					{ name: "福建", value: 116 },
					{ name: "江西", value: 91 },
					{ name: "山东", value: 119 },
					{ name: "河南", value: 137 },
					{ name: "湖北", value: 116 },
					{ name: "湖南", value: 114 },
					{ name: "重庆", value: 91 },
					{ name: "四川", value: 125 },
					{ name: "贵州", value: 62 },
					{ name: "云南", value: 83 },
					{ name: "西藏", value: 9 },
					{ name: "陕西", value: 80 },
					{ name: "甘肃", value: 56 },
					{ name: "青海", value: 10 },
					{ name: "宁夏", value: 18 },
					{ name: "新疆", value: 180 },
					{ name: "广东", value: 123 },
					{ name: "广西", value: 59 },
					{ name: "海南", value: 1 },
					{ name: "台湾", value: 1 },
					];

				// var data = _this.convertData(this.data);

				let myChart = _this.myChart
				// 绘制图表配置
				data.sort(function (a, b) {
					return a.value - b.value;
				});
				console.log(data)
				const mapOption = {
						tooltip: {
							formatter: function (params) {
								console.log(params)
								return (
								params.seriesName + "<br />" + params.name + "：" + params.value
								);
							}, //数据格式化
							},
						visualMap: {
						left: 'right',
						min: 0,
						max: 100,
						inRange: {
							// prettier-ignore
							color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
						},
						text: ['High', 'Low'],
						calculable: true
						},
						series: [
							{
								id: 'population',
								type: 'map',
								roam: true,
								map: 'china',
								animationDurationUpdate: 1000,
								universalTransition: true,
								data: data
							}
						]
					};
				// const barOption = {
				// 	xAxis: {
				// 	type: 'value'
				// 	},
				// 	yAxis: {
				// 	type: 'category',
				// 	axisLabel: {
				// 		rotate: 30
				// 	},
				// 	tooltip: {
				// 		formatter: function (params) {
				// 			console.log(params)
				// 			return (
				// 			params.seriesName + "<br />" + params.name + "：" + params.value
				// 			);
				// 		}, //数据格式化
				// 		},
				// 	data: data.map(function (item) {
				// 		return item.name;
				// 	})
				// 	},
				// 	animationDurationUpdate: 1000,
				// 	series: {
				// 	type: 'bar',
				// 	id: 'population',
				// 	data: data.map(function (item) {
				// 		return item.value;
				// 	}),
				// 	universalTransition: true
				// 	}
				// };
				// let currentOption = mapOption;
				// myChart.setOption(mapOption);
				// setInterval(function () {
				// 	currentOption = currentOption === mapOption ? barOption : mapOption;
				// 	myChart.setOption(currentOption, true);
				// }, 2000);
				// myChart.setOption(option);
				// setTimeout(function() {
				// 	window.onresize = function() {
				// 		myChart.resize();
				// 	}
				// }, 200)
			},
			draw(){
				var  width=this.$refs.stdChart.clientWidth
      			var  height=this.$refs.stdChart.clientHeight
				var svg = d3.select("#studentsContain").append("svg")
						.attr("width", width)
						.attr("height", height);
				var g = svg.append("g")
				// //投影函数
				// var projection = d3.geoMercator()
				// .center([107, 31])/
				// .scale(height/2)
				// .translate([width/2, height/2]);
				const projection = d3.geoMercator().fitSize([width, height], chinaJson);
				//路径
				let path = d3.geoPath()
    					.projection(projection);
				// var path = d3.geoPath(projection);
				var color = d3.schemeCategory10;

				var data = chinaJson
					console.log(data)
					svg.selectAll("g")
						.data(data.features)
						.enter()
						.append("g")
						.append("path")
						.attr('d',path)//使用地理路径生成器
						.attr("stroke","#000")
						.attr("stroke-width",1)
						.attr("fill", function(d,i){
							console.log(d)
							return "white";
						})
						.on("mouseover",function(d,i){
							d3.select(this).attr('opacity', 0.5);
						})
						.on("mouseout",function(d,i){
							d3.select(this).attr('opacity', 1);
						});
				//添加坐标
				svg.selectAll("g")
					.append('text')
					.attr('font-size', 12)
					.attr('text-anchor', 'middle')
					.attr('x', d => {
						var position = projection(d.properties.centroid || [0, 0]);
						return position[0];
						})
					.attr('y', d => {
						var position = projection(d.properties.centroid || [0, 0]);
						return position[1];
					})
					.attr('dy', d => {
					//这里为什么这么写呢，因为澳门和香港重合了，挤到一起了。
					if (d.properties.name === '澳门') {
						return 15;
					}
					})
					.text(d => d.properties.name);
					

            
			}
		}
  }
  </script>
  <style>
  @import './index.css';
  </style>
  