
import * as THREE from "three";
import scene from "../scene";

  
export default function ambientLinght() {
    const light = new THREE.AmbientLight( 0x111111 ); // soft white light
    scene.add(light)
}