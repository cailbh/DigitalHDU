<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
    <div class="scene" ref="sceneDiv"></div>
</template>
  
<script>

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
 
 
	var worldPosition = new THREE.Vector3(); // 初始化一个3D坐标，用来记录模型的世界坐标
 
	if (intersects.length) {
		intersects[0].object.getWorldPosition(worldPosition); // 将点中的3D模型坐标记录到worldPosition中
 
        // 将dom节点转换为base64编码的图片
        domtoimage.toPng(document.getElementById("节点ID"))
				.then((dataUrl) => {
 
					var texture = new THREE.TextureLoader().load(dataUrl);
 
					var spriteMaterial = new THREE.SpriteMaterial({
						map: texture,//设置精灵纹理贴图
					});
					sprite = new THREE.Sprite(spriteMaterial); // 精灵模型，不管从哪个角度看都可以一直面对你
					scene.add(sprite);
 
                    sprite.position.set(worldPosition.x, worldPosition.y + 3, worldPosition.z); // 根据刚才获取的世界坐标设置精灵模型位置，高度加了3，是为了使精灵模型显示在点击模型的上方
 
				})
				.catch(function (error) {
					console.error('oops, something went wrong!', error);
				});
	}
 
	
}
  },
  created() {
  //添加相机
  scene.add(camera);
  //添加辅助坐标轴
  scene.add(axesHelper);
  //添加物体
  create.createBuilding('Living01',0,0,0);
  create.createBuilding('Living02',0,0,0);
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
