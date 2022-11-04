
import * as THREE from "three";
import scene from "../scene";
import modifyMaterial from "../modify/modifyMaterial";
//1、引入加载器并实例化
import { DRACOLoader } from 'three/examples/jsm/loaders//DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js'
// export default function createScene() {

//     const mtlLoader = new MTLLoader();
//     const objLoader = new OBJLoader();

//   //2、使用加载器导入模型文件，这里注意，需要用在scene创建后
//     mtlLoader.load('/models/生活区.mtl', (materials)=> {
//     materials.preload()
//     objLoader.setMaterials(materials)
//     objLoader.load('/models/生活区.obj', (obj)=> {
//         obj.scale.set(0.0001, 0.0001, 0.0001)
//         // 设置可以投影
//         obj.children.forEach(item => {
//           item.castShadow = true
//           item.receiveShadow = true
//         })
        
//     scene.add(obj);
//     })
// }, (res)=>{
//     console.log(res.total, res.loaded)
// },(e)=>{
//     console.log("导入失败",e);
// }
// );
// }

  
export default function createScene() {

  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setWasmPath("ifc/")
// 2、使用加载器导入模型文件
ifcLoader.load('/models/Teaching.ifc', (obj)=> {
  obj.castShadow = true
  obj.receiveShadow =true
  scene.add(obj);
}, (res)=>{
  // console.log(res.total, res.loaded)
},(e)=>{
  console.log("导入失败",e);
}
);
}