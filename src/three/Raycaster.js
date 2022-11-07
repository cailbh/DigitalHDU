
import { Raycaster } from "three";
import { sprite1 } from "./Sprite";
import * as THREE from "three";
import scene from "./scene";
//
// 计算 以画布 开始为（0，0）点 的鼠标坐标
function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect()
    return {
        x: ((event.clientX - rect.left) * canvas.width) / rect.width,
        y: ((event.clientY - rect.top) * canvas.height) / rect.height
    }
}
/**
* 获取鼠标在three.js 中归一化坐标
* */
function setPickPosition(event) {
    let pickPosition = { x: 0, y: 0 }

    // 计算后 以画布 开始为 （0，0）点
    const pos = getCanvasRelativePosition(event)

    // 数据归一化
    pickPosition.x = (pos.x / canvas.width) * 2 - 1
    pickPosition.y = (pos.y / canvas.height) * -2 + 1

    return pickPosition
}
// 监听鼠标
//定义鼠标事件
var clickflag = false;
function setupVideo() {
    if ((Math.abs(e.x - sprite1.x) <= 0.1 && Math.abs(e.y - sprite1.y) <= 0.1)) {
        if (clickflag = true) {
            clickflag = false
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
            scene.add(mesh);
        }
        else {
            scene.remove(mesh);
        }
    }
}
setEventsMouse()
function setEventsMouse() {
    //mouse move
    window.addEventListener('mousemove', onRay)

    //点击了鼠标左键
    window.addEventListener('click', function (e) {
        if (e.button === 0) {
            console.log("点击了鼠标左键");
        }
    });
    //鼠标点击icon
    window.addEventListener('click', setupVideo());

    //点击了鼠标右键
    window.addEventListener('contextmenu', function (e) {
        if (e.button === 2) {
            console.log("点击了鼠标右键");
        }
    });

    // //鼠标移动坐标2D坐标
    // window.addEventListener('mousemove', function (e) {
    //   console.log('x:' + e.x);
    //   console.log('y:' + e.y);
    // });
}
var lastPick = null
function onRay(event) {
    let pickPosition = setPickPosition(event)

    const raycaster = new Raycaster()
    raycaster.setFromCamera(pickPosition, camera)
    // 计算物体和射线的交点
    const intersects = raycaster.intersectObjects(scene.children, true)

    // 数组大于0 表示有相交对象
    if (intersects.length > 0) {
        if (lastPick) {
            lastPick.object.material.color.set('yellow')
        }
        lastPick = intersects[0]
    } else {
        if (lastPick) {
            // 复原
            lastPick.object.material.color.set(0x6688aa)
            lastPick = null
        }
    }
}