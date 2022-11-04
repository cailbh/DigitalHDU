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
			  
			//场景元素div
			let Height = this.$refs.teaChart.clientHeight
			console.log(Height)
			this.getData();
			this.draw();
		},
		methods: {
			initSvg(){
 
			let svgWidth = annotate.current.iWidth
            let svgHeight = annotate.current.iHeight
            if (svgHeight> svgWidth){
                svgHeight = svgHeight*(svgWidth/divWidth)
                svgWidth = divWidth
            }
            else{
                svgWidth = svgWidth*(svgHeight/divHeight)
                svgHeight = divHeight
            }
            let rSize = 60
            var graphsvg =  d3.select('#graph').select("#graphSvg")
            var entSvg = graphsvg.select("#entityGraph")
            entSvg.select('#entityG').remove()
            entSvg.select('#attrG').remove()
            var attrSvg = entSvg.append("g")
                .attr("id", "attrG")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
            var svg = entSvg.append("g")
                .attr("id", "entityG")
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
				_this.data.TeachersData = data
				}, 
				
			draw() {

			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  