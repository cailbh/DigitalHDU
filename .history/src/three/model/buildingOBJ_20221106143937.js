
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';


export default function createBuildingIFC(name,x,y,z) { 
    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath("ifc/")
    var mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl( '/models/Teaching_library/' );
    mtlLoader.setPath( '/models/Teaching_library/' );
    var url = "/models/Teaching_library.mtl";
    mtlLoader.load( url, function( materials ) {
        materials.preload();
        ifcLoader.load('/models/'+name+'.ifc', (obj)=> {
            obj.setMaterials( materials );
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
