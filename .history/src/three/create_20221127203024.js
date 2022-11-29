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
import { utimes } from 'fs';
const clock = new THREE.Clock();
var materials = {};
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
  Animate:(controls,scene,camera,renderer,composer,finalComposer)=>{
    var darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
    var scanConfig = {
      value: -1.0,
      start: 0,
      end: 0,
      during: 3,
    }
    var uHeight = - 1.0;
    var uTime = 0.1;
    function darkenNonBloomed( obj ) {
      var bloomLayer = new THREE.Layers();
      bloomLayer.set( 1);
      if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;
      }
    }
    function restoreMaterial( obj ) {
      if ( materials[ obj.uuid ] ) {
        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];
      }
    }
    function calcHeight() {
      let length = scanConfig.end - scanConfig.start;
      // 扫描动态效果实现
      uHeight += length / scanConfig.during / 10;
      if (uHeight >= scanConfig.end) {
        uHeight = scanConfig.start;
      }

      console.log(uHeight)
    }
    function boxScan(obj){
      const uperVertext = `
          varying vec3 vPosition;
          varying vec2 vUv;
          void main()
          {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );
          }
          `;

          const uperFragment = `
          varying vec3 vPosition;
            uniform float height;
            uniform vec4 uFlowColor;
            uniform vec4 uModelColor;
            varying vec2 vUv;
            uniform float uTime;
            vec2 rotate(vec2 uv, float rotation, vec2 mid) {
              return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
            }
          void main()
          {
            vec2 rotateUv = rotate(vUv, -uTime * 0.5, vec2(0.5));
            float angle = atan(rotateUv.y - 0.5, rotateUv.x - 0.5);
            float strength = mod((angle + 3.14) / 6.28 * 8.0, 1.0);
            //模型的基础颜色
          vec4 distColor=uModelColor;
          // 流动范围当前点z的高度加上流动线的高度
          float topY = vPosition.y +0.5;
          if (height < vPosition.y && vPosition.y < topY) {
          // 颜色渐变 
            distColor = uFlowColor; 
          }

          gl_FragColor = distColor;
          }`;
      let shaderMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          height: uHeight,
          uTime: uTime,
          uFlowColor: {
            value: new THREE.Vector4(1.0, 0.0, 0.0, 1.0),
          },
          uModelColor: {
            value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0),
          },
        },
        vertexShader: uperVertext,
        fragmentShader: uperFragment,
      })
      if(obj.name == 'box'){

      obj.material = shaderMaterial;
      // let box= 
      calcHeight()
      let boundingBox = new THREE.Box3().setFromObject(obj);
      // 初始化扫描配置,y轴上下需留出一定空间，防止把上下平面扫描出来
      scanConfig.start = 0;
      scanConfig.end = boundingBox.max.y-0.1 || 0;
      uTime += 0.1;
      if(uHeight<0)uHeight = scanConfig.start;
      }
      // if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
      //   materials[ obj.uuid ] = obj.material;
      //   obj.material = darkMaterial;
      // }
    }
    function animate(t) {
      controls.update();
      TWEEN.update();
      stats.update();
      const time = clock.getElapsedTime();
      requestAnimationFrame(animate); 
      renderer.outputEncoding = THREE.sRGBEncoding;
        // renderer.render(scene, camera);
      if(composer){
        // camera.layers.set(1)
        scene.traverse( darkenNonBloomed );
        composer.render();
        // // camera.layers.set(0)
        scene.traverse( restoreMaterial );
        calcHeight()
        scene.traverse(boxScan);
        finalComposer.render();
      }
      else{
        renderer.render(scene, camera);
      }
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
    return createBox(scene,l,h,w,x,y,z);
  }
}
