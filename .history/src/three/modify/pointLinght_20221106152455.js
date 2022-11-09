
import * as THREE from "three";
import scene from "../scene";

  
export default function pointLinght(x,y,z) {
    const pointLight = new THREE.PointLight(0x0c0c0c) // 创建点光源
    const color = new THREE.Color(0x26E250) //创建颜色对象color
    pointLight.color = color // 给点光源修改颜色
    // 点光源强度设置为2
    pointLight.intensity = 2
    // 点光源距离设置为20
    pointLight.distance = 2000
    pointLight.position.set(x,y,z) 
    scene.add(pointlight)
}