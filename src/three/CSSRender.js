import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"

//css渲染器
const CSSRender = new CSS2DRenderer({
    antialias: true,
})
// 设置渲染尺寸大小
CSSRender.setSize(window.innerWidth, window.innerHeight);
CSSRender.shadowMap.enabled = true;
export default CSSRender;