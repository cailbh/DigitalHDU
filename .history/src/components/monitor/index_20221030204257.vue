<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="bar" id="polarStackedDi">
		<div class="ChartHead">重点位置监控</div>
		<div class="ChartBody">
			<div v-for="(item,i) in vedioList" :key="i">
                        
				<video muted="muted" :id="startvideo+i" class="video" :src="item.path" type="video/mp4" poster="false.png" autoplay="autoplay" controls="controls" loop="-1">
					   <p>你的浏览器不支持video标签.</p>
				</video>
		  </div>
		</div>
	</div>
</template>
  
  <script>
export default {
		data() {
			return {
				vedioList: [{ path: "http://vjs.zencdn.net/v/oceans.mp4" }, { path:         
             "http://vjs.zencdn.net/v/oceans.mp4" },
            { path: "http://vjs.zencdn.net/v/oceans.mp4" }, { path: 
             "http://vjs.zencdn.net/v/oceans.mp4" }],
			}
		},
		mounted() {
			// this.draw();
			for (var i = 0; i < 4; i++) {
        //获取四个视频的id
            var video = document.getElementById("startvideo"+i);
        //调用video标签的播放函数
            video.play();
        }
		},
		methods: {
			draw() {
				// 基于准备好的dom，初始化echarts实例
				
			}
		}
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  