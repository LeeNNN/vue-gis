// 加载3D模型
import * as THREE from 'three'

export const initThree = (dom, cameraAngle, cameraPositionX, cameraPositionY, cameraPositionZ, type) => {
  console.log('加载3D模型')
  // 渲染器pointLocation
  var threeDpopup = document.getElementById(dom)
  const threeRenderer = new THREE.WebGLRenderer()
  threeRenderer.setSize(threeDpopup.clientWidth, threeDpopup.clientHeight)
  threeRenderer.setClearColor('white', 1)// 背景颜色
  document.getElementById(dom).appendChild(threeRenderer.domElement)
  // 场景
  const threeScene = new THREE.Scene()
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8)
  threeScene.add(ambientLight)
  // 照相机
  const threeCamera = new THREE.PerspectiveCamera(cameraAngle, threeDpopup.clientWidth / threeDpopup.clientHeight, 0.1, 100) // 透视投影
  threeCamera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ)
  var pointLight = new THREE.PointLight(0xffffff, 0.2)
  threeCamera.add(pointLight)
  threeScene.add(threeCamera)
  // 控制器
  const orbitcontrols = new THREE.OrbitControls(threeCamera, threeRenderer.domElement)
  orbitcontrols.autoRotate = false
  // const threeClock = new THREE.Clock()

  // loadObj(type); // 加载obj
  // 渲染
  threeRenderer.render(threeScene, threeCamera)
}
