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

import filenames from "../utils/fileName";
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
    var cTime =0;
    var uHeight = - 1.0;
    var uTime = 0;
    var uScale = 0;
    var uOpacity = 1;
    var wallOpacity = 0.5;
    var wallHeight = 10;
    var wallState = 0;
    //  * 创建流体墙体材质
      // 顶点着色器
      const vertexShader = `
      uniform vec3 u_color;
      uniform float time;
      uniform float u_height;
      varying float v_opacity;
      void main() {
          vec3 vPosition = position;
          v_opacity = mix(1.0, 0.0, position.y / u_height * 1.0) * (1.0 + sin(time) * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1);
      }
      `;
      // 片元着色器
      const fragmentShader = `
      uniform vec3 u_color;
      uniform float u_opacity;
      varying float v_opacity;
      void main() {
          gl_FragColor = vec4(u_color, v_opacity * u_opacity);
      }
      `;
    function darkenNonBloomed( obj ) {
      var bloomLayer = new THREE.Layers();
      bloomLayer.set( 1);
      if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
        let objName = obj.name.split("/");
        if((filenames['Teaching'].indexOf(objName[objName.length-1])<0)&&((filenames['Living'].indexOf(objName[objName.length-1])<0))){

        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;
        }
      }
    }
    function callWall(){
      if(wallState = 0){
        wallOpacity+=0.01;
        wallHeight-=0.01;
      }
      else{
        wallOpacity-=0.01;
        wallHeight+=0.01;
      }
      if(wallOpacity<0.5){
        wallState = 0  
      }
      else if(wallOpacity>1){
        wallState = 1
      }
    }
    function restoreMaterial( obj ) {

      const rayMarchingFireVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main(){
          vec4 modelPosition=modelMatrix*vec4(position,1.);
          vec4 viewPosition=viewMatrix*modelPosition;
          vec4 projectedPosition=projectionMatrix*viewPosition;
          gl_Position=projectedPosition;
          
          vUv=uv;
          vPosition=position;
      }
      `;

      const rayMarchingFireFragmentShader = `
      #define GLSLIFY 1
      vec2 centerUv(vec2 uv,vec2 resolution){
          uv=2.*uv-1.;
          float aspect=resolution.x/resolution.y;
          uv.x*=aspect;
          return uv;
      }

      mat3 setCamera(in vec3 ro,in vec3 ta,float cr)
      {
          vec3 cw=normalize(ta-ro);
          vec3 cp=vec3(sin(cr),cos(cr),0.);
          vec3 cu=normalize(cross(cw,cp));
          vec3 cv=(cross(cu,cw));
          return mat3(cu,cv,cw);
      }

      vec3 getRayDirection(vec2 p,vec3 ro,vec3 ta,float fl){
          mat3 ca=setCamera(ro,ta,0.);
          vec3 rd=ca*normalize(vec3(p,fl));
          return rd;
      }

      float sdSphere( vec3 p, float s )
      {
        return length( p ) - s;
      }

      float opU( float d1, float d2 )
      {
          return min(d1,d2);
      }

      vec2 opU( vec2 d1, vec2 d2 ){
        return ( d1.x < d2.x ) ? d1 : d2;
      }

      //
      // GLSL textureless classic 3D noise "cnoise",
      // with an RSL-style periodic variant "pnoise".
      // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
      // Version: 2011-10-11
      //
      // Many thanks to Ian McEwan of Ashima Arts for the
      // ideas for permutation and gradient selection.
      //
      // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
      // Distributed under the MIT license. See LICENSE file.
      // https://github.com/ashima/webgl-noise
      //

      vec3 mod289(vec3 x)
      {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 mod289(vec4 x)
      {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 permute(vec4 x)
      {
        return mod289(((x*34.0)+1.0)*x);
      }

      vec4 taylorInvSqrt(vec4 r)
      {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
      }

      // Classic Perlin noise
      float cnoise(vec3 P)
      {
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }

      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uVelocity;
      uniform vec3 uColor1;
      uniform vec3 uColor2;

      varying vec2 vUv;
      varying vec3 vPosition;

      float fire(vec3 p){
          vec3 p2=p*vec3(1.,.5,1.)+vec3(0.,1.,0.);
          float geo=sdSphere(p2,1.);
          // float result=geo;
          float displacement=uTime*uVelocity;
          vec3 displacementY=vec3(.0,displacement,.0);
          float noise=(cnoise(p+displacementY))*p.y*.4;
          float result=geo+noise;
          return result;
      }

      vec2 sdf(vec3 p){
          float result=opU(abs(fire(p)),-(length(p)-100.));
          float objType=1.;
          return vec2(result,objType);
      }

      vec4 rayMarch(vec3 eye,vec3 ray){
          float depth=0.;
          float strength=0.;
          float eps=.02;
          vec3 pos=eye;
          for(int i=0;i<64;i++){
              pos+=depth*ray;
              float dist=sdf(pos).x;
              depth=dist+eps;
              if(dist>0.){
                  strength=float(i)/64.;
              }
          }
          return vec4(pos,strength);
      }

      void main(){
          vec2 p=centerUv(vUv,uResolution);
          p=p*vec2(1.6,-1);
          
          vec3 ro=vec3(0.,-2.,4.);
          vec3 ta=vec3(0.,-2.5,-1.5);
          float fl=1.25;
          vec3 rd=getRayDirection(p,ro,ta,fl);
          
          vec3 color=vec3(0.);
          
          vec4 result=rayMarch(ro,rd);
          
          float strength=pow(result.w*2.,4.);
          vec3 ellipse=vec3(strength);
          color=ellipse;
          
          float fireBody=result.y/64.;
          vec3 mixColor=mix(uColor1,uColor2,fireBody);
          color*=mixColor;
          
          gl_FragColor=vec4(color,1.);
      }
      `;

      if ( materials[ obj.uuid ] ) {
        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];
      }
      const rayMarchingFireMaterial = new THREE.ShaderMaterial({
        vertexShader: rayMarchingFireVertexShader,
        fragmentShader: rayMarchingFireFragmentShader,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: {
            value: cTime,
          },
          uMouse: {
            value: new THREE.Vector2(0, 0),
          },
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
          uVelocity: {
            value: 3,
          },
          uColor1: {
            value: new THREE.Color("#ff801a"),
          },
          uColor2: {
            value: new THREE.Color("#ff5718"),
          },
        },
      });
      const wallMat = new THREE.ShaderMaterial({
        uniforms: {
          time: {
            value: uTime,
          },
          u_color:{
            value:new THREE.Color("#ff801a")  ,
          },
          u_height:{
            value:wallHeight,
          },
          u_opacity:{
            value:wallOpacity,
          }
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });
      if(obj.name == 'wall'){
        // obj.material = rayMarchingFireMaterial;
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
      cTime = clock.getElapsedTime();
      uTime+=0.1;
      requestAnimationFrame(animate); 
      renderer.outputEncoding = THREE.sRGBEncoding;
        // renderer.render(scene, camera);
      // scene.traverse(boxScan);
      // calcHeight()
      calcWave();
      callWall();
      // wallMat.uniforms.time.value += 0.1;
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
