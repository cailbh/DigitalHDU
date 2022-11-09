
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



export default function createBuildingGTLF(name,x,y,z) {
    var dracoLoader = new DRACOLoader()
    const gltfLoader = new GLTFLoader();
    dracoLoader.setDecoderPath('/draco/gltf/')
    gltfLoader.setDRACOLoader(dracoLoader)
  //2、使用加载器导入模型文件，这里注意，需要用在scene创建后
    gltfLoader.load('/models/'+name+'.glb', (gltf)=> {
    console.log("gltf",gltf)
    gltf.scene.scale.set(1, 1, 1)
    
    gltf.scene.position.set(x,y,z);
    gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true; //阴影
            child.receiveShadow = true; //接受别人投的阴影
        }
    });
    scene.add(gltf.scene);
}, (res)=>{
    console.log(res.total, res.loaded)
},(e)=>{
    console.log("导入失败",e);
}
);

//   buildings.position.set(0,0,-6);
//   buildings.receiveShadows = true;
//   modifyMaterial(buildings);
//   scene.add(buildings);
}
