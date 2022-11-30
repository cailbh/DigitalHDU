
import * as THREE from "three";
import modifyMaterial from "../modify/modifyMaterial";


export default function createCylinder(scene,l,h,w,x,y,z,name) {
  const cylinder = new THREE.Mesh(
    new THREE.BoxGeometry(l, h, w),
    new THREE.MeshStandardMaterial(
     
    ),
  )
  cylinder.name = name;
  cylinder.position.set(x,y,z);
  cylinder.receiveShadows = true;
  modifyMaterial(cylinder);
  scene.add(cylinder);
  return cylinder;
}
