<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="bar" id="polarStackedDi">
		<div class="ChartHead">重点位置监控</div>
		<div class="ChartBody">
		</div>
	</div>
</template>
  
  <script>
export default {
		data() {
			return {
			}
		},
		mounted() {
			this.draw();
		},
		methods: {
			draw() {
				// 基于准备好的dom，初始化echarts实例
				let Chart = this.$echarts.init(document.getElementById('polarStackedDiv'))
				// 绘制图表配置
				var option = {
				angleAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				radiusAxis: {},
				polar: {},
				series: [
					{
					type: 'bar',
					data: [1, 2, 3, 4, 3, 5, 1],
					coordinateSystem: 'polar',
					name: 'A',
					stack: 'a',
					emphasis: {
						focus: 'series'
					}
					},
					{
					type: 'bar',
					data: [2, 4, 6, 1, 3, 2, 1],
					coordinateSystem: 'polar',
					name: 'B',
					stack: 'a',
					emphasis: {
						focus: 'series'
					}
					},
					{
					type: 'bar',
					data: [1, 2, 3, 4, 1, 2, 5],
					coordinateSystem: 'polar',
					name: 'C',
					stack: 'a',
					emphasis: {
						focus: 'series'
					}
					}
				],
				legend: {
					show: true,
					data: ['A', 'B', 'C']
				}
				};
				// 窗口大小自适应方案
				Chart.setOption(option);
				setTimeout(function() {
					window.onresize = function() {
						Chart.resize();
					}
				}, 200)
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  