
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";


export default function createCity() {
  const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 20),
    new THREE.MeshStandardMaterial(
     
    ),
  )
  plane.position.set(0,0,-6);
  plane.receiveShadows = true;
  modifyMaterial(plane);
  scene.add(plane);
}
