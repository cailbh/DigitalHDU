
import * as THREE from "three";
import modifyMaterial from "../modify/modifyMaterial";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';



export default function createBuildingSTL(scene,name,x,y,z) {

    
    const stlLoader = new STLLoader();
    // stlLoader.stlManager.setWasmPath("stl/")
    stlLoader.load('/models/'+name+'.stl', (stl)=> {
        var mat = new THREE.MeshLambertMaterial({color: 0x00ffff});
        var obj = new THREE.Mesh(stl,mat);
        obj.position.set(x,y,z);
        obj.scale.set(1,1,1)
        scene.add(obj)
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
