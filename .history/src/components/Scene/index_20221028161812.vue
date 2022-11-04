<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="scene" ref="sceneDiv"></div>
</template>
  
  <script setup>
  
  import { onMounted, ref} from 'vue';
  import * as THREE from "three";
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
  
  //场景元素div
  let sceneDiv = ref(null);
  //添加相机
  scene.add(camera);
  //添加辅助坐标轴
  scene.add(axesHelper);
  //添加物体
  // create.createBuilding('building1',0,0,0);
  // create.createBuilding('building2',10,0,10);
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
  onMounted(()=>{
    sceneDiv.value.appendChild(renderer.domElement)
    animate();
   
  })
  
  </script>
  
  <style>
  @import './index.css';
  </style>
  