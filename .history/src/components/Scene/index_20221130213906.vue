<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="scene" ref="sceneDiv"></div>
</template>
  
<script>

import { onMounted, ref} from 'vue';
import * as THREE from "three";
import filenames from "@/utils/fileName";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import stats from '@/three/Stats'
import TWEEN from '@tweenjs/tween.js'
import axesHelper from "@/three/axesHelper";
import create from "@/three/create";
import modifyMaterial from "@/three/modify/modifyMaterial";
import creatWallByPath from "@/three/creatWallByPath"
//控制天空盒
import changeSky from "@/three/sky";
import domtoimage from 'dom-to-image';
//场景元素div
export default {
  props: ["type","sky"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      vertexShader: '',
      shaderMaterials: {},
      camera:null,
      scene:null,
      sceneType:"",
      sceneLiving:null,
      sceneTeaching:null,
      renderer:null,
      controls:null,
      composer:null,
      finalComposer:null,
      composerLiving:null,
      finalComposerLiving:null,
      composerTeaching:null,
      finalComposerTeaching:null,
      outlinePass:null,
      outlinePassLiving:null,
      outlinePassTeaching:null,
      outlineParams : {
        edgeStrength: 3,
        edgeGlow: 3,
        edgeThickness: 4,
        pulsePeriod: 5,
        rotate: false,
        usePatternTexture: false,
        },
      unrealBloomPassParams:{
				exposure: 0.99,
				bloomStrength: 1,
				bloomThreshold: 1,
				bloomRadius: 0.1
			  },
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
    };
  },
  watch: {
    type(val){
      let _this = this
      let scene = _this.scene;
      let camera = _this.camera;
      let renderer = _this.renderer ;
      let controls =  _this.controls;
      let finalComposer = _this.finalComposer;
      let composer = _this.composer;
      if(_this.sceneType != val){
        _this.animateCameraFun(camera.position,controls.target,new THREE.Vector3(300,400,300),new THREE.Vector3(0,0,0));
        if("Living" == val){
          _this.scene = _this.sceneLiving;
          _this.composer = _this.composerLiving;
          _this.finalComposer = _this.finalComposerLiving;
          _this.outlinePass = _this.outlinePassLiving;
        }
        else if("Teaching" == val){
          _this.scene = _this.sceneTeaching;
          _this.composer = _this.composerTeaching;
          _this.finalComposer = _this.finalComposerTeaching;
          _this.outlinePass = _this.outlinePassTeaching
        }
        _this.sceneType = val;
        scene = _this.scene;
        composer = _this.composer;
        finalComposer = _this.finalComposer;
        // _this.outline();
        create.Animate(controls,scene,camera,renderer,composer,finalComposer);
      }
    },
    sky(val){
      const _this = this;
      let scene = _this.scene;
      create.changeSky(scene,val);
    }
  },
  methods: {
    creatComposer(scene,camera,renderer){
      let _this = this;
      let composer =  new EffectComposer(renderer);
      composer.readBuffer.texture.encoding = THREE.sRGBEncoding;
      composer.writeBuffer.texture.encoding = THREE.sRGBEncoding;
      composer.renderToScreen = false;
      var renderPass = new RenderPass(scene, camera);
      var effectCopy = new ShaderPass(THREE.CopyShader);//CopyShader是为了能将结果输出，普通的通道一般都是不能输出的，要靠CopyShader进行输出
      effectCopy.renderToScreen = true;//设置这个参数的目的是马上将当前的内容输出

      // var bloomPass = new BloomPass(3, 25, 0.1, 512);
      let unParams = _this.unrealBloomPassParams;
      var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      bloomPass.threshold = unParams.bloomThreshold;
      bloomPass.strength = unParams.bloomStrength;
      bloomPass.radius = unParams.bloomRadius;
      renderer.toneMappingExposure =Math.pow( unParams.exposure, 4.0 ) ;
      composer.addPass(renderPass);//渲染当前场景
      composer.addPass(bloomPass);
      //线框渲染器新建
      let params = _this.outlineParams;
      let outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene,camera);
      //设置线框效果
      outlinePass.edgeStrength = Number(params.edgeStrength);
      outlinePass.edgeGlow = Number(params.edgeGlow);
      outlinePass.edgeThickness = Number(params.edgeThickness);
      outlinePass.pulsePeriod = Number(params.pulsePeriod);
      outlinePass.visibleEdgeColor.set("rgb(65, 255, 250)");
      outlinePass.hiddenEdgeColor.set("rgb(255, 255, 250)");
      //效果组合渲染器中 加入线框渲染器
      composer.addPass(outlinePass);

      // 锯齿处理
      let fxaaPass = new ShaderPass(FXAAShader);
      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.uniforms[ 'resolution' ].value.x = 1 / (window.innerWidth * pixelRatio);
      fxaaPass.uniforms[ 'resolution' ].value.y = 1 / (window.innerHeight * pixelRatio);
      fxaaPass.renderToScreen = true;
      composer.addPass(fxaaPass)

      const bloomVertext = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `;

      const bloomFragment = `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
      }
      `;

      const finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: composer.renderTarget2.texture },
          },
          vertexShader: bloomVertext,
          fragmentShader: bloomFragment,
          defines: {},
        }),
        'baseTexture'
      );
      finalPass.needsSwap = true;
      // 初始化实际效果合成器
      let finalComposer = new EffectComposer(renderer);
      finalComposer.addPass(renderPass);
      finalComposer.addPass(finalPass);
      finalComposer.addPass(fxaaPass)
      return [composer,finalComposer,outlinePass]
    },
   

    outline(){ 
      let _this = this;
      let scene = _this.scene;
      let camera = _this.camera;
      let renderer = _this.renderer; 
      let controls =  _this.controls;
      let composer =  new EffectComposer(renderer);
      composer.readBuffer.texture.encoding = THREE.sRGBEncoding;
      composer.writeBuffer.texture.encoding = THREE.sRGBEncoding;
      composer.renderToScreen = false;
      var renderPass = new RenderPass(scene, camera);
      var effectCopy = new ShaderPass(THREE.CopyShader);//CopyShader是为了能将结果输出，普通的通道一般都是不能输出的，要靠CopyShader进行输出
      effectCopy.renderToScreen = true;//设置这个参数的目的是马上将当前的内容输出

      // var bloomPass = new BloomPass(3, 25, 0.1, 512);
      let unParams = _this.unrealBloomPassParams;
      var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      bloomPass.threshold = unParams.bloomThreshold;
      bloomPass.strength = unParams.bloomStrength;
      bloomPass.radius = unParams.bloomRadius;
      renderer.toneMappingExposure =Math.pow( unParams.exposure, 4.0 ) ;
      composer.addPass(renderPass);//渲染当前场景

      composer.addPass(bloomPass);

      //线框渲染器新建
      let params = _this.outlineParams;
      let outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene,camera);
      //设置线框效果
      outlinePass.edgeStrength = Number(params.edgeStrength);
      outlinePass.edgeGlow = Number(params.edgeGlow);
      outlinePass.edgeThickness = Number(params.edgeThickness);
      outlinePass.pulsePeriod = Number(params.pulsePeriod);
      outlinePass.visibleEdgeColor.set("rgb(65, 255, 250)");
      outlinePass.hiddenEdgeColor.set("rgb(255, 255, 250)");
      //效果组合渲染器中 加入线框渲染器
      composer.addPass(outlinePass);

      // 锯齿处理
      let fxaaPass = new ShaderPass(FXAAShader)
      const pixelRatio = renderer.getPixelRatio()
      fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / (window.innerWidth * pixelRatio)
      fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / (window.innerHeight * pixelRatio)
      composer.addPass(fxaaPass)

      _this.composer = composer

      _this.outlinePass = outlinePass
    //   var finalPass = new ShaderPass(
    //       new THREE.ShaderMaterial( {
    //         uniforms: {
    //           baseTexture: { value: null },
    //           bloomTexture: { value: composer.renderTarget2.texture }
    //         },
    //         vertexShader: _this.vertexShader,
    //         fragmentShader: _this.shaderMaterials['fragment-shader-1'],
    //         defines: {}
    //       } ), "baseTexture"
    // );
    // finalPass.needsSwap = true;
    // var finalComposer = new EffectComposer( renderer );
    // finalComposer.addPass( renderPass );
    // finalComposer.addPass( finalPass );
    const bloomVertext = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
      `;

      const bloomFragment = `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
      }
      `;

    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: composer.renderTarget2.texture },
        },
        vertexShader: bloomVertext,
        fragmentShader: bloomFragment,
        defines: {},
      }),
      'baseTexture'
    );
    finalPass.needsSwap = true;
    // 初始化实际效果合成器
    let finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(fxaaPass)
    finalComposer.addPass(renderPass);
    finalComposer.addPass(finalPass);

    _this.finalComposer = finalComposer;
    },
    removeMeshByName(scene,name){
      scene.traverse(function(obj){
        if(obj.name == name){
          scene.remove(obj);
        }
      })
    },
    showLabel(scene,obj,name){
      let box= new THREE.Box3().setFromObject(obj); 
      var worldPosition =_this.getPos(obj); // 初始化一个3D坐标，用来记录模型的世界坐标
      let label = document.createElement('div');
      label.className = "buildingLabel";
      let labelName = document.createElement('div');
      labelName.className = "labelName";
      labelName.innerText=name;//objName[objName.length-1];
      label.appendChild(labelName)

            // let

            // 将dom节点转换为base64编码的图片
      this.$refs.sceneDiv.appendChild(label);
      domtoimage.toPng(label)
      .then((dataUrl) => {
        var texture = new THREE.TextureLoader().load(dataUrl);
        texture.minFilter = THREE.LinearFilter
        var spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
        });
        var sprite = new THREE.Sprite(spriteMaterial); 
        const v3 = new THREE.Vector3()
        sprite.scale.set(20,20,20)
        let boxs= new THREE.Box3().setFromObject(sprite);
        sprite.name = 'label';
        scene.add(sprite);
        sprite.position.set(worldPosition.x+(box.max.y - box.min.y)/2, worldPosition.y+(box.max.y - box.min.y)/2+10, worldPosition.z); 
        // this.$refs.sceneDiv.removeChild(label);
      })
      .catch(function (error) {
        console.error('wrong!', error);
      });
    },
    getPos(obj){
      let box= new THREE.Box3().setFromObject(obj); 
      var Pos = new THREE.Vector3();
      Pos.x = box.min.x+(box.max.x - box.min.x)/2
      Pos.y =box.min.y+(box.max.y - box.min.y)/2
      Pos.z =box.min.z+(box.max.z - box.min.z)/2
      return Pos;
    },
        //获取鼠标坐标 处理点击某个模型的事件
    onmodelClick(event) {
      let _this = this
      let scene = _this.scene
      let camera = _this.camera
      let renderer = _this.renderer 
      let controls =  _this.controls
      let mouse = new THREE.Vector2(); // 初始化一个2D坐标用于存储鼠标位置
      let raycaster = new THREE.Raycaster(); // 初始化光线追踪
      // 获取鼠标点击位置
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children); // 获取点击到的模型的数组，从近到远排列
  
    



            
      var lineMaterial = new THREE.LineBasicMaterial({
        // 线的颜色
        color: "blue",
        transparent: true,
        opacity: 0.8,
        depthFunc: THREE.AlwaysDepth
      });
      if (intersects.length) {
        _this.removeMeshByName(scene,'label');
        _this.removeMeshByName(scene,'wave');
        _this.removeMeshByName(scene,'wall');
        let obj = intersects[0].object
        var worldPosition =_this.getPos(obj); // 初始化一个3D坐标，用来记录模型的世界坐标
        let objName = obj.name.split("/");
        if((filenames['Teaching'].indexOf(objName[objName.length-1])>0)||((filenames['Living'].indexOf(objName[objName.length-1])>0))){
        //  _this.outlinePass.selectedObjects = [intersects[0].object];
        
          // obj.layers.toggle(1);
        // intersects[0].object.add(new THREE.LineSegments(intersects[0].object.geometry, lineMaterial));

          // intersects[0].object.getWorldPosition(worldPosition); // 将点中的3D模型坐标记录到worldPosition中
          let box= new THREE.Box3().setFromObject(obj);
          const path = [
          [box.max.x, 0,box.max.z],
          [box.max.x, 0,box.min.z],
          [box.min.x,0,box.min.z],
          [box.min.x,0, box.max.z],
          [box.max.x, 0,box.max.z],
        ];
        // const wallMat = _this.createFlowWallMat({});
        const wallMesh = creatWallByPath({
          // material: wallMat,
          path,
          height: 1,
        });
        scene.add(wallMesh)
          let r=(box.max.x - box.min.x) > (box.max.z - box.min.z) ? (box.max.x - box.min.x)/2 : (box.max.z - box.min.z)/2;
          // create.createBox(scene,(box.max.x - box.min.x)+1,(box.max.y - box.min.y),(box.max.z - box.min.z)+1,worldPosition.x,worldPosition.y,worldPosition.z);
          let wave = create.createCylinder(scene,r,r+2,2,64,worldPosition.x,0,worldPosition.z,"wave");
          wave.layers.toggle(1)
          modifyMaterial(wave,'wave.jpg');

          var target1 = worldPosition
          var newPos = new THREE.Vector3(worldPosition.x + 100, worldPosition.y +(box.max.y - box.min.y),worldPosition.z + 100);
          var targetPos = worldPosition
          // this.animateCameraFun(camera.position,controls.target,new THREE.Vector3(500,200,500),new THREE.Vector3(0,0,0))
          this.animateCameraFun(camera.position,controls.target,newPos,targetPos)
          // controls.target = worldPosition
          // camera.lookAt(worldPosition);
          // camera.position.set(worldPosition.x + 100, worldPosition.y + 100,worldPosition.z + 100);
            ////---------------------------悬浮图表
            this.showLabel(scene,obj,objName[objName.length-1]);
            ////----------------------------------video
              // let video = document.createElement('video');
              // video.src ='/videos/3.mp4'
              // video.autoplay = "autoplay";
              // var texture = new THREE.VideoTexture(video)
              // texture.minFilter = THREE.LinearFilter
              // var spriteMaterial = new THREE.SpriteMaterial({
              //   map: texture,
              // });
              // var sprite = new THREE.Sprite(spriteMaterial); 
              // const v3 = new THREE.Vector3()
              // sprite.scale.set(10,10,10)
              // let boxs= new THREE.Box3().setFromObject(sprite);

              // scene.add(sprite);
              // sprite.position.set(worldPosition.x, worldPosition.y+(box.max.y - box.min.y)/2, worldPosition.z); 
    
            /////-------------------------
          }
        else{
          _this.removeMeshByName(scene,'label');
          _this.removeMeshByName(scene,'wave');
          _this.outlinePass.selectedObjects = [];
        }
      }
      else{
        // this.animateCameraFun(camera.position,controls.target,new THREE.Vector3(300,400,300),new THREE.Vector3(0,0,0))
      }
    
	
    },
    onmodelMousemove(event){
      let _this = this
      let scene = _this.scene
      let camera = _this.camera
      let renderer = _this.renderer 
      let controls =  _this.controls
      let mouse = new THREE.Vector2(); // 初始化一个2D坐标用于存储鼠标位置
      let raycaster = new THREE.Raycaster(); // 初始化光线追踪
    
      // 获取鼠标点击位置
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children); // 获取点击到的模型的数组，从近到远排列
  
    



      var worldPosition = new THREE.Vector3(); // 初始化一个3D坐标，用来记录模型的世界坐标
      
      if (intersects.length) {
        let obj = intersects[0].object
        let objName = obj.name.split("/");
        if((filenames['Teaching'].indexOf(objName[objName.length-1])>0)||((filenames['Living'].indexOf(objName[objName.length-1])>0))){
         _this.outlinePass.selectedObjects = [intersects[0].object];
        }
        else{
          _this.outlinePass.selectedObjects = [];
        }
      }
    },
    //摄像头聚焦方法
    animateCameraFun(oldPos,oldTarget,newPos,newTarget){
      let _this = this
      let scene = _this.scene
      let camera = _this.camera
      let renderer = _this.renderer 
      let controls =  _this.controls
      let that = this
      // 使用tween动画
      var tween = new TWEEN.Tween({
        x1: oldPos.x, // 相机x
        y1: oldPos.y, // 相机y
        z1: oldPos.z, // 相机z
        x2: oldTarget.x, // 控制点的中心点x
        y2: oldTarget.y, // 控制点的中心点y
        z2: oldTarget.z, // 控制点的中心点z
      });
      tween.to({
        x1: newPos.x,
        y1: newPos.y,
        z1: newPos.z,
        x2: newTarget.x,
        y2: newTarget.y,
        z2: newTarget.z,
      }, 1000);
      tween.easing(TWEEN.Easing.Cubic.InOut);
      tween.onUpdate(function (pos){
          camera.position.x = pos.x1;
          camera.position.y = pos.y1;
          camera.position.z = pos.z1;
          controls.target.x = pos.x2;
          controls.target.y = pos.y2;
          controls.target.z = pos.z2;
          controls.update();
      })
      // 开始动画
      tween.start()
    },
    initShaderMaterialsData () {
      this.vertexShader = `    
      uniform float time;
      varying vec2 vUv;
      void main()
      {
        vec3 posChanged = position;
        posChanged.x = posChanged.x*(abs(sin(time*1.0)));
        posChanged.y = posChanged.y*(abs(cos(time*1.0)));
        posChanged.z = posChanged.z*(abs(sin(time*1.0)));
        //gl_Position = projectionMatrix * modelViewMatrix * vec4(position*(abs(sin(time)/2.0)+0.5),1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,1.0);
      }`
      this.shaderMaterials['fragment-shader-1'] = `precision highp float;
      uniform float time;
      uniform float alpha;
      uniform vec2 resolution;
      varying vec2 vUv;

      void main2(void)
      {
        vec2 position = vUv;
        float red = 1.0;
        float green = 0.25 + sin(time) * 0.25;
        float blue = 0.0;
        vec3 rgb = vec3(red, green, blue);
        vec4 color = vec4(rgb, alpha);
        gl_FragColor = color;
      }

      #define PI 3.14159
      #define TWO_PI (PI*2.0)
      #define N 68.5

      void main(void)
      {
        vec2 center = (gl_FragCoord.xy);
        center.x=-10.12*sin(time/200.0);
        center.y=-10.12*cos(time/200.0);

        vec2 v = (gl_FragCoord.xy - resolution/20.0) / min(resolution.y,resolution.x) * 15.0;
        v.x=v.x-10.0;
        v.y=v.y-200.0;
        float col = 0.0;

        for(float i = 0.0; i < N; i++)
        {
          float a = i * (TWO_PI/N) * 61.95;
          col += cos(TWO_PI*(v.y * cos(a) + v.x * sin(a) + sin(time*0.004)*100.0 ));
        }
        col /= 5.0;
        gl_FragColor = vec4(col*1.0, -col*1.0,-col*4.0, 1.0);
      }`
      this.shaderMaterials['fragment-shader-2'] = `
      uniform float time;
      uniform vec2 resolution;
      #define CGFloat float
      #define M_PI 3.14159265359

      vec3 hsvtorgb(float h, float s, float v)
      {
        float c = v * s;
        h = mod((h * 6.0), 6.0);
        float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
        vec3 color;

        if (0.0 <= h && h < 1.0)
        {
          color = vec3(c, x, 0.0);
        }
        else if (1.0 <= h && h < 2.0)
        {
          color = vec3(x, c, 0.0);
        }
        else if (2.0 <= h && h < 3.0)
        {
          color = vec3(0.0, c, x);
        }
        else if (3.0 <= h && h < 4.0)
        {
          color = vec3(0.0, x, c);
        }
        else if (4.0 <= h && h < 5.0)
        {
          color = vec3(x, 0.0, c);
        }
        else if (5.0 <= h && h < 6.0)
        {
          color = vec3(c, 0.0, x);
        }
        else
        {
          color = vec3(0.0);
        }

        color += v - c;

        return color;
      }

      void main(void)
      {

        vec2 position = (gl_FragCoord.xy - 0.5 * resolution) / resolution.y;
        float x = position.x;
        float y = position.y;

        CGFloat a = atan(x, y);

        CGFloat d = sqrt(x*x+y*y);
        CGFloat d0 = 0.5*(sin(d-time)+1.5)*d;
        CGFloat d1 = 5.0;

        CGFloat u = mod(a*d1+sin(d*10.0+time), M_PI*2.0)/M_PI*0.5 - 0.5;
        CGFloat v = mod(pow(d0*4.0, 0.75),1.0) - 0.5;

        CGFloat dd = sqrt(u*u+v*v);

        CGFloat aa = atan(u, v);

        CGFloat uu = mod(aa*3.0+3.0*cos(dd*30.0-time), M_PI*2.0)/M_PI*0.5 - 0.5;

        CGFloat d2 = sqrt(uu*uu+v*v)*1.5;

        gl_FragColor = vec4( hsvtorgb(dd+time*0.5/d1, sin(dd*time), d2), 1.0 );
      }`
      this.shaderMaterials['fragment-shader-3'] = `uniform vec2 resolution;
      uniform float time;
      vec2 rand(vec2 pos)
      {
        return fract( 0.00005 * (pow(pos+2.0, pos.yx + 1.0) * 22222.0));
      }
      vec2 rand2(vec2 pos)
      {
        return rand(rand(pos));
      }

      float softnoise(vec2 pos, float scale)
      {
        vec2 smplpos = pos * scale;
        float c0 = rand2((floor(smplpos) + vec2(0.0, 0.0)) / scale).x;
        float c1 = rand2((floor(smplpos) + vec2(1.0, 0.0)) / scale).x;
        float c2 = rand2((floor(smplpos) + vec2(0.0, 1.0)) / scale).x;
        float c3 = rand2((floor(smplpos) + vec2(1.0, 1.0)) / scale).x;

        vec2 a = fract(smplpos);
        return mix(
        mix(c0, c1, smoothstep(0.0, 1.0, a.x)),
        mix(c2, c3, smoothstep(0.0, 1.0, a.x)),
        smoothstep(0.0, 1.0, a.y));
      }

      void main(void)
      {
        vec2 pos = gl_FragCoord.xy / resolution.y;
        pos.x += time * 0.1;
        float color = 0.0;
        float s = 1.0;
        for(int i = 0; i < 8; i++)
        {
          color += softnoise(pos+vec2(i)*0.02, s * 4.0) / s / 2.0;
          s *= 2.0;
        }
        gl_FragColor = vec4(color);
      }`
      this.shaderMaterials['fragment-shader-4'] = `uniform float time;
      uniform vec2 resolution;
      vec2 rand(vec2 pos)
      {
        return fract((pow(pos+2.0,pos.yx+2.0)*555555.0));
      }

      vec2 rand2(vec2 pos)
      {
        return rand(rand(pos));
      }

      float softnoise(vec2 pos, float scale) {
        vec2 smplpos = pos * scale;
        float c0 = rand2((floor(smplpos) + vec2(0.0, 0.0)) / scale).x;
        float c1 = rand2((floor(smplpos) + vec2(1.0, 0.0)) / scale).x;
        float c2 = rand2((floor(smplpos) + vec2(0.0, 1.0)) / scale).x;
        float c3 = rand2((floor(smplpos) + vec2(1.0, 1.0)) / scale).x;

        vec2 a = fract(smplpos);
        return mix(mix(c0, c1, smoothstep(0.0, 1.0, a.x)),
        mix(c2, c3, smoothstep(0.0, 1.0, a.x)),
        smoothstep(0.0, 1.0, a.x));
      }

      void main( void ) {
        vec2 pos = gl_FragCoord.xy / resolution.y - time * 0.4;

        float color = 0.0;
        float s = 1.0;
        for (int i = 0; i < 6; ++i) {
          color += softnoise(pos + vec2(0.01 * float(i)), s * 4.0) / s / 2.0;
          s *= 2.0;
        }
        gl_FragColor = vec4(color,mix(color,cos(color),sin(color)),color,1);
      }`
      this.shaderMaterials['fragment-shader-5'] = `uniform float time;
      uniform vec2 resolution;
      void main( void ) {

        vec3 color = vec3(1.0, 0., 0.);
        vec2 pos = (( 1.4 * gl_FragCoord.xy - resolution.xy) / resolution.xx)*1.5;
        float r=sqrt(pos.x*pos.x+pos.y*pos.y)/15.0;
        float size1=2.0*cos(time/60.0);
        float size2=2.5*sin(time/12.1);

        float rot1=13.00; //82.0+16.0*sin(time/4.0);
        float rot2=-50.00; //82.0+16.0*sin(time/8.0);
        float t=sin(time);
        float a = (60.0)*sin(rot1*atan(pos.x-size1*pos.y/r,pos.y+size1*pos.x/r)+time);
        a += 200.0*acos(pos.x*2.0+cos(time/2.0))+asin(pos.y*5.0+sin(time/2.0));
        a=a*(r/50.0);
        a=200.0*sin(a*5.0)*(r/30.0);
        if(a>5.0) a=a/200.0;
        if(a<0.5) a=a*22.5;
        gl_FragColor = vec4( cos(a/20.0),a*cos(a/200.0),sin(a/8.0), 1.0 );
      }`
      this.shaderMaterials['fragment-shader-6'] = `uniform float time;
      uniform vec2 resolution;
      void main( void )
      {

        vec2 uPos = ( gl_FragCoord.xy / resolution.xy );//normalize wrt y axis
        //suPos -= vec2((resolution.x/resolution.y)/2.0, 0.0);//shift origin to center

        uPos.x -= 1.0;
        uPos.y -= 0.5;

        vec3 color = vec3(0.0);
        float vertColor = 2.0;
        for( float i = 0.0; i < 15.0; ++i )
        {
          float t = time * (0.9);
          uPos.y += sin( uPos.x*i + t+i/2.0 ) * 0.1;
          float fTemp = abs(1.0 / uPos.y / 100.0);
          vertColor += fTemp;
          color += vec3( fTemp*(10.0-i)/10.0, fTemp*i/10.0, pow(fTemp,1.5)*1.5 );
        }
        vec4 color_final = vec4(color, 1.0);
        gl_FragColor = color_final;
      }`
    },
  },
  created() {
    var _this = this ;
    let sceneLiving = create.Scene();
    let sceneTeaching = create.Scene();
    let camera = create.PerspectiveCamera();
    let renderer = create.Rendererr();
    renderer.toneMapping = THREE.ReinhardToneMapping;
    let controls = create.Controls(camera,renderer);
    _this.initShaderMaterialsData() // 初始化着色器材质
    create.init(camera,renderer);
    //添加相机
    sceneLiving.add(camera);
    sceneTeaching.add(camera);
    //添加辅助坐标轴
    // scene.add(axesHelper);
    //添加物体
    create.createBuildingGLTF(sceneTeaching,'Teaching_Ground',0,0,0);
    create.createBuildingGLTF(sceneLiving,'Livinging_Ground',0,0,0);
    create.createBuildingIFC(sceneTeaching,'生活区单独模型/2号楼',0,0,0);
    create.createBuildingIFC(sceneTeaching,'生活区单独模型/3号楼',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/3号楼',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/4号楼北',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/4号楼南',0,0,0);
    // console.log(filenames)
    // for(let i in filenames['Teaching']){
    //   let name = filenames['Teaching'][i]
    //   create.createBuildingIFC(sceneTeaching,'教学区单独模型/'+name,0,0,0);
    // }
    // for(let i in filenames['Living']){
    //   let name = filenames['Living'][i]
    //   create.createBuildingIFC(sceneLiving,'生活区单独模型/'+name,0,0,0);
    // }
    // create.createBox(sceneTeaching,100,100,100,0,0,0)
    create.createAmbientLinght(sceneTeaching);
    create.createDirectionalLight(sceneTeaching,1000,2000,1000);
    create.createAmbientLinght(sceneLiving);
    create.createDirectionalLight(sceneLiving,1000,2000,1000);
    
    // create.createPointLinght(500,800,500,10000,2)
    create.changeSky(sceneTeaching,"night")
    // create.Animate(controls,scene,camera,renderer)

    //更改渲染器
    
    _this.scene = sceneTeaching;
    _this.sceneLiving = sceneLiving;
    _this.sceneTeaching = sceneTeaching;
    _this.camera = camera;
    _this.renderer = renderer;
    _this.controls = controls;
    // _this.outline();
    let ans0 = _this.creatComposer(sceneLiving,camera,renderer)
    _this.composerLiving = ans0[0];
    _this.finalComposerLiving = ans0[1];
    _this.outlinePassLiving = ans0[2];
    let ans1 = _this.creatComposer(sceneTeaching,camera,renderer)
    _this.composerTeaching = ans1[0];
    _this.finalComposerTeaching = ans1[1];
    _this.outlinePassTeaching = ans1[2];
    _this.composer = _this.composerTeaching;
    _this.finalComposer = _this.finalComposerTeaching;
    _this.outlinePass = _this.outlinePassTeaching;
  },
  mounted() {
    var _this = this
    let scene = _this.scene;
    let camera = _this.camera;
    let renderer = _this.renderer; 
    let controls =  _this.controls;
    let composer = _this.composer;
    let finalComposer = _this.finalComposer;


    this.$refs.sceneDiv.appendChild(renderer.domElement)
    this.$refs.sceneDiv.appendChild(stats.domElement);
    this.$refs.sceneDiv.addEventListener("click", this.onmodelClick); // 监听点击事件
    this.$refs.sceneDiv.addEventListener("mousemove", this.onmodelMousemove); // 监听点击事件
    create.Animate(controls,scene,camera,renderer,composer,finalComposer)
}
} 
</script>

<style>
@import './index.css';
</style>
