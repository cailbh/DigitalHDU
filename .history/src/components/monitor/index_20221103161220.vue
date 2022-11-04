<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="contain" >
		<div class="borderSelf borderLeft"></div>
		<div class="borderSelf borderRight"></div>
		<div id="Monitor">
		<div  class="MonHead">重点位置监控</div>
		<div  class="MonBody">
			<div class = "videoCard" v-for="(item,i) in vedioList" :key="item.id" >         
				<video muted="muted" :id="item.id" class="video" :src="item.path" type="video/mp4" poster="false.png" autoplay="autoplay" controls="controls" loop="-1">
					   <p>你的浏览器不支持video标签.</p>
				</video>
		  </div>
		</div>
	</div>
	</div>
</template>
  
  <script>
export default {
		data() {
			return {
				vedioList: [{ path: '/videos/1.mp4',id:0 }, { path:         
             "/videos/2.mp4",id:1 },
            { path: "/videos/3.mp4",id:2 }, { path: 
             "/videos/4.mp4",id:3 }],
			}
		},
		mounted() {
			// this.draw();
			for (var i = 0; i < 4; i++) {
        //获取四个视频的id
            var video = document.getElementById(i);
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
  