<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="profileContain" id="">
		<div class="ProfileHead">校园概况</div>
		<div class="ChartBody" id="profileContainBody">
			<div class="profileContain" id="profileContain" ref="proChart">
				<div id="profileImg1"></div>
				<div id="profileImg2"></div>
				<div id="profileImgC"></div>
				<div id="profileImg3"></div>
				<div id="profileImg4"></div>
				<div id="profileText"></div>
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
			  
			this.height = this.$refs.proChart.clientHeight - 20
			this.width = this.$refs.proChart.clientWidth - 20
			this.initSvg()
			// this.getData();
			this.draw();
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

				
					
				var Text = g.append("text")
					.attr("id","legT_")
					.attr("x",70)
					.attr("font-size","11")
					.attr("y",20)
					.attr("fill","white")
					.text("学生10000人")
					.attr("transform",function(d){
						let bbox = this.getBBox()
					return "translate("+(-bbox.width)+","+(bbox.height/2)+")"
				})	
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  