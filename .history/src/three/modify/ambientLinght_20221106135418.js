
import * as THREE from "three";
import scene from "../scene";

  
export default function ambientLinght() {
    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add(light)
}