<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="teachersContain" id="">
		<div class="ChartHead">师资概况</div>
		<div class="ChartBody">
			<div class="teachersContain" id="teachersContain" ref="teaChart"></div>
		</div>
	</div>
</template>
  
<script>
import * as d3 from "d3";
import { object } from "webidl-conversions";
export default {
		data() {
			return {
				TeachersData:{},
				height:0,
				width:0,
				totalNum:0,
				dataLen:0,
				curAttrIndex:-1,
				mcolor:[
					"rgb(190, 255, 250)",
					"rgb(91, 255, 252)",
					"rgb(58, 203, 183)",
					"rgb(105, 243, 138)",
					"rgb(29, 135, 121)",
					"rgb(101, 153, 99)",
				]
			}
		},
		mounted() {
			  
			this.height = this.$refs.teaChart.clientHeight
			this.width = this.$refs.teaChart.clientWidth
			this.initSvg()
			this.getData();
			this.draw();
		},
		methods: {
			initSvg(){
				let _this = this
				let svgWidth = _this.width
				let svgHeight = _this.height
				var svg =  d3.select('#teachersContain')
					.append("svg")
					.attr("id", "teachersSVG")
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
					"硕士":200,
					"博士":1300,
					"副教授":700,
					"教授":300,
					"其他":100,
				}
				var k=0;
				for(let i in data){
					_this.totalNum += data[i]
					k++
				}
				_this.TeachersData = data
				_this.dataLen = k
				}, 
				
			draw() {
				let _this = this
				let svgWidth = _this.width
				let svgHeight = _this.height
				let mcolor = _this.mcolor
				var svg =  d3.select('#teachersSVG')
				svg.select('#teachersG').remove()
				var g = svg.append("g")
					.attr("id", "teachersG")
					.attr("width", svgWidth)
					.attr("height", svgHeight)
				let circleCenterX = svgWidth/4
				let circleCenterY = svgHeight/2

				let rSize = (circleCenterX>circleCenterY)?(circleCenterY/3):(circleCenterX/3)
				var circle = g.append("circle")
					.attr("id", "cir_totalTeachersNum")
					// .attr("class", )
					.attr("cx", circleCenterX)
					.attr("cy", circleCenterY)
					.attr("r", rSize)
					// .attr("fill", "url(#pic" + i + ")")
					.attr("fill","rgb(42, 185, 173)")
					.attr("opacity","0.9")
					.attr("stroke-width", "0")
					.on("mouseover", (d) => {
						d3.select("#cir_totalTeachersNum").attr("r",rSize+10)
					})
					.on("mouseout", (d) => {
						d3.select("#cir_totalTeachersNum").attr("r",rSize)
					})
					var dataset = { startAngle: 0, endAngle: Math.PI*2}; //创建一个弧生成器
					var arcPath = d3.arc()
						.innerRadius(rSize+35)
						.outerRadius(rSize+40);
					var x = circleCenterX
					var y = circleCenterY 
					var attr = g.append("path")
						.attr("d",arcPath(dataset))	
						.attr("transform","translate("+circleCenterX+","+circleCenterY+")")
						.attr("stroke","rgba(255,255,255,0.5)")
						.attr("id","attr ")
						.attr("stroke-linejoin","round")
						.attr("stroke-width",function(){
							if(_this.curAttrIndex==k)return"15.5px";
							return "0.5px";
						})
						.attr("fill","red")

					// var text = svg.append("text")
				var textTotal = g.append("text")
					.attr("id", "text_totalTeachersNum")
					// .attr("class", )
					.attr("x", circleCenterX)
					.attr("y", circleCenterY)
					.text("总和："+_this.totalNum)
					.attr("fill","rgb(255,255,255)")
					.attr("opacity","0.9")
					.attr("transform",function(d){
							let bbox = this.getBBox()
						return "translate("+(-bbox.width/2)+","+(bbox.height/4)+")"
					})

				var smallR = 10
				var k = 0
				var startR = -Math.PI / 2
				var data = _this.TeachersData
				var len = _this.totalNum
				var stepR = Math.PI *2 / len
				var stepRow = svgHeight / (_this.dataLen+1)

				console.log(data)
				for(let i in data) {
					console.log(i)
					var t = startR + data[i] * stepR
					var dataset = { startAngle: startR, endAngle: t}; //创建一个弧生成器
					startR = t
					var arcPath = d3.arc()
						.innerRadius(rSize+15)
						.outerRadius(rSize+35);
					var x = circleCenterX + (rSize + smallR) * Math.cos(t)
					var y = circleCenterY + (rSize + smallR) * Math.sin(t)
					var attr = g.append("path")
						.attr("d",arcPath(dataset))	
						.attr("transform","translate("+circleCenterX+","+circleCenterY+")")
						.attr("stroke","rgba(255,255,255,0.5)")
						.attr("id","attr "+k)
						.attr("stroke-linejoin","round")
						.attr("stroke-width",function(){
							if(_this.curAttrIndex==k)return"15.5px";
							return "0.5px";
						})
						.attr("fill",mcolor[k])
						.on("click", (d) => {
							let str = (""+d.target.id).split(' ')
							_this.curAttrIndex = str[1]
							d3.select(this).attr("stroke-width","5.5px")
						})
						.on("mouseover", function (d) {
							d3.select(this).attr("stroke-width","5.5px")
						})
						.on("mouseout", function (d) {
							_this.curAttrIndex = -1
							d3.select(this).attr("stroke-width","0.5px")
						})
					var legends = g.append("rect")
						.attr("id","leg_"+k)
						.attr("x",svgWidth/2)
						.attr("y",stepRow *(k+1))
						.attr("width",20)
						.attr("height",10)
						.attr("fill",mcolor[k])
					var legendsText = g.append("text")
						.attr("id","legT_"+k)
						.attr("x",svgWidth/2 + 50)
						.attr("y",stepRow *(k+1))
						.attr("font-size",15)
						.attr("fill","#fff")
						.style("text-shadow","2px 2px 3px black")
						.text(i)
						.attr("transform",function(d){
							let bbox = this.getBBox()
						return "translate("+(0)+","+(bbox.height/2-3)+")"
					})	
					var legendsText2 = g.append("text")
						.attr("id","legT_"+k)
						.attr("x",svgWidth/2 + 120)
						.attr("y",stepRow *(k+1))
						.attr("font-size",15)
						.style("text-shadow","2px 2px 3px black")
						.attr("fill",mcolor[k])
						.text(data[i]+"人")
						.attr("transform",function(d){
							let bbox = this.getBBox()
						return "translate("+(0)+","+(bbox.height/2-3)+")"
					})	
					k = k + 1
                }
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  