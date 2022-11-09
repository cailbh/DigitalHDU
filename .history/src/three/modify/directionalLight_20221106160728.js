
import * as THREE from "three";
import scene from "../scene";

  
export default function directionalLight(x,y,z) {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = true;
    var target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    scene.add(target);
    directionalLight.target = target
    directionalLight.shadow.camera.near = 20;
    directionalLight.shadow.camera.far = 400000;
    directionalLight.shadow.camera.left = -200000;
    directionalLight.shadow.camera.right = 200000;
    directionalLight.shadow.camera.top = 20000;
    directionalLight.shadow.camera.bottom = -20000;
    scene.add(directionalLight);
    //显示光照区域
    var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
    scene.add(helper);
}