
import * as THREE from "three";
import scene from "../scene";

  
export default function directionalLight(x,y,z) {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = true;
    var target = new scene.getObjectByName("Teaching_Ground")
    target.position.set(0, 0, 0);
    scene.add(target);
    directionalLight.target = target
    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 40;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);
    //显示光照区域
    var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
    scene.add(helper);
}