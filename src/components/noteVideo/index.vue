<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
     <!-- 视频播放弹窗 -->
     <div class="video_box">
          <a-modal :visible="visible" centered @ok="handleOk" @cancel="handleCancel">
               <video v-if="playState" width="550" height="400" id="video_play" controls preload
                    webkit-playsinline="webkit-playsinline" playsinline="" controlslist="nodownload"
                    x-webkit-airplay="allow" x5-playsinline="" src="../../assets/wumingzhibei.mp4" ref="vueRef"></video>
          </a-modal>
     </div>
</template>

<script>
import { noteBtn } from "three/noteBtnVideo"

var note1 = new noteBtn();
var isbegin = false;
note1.element.addEventListener('click', beginVideo());

export default {
     data() {
          return {
               vedioList: [{ path: '/videos/1.mp4', id: 0, name: "南大门出入口" }, {
                    path:
                         "/videos/2.mp4", id: 1, name: "生活区东门"
               },
               { path: "/videos/3.mp4", id: 2, name: "生活区东门" }, {
                    path:
                         "/videos/4.mp4", id: 3, name: "生活区东门"
               }],
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
          beginVideo() {
               if (isbegin == false) {
                    isbegin = true;
                    //获取精灵id匹配到对应视频的id，把对应的视频可见度和声音改变
               }
          },
           // 视频弹框
    showModal() {
      this.visible = true;
      this.playState = true;
    },
    handleOk(e) {
      this.visible = false;
      this.playState = false;
      // setTimeout(() => {
      //   this.visible = false;
      // }, 2000);
      console.log(this.$refs.vueRef,666)
      this.$refs.vueRef.pause();//暂停
    },
    handleCancel(e) {
      this.visible = false;
      this.$refs.vueRef.pause();//暂停
    },
     }
}
</script>
   
<style>
@import './index.css';
</style>
   