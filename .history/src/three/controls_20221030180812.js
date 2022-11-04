import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "./camera";
import renderer from "./renderer";

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
// controls.autoRotate = true;
// 缩放范围
// controls.maxDistance = 200 

// controls.minDistance = 100 
// controls.maxAzimuthAngle= Math.PI/2;

controls.maxPolarAngle= Math.PI/2 -0.1;

export default controls;
