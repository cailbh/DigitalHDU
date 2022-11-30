
import * as THREE from "three";
import modifyMaterial from "../modify/modifyMaterial";


export default function createCylinder(scene,r1,r2,h,c,x,y,z,name) {
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(r1, r2, h, c),
    new THREE.MeshStandardMaterial(
    ),
  )
  cylinder.name = name;
  cylinder.position.set(x,y,z);
  cylinder.receiveShadows = true;
  // modifyMaterial(cylinder);
  scene.add(cylinder);
  return cylinder;
}
