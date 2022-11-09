
import * as THREE from "three";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';



export default function createBuildingSTL(scene,name,x,y,z) {

    
    const stlLoader = new STLLoader();
    // stlLoader.stlManager.setWasmPath("stl/")
    stlLoader.load('/models/'+name+'.stl', (obj)=> {
    obj.position.set(x,y,z);
    obj.scale.set(1,1,1)
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true; //阴影
            child.receiveShadow = true; //接受别人投的阴影
        }
    });
    scene.add(obj);
    }, (res)=>{
    },(e)=>{
    console.log("导入失败",e);
    }


);

//   buildings.position.set(0,0,-6);
//   buildings.receiveShadows = true;
//   modifyMaterial(buildings);
//   scene.add(buildings);
}
