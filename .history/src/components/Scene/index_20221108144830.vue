<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="scene" ref="sceneDiv"></div>
</template>
  
<script>

import { onMounted, ref} from 'vue';
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import TWEEN from '@tweenjs/tween.js'
import axesHelper from "@/three/axesHelper";
import create from "@/three/create";
//控制天空盒
import changeSky from "@/three/sky";
import domtoimage from 'dom-to-image';
//场景元素div
export default {
  props: ["type"],
  data() {
    return {
      camera:null,
      scene:null,
      sceneType:"",
      sceneLiving:null,
      sceneTeaching:null,
      renderer:null,
      controls:null,
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
    };
  },
  watch: {
    type(val){
      console.log(val)
      let _this = this
      let scene = _this.scene
      let camera = _this.camera
      let renderer = _this.renderer 
      let controls =  _this.controls
      if(_this.sceneType != val){
        _this.animateCameraFun(camera.position,controls.target,new THREE.Vector3(300,400,300),new THREE.Vector3(0,0,0))
        if("Living" == val){
          _this.scene = _this.sceneLiving
          scene = _this.scene
          create.Animate(controls,scene,camera,renderer)
        }
        else if("Teaching" == val){
          _this.scene = _this.sceneTeaching
          scene = _this.scene
          create.Animate(controls,scene,camera,renderer)
        }
        _this.sceneType = val
      }
    }
  },
  methods: {
    //高亮显示模型（呼吸灯）
    outlineObj (selectedObjects) {
      let _this = this
      let scene = _this.scene
      let camera = _this.camera
      let renderer = _this.renderer 
      let controls =  _this.controls
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      this.composer = new EffectComposer(renderer)
      // 新建一个场景通道  为了覆盖到原理来的场景上
      this.renderPass = new RenderPass(scene,camera)
      this.composer.addPass(this.renderPass);
      // 物体边缘发光通道
      this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene,camera, selectedObjects)
      this.outlinePass.selectedObjects = selectedObjects
      this.outlinePass.edgeStrength = 10.0 // 边框的亮度
      this.outlinePass.edgeGlow = 1// 光晕[0,1]
      this.outlinePass.usePatternTexture = false // 是否使用父级的材质
      this.outlinePass.edgeThickness = 1.0 // 边框宽度
      this.outlinePass.downSampleRatio = 1 // 边框弯曲度
      this.outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
      this.outlinePass.visibleEdgeColor.set(parseInt(0x00ff00)) // 呼吸显示的颜色
      this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
      this.outlinePass.clear = true
      this.composer.addPass(this.outlinePass)
      // 自定义的着色器通道 作为参数
      var effectFXAA = new ShaderPass(FXAAShader)
      effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
      effectFXAA.renderToScreen = true
      this.composer.addPass(effectFXAA)
    },
        //获取鼠标坐标 处理点击某个模型的事件
    onmodelclick(event) {
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
    
      console.log(intersects);
    


      this.outlineObj(intersects)
      var worldPosition = new THREE.Vector3(); // 初始化一个3D坐标，用来记录模型的世界坐标
      
      if (intersects.length) {
        // for ( var i = 0; i < intersects.length; i++ ) {
        //     intersects[i].object.material.color.set( 0xff0000 );
        // }

          // intersects[0].object.getWorldPosition(worldPosition); // 将点中的3D模型坐标记录到worldPosition中
          let box= new THREE.Box3().setFromObject(intersects[0].object);
          console.log(box)
          worldPosition.x = box.min.x+(box.max.x - box.min.x)/2
          worldPosition.y =box.min.y+(box.max.y - box.min.y)
          worldPosition.z =box.min.z+(box.max.z - box.min.z)/2

          var target1 = worldPosition
          var newPos = new THREE.Vector3(worldPosition.x + 100, worldPosition.y +(box.max.y - box.min.y),worldPosition.z + 100);
          var targetPos = worldPosition
          // this.animateCameraFun(camera.position,controls.target,new THREE.Vector3(500,200,500),new THREE.Vector3(0,0,0))
          this.animateCameraFun(camera.position,controls.target,newPos,targetPos)
          // controls.target = worldPosition
          // camera.lookAt(worldPosition);
          // camera.position.set(worldPosition.x + 100, worldPosition.y + 100,worldPosition.z + 100);
            ////---------------------------悬浮图表
            // 将dom节点转换为base64编码的图片
            // domtoimage.toPng(document.getElementById("video_0"))
            // .then((dataUrl) => {
    
            //   var texture = new THREE.TextureLoader().load(dataUrl);
    
            //   var spriteMaterial = new THREE.SpriteMaterial({
            //     map: texture,//设置精灵纹理贴图
            //   });
            //   var sprite = new THREE.Sprite(spriteMaterial); // 精灵模型，不管从哪个角度看都可以一直面对你

              
            //   const v3 = new THREE.Vector3()
            //   sprite.scale.set(100,100,100)
            //   let boxs= new THREE.Box3().setFromObject(sprite);
            //   console.log(sprite,boxs.getSize(v3),v3)

            //   scene.add(sprite);
            //             sprite.position.set(worldPosition.x, worldPosition.y + v3.y/2, worldPosition.z); // 根据刚才获取的世界坐标设置精灵模型位置，高度加了3，是为了使精灵模型显示在点击模型的上方
    
            // })
            // .catch(function (error) {
            //   console.error('oops, something went wrong!', error);
            // });
            /////-------------------------
      }
      else{
        // this.animateCameraFun(camera.position,controls.target,new THREE.Vector3(300,400,300),new THREE.Vector3(0,0,0))
      }
    
	
    },//摄像头聚焦方法
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
  },
  created() {
    var _this = this 
    let sceneLiving = create.Scene()
    let sceneTeaching = create.Scene()
    let camera = create.PerspectiveCamera()
    let renderer = create.Rendererr()
    let controls = create.Controls(camera,renderer)
    create.init(camera,renderer)
    //添加相机
    sceneLiving.add(camera);
    sceneTeaching.add(camera);
    //添加辅助坐标轴
    // scene.add(axesHelper);
    //添加物体
    // create.createBuildings('Living01',0,0,0);
    // create.createBuildings('Living02',0,0,0);
    // for(var i=0;i<30;i++){
      
    // create.createBuildings('Teaching02',i*30,0,i*30);
    // }
    // create.createBuildings('Teaching02',0,0,0);

    const path = require("path");
    //读取文件的路径 是否遍历文件的子目录 匹配文件正则表达式
    const files = require.context("@/public", false, /\.(ifc)$/);
     //files(key).default拿到该模块的vue对象
     files.keys().forEach(key => {
       const name = path.basename(key);
       console.log(name)
      //  const a = { url: require("@/assets/serve/" + name), name: name }
      //  this.serviceImg.push(a)
     });

    create.createBuildingGLTF(sceneTeaching,'Teaching_Ground',0,0,0);
    create.createBuildingIFC(sceneTeaching,'Teaching_library',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/2号楼',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/3号楼',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/4号楼北',0,0,0);
    // create.createBuildingIFC(sceneLiving,'生活区单独模型/4号楼南',0,0,0);


  // create.createBuildingIFC('教学区单独模型/笃学楼（10教）',0,0,0);
  // create.createBuildingIFC('教学区单独模型/科技馆和国际教育中心',0,0,0);
  // create.createBuildingIFC('教学区单独模型/力行楼（9教）',0,0,0);
  // create.createBuildingOBJ('Teaching_library',0,0,0);
  // create.createBuildingGLTF('Teaching_library',0,0,0);
  // create.createBuildings('楼001',0,0,0);
  // create.createBuilding('building3',100,0,300);
  // create.createBuilding('building4',150,0,150);
  // create.createBuilding('building5',200,0,20);
  // create.createBuilding('building6',250,0,120);
  // create.createBuilding('building7',300,0,20);
  // create.createScene()
  
    create.createBox(sceneLiving,1000,0,1000,0,0,0)
    create.createAmbientLinght(sceneTeaching)
    create.createDirectionalLight(sceneTeaching,1000,2000,1000)
    create.createAmbientLinght(sceneLiving)
    create.createDirectionalLight(sceneLiving,1000,2000,1000)
    // create.createPointLinght(500,800,500,10000,2)
    // changeSky("night")
    // create.Animate(controls,scene,camera,renderer)
    _this.scene = sceneLiving
    _this.sceneLiving = sceneLiving
    _this.sceneTeaching = sceneTeaching
    _this.camera = camera
    _this.renderer = renderer
    _this.controls = controls
  },
  mounted() {
    var _this = this
    console.log(11111,_this)
    let scene = _this.scene
    let camera = _this.camera
    let renderer = _this.renderer 
    let controls =  _this.controls
    this.$refs.sceneDiv.appendChild(renderer.domElement)
    this.$refs.sceneDiv.addEventListener("click", this.onmodelclick); // 监听点击事件
    create.Animate(controls,scene,camera,renderer)
}
} 
</script>

<style>
@import './index.css';
</style>
