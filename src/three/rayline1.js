import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'E:/threejswork/js/THREE.MeshLine'

//模型线条化
// 生成一段贝赛尔曲线
const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-100, 0, 0),
    new THREE.Vector3(-50, 150, 0),
    new THREE.Vector3(200, 150, 0),
    new THREE.Vector3(100, 0, 0)
  )
  // 获取这段线上51个坐标点
  const points = curve.getPoints(50)
  // 将坐标数据存入positions中
  const positions = []
  for (let j = 0; j < points.length; j++) {
    positions.push(points[j].x, points[j].y, points[j].z)
  }
  // 初始化MeshLine
  const line = new MeshLine()
  // 传入顶点坐标数据
  line.setPoints(positions)
  // 获取纹理，官方案例中的纹理
  this.texture = new THREE.TextureLoader().load('static/material/stroke.png')
  this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping
  // 生成线材质
  this.material = new MeshLineMaterial({
    useMap: 0,
    color: new THREE.Color(0x006666),
    opacity: 1,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    sizeAttenuation: 1,
    lineWidth: 20,
    transparent: true,
    wireframe: true,
    map: this.texture
  })
  // 生成模型
  const mesh = new THREE.Mesh(line.geometry, this.material)
  this.scene.add(mesh)


