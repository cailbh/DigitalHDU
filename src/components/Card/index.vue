<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="card">
		
	</div>
</template>
  
  <script>
export default {
		data() {
			return {
			}
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('barDiv'))
				// 绘制图表配置
				let option = {
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}]
				};
				// 窗口大小自适应方案
				myChart.setOption(option);
				setTimeout(function() {
					window.onresize = function() {
						myChart.resize();
					}
				}, 200)
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  