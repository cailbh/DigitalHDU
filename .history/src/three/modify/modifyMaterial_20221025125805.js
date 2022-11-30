import * as THREE from "three";

function modifyMaterial(mesh) {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  var textureLoader = new THREE.TextureLoader();
 // 加载纹理贴图
  var texture = textureLoader.load('/textures/asphalt1.png');

  // // 加载法线/凹凸贴图
//   var textureNB = textureLoader.load('/textures/asphalt.jpg');
// // 法线贴图
// var material = new THREE.MeshPhongMaterial({
//     map: texture, // 普通颜色纹理贴图
//     normalMap: textureNB, //法线贴图
//     //设置深浅程度，默认值(1,1)。
//     normalScale: new THREE.Vector2(1.2, 1.2),
//   }); //材质对象Material

texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
// 设置重复次数
texture.repeat.set(100, 100)
let material = new THREE.MeshBasicMaterial({
  map: texture,  // 使用纹理贴图
    side: THREE.DoubleSide  // 两面都渲染
});
  

  mesh.material = material
}
export default modifyMaterial;
