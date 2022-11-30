
import * as THREE from "three";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



export default function createBuildingGTLF(scene,name,x,y,z) {
    var obj;
    var dracoLoader = new DRACOLoader()
    const gltfLoader = new GLTFLoader();
    dracoLoader.setDecoderPath('/draco/gltf/')
    gltfLoader.setDRACOLoader(dracoLoader)
  //2、使用加载器导入模型文件，这里注意，需要用在scene创建后
    gltfLoader.load('/models/'+name+'.glb', (gltf)=> {
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(x,y,z);
    gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // child.castShadow = true; //阴影
            child.receiveShadow = true; //接受别人投的阴影
        }
        if(child.isMesh) {
            child.material.emissiveMap = child.material.map; 
            child.material.emissive =  child.material.color;
          }
    });
    gltf.scene.name = name
    obj = gltf.scene
    scene.add(gltf.scene)
}, (res)=>{
},(e)=>{
    console.log("导入失败",e);
}
);
return obj;
//   buildings.position.set(0,0,-6);
//   buildings.receiveShadows = true;
//   modifyMaterial(buildings);
//   scene.add(buildings);
}
