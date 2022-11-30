import * as THREE from "three";

function modifyMaterial(mesh,textureurl) {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  var textureLoader = new THREE.TextureLoader();
 // 加载纹理贴图
  var texture = textureLoader.load('/textures/'+textureurl);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
  texture.repeat.set(1, 1)
  texture.needsUpdate = true
  let material = [
    new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true
    }),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    })
  ]
// 设置重复次数
// texture.repeat.set(100, 100)
// let material = new THREE.MeshBasicMaterial({
//   map: texture,  // 使用纹理贴图
//     side: THREE.DoubleSide  // 两面都渲染
// });
  

  mesh.material = material
}
export default modifyMaterial;
