
import * as THREE from "three";
import scene from "../scene";

  
export default function directionalLight(x,y,z,dis,int) {
    const pointLight = new THREE.PointLight(0x0c0c0c) // 创建点光源
    const color = new THREE.Color(0xffffff) //创建颜色对象color
    pointLight.color = color // 给点光源修改颜色
    // 点光源强度设置
    pointLight.intensity = int
    // 点光源距离设置
    pointLight.visible = true
    pointLight.distance = dis
    pointLight.position.set(x,y,z) 
    scene.add(pointLight)
}