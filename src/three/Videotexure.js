

//使用CSS2D制作二维标签
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"
//导入模型
import { Scene } from "three";
var video;
video.src = "tmy.mp4"; // 设置视频地址
video.autoplay = "autoplay"; //要设置播放
// video对象作为VideoTexture参数创建纹理对象
var texture = new THREE.VideoTexture(video)
var geometry = new THREE.PlaneGeometry(200, 71); //矩形平面
var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh


let labelRenderer;

const noteBtn = document.createElement('div');
earthDiv.style.marginTop = '-1em';
//给每一个模型套上标签
const note1 = new CSS2DObject(earthDiv);
note1.position.set(0, EARTH_RADIUS, 0);
note1.className = 'label1';
note1.textContent = 'monitor';
earth.add(note1);

const Btnclose = document.createElement('div');
earthDiv.style.marginTop = '-1em';
//给每一个模型套上标签
const Btnclose1 = new CSS2DObject(earthDiv);
Btnclose1.position.set(0, 220, 0);
Btnclose1.className = 'label1';
Btnclose1.textContent = 'monitor';
mseh.add(Btnclose1);

//

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

// events handler
//给标签加上鼠标点击事件，使其弹出视频
note1.addEventListener('click', function (e) {
    //note1.visible = false
    Scene.add(mesh); //添加视频
})
Btnclose1.addEventListener('click', function (e) {
    //note1.visible = false
    Scene.remove(mesh); //移除视频
})



//导出每个标签
export default note1;

