
import Stats  from 'three/examples/jsm/libs/stats.module'

//stats对象初始化  
let stats = new Stats();  
stats.domElement.style.position = 'absolute'; //绝对坐标  
stats.domElement.style.left = '100px';// (0,0)px,左上角  
stats.domElement.style.top = '100px';  

export default stats;