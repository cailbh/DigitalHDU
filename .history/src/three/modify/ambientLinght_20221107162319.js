
import * as THREE from "three";

  
export default function ambientLinght(scene) {
    const light = new THREE.AmbientLight( 0x111111 ); // soft white light
    scene.add(light)
}