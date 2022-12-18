//创建物体组件
import createplane from './mesh/plane';
import createBox from './mesh/box';
import createCylinder from './mesh/cylinder';
import createBuildingIFC from './model/buildingIFC';
import createBuildingOBJ from './model/buildingOBJ';
import createBuildingGLTF from './model/buildingGLTF';
// import createScene from './model/scene';
// import stats from './Stats'
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
    renderer.setPixelRatio(window.devicePixelRatio);
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
    var uTime = 0;
    var uScale = 0;
      var uOpacity = 1;
    //  * 创建流体墙体材质
    function createFlowWallMat({ bgUrl, flowUrl }){
      // 顶点着色器
      const vertexShader = `
          varying vec2 vUv;
          varying vec3 fNormal;
          varying vec3 vPosition;
          void main(){
                  vUv = uv;
                  vPosition = position;
                  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                  gl_Position = projectionMatrix * mvPosition;
          }
      `;
      // 片元着色器
      const fragmentShader = `
          uniform float time;
          varying vec2 vUv;
          uniform sampler2D flowTexture;
          uniform sampler2D bgTexture;
          void main( void ) {
              vec2 position = vUv;
              vec4 colora = texture2D( flowTexture, vec2( vUv.x, fract(vUv.y - time )));
              vec4 colorb = texture2D( bgTexture , position.xy);
              gl_FragColor = colorb + colorb * colora;
          }
      `;
      const bgTexture = new THREE.TextureLoader().load(
        bgUrl ||"https://model.3dmomoda.com/models/47007127aaf1489fb54fa816a15551cd/0/gltf/116802027AC38C3EFC940622BC1632BA.jpg"
      );
      const flowTexture = new THREE.TextureLoader().load(
        flowUrl ||
          // "https://model.3dmomoda.com/models/da5e99c0be934db7a42208d5d466fd33/0/gltf/F3E2E977BDB335778301D9A1FA4A4415.png"
        "https://model.3dmomoda.com/models/47007127aaf1489fb54fa816a15551cd/0/gltf/116802027AC38C3EFC940622BC1632BA.jpg"
      );
      // 允许平铺
      flowTexture.wrapS = THREE.RepeatWrapping;
      return new THREE.ShaderMaterial({
        uniforms: {
          time: {
            value: 0,
          },
          flowTexture: {
            value: flowTexture,
          },
          bgTexture: {
            value: bgTexture,
          },
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });
    }
    const wallMat = createFlowWallMat({});
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
      if(obj.name == 'wall'){
        console.log(wallMat)
        obj.material = wallMat;
      }
      // if(obj.name == 'Teaching_Ground'){
      //   let box= new THREE.Box3().setFromObject(obj);
      //   console.log(box);
      // }
    }
    function calcHeight() {
      let length = scanConfig.end - scanConfig.start;
      // 扫描动态效果实现
      uHeight += length / scanConfig.during / 8;
      if (uHeight >= scanConfig.end-10.5) {
        uHeight = scanConfig.start;
      }
    }
    function calcWave(){
      uScale+=0.05;
      uOpacity-=0.05;
      if(uScale>1){
        uScale=0;
        uOpacity=1;
      }
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
        uniform float uHeight;
        uniform vec4 uFlowColor;
        uniform vec4 uModelColor;
        varying vec2 vUv;
        uniform float uTime;
        vec2 rotate(vec2 uv, float rotation, vec2 mid) {
          return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
        }
      void main()
      {
        // vec2 rotateUv = rotate(vUv, -uTime , vec2(0.5));
        // float angle = atan(rotateUv.y - 0.5, rotateUv.x - 0.5);
        // float strengthr = mod((angle + 3.14) / 6.28 * 8.0, 1.0);
        // float strengthr = mod(uTime * uTime , 1.0);
        //模型的基础颜色
      vec4 distColor=uModelColor;
      // 流动范围当前点z的高度加上流动线的高度
      float topY = uHeight +1.2;
      if (uHeight < vPosition.y && vPosition.y < topY) {
      // 颜色渐变 
        // distColor = vec4(0,strengthr, strengthr, 1.0);
        distColor = vec4(0,0.5, 0.5, 1.0);
      }

      gl_FragColor = distColor;
      }`;
      let shaderMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        colorWrite : false,
        uniforms: {
          uHeight:  { value: uHeight,},
          uTime: { value: uTime,},
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
      // obj.material.depthWrite = false; 
      // let box= 
      let boundingBox = new THREE.Box3().setFromObject(obj);
      // 初始化扫描配置,y轴上下需留出一定空间，防止把上下平面扫描出来
      scanConfig.start = -(boundingBox.max.y-boundingBox.min.y)/2+0.5;
      scanConfig.end = boundingBox.max.y-0.5;
      uTime += 0.1;
      if(uHeight<scanConfig.start||uHeight>scanConfig.end)uHeight = scanConfig.start;
      }
      // if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
      //   materials[ obj.uuid ] = obj.material;
      //   obj.material = darkMaterial;
      // }
    }
    function wave(obj){
      if(obj.name == 'wave'){
        obj.scale.set(1 + uScale, 1, 1 + uScale);
        obj.material[0].opacity = uOpacity;
      }
    }
    function animate(t) {
      controls.update();
      TWEEN.update();
      // stats.update();
      const time = clock.getElapsedTime();
      requestAnimationFrame(animate); 
      renderer.outputEncoding = THREE.sRGBEncoding;
        // renderer.render(scene, camera);
      // scene.traverse(boxScan);
      // calcHeight()
      calcWave();
      wallMat.uniforms.time.value += 0.1;
      if(composer){
        // camera.layers.set(1)
        scene.traverse( darkenNonBloomed );
        composer.render();
        // // camera.layers.set(0)
        scene.traverse( restoreMaterial );
        scene.traverse(wave);
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
   return createBuildingGLTF(scene,name,x,y,z)
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
  },
  createCylinder:(scene,r1,r2,h,c,x,y,z,name)=>{
    return createCylinder(scene,r1,r2,h,c,x,y,z,name);
  }
}
