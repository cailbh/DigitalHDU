<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="LivingRateContain" id="">
		<div class="ChartHead">占比</div> 
		<div class="ChartBody">
			<div class="LivingRateContain" id="LivingRateContain" ref="lvR"></div>
		</div>
	</div>
</template>
  
<script>
const chinaJson = require("@/assets/json/China.json");//获取中国地图的json数据
import * as d3 from "d3";
export default {
		data() {
			return {
				LivingRateData:{},
				LivingData:{},
				data:[],
				myChart:null,
				// mcolor:[
				// 	"#0000CC",
				// 	"#0033CC",
				// 	"#0066CC",
				// 	"#0099CC",
				// 	"#00CCCC",
				// 	"#00FFCC",
				// ]
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
					myChart = this.$echarts.init(this.$refs.lvR)
					this.myChart = myChart
			this.getData();
			this.draw();
		},
		methods: {
			getData() {
				const _this = this;
				// this.$http
				// 	.get("/api/test/getData", { params: { name: "12345" } }, {})
				// 	.then((response) => {
				// 	// 响应成功回调
				// 	console.log(response);
				// 	});
				var data = [
							{ value: 2600, name: '机械工程' },
							{ value: 1445, name: '管理' },
							{ value: 2515, name: '电子信息' },
							{ value: 2936, name: '计算机' },
							{ value: 1989, name: '自动化' },
							{ value: 1160, name: '通信工程' },
							{ value: 1260, name: '外国语' },
							{ value: 2160, name: '会计' },
							{ value: 1160, name: '经济' },
							{ value: 1160, name: '材环' },
							{ value: 2160, name: '网安' },
							{ value: 800, name: '人艺术法' },
						]
						var livingD = [{ value: 160, name: '1号楼',children: []  },
							{ value: 245, name: '2号楼',children: []  },
							{ value: 125, name: '3号楼' ,children: [] },
							{ value: 336, name: '4号楼' ,children: [] },
							{ value: 389, name: '5号楼' ,children: [] },
							{ value: 445, name: '6号楼' ,children: [] },
							{ value: 675, name: '7号楼',children: []  },
							{ value: 536, name: '8号楼' ,children:[]},
							{ value: 389, name: '9号楼',children: []  },
							{ value: 160, name: '10号楼',children: []  },
							{ value: 160, name: '11号楼',children: []  },
							{ value: 245, name: '12号楼',children: []  },
							{ value: 125, name: '13号楼' ,children: [] },
							{ value: 336, name: '14号楼' ,children: [] },
							{ value: 389, name: '15号楼' ,children: [] },
							{ value: 445, name: '16号楼' ,children: [] },
							{ value: 675, name: '17号楼',children: [] },
							{ value: 536, name: '18号楼' ,children: []},
							{ value: 389, name: '19号楼',children: [] },]
				var k=0;
				
				_this.LivingRateData = data
				_this.LivingData = livingD
				_this.dataLen = k
				}, 
			draw() {
				var _this = this
				var data=_this.LivingRateData
				var LivingData = _this.LivingData
				// var data = _this.convertData(this.data);
				let mcolor = _this.mcolor
				let myChart = _this.myChart
				// 绘制图表配置
				var normalize = d3.scaleLinear().domain([0, 3000]).range([0, 1]);
				let opData = {
						name: '学院占比',
						itemStyle: {
							color: '#737373'
						},
						label: {
							fontSize: 15,
							fontWeight: 'bold'
						},
						children:[]}

				var data = [
					{
						name: '学院占比',
						itemStyle: {
							color: '#737373'
						},
						label: {
							fontSize: 15,
							fontWeight: 'bold'
						},
						children: [{
							name: '中央直接拨款',
							itemStyle: {
								color: '#fd8d3c'
							},
							label: {
								fontSize: 17,
								fontWeight: 'bold'
							},
							children: [{
								name: '财政部拨款',
								value: 12,
								itemStyle: {
									color: '#fdae6b'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								}

							}, {
								name: '皇室內帑金',
								value: 12,
								itemStyle: {
									color: '#fdae6b'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								}

							}]
						}, {
							name: '国际援助',
							itemStyle: {
								color: '#ef6548'
							},
							label: {
								fontSize: 17,
								fontWeight: 'bold'
							},
							children: [{
								name: '各国在华机构',
								value: 8,
								itemStyle: {
									color: '#fc8d59'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '如:南满铁道株式会社',
									value: 8,
									itemStyle: {
										color: '#fdbb84'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}],
							}, {
								name: '国际友人捐款',
								value: 8,
								itemStyle: {
									color: '#fc8d59'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '如:英国医生杰克逊之母',
									value: 8,
									itemStyle: {
										color: '#fdbb84'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}]
							}, {
								name: '各国公益组织',
								value: 8,
								itemStyle: {
									color: '#fc8d59'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '如:美国红十字会',
									value: 8,
									itemStyle: {
										color: '#fdbb84'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}]
							}]

						}, {
							name: '中外银行借款',
							itemStyle: {
								color: '#41ab5d'
							},
							label: {
								fontSize: 17,
								fontWeight: 'bold'
							},
							children: [{
								name: '国内银行',
								value: 12,
								itemStyle: {
									color: '#78c679'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '大清银行',
									value: 6,
									itemStyle: {
										color: '#addd8e'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '交通银行',
									value: 6,
									itemStyle: {
										color: '#addd8e'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}]
							}, {
								name: '国外银行',
								value: 12,
								itemStyle: {
									color: '#78c679'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '四国银行',
									value: 3,
									itemStyle: {
										color: '#addd8e'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '道胜银行',
									value: 3,
									itemStyle: {
										color: '#addd8e'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '正金银行',
									value: 3,
									itemStyle: {
										color: '#addd8e'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '其他银行',
									value: 3,
									itemStyle: {
										color: '#addd8e'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}]
							}]
						}, {
							name: '民间防疫捐款',
							itemStyle: {
								color: '#807dba'
							},
							label: {
								fontSize: 17,
								fontWeight: 'bold'
							},
							children: [{
								name: '个人捐款',
								value: 12,
								itemStyle: {
									color: '#9e9ac8'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '平民百姓',
									value: 3,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '士绅巨贾',
									value: 3,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '皇室贵族',
									value: 3,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '政府官员',
									value: 3,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}],
							}, {
								name: '团体捐款',
								value: 12,
								itemStyle: {
									color: '#9e9ac8'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								},
								children: [{
									name: '商会捐款',
									value: 4,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '农会捐款',
									value: 4,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}, {
									name: '各行业集体捐款',
									value: 4,
									itemStyle: {
										color: '#bcbddc'
									},
									label: {
										fontSize: 15,
							fontWeight: 'bold'
									}
								}]
							}]

						}, {
							name: '关税项下拨款',
							itemStyle: {
								color: '#74a9cf'
							},
							label: {
								fontSize: 17,
								fontWeight: 'bold'
							},
							children: [{
								name: '海关关税',
								value: 12,
								itemStyle: {
									color: '#a6bddb'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								}
							}, {
								name: '内地商税',
								value: 12,
								itemStyle: {
									color: '#a6bddb'
								},
								label: {
									fontSize: 15,
									fontWeight: 'bold'
								}
							}]
						}]
					}];

				let option = {
						series: {
							type: 'sunburst',
							highlightPolicy: 'ancestor',
							data: data,
							center: ['70%', '50%'],
							radius: [0,'90%'],
							sort: null,
						// hoverAnimation: true,
							levels: [{}, {
								r0: '2%',
								r: '15%',
								itemStyle: {
									borderWidth: 3,
								},
								label: {
									rotate: 'tangential'
								}
							}, {
								r0: '18%',
								r: '35%',
								label: {
									//align: 'right',
									rotate: 'tangential'
								},
								itemStyle: {
									borderWidth: 2,
								},
							}, {
								r0: '38%',
								r: '68%',
								label: {
									//position: 'outside',

									padding: 3,
									silent: false
								},
								itemStyle: {
									borderWidth: 3
								}
							}, {
								r0: '71%',
								r: '74%',
								label: {
									position: 'outside',

									padding: 3,
									silent: false
								},
								itemStyle: {
									borderWidth: 3
								}
							}]
						}
					};
				
				// let currentOption = mapOption;
				myChart.setOption(option);
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
  