
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";


export default function createBox(x,y,z) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(x, y, z),
    new THREE.MeshStandardMaterial(
     
    ),
  )
  box.position.set(0,0,0);
  box.receiveShadows = true;
  modifyMaterial(box);
  scene.add(box);
}
