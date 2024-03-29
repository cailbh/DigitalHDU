//创建物体组件
import createplane from './mesh/plane';
import createBox from './mesh/box';
import createBuildings from './model/buildings';

import createBuilding from './model/building';
import createScene from './model/scene';

import createAmbientLinght from './modify/ambientLinght'
export default {

  createplane:()=>{
    createplane()
  },
  createBuilding:(name,x,y,z)=>{
    createBuilding(name,x,y,z)
  },
  createBuildings:(name,x,y,z)=>{
    createBuildings(name,x,y,z)
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
