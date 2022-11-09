<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="profileContain" id="">
		<div class="ProfileHead">校园概况</div>
		<div class="ChartBody" id="profileContainBody">
			<div class="profileContain" id="profileContain" ref="proChart">
				<div id="profileImg"></div>
			</div>
		</div>
		<div class="borderPro profileBorderLeft"></div>
		<div class="borderPro profileBorderRight"></div>
	</div>
</template>
  
<script>
import * as d3 from "d3";
import { object } from "webidl-conversions";
export default {
		data() {
			return {
				EmergencyData:{},
				height:0,
				width:0,
				totalNum:0,
				maxData:0,
				dataLen:0,
				curAttrIndex:-1,
				mcolor:[
					"rgb(254, 174, 50)",
					"rgb(63, 203, 210)",
					"rgb(64, 112, 177)",
					"rgb(222, 221, 156)",
					"rgb(148, 40, 21)",
					"rgb(101, 153, 99)",
				]
			}
		},
		mounted() {
			  
			// this.height = this.$refs.proChart.clientHeight
			// this.width = this.$refs.proChart.clientWidth
			// this.initSvg()
			// this.getData();
			// this.draw();
		},
		methods: {
			initSvg(){
				let _this = this
				let svgWidth = _this.width
				let svgHeight = _this.height
				var svg =  d3.select('#profileContain')
					.append("svg")
					.attr("id", "profileSVG")
					.attr("width", svgWidth)
					.attr("height", svgHeight)
			},
			getData() {
				const _this = this;
				// this.$http
				// 	.get("/api/test/getData", { params: { name: "12345" } }, {})
				// 	.then((response) => {
				// 	// 响应成功回调
				// 	console.log(response);
				// 	});
				var data = {
					"5月":200,
					"6月":1300,
					"7月":700,
					"8月":300,
					"9月":100,
					"10月":300,
				}
				var k=0;
				for(let i in data){
					_this.totalNum += data[i]
					if(data[i]>_this.maxData)
						_this.maxData = data[i]
					k++
				}
				_this.EmergencyData = data
				_this.dataLen = k
				}, 
				
			draw() {
				let _this = this
				let svgWidth = _this.width
				let svgHeight = _this.height
				let mcolor = _this.mcolor
				var svg =  d3.select('#profileSVG')
				svg.select('#profileG').remove()
				var g = svg.append("g")
					.attr("id", "profileG")
					.attr("width", svgWidth)
					.attr("height", svgHeight)
				let circleCenterX = svgWidth/4
				let circleCenterY = svgHeight/2

				let rSize = (circleCenterX>circleCenterY)?(circleCenterY/2):(circleCenterX/2)
				var Xaxis = g.append("rect")
					.attr("id", "Xais")
					.attr("x",60)
					.attr("y",svgHeight-40)
					.attr("width",svgWidth-80)
					.attr("height",1)
					.attr("fill","rgb(255,255,255)")
					.attr("opacity","0.9")
					.attr("stroke-width", "0")
					.on("mouseover", (d) => {
						d3.select("#cir_totalEmergencyNum").attr("r",rSize+10)
					})
					.on("mouseout", (d) => {
						d3.select("#cir_totalEmergencyNum").attr("r",rSize)
					})
				var Yaxis = g.append("rect")
					.attr("id", "Yais")
					.attr("x",60)
					.attr("y",20)
					.attr("width",1)
					.attr("height",svgHeight-60)
					.attr("fill","rgb(255,255,255)")
					.attr("opacity","0.9")
					.attr("stroke-width", "0")
					.on("mouseover", (d) => {
						d3.select("#cir_totalEmergencyNum").attr("r",rSize+10)
					})
					.on("mouseout", (d) => {
						d3.select("#cir_totalEmergencyNum").attr("r",rSize)
					})


				

				var smallR = 10
				var k = 0
				var startR = -Math.PI / 2
				var data = _this.EmergencyData
				var len = _this.totalNum
				var yNum = 6
				var stepY = _this.maxData*2/yNum
				var stepRow = (svgWidth-80) / (_this.dataLen+1)
				const scale=d3.scaleLinear().range([0,svgHeight-80]).domain([0,_this.maxData]);

				console.log(data)
				for(let i in data) {
					console.log(i)
					g.append("rect")
					.attr("width",stepRow/2)
					.attr("height",scale(data[i]))
					.attr("x",80+ stepRow *(k))
					.attr("y",svgHeight-40-scale(data[i]))
					.attr("fill","rgb(53, 190, 203)")
					
					var legendsText = g.append("text")
						.attr("id","legT_"+k)
						.attr("x",80+ stepRow *(k))
						.attr("y",svgHeight - 30)
						.attr("fill","white	")
						.text(i)
						.attr("transform",function(d){
							let bbox = this.getBBox()
						return "translate("+(0)+","+(bbox.height/2)+")"
					})	
					k = k + 1
                }
				for(let j=0;j<yNum;j++){
					var legenText = g.append("text")
						.attr("id","legT_"+k)
						.attr("x",50)
						.attr("y",svgHeight-40-scale(j*stepY))
						.attr("fill","white")
						.text(""+Math.round(j*stepY))
						.attr("transform",function(d){
							let bbox = this.getBBox()
						return "translate("+(-bbox.width)+","+(bbox.height/2)+")"
					})	
				}
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  