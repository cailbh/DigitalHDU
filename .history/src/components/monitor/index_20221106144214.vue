<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="contain" >
		<div id="Monitor">
		<div  class="MonHead">重点位置监控</div>
		<div  class="MonBody">
			<div class = "videoCard" v-for="(item,i) in vedioList" :key="item.id" :id="'div'+item.id">
				
					<video muted="muted" :id="item.id" class="video" :src="item.path" type="video/mp4" poster="false.png" autoplay="autoplay" controls="controls" loop="-1">
						<p>你的浏览器不支持video标签.</p>
					</video>

				<div class = "videoName">{{item.name}}</div>  
		  </div>
		</div>
		</div>
		<div class="borderSelf borderLeft"></div>
		<div class="borderSelf borderRight"></div>
		
	</div>
</template>
  
  <script>
export default {
		data() {
			return {
				vedioList: [{ path: '/videos/1.mp4',id:"video_0",name:"教学区南门" }, { path:         
             "/videos/2.mp4",id:"video_1",name:"生活区东门" },
            { path: "/videos/3.mp4",id:"video_2" ,name:"生活区北门"}, { path: 
             "/videos/4.mp4",id:"video_3",name:"生活区南门" }],
			}
		},
		mounted() {
			// this.draw();
			for (var i = 0; i < 4; i++) {
        //获取四个视频的id
            var video = document.getElementById("video_"+i);
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
  