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
import { object } from "webidl-conversions";
export default {
		data() {
			return {
				geoCoordMap:{},
				data:[],
				myChart:null
			}
		},
		mounted() {
			
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

			},
			draw() {
				var _this = this
				var data = this.data
				console.log(data,_this.convertData(data))
				var geoCoordMap = this.geoCoordMap
				let myChart = _this.myChart
					console.log("12123123",myChart)
				if (myChart != null && myChart != "" && myChart != undefined) {
					console.log("111111")
        			myChart.dispose();//销毁
    			}
				// 基于准备好的dom，初始化echarts实例
				myChart = this.$echarts.init(document.getElementById('studentsContain'))
				_this.myChart = myChart
				this.$echarts.registerMap("china", chinaJson);
				// 绘制图表配置
				const option = {
						// tooltip: {
						// 	formatter: function (params) {
						// 		console.log(params)
						// 		return (
						// 			params.seriesName + "<br />" + params.name + "：" + params.value
						// 			);
						// 		}, //数据格式化
						// 	},
						visualMap: {
							min: 0,
							max: 100,
							range: [0, 100], // 指定手柄对应数值的位置。range 应在 min max 范围内。
							// calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
							// realtime: true, // 拖拽时，是否实时更新。如果为true则拖拽手柄过程中实时更新图表视图。如果为false则拖拽结束时，才更新视图。
							// inverse: false, // 当inverse为false时，数据大小的位置规则，和直角坐标系相同，即：当 visualMap.orient 为'vertical'时，数据上大下小。当 visualMap.orient 为'horizontal'时，数据右大左小。当inverse为true时，相反。
							// precision: 0, // 数据展示的小数精度，默认为0，无小数点。
							splitNumber: 5,
							left: 26,
    						bottom: 10,
							inRange: {
								color: ['#d94e5d','#eac736','#50a3ba'].reverse()
							},
							textStyle: {
								color: '#fff'
							}
						},
						label: { 
							show: true, // 是否显示标签。
							fontSize: '11',
							color: 'rgba(0,0,0,0.7)',
						},
						geo: {
							map: "china",
							show: true,
							roam: true,
							zoom: 1.23, // 当前视角的缩放比例
							scaleLimit: { // 滚轮缩放的极限控制，默认的缩放为1
								min: 1,  // 最小的缩放值
								max: 10,  // 最大的缩放值
							},
							// itemStyle: {
							// 	normal: {
							// 		// areaColor: "#3a7fd5",
							// 		borderColor: "#0a53e9", // 线
							// 		shadowColor: "#092f8f", // 外发光
							// 		shadowBlur: 20,
							// 	},
							// 	emphasis: {
							// 		// 也是选中样式
							// 		borderWidth: 2,
							// 		areaColor: "#092f8f", //悬浮区背景
							// 		color: '#67c23a', // 高亮区域的颜色。areaColor和color都设置，高亮区域渲染areaColor的值
							// 		borderColor: 'rgba(0, 0, 0, 0.8)', // 图形的描边颜色。
							// 		borderWidth: 3, // 描边线宽。为 0 时无描边。
							// 		borderType: 'dotted', // 描边类型。
							// 	},
							// },
						},
						series: [
							{
								name: '人数',
								type: 'heatmap',
								geoIndex: 0,
								coordinateSystem: 'geo',
								data: _this.convertData(data)
							}
						]
						};
				console.log(option.series[0])
				myChart.setOption(option);
				// setTimeout(function() {
				// 	window.onresize = function() {
				// 		myChart.resize();
				// 	}
				// }, 200)
			},
		}
  }
  </script>
  <style>
  @import './index.css';
  </style>
  