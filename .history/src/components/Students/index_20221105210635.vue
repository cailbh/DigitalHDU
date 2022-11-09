<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="studentsContain" id="">
		<div class="ChartHead">学生分布</div>
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
				data:[]
			}
		},
		mounted() {
			this.getdata();
			this.drawLine();
		},
		methods: {
			convertData(data) {
				console.log(data);
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
				console.log(res);
				return res;
			},
			drawLine() {
				var _this = this
				var data = this.data
				var geoCoordMap = this.geoCoordMap
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('studentsContain'))
				this.$echarts.registerMap("china", chinaJson);
				// 绘制图表配置
				const option = {
						  backgroundColor: {
						    type: "linear",
						    x: 0,
						    y: 0,
						    x2: 1,
						    y2: 1,
						    // colorStops: [
						    //   {
						    //     offset: 0,
						    //     color: "#0f378f", // 0% 处的颜色
						    //   },
						    //   {
						    //     offset: 1,
						    //     color: "#00091a", // 100% 处的颜色
						    //   },
						    // ],
						    globalCoord: false, // 缺省为 false
						  },

						tooltip: {
							//提示框
							trigger: "item",
							backgroundColor: "rgb(0,0,0,.6)",
							show: true,
							// formatter: `<ul style="display:flex; width:300px;height:150px;">
							//               <li style="width:50%;"><img style="width:130px;height:130px;" src="https://p0.meituan.net/business/3d776dc442d68d33f18fa64625d0ce1f949469.png" alt="图片加载失败"></li>
							//               <li style="width:50%;"> 12355</li>
							//             </ul>`,
							formatter: function(params) {
							console.log(params);
							if (typeof params.value[2] === "undefined") {
								return `<ul style="display:flex; width:300px;height:150px;">
										<li style="width:50%;"><img style="width:130px;height:130px;" src="https://p0.meituan.net/business/3d776dc442d68d33f18fa64625d0ce1f949469.png" alt="图片加载失败"></li>
										<li style="width:50%;">${params.name}  : ${params.value}</li>
										</ul>`;
							} else {
								return `<ul style="display:flex; width:300px;height:150px;">
										<li style="width:50%;"><img style="width:130px;height:130px;" src="https://p0.meituan.net/business/3d776dc442d68d33f18fa64625d0ce1f949469.png" alt="图片加载失败"></li>
										<li style="width:50%;">${params.name}  : ${params.value[2]}</li>
										</ul>`;
							}
							},
						},

						legend: {
							orient: "vertical",
							y: "bottom",
							x: "center",
							data: ["pm2.5"],
							textStyle: {
							color: "#fff",
							},
						},
						visualMap: {
							show: false,
							min: 0,
							max: 500,
							left: "left",
							top: "bottom",
							text: ["高", "低"], // 文本，默认为数值文本
							calculable: true,
							seriesIndex: [1],
							inRange: {},
						},
						geo: {
							map: "china",
							show: true,
							roam: true,
							// label: {
							//   normal: {
							//     show: false,
							//   },
							//   emphasis: {
							//     show: false,
							//   },
							// },
							itemStyle: {
							normal: {
								areaColor: "#3a7fd5",
								borderColor: "#0a53e9", // 线
								shadowColor: "#092f8f", // 外发光
								shadowBlur: 20,
							},
							emphasis: {
								// 也是选中样式
								borderWidth: 2,
								borderColor: "#fff",
								areaColor: "#cdb418", //悬浮区背景
								// label: {
								//   show: true,
								//   textStyle: {
								//     color: "#fff",
								//   },
								// },
							},
							},
						},
						series: [
							{
							symbolSize: 5,
							label: {
								normal: {
								formatter: "{b}",
								position: "center",
								show: true,
								},
								emphasis: {
								show: true,
								},
							},
							itemStyle: {
								normal: {
								color: "#fff",
								},
							},
							name: "light",
							type: "scatter",
							coordinateSystem: "geo",
							data: _this.convertData(data),
							},
							{
							type: "map",
							map: "china",
							geoIndex: 0,
							aspectScale: 0.75, // 长宽比
							showLegendSymbol: false, // 存在legend时显示
							label: {
								normal: {
								show: false,
								},
								emphasis: {
								show: false,
								textStyle: {
									color: "#fff",
								},
								},
							},
							roam: true,
							itemStyle: {
								normal: {
								areaColor: "#031525",
								borderColor: "#FFFFFF",
								},
								emphasis: {
								areaColor: "#2B91B7",
								},
							},
							animation: false,
							data: data,
							},
							{
							name: "Top 5",
							type: "scatter",
							coordinateSystem: "geo",
							// symbol: "pin",
							// symbol:"image://http://110.40.201.242:8088/img/ic4.b10d6906.png",// 自定图标点图标
							//base64方式
							symbol:
								"image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGlQTFRFAC1HIEA+n4obz6YN/8MAj4EfYGUs77kEoIsakIIf37AJPzAAr4YAn3kAb1UAQDEAAAAAIBkAMCUAf2EAHxgAv5IA36oAz54AgGIAYEkADwwALyQA77YAEAwAX0kAj20A4LAJ0KcN8LoESf7p1AAAAPhJREFUeJzNk8FygzAMRO3iEhJjEBFgAm6S9v8/sitDgcyk7qWd6R5kzD5JNoyUUvolM0+VvWoF5YfntuiQIz/hg9CqSPnGHNUpDWQq7RvzfwBbzotDqOpVbgFcTY3sz1hAWV7U8gJ0srMUXwLgWI37+UkAL+kNSawE4AGiS78C/VbBCWDt2Fqa/AZIRk0S3dyC2FC3a2GhliTGFsbD3QPdVmGIAI/mAXBInYhGKSFAeONHACrP05WGEL8Wew44+O6aJe5oAwpTfQFQD4ua29qCveQGV6FFZb90Db/4N/8WuKf9958HRyf9D4xvnvJzGW9dfHOOe4H8TwI2HczD/MFKAAAAAElFTkSuQmCC",
							symbolSize: [30, 30],
							label: {
								normal: {
								show: true,
								textStyle: {
									color: "#fff",
									fontSize: 9,
								},
								// formatter(value) {
								//   return value.data.value[2];
								// },
								formatter() {
									return "";
								},
								},
							},
							itemStyle: {
								normal: {
								// color: "red", // 标志颜色
								},
							},
							data: _this.convertData(data),
							showEffectOn: "render",
							rippleEffect: {
								brushType: "stroke",
							},
							hoverAnimation: true,
							zlevel: 1,
							},
						],
						};

				myChart.setOption(option);

				this.setinter = setInterval(() => {
				if (this.showTooltip == 10) {
					this.showTooltip = 0;
				} else {
					this.showTooltip = ++this.showTooltip;
				}
				myChart.dispatchAction({
					//默认打开提示框
					type: "showTip",
					seriesIndex: 0, // 显示第几个series
					dataIndex: this.showTooltip + 1, // 显示第几个数据
				});

				// mychinachart.dispatchAction({
				//   //默认选中板块
				//   type: "highlight",
				//   seriesIndex: 1, // 显示第几个series
				//   dataIndex: this.showTooltip + 1,
				// }); // dataIndex：默认选中项索引值

				// mychinachart.dispatchAction({
				//   //取消选中板块
				//   type: "downplay",
				//   seriesIndex: 1,
				//   dataIndex: this.showTooltip,
				// });
				}, 5000);
				// 窗口大小自适应方案
				myChart.setOption(option);
				setTimeout(function() {
					window.onresize = function() {
						myChart.resize();
					}
				}, 200)
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

			}
		}
  }
  </script>
  <style>
  @import './index.css';
  </style>
  