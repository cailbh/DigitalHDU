<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="profileContain" id="">
		<div class="ProfileHead">{{title}}</div>
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
	props: {
		currentProp: {
			type: Object,
		},
  },
	data() {
		return {
			title:"校园概览",
			tp:'home',
			textData:{},
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
		this.textData = {
			"home":["学生10000人","教学楼15幢","占地10000亩","宿舍楼78幢"],
			"living":["后勤2000人","食堂楼3幢","占地600亩","宿舍楼78幢"]
		}
		this.tp = this.currentProp.type
		let val = this.tp
		let _this = this
		if('home'==val){
			_this.title='校园概览'
		}
		else if('living' == val){
			_this.title='生活区概览'
		}
		this.height = this.$refs.proChart.clientHeight - 20
		this.width = this.$refs.proChart.clientWidth - 20
		this.initSvg()
		// this.getData();
		

		this.draw();
	},
	watch:{
		currentProp(v){
			this.textData = {
				"home":["学生10000人","教学楼15幢","占地10000亩","宿舍楼78幢"],
				"living":["后勤2000人","食堂楼3幢","占地600亩","宿舍楼78幢"]
			}
			this.tp = this.currentProp.type
			let val = this.tp
			let _this = this
			if('home'==val){
				_this.title='校园概览'
			}
			else if('living' == val){
				_this.title='生活区概览'
			}
			this.height = this.$refs.proChart.clientHeight - 20
			this.width = this.$refs.proChart.clientWidth - 20
			this.initSvg()
			// this.getData();
			

			this.draw();
			}
	},
	methods: {
		initSvg(){
			let _this = this
			let svgWidth = _this.width
			let svgHeight = _this.height
			d3.select('#profileSVG').remove()
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
			var data ={'home':["学生10000人","教学楼15幢","占地10000亩","宿舍楼78幢"],
						'living':["后勤2000人","食堂楼3幢","占地600亩","宿舍楼78幢"]}
			_this.textData = data
			}, 
			
		draw() {
			let _this = this
			let data = _this.textData[_this.tp]
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
				.attr("x",75)
				.attr("font-size","11")
				.attr("y",20)
				.attr("fill","white")
				.text(data[0])
				.attr("transform",function(d){
					let bbox = this.getBBox()
				return "translate("+(-bbox.width)+","+(bbox.height/2)+")"
			})	
			var TextJ = g.append("text")
				.attr("id","legT_")
				.attr("x",70)
				.attr("font-size","11")
				.attr("y",215)
				.attr("fill","white")
				.text(data[1])
				.attr("transform",function(d){
					let bbox = this.getBBox()
				return "translate("+(-bbox.width)+","+(bbox.height/2)+")"
			})	
			var TextZ = g.append("text")
				.attr("id","legT_")
				.attr("x",320)
				.attr("font-size","11")
				.attr("y",215)
				.attr("fill","white")
				.text(data[2])
				.attr("transform",function(d){
					let bbox = this.getBBox()
				return "translate("+(-bbox.width)+","+(bbox.height/2)+")"
			})	
			var TextS = g.append("text")
				.attr("id","legT_")
				.attr("x",315)
				.attr("font-size","11")
				.attr("y",20)
				.attr("fill","white")
				.text(data[3])
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
  