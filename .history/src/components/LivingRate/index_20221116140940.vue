<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="LivingRateContain" id="">
		<div class="ChartHead">学生住宿分布</div> 
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
				mcolor:[
					"#0000CC",
					"#0033CC",
					"#0066CC",
					"#0099CC",
					"#00CCCC",
					"#00FFCC",
				],
				// mcolor:[
				// 	"#ADC8FF",
				// 	"#84A9FF",
				// 	"#6690FF",
				// 	"#254EDB",
				// 	"#1939B7",
				// 	"#091A7A",
				// ]
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
							{name: '机械工程' },
							{name: '管理' },
							{name: '电子信息' },
							{name: '计算机' },
							{name: '自动化' },
							{name: '通信工程' },
							{name: '外国语' },
							{name: '会计' },
							{name: '经济' },
							{name: '材环' },
							{name: '网安' },
							{name: '人艺术法' },
						]
				var livingD = [{name: '1号楼',children: []  },
								{name: '2号楼',children: []  },
								{name: '3号楼' ,children: [] },
								{name: '4号楼' ,children: [] },
								{name: '5号楼' ,children: [] },
								{name: '6号楼' ,children: [] },
								{name: '7号楼',children: []  },
								// {name: '8号楼' ,children:[]},
								// {name: '9号楼',children: []  },
								// {name: '10号楼',children: []  },
								// {name: '11号楼',children: []  },
								// {name: '12号楼',children: []  },
								// {name: '13号楼' ,children: [] },
								// {ame: '14号楼' ,children: [] },
								// {name: '15号楼' ,children: [] },
								// {name: '16号楼' ,children: [] },
								// {name: '17号楼',children: [] },
								// {name: '18号楼' ,children: []},
								// {name: '19号楼',children: [] },
							]
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
				// var normalize = d3.scaleLinear().domain([300, 0]).range([0, 1]);
				
				var normalize = d3.scaleLinear().domain([1000, 0]).range([1, 0]);
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
				for(let i in LivingData){
					
					LivingData[i]['itemStyle'] =  {
							shadowBlur: 2,
							shadowColor: mcolor[5],
						}
					let len  = Math.ceil(Math.random()*5+1);
					let sum = 0;
					for(let j=0;j<len;j++){
						let val = Math.ceil(Math.random()*300+1)
						let jd = {}
						let idx =  Math.ceil(Math.random()*11)
						if(jd[idx] !=1 ){
							sum+=val;
							data[idx]['value'] = val;
							let col = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(val));
							data[idx]['itemStyle']={
							color: col}
							LivingData[i]['children'].push(data[idx]);
							jd[idx] = 1;
						}
					}
					LivingData[i]['value'] = sum;
					let color = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(sum));
					LivingData[i]['itemStyle']['color'] = color;
				}

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
				opData.children=(LivingData)
				console.log(data,opData)
				let option = {
					
						series: [{
							type: 'sunburst',
							highlightPolicy: 'ancestor',
							data: [opData],
							center: ['50%', '50%'],
							radius: [0,'90%'],
							sort: null,
							
							roseType: 'area',
						// hoverAnimation: true,
							levels: [{}, {
								r0: '0%',
								r: '1%',
								itemStyle: {
									borderWidth: 3,
									shadowBlur: 2,
									shadowColor: mcolor[2],
									color: 'transparent'
								},
								label: {
									show:false,
									position: 'outside',
									rotate: 'tangential'
								}
							}, {
								r0: '1%',
								r: '40%',
								label: {
									show: false,
									align: 'center',
									// position: 'outside',
									// rotate: 'tangential',
									padding: 0,
									color: '#fff',
									fontSize: 12
								},
								itemStyle: {
									borderWidth: 0,
								},
							}, {
								r0: '40%',
								r: '80%',
								label: {
									position: 'outside',
									show:false,
									padding: 3,
									silent: false
								},
								itemStyle: {
									borderWidth: 0,
									borderRadius: 4,
									shadowBlur: 5,
									shadowColor: mcolor[5],
									// color: 'transparent',
									shadowOffsetX: -1,
									shadowOffsetY: 1,
								}
							}]
						},
						// {
						// name: 'Chart',
						// type: 'pie',
						// label: {
						// 	show: false,
						// 	// alignTo:'edge',
						// 	fontSize: 10,
 						// 	// margin:50,
						// 	formatter: '{b}:\n{d}%',
						// 	//饼图里面标签设置占比的格式
						// 	position: 'outside',
						// 	// padding:[0,50,0,0], //调整左右位置
						// 	color: 'white'
						// },
						// radius: [15, 55],
						// center: ['50%', '50%'],
						// roseType: 'area',
						// itemStyle: {
						// 	borderRadius: 4,
						// 	color:(param)=>{  
						// 		let num = param.value; 

						// 		let cor1 = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(num-50))
						// 		let cor2 = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(num))
						// 		let cor3 = d3.interpolateRgb(mcolor[5], mcolor[0])(normalize(num+50))
						// 		return  new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
						// 		{ offset: 0, color: cor3 },
						// 		{ offset: 0.5, color: cor2 },
						// 		{ offset: 1, color:	cor1 }
						// 	])
						// 	// ])
						// 		},
						// },
						
						// //颜色设置
						// data: LivingData
						// }
					]
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
  