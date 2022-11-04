<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="teachersContain" id="">
		<div class="ChartHead">师资能力</div>
		<div class="ChartBody">
			<div class="teachersContain" id="teachersContain" ref="teaChart"></div>
		</div>
	</div>
</template>
  
<script>
import * as d3 from "d3";
export default {
		data() {
			return {
				TeachersData:{},
				height:0,
				width:0,
				totalNum:0,
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
				
				for(let i in data){
					_this.totalNum += data[i]
				}
				_this.TeachersData = data
				}, 
				
			draw() {
				let _this = this
				let svgWidth = _this.width
				let svgHeight = _this.height
				var svg =  d3.select('#teachersSVG')
				svg.select('#teachersG').remove()
				var g = svg.append("g")
					.attr("id", "teachersG")
					.attr("width", svgWidth)
					.attr("height", svgHeight)
				let circleCenterX = svgWidth/4
				let circleCenterY = svgHeight/2

				let rSize = (circleCenterX>circleCenterY)?(circleCenterY/2):(circleCenterX/2)
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

					var text = svg.append("text")
                        //     .attr("id", "text_" + element.id)
                        //     .attr("class", "text_" + element.id)
                        //     .attr("x", element.x)
                        //     .attr("y",  element.y)
                        //     .text(element.name)
                        //     .attr("transform",function(d){
                        //          let bbox = this.getBBox()
                        //         return "translate("+(-bbox.width/2)+","+(0)+")"
                        //     })
				var textTotal = g.append("text")
					.attr("id", "text_totalTeachersNum")
					// .attr("class", )
					.attr("x", circleCenterX)
					.attr("y", circleCenterY)
					.text("总和："+_this.totalNum)
					.attr("fill","rgb(0,0,0)")
					.attr("opacity","0.9")
					.attr("transform",function(d){
							let bbox = this.getBBox()
						return "translate("+(-bbox.width/2)+","+(0)+")"
					})
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  