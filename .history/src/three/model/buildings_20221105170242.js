
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';



export default function createBuilding(name,x,y,z) {
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath( './js/libs/draco/gltf/' );
    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath("ifc/")
    // 2、使用加载器导入模型文件
    ifcLoader.load('/models/'+name+'.ifc', (obj)=> {
    // obj.castShadow = true
    // obj.receiveShadow = true
    obj.position.set(x,y,z);
    obj.geometry.center();//中心的居中
    let box= new THREE.Box3().setFromObject(obj);
    // obj.geometry.translate(x,y,z)//中心的设置为包围盒底面
    obj.geometry.translate((box.max.x - box.min.x)/2,(box.max.y - box.min.y)/2,(box.max.z - box.min.z)/2)//中心的设置为包围盒底面
    // const bbox = new THREE.Mesh(
    //     new THREE.BoxGeometry(box.max.x - box.min.x,box.max.y - box.min.y,box.max.z - box.min.z),
    //     new THREE.MeshStandardMaterial(
    //     ),
    //   )
    // bbox.position.set(box.max.x,box.max.y,box.max.z);

    // scene.add(bbox);
    // obj.geometry.computeBoundingBox();
    // obj.applyMatrix( new THREE.Matrix4().makeTranslation(x, y, z) );
    obj.scale.set(1,1,1)
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true; //阴影
            child.receiveShadow = true; //接受别人投的阴影
        }
    });
    
               
    // helper = new THREE.BoxHelper(obj, 0xff0000);
    // helper.update();
    // scene.add(helper);
    scene.add(obj);
    }, (res)=>{
    // console.log(res.total, res.loaded)
    },(e)=>{
    console.log("导入失败",e);
    }


);

//   buildings.position.set(0,0,-6);
//   buildings.receiveShadows = true;
//   modifyMaterial(buildings);
//   scene.add(buildings);
}
