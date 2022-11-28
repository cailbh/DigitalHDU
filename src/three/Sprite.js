import { SpriteMaterial } from "three";
//导入模型
var spriteMaterial= new SpriteMaterial({
    map: new THREE.TextureLoader().load("icon2.png"), //设置精灵纹理贴图
    transparent: true,//开启透明(纹理图片png有透明信息)
  });
  // 创建精灵模型对象，不需要几何体geometry参数
 const sprite1 = new THREE.Sprite(spriteMaterial);
  sprite1.scale.set(0.3, 0.3, 0.2); //精灵大小
  //以上，再多弄几个精灵，分别绑到不同的建筑上面
//   // 把精灵模型插入到模型对象的父对象下面
      // // 把精灵模型插入到模型对象的父对象下面
      // mesh.add(sprite);
      // // 父对象group位置变化,网格模型及其对象的标签同样发生变化
      // mesh.position.set(10, 0, 0);
//   sprite1.translateZ(1);
//   sprite1.translateY(1);
  export default sprite1;