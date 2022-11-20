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
				studentData:[],
				myChart:null,
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
					if (myChart != null && myChart != "" && myChart != undefined) {
						myChart.dispose();//销毁
					}
					myChart = this.$echarts.init(this.$refs.stdChart)
					this.myChart = myChart
			this.$echarts.registerMap("china", chinaJson);
			this.getdata();
			this.draw();
		},
		watch: {
			studentData(val){//接收数据后绘制
				// this.draw();
			}
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
					const _this = this;
					this.$http
					.get('/api/students/getData', { params: {} }, {})
					.then((response) => {
						var data = {}
						var body = response.body
						console.log(response,body)
						_this.studentData = body
						this.draw();
					})
					.catch(function (error) {
					console.log(error);
					});
				
					
			},
			draw() {
				var _this = this
				var data= _this.studentData

				// var data = _this.convertData(this.data);

				let myChart = _this.myChart
				// 绘制图表配置
				data.sort(function (a, b) {
					return a.value - b.value;
				});
				console.log(data)
				const mapOption = {
						visualMap: {
						left: 'left',
						min: 0,
						max: 3000,
						itemWidth:10,
						itemHeight:80,
						inRange: {
							// prettier-ignore
						color: _this.mcolor						},
						// text: ['High', 'Low'],
						calculable: true,
						textStyle: {
           					color: '#ffffff'
        					},
						},
						geo: {
							backgroundColor:'#232e67',
							map: 'china',
							roam: true,
							zoom: 1.6, // 当前视角的缩放比例
							left: '25%',
							top:'25%',
							scaleLimit: { // 滚轮缩放的极限控制，默认的缩放为1
								min: 0.5,  // 最小的缩放值
								max: 5,  // 最大的缩放值
							},// 地图区域的多边形 图形样式。
							normal: {
								
								},
							itemStyle: {
								borderColor: "rgba(147, 235, 248, 1)",
								borderWidth: 1,
								areaColor: {
									type: "radial",
									x: 0.5,
									y: 0.5,
									r: 0.8,
									colorStops: [
									{
										offset: 0,
										color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
									},
									{
										offset: 1,
										color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
									},
									],
									globalCoord: false, // 缺省为 false
								},
								shadowColor: "rgba(128, 217, 248, 1)",
								shadowOffsetX: -1,
								shadowOffsetY: 1,
								shadowBlur: 3,
								borderColor: 'rgba(255, 255, 255, 0.5)', // 图形的描边颜色。
								borderWidth: 1, // 描边线宽。为 0 时无描边。
								borderType: 'solid', // 描边类型。
							},
							// 高亮状态下的多边形和标签样式。
							emphasis: {
								focus: 'none', //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。'none' 不淡出其它图形，默认使用该配置。'self' 聚焦当前高亮图形，淡出其它图形。
								// 高亮状态下文本标签
								label: { 
									color: '#ffffff',
								},
								// 高亮状态下图形样式
								itemStyle: {
									areaColor: '#409eff', // 高亮区域的颜色。
									// color: '#67c23a', // 高亮区域的颜色。areaColor和color都设置，高亮区域渲染areaColor的值
									borderColor: 'rgba(255, 255, 255, 0.8)', // 图形的描边颜色。
									borderWidth: 3, // 描边线宽。为 0 时无描边。
									borderType: 'dotted', // 描边类型。
								},
							},
						},
						series: [
							{
								id: 'population',
								type: 'map',
								roam: true,
								geoIndex: 0,
								animationDurationUpdate: 1000,
								universalTransition: true,
								data: data
							}
						]
					};
				const barOption = {
					xAxis: {
					type: 'value'
					},
					yAxis: {
					type: 'category',
					axisLabel: {
						rotate: 30
					},
					data: data.map(function (item) {
						return item.name;
					}).slice(0,10),
					},
					animationDurationUpdate: 1000,
					series: {
					type: 'bar',
					id: 'population',
					data: data.map(function (item) {
						return item.value;
					}).slice(0,10),
					universalTransition: true
					}
				};
				let currentOption = mapOption;
				myChart.setOption(mapOption);
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
  