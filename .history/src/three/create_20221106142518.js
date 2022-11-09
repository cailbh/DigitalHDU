//创建物体组件
import createplane from './mesh/plane';
import createBox from './mesh/box';
import createBuildingIFC from './model/buildingIFC';

import createBuildingGLTF from './model/buildingGLTF';
import createScene from './model/scene';

import createAmbientLinght from './modify/ambientLinght'
export default {

  createplane:()=>{
    createplane()
  },
  createBuildingIFC:(name,x,y,z)=>{
    createBuildingIFC(name,x,y,z)
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
  createBox:(x,y,z)=>{
    createBox(x,y,z);
  }
}
