
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";
//1、引入加载器并实例化IFC
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';


export default function createBuildingOBJ(name,x,y,z) { 
   
    var mtlLoader = new MTLLoader();
    // mtlLoader.setBaseUrl( '/models/Teaching_library/' );
    // mtlLoader.setPath( '/models/Teaching_library/' );
    var url = "/models/Teaching_library.mtl";
    mtlLoader.load( url, function( materials ) {
        materials.preload();
        const objLoader = new OBJLoader();
        // objLoader.objManager.setWasmPath("obj/")
        objLoader.setMaterials( materials );
        objLoader.load('/models/'+name+'.obj', (obj)=> {
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
        });
    })
}
