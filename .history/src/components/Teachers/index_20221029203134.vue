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
				let circleCenterY = svgHeight/4

				let rSize = (circleCenterX>circleCenterY)?(circleCenterY/2):(circleCenterX/2)
				var circle = g.append("circle")
					.attr("id", "totalTeachersNum")
					// .attr("class", )
					.attr("cx", circleCenterX)
					.attr("cy", circleCenterY)
					.attr("r", rSize)
					// .attr("fill", "url(#pic" + i + ")")
					.attr("fill","rgb(42, 185, 173)")
					.attr("opacity","0.9")
					.attr("stroke-width", "0")
					.on("mouseover", (d) => {
						d3.select(this).attr("r",rSize+10)
					})
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  