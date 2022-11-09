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
//导入场景
import scene from "@/three/scene";
//导入相机
import camera from "@/three/camera";
// 导入GUI
// import gui from "@/three/gui";
//导入渲染器
import renderer from "@/three/renderer";
//导入每一帧执行函数
import animate from "@/three/animate";
//导入坐标轴
import axesHelper from "@/three/axesHelper";
//导入初始化调整屏幕
import "@/three/init";
//导入控制器
// import controls from "@/three/controls";
//导入物体
import create from "@/three/create";
//控制天空盒
import changeSky from "@/three/sky";
import domtoimage from 'dom-to-image';
//场景元素div
export default {
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
    };
  },
  watch: {
  },
  methods: {
    //高亮显示模型（呼吸灯）
    outlineObj (selectedObjects) {
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

          intersects[0].object.getWorldPosition(worldPosition); // 将点中的3D模型坐标记录到worldPosition中
          let box= new THREE.Box3().setFromObject(intersects[0].object);
          console.log(box)
          worldPosition.x +=(box.max.x - box.min.x)/2
          worldPosition.y +=(box.max.y - box.min.y)
          worldPosition.z +=(box.max.z - box.min.z)/2
          camera.position.set(worldPosition.x + 20, worldPosition.y + 20,worldPosition.z + 20);
            ////---------------------------悬浮图表
            // 将dom节点转换为base64编码的图片
            // domtoimage.toPng(document.getElementById("teachersContain"))
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
    
	
}
  },
  created() {
  //添加相机
  scene.add(camera);
  //添加辅助坐标轴
  scene.add(axesHelper);
  //添加物体
  create.createBuildings('Living01',100,0,0);
  create.createBuildings('Living02',0,0,100);
  // create.createBuilding('building3',100,0,300);
  // create.createBuilding('building4',150,0,150);
  // create.createBuilding('building5',200,0,20);
  // create.createBuilding('building6',250,0,120);
  // create.createBuilding('building7',300,0,20);
  // create.createScene()
  create.createBox(500,0,500)
  create.createAmbientLinght()
  // changeSky("night")
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
	directionalLight.position.set(500,200,500)
	directionalLight.target.position.set(-4,0,-4);				
	// directionalLight.position.normalize();
  directionalLight.castShadow = true

  scene.add( directionalLight );
  },
  mounted() {
    this.$refs.sceneDiv.appendChild(renderer.domElement)
    window.addEventListener("click", this.onmodelclick); // 监听点击事件
    animate();
   
  
}
} 
</script>

<style>
@import './index.css';
</style>
