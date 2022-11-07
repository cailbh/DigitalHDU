


//使用CSS2D制作二维标签
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"
//导入模型


let labelRenderer;

const noteBtn = document.createElement('div');
earthDiv.style.marginTop = '-1em';
//给每一个模型套上标签
const note1 = new CSS2DObject(earthDiv);
note1.position.set(0, EARTH_RADIUS, 0);
note1.className = 'label1';
note1.textContent = 'monitor';
earth.add(note1);

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
    
})



//导出每个标签
export default note1;

