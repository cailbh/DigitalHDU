//相机组件
import * as THREE from "three";
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  1,
  50000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(200, 200, 200);

export default camera;
