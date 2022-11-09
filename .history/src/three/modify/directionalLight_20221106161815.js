
import * as THREE from "three";
import scene from "../scene";

  
export default function directionalLight(x,y,z) {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = true;
    var target = new THREE.Object3D();
    target.position.set(-500, 0, -500);
    scene.add(target);
    directionalLight.target = target
    directionalLight.shadow.camera.near = 20;
    directionalLight.shadow.camera.far = 2000;
    directionalLight.shadow.camera.left = -800;
    directionalLight.shadow.camera.right = 800;
    directionalLight.shadow.camera.top = 800;
    directionalLight.shadow.camera.bottom = -800;
    directionalLight.shadow.bias = -0.00005;
    directionalLight.shadow.mapSize.width=2048 
    directionalLight.shadow.mapSize.height=2048 
    scene.add(directionalLight);
    //显示光照区域
    var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
    scene.add(helper);
}