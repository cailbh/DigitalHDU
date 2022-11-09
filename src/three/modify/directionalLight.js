
import * as THREE from "three";

  
export default function directionalLight(scene,x,y,z) {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = true;
    var target = new THREE.Object3D();
    target.position.set(-500, 0, -500);
    scene.add(target);
    directionalLight.target = target
    directionalLight.shadow.camera.near = 20;
    directionalLight.shadow.camera.far = 100000;
    directionalLight.shadow.camera.left = -800;
    directionalLight.shadow.camera.right = 800;
    directionalLight.shadow.camera.top = 800;
    directionalLight.shadow.camera.bottom = -800;
    directionalLight.shadow.bias = -0.00005;
    scene.add(directionalLight);
    //显示光照区域
    // var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
    // scene.add(helper);
}