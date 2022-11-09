//创建物体组件
import createplane from './mesh/plane';
import createBox from './mesh/box';
import createBuildingIFC from './model/buildingIFC';
import createBuildingOBJ from './model/buildingOBJ';
import createBuildingGLTF from './model/buildingGLTF';
import createScene from './model/scene';

import createPointLinght from './modify/pointLinght'
import createDirectionalLight from './modify/directionalLight'
import createAmbientLinght from './modify/ambientLinght'
import createBuildingSTL from './model/buildingSTL';

import * as THREE from "three";

export default {
  createPerspectiveCamera:()=>{
    // 创建透视相机
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerHeight / window.innerHeight,
        1,
        50000
      );
      // 设置相机位置
      // object3d具有position，属性是1个3维的向量
      camera.position.set(200, 200, 200);
      return camera
  },

  createplane:()=>{
    createplane()
  },
  createBuildingIFC:(scene,name,x,y,z)=>{
    createBuildingIFC(scene,name,x,y,z)
  },
  createBuildingSTL:(scene,name,x,y,z)=>{
    createBuildingSTL(scene,name,x,y,z)
  },
  createBuildingOBJ:(scene,name,x,y,z)=>{
    createBuildingOBJ(scene,name,x,y,z)
  },
  createBuildingGLTF:(scene,name,x,y,z)=>{
    createBuildingGLTF(scene,name,x,y,z)
  },

  createScene:()=>{
    createScene();
  },
  createAmbientLinght:(scene)=>{
    createAmbientLinght(scene);
  },
  createPointLinght:(scene,x,y,z,dis,int)=>{
    createPointLinght(scene,x,y,z,dis,int);
  },
  createDirectionalLight:(scene,x,y,z)=>{
    createDirectionalLight(scene,x,y,z);
  },
  createBox:(scene,l,h,w,x,y,z)=>{
    createBox(scene,l,h,w,x,y,z);
  }
}
