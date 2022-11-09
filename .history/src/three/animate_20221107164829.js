/* eslint-disable no-unused-vars */
import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js'
const clock = new THREE.Clock();
function animate(controls,scene,camera,renderer) {
  controls.update();
  TWEEN.update();
  const time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

export default animate;
