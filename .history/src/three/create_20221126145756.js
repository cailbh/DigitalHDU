//创建物体组件
import createplane from './mesh/plane';
import createBox from './mesh/box';
import createBuildingIFC from './model/buildingIFC';
import createBuildingOBJ from './model/buildingOBJ';
import createBuildingGLTF from './model/buildingGLTF';
// import createScene from './model/scene';
import stats from './Stats'
import createPointLinght from './modify/pointLinght'
import createDirectionalLight from './modify/directionalLight'
import createAmbientLinght from './modify/ambientLinght'
import createBuildingSTL from './model/buildingSTL';
import animate  from './animate';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from '@tweenjs/tween.js'
import * as THREE from "three";
const clock = new THREE.Clock();

export default {
  init:(camera,renderer)=>{
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    // 监听屏幕大小改变的变化，设置渲染的尺寸
    window.addEventListener("resize", () => {
      //   console.log("resize");
      // 更新摄像头
      camera.aspect = window.innerWidth / window.innerHeight;
      //   更新摄像机的投影矩阵
      camera.updateProjectionMatrix();

      //   更新渲染器
      renderer.setSize(window.innerWidth, window.innerHeight);
      //   设置渲染器的像素比例
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  },
  Scene:()=>{
    // 初始化场景
    const scene = new THREE.Scene();
    var type = 'sunny'
    // 场景天空盒
    const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/"+type+"/");
    
    const textureCube = textureCubeLoader.load([
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
    ]);
    
    scene.background = textureCube;
    return scene
  },
  PerspectiveCamera:()=>{
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
  Rendererr:()=>{
    const renderer = new THREE.WebGLRenderer({
      // 抗锯齿
      antialias: true,
      // logarithmicDepthBuffer: true,
    });
    // 设置渲染尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.enabled = true;
    return renderer;
  },
  Animate:(controls,scene,camera,renderer,composer)=>{
    function animate(t) {
      controls.update();
      TWEEN.update();
      stats.update();
      const time = clock.getElapsedTime();
      requestAnimationFrame(animate);
      renderer.outputEncoding = THREE.sRGBEncoding;
      // if(composer){
      //   composer.render();
      // }
      // else{
      renderer.render(scene, camera);
      // }
    }
    animate()
  },
  Controls:(camera,renderer)=>{
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼
    controls.enableDamping = true;
    // 设置自动旋转
    // controls.autoRotate = true;
    // 缩放范围
    // controls.maxDistance = 200 
    
    // controls.minDistance = 100 
    // controls.maxAzimuthAngle= Math.PI/2;
    
    controls.maxPolarAngle= Math.PI/2 -0.1;
    return controls;
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
