
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";


export default function createBox(l,h,w,x,y,z) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(l, h, w),
    new THREE.MeshStandardMaterial(
     
    ),
  )
  box.position.set(x,y,z);
  box.receiveShadows = true;
  modifyMaterial(box);
  scene.add(box);
}
