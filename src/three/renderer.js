//渲染器组件
import * as THREE from "three";
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true,
  // logarithmicDepthBuffer: true,
});
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
export default renderer;
