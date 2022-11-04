
import * as THREE from "three";
import scene from "./scene";


export default  function changeSky (type) {
// 场景天空盒
const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/"+type+"/");
// var type = '/night/'
const textureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);

scene.background = textureCube;
// scene.environment = textureCube;
}

