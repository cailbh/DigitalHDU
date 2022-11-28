
//使用CSS2D制作二维标签
import { CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer"
//外面传入一个var类型变量，在里面加工为css2d，return出来
function create2DObject(label1) {
    
    var div = document.createElement('div');
    /*给标签设置你想要的的样式*/
    div.style.width = '200px';
    div.style.height = '100px';
    div.style.background = 'rgba(10,18,51,0.8)';
    div.style.color = '#fff'
    div.textContent = 'monitor'
    div.className = 'label'
    
    label1 = new CSS2DObject(div);
    return label1;
  }
  export function create2DObject();


