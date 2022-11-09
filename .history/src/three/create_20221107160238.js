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
export default {

  createplane:()=>{
    createplane()
  },
  createBuildingIFC:(name,x,y,z)=>{
    createBuildingIFC(name,x,y,z)
  },
  createBuildingSTL:(name,x,y,z)=>{
    createBuildingSTL(name,x,y,z)
  },
  createBuildingOBJ:(name,x,y,z)=>{
    createBuildingOBJ(name,x,y,z)
  },
  createBuildingGLTF:(name,x,y,z)=>{
    createBuildingGLTF(name,x,y,z)
  },

  createScene:()=>{
    createScene();
  },
  createAmbientLinght:()=>{
    createAmbientLinght();
  },
  createPointLinght:(x,y,z,dis,int)=>{
    createPointLinght(x,y,z,dis,int);
  },
  createDirectionalLight:(x,y,z)=>{
    createDirectionalLight(x,y,z);
  },
  createBox:(l,h,w,x,y,z)=>{
    createBox(l,h,w,x,y,z);
  }
}
