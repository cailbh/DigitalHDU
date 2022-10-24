//import * as THREE from "three";
import vertex from "@/shader/planeColor/basic/vertex.glsl";
import fragment from "@/shader/planeColor/basic/fragment.glsl";

function shaderColor(mesh) {
  // console.log(mesh);
  // 传递unfiorm变量
  //模型着色
  mesh.material.onBeforeCompile = (shader) => {
    // console.log(shader.vertexShader);
    // console.log(shader.fragmentShader);
    shader.fragmentShader = fragment;
    shader.vertexShader = vertex;
    
  };
}
export default shaderColor;
