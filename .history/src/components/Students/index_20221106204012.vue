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
      			var  height=100
      var svg = d3.select("#studentsContain").append("svg")
            .attr("width", width)
            .attr("height", height);
      var covid=[591,113,2,0,1,5,238,0,2330,7,392,0,102,2,8,150,0,7,103,15,0,5,212,1,12,0,2,0,16,0,0,260761,0,0,1371462]
      var linear = d3.scaleLinear()
            .domain([990,90000])
            .range([0,255]);
 
      var color=['#fff7ec','#fee8c8','#fdd49e','#fdbb84',
                    '#fc8d59','#ef6548','#d7301f','#b30000','rgb(153, 0, 0)'];
      
      //定义地图的投影
      var projection = d3.geoMercator()
                   .center([100, 38])
                   .scale(920)
                   .translate([width/2, height/2]);
    
      //定义地形路径生成器
      var geoPath = d3.geoPath()
             .projection(projection); //设定投影
                         
      console.log(geoPath); 
      //颜色比例尺
     
 
                  //100000_full.json  A2_100000_full.json
        var data = chinaJson                  
        console.log(data);
		var scaleColor = d3.scaleOrdinal()
				.domain(d3.range(data.features.length))
				.range(d3.schemeCategory10);
 
        var groups = svg.append("g");
        // var tooltip=d3.select("body")
        //               .append("div")
        //               .attr("class","tooltip")
        //               .style("background-color","#d3d3d3")
        //               .style("border-radius", "3px")
        //               .style("padding","5px");
        groups.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("class","province")
            .attr("stroke","#333")
            .attr("stroke-width","0.2px")
            .attr("info",(d,i)=>covid[i])
            .attr("fill",function(d,i){
              if(covid[i]<1)
                return color[0];
              else if(covid[i]<5)
                return color[1];
              else if(covid[i]<20)
                return color[2];
              else if(covid[i]<100)
                return color[3];
              else if(covid[i]<200)
                return color[4];
              else if(covid[i]<500)
                return color[5];
              else if(covid[i]<1000)
                return color[6];
              else if(covid[i]<2000)
                return color[7];
              else
                return color[8];
 
            })
 
            .attr("d",(d,i)=>geoPath(d))  //使用路径生成器
            .on("mouseover",function(d,i){
              console.log(i);
              const change=d3.select(this)
                .attr("stroke-width","1.5px")
              var t=change.attr("info")
              tooltip.html("现有确诊量："+t)
                     .style("visibility","visible")
                     .style("left", (event.pageX + 10) + "px")
                     .style("top", (event.pageY -10) + "px")
 
            })
            .on("mouseout",function(d,i){
              console.log(i);
              d3.select(this)
                .attr("stroke-width","0.2px")
              tooltip.style('visibility', 'hidden')
            });
                
          
          var texts = svg.selectAll(".texts")                             
                .data(data.features)                
                .enter()
                .append("text")
                .attr("class", "texts") 
                .text((d,i)=>d.properties.name)
                .attr("text-anchor","middle")
                .attr("transform", function(d) {
                  var centroid = geoPath.centroid(d),
                    x = centroid[0],
                    y = centroid[1];
                    if((d.properties.name=="澳门")||(d.properties.name=="安徽省")
                      ||(d.properties.name=="河北省"))
                      y=y+15;
                    if((d.properties.name=="香港"))
                      y=y+10;
                  //return "translate(" + x + ", " + y + ")";
                                    return `translate(${x},${y})`;
                })
                .attr('fill','999')
                .attr("font-size","8px");  
            
          var title=svg.append("text")
                .text("新冠疫情大数据报告")
                .attr("x",width/2-100)
                .attr("y",40)
                .attr("font-size","30")
                .attr("fill","#555")
          var title=svg.append("text")
                .text("5月22日，2022年")
                .attr("x",width/2-60)
                .attr("y",70)
                .attr("font-size","20")
                .attr("fill","#555")
			}
		}
  }
  </script>
  <style>
  @import './index.css';
  </style>
  