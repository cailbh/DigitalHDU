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
					let myChart = this.myChart
					console.log("12123123",myChart)
					if (myChart != null && myChart != "" && myChart != undefined) {
						console.log("111111")
						myChart.dispose();//销毁
					}
					myChart = this.$echarts.init(this.$refs.stdChart)
					this.myChart = myChart
			},
			draw() {
				var _this = this
				var data= [
					{ name: "北京市", value: 300 },
					{ name: "天津市", value: 142 },
					{ name: "河北省", value: 2102 },
					{ name: "山西省", value: 281 },
					{ name: "内蒙古自治区", value: 447 },
					{ name: "辽宁省", value: 267 },
					{ name: "吉林省", value: 382 },
					{ name: "黑龙江省", value: 666 },
					{ name: "上海市", value: 1124 },
					{ name: "江苏省", value: 2000 },
					{ name: "浙江省", value: 3000 },
					{ name: "安徽省", value: 1231 },
					{ name: "福建省", value: 416 },
					{ name: "江西省", value: 291 },
					{ name: "山东省", value: 319 },
					{ name: "河南省", value: 237 },
					{ name: "湖北省", value: 216 },
					{ name: "湖南省", value: 714 },
					{ name: "重庆市", value: 491 },
					{ name: "四川省", value: 825 },
					{ name: "贵州省", value: 622 },
					{ name: "云南省", value: 283 },
					{ name: "西藏自治区", value: 239 },
					{ name: "陕西省", value: 180 },
					{ name: "甘肃省", value: 546 },
					{ name: "青海省", value: 120 },
					{ name: "宁夏回族自治区", value: 118 },
					{ name: "新疆维吾尔自治区", value: 280 },
					{ name: "广东省", value: 423 },
					{ name: "广西壮族自治区", value: 159 },
					{ name: "海南省", value: 123 },
					{ name: "台湾省", value: 11 },
					];

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
							zoom: 1.23, // 当前视角的缩放比例
							scaleLimit: { // 滚轮缩放的极限控制，默认的缩放为1
								min: 0.5,  // 最小的缩放值
								max: 10,  // 最大的缩放值
							},// 地图区域的多边形 图形样式。
							itemStyle: {
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
  