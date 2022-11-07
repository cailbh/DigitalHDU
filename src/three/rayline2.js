// 引入
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader.js';

//初始化
// postprocessing
const size = renderer.getSize(new THREE.Vector2());
const _pixelRatio = renderer.getPixelRatio();
const _width = size.width;
const _height = size.height;
const renderTarget = new THREE.WebGLRenderTarget(
    _width * _pixelRatio,
    _height * _pixelRatio,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
    }
);
renderTarget.texture.name = "EffectComposer.rt1";
composer = new EffectComposer(renderer, renderTarget);
// composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
composer.addPass(outlinePass);

// const textureLoader = new THREE.TextureLoader();
// textureLoader.load('assets/tri_pattern.jpg', function (texture) {
//
//     outlinePass.patternTexture = texture;
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//
// });

effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
composer.addPass(effectFXAA);

outlinePass.visibleEdgeColor.set(outlineColor[0]); // 边缘可见部分发颜色 sColor[0].color
outlinePass.hiddenEdgeColor.set(outlineColor[1]); // 边缘遮挡部分发光颜色 sColor[1].color
outlinePass.edgeStrength = Number(10.0); //边框的亮度
outlinePass.edgeGlow = Number(1); //光晕[0,1]
outlinePass.edgeThickness = Number(1.0); //边缘浓度
outlinePass.pulsePeriod = Number(1.8); //呼吸闪烁的速度 闪烁频率 ，默认0 ，值越大频率越低
outlinePass.usePatternTexture = false; //是否使用父级的材质
outlinePass.downSampleRatio = 2; // 边框弯曲度
outlinePass.clear = true;

// animate render里
renderer.render(scene, camera);
composer.render();

export {outlinePass};