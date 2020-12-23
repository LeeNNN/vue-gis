<template>
  <div id="three">
    <p>这里加载3D模型</p>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
export default {
  name: 'Threejs',
  data() {
    return {
      camera: null, // 相机
      scene: null, // 场景
      renderer: null, // 渲染器
      mesh: null, // 网格
      geometry: null, // 几何学
      material: null, // 材质
      orbitcontrols: null, // 轨道控制器
      clock: null,
      myObjects: [],
      myChildren: []
    }
  },
  mounted() {
    // this.init()
    // this.animate()
    this.load3d()
    /* this.$nextTick(function() {
      console.log('??????')
      this.load3d()
    }) */
  },
  methods: {
    init(domID) { // 初始化
      const container = document.getElementById(domID)
      this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 100)
      this.camera.position.z = 1
      var pointLight = new THREE.PointLight(0xffffff, 0.2)
      this.camera.add(pointLight)
      // this.scene.add(this.camera)

      this.scene = new THREE.Scene()
      var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8)
      this.scene.add(ambientLight)

      // this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      // this.material = new THREE.MeshNormalMaterial()

      // this.mesh = new THREE.Mesh(this.geometry, this.material)
      // this.scene.add(this.mesh)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.renderer.setClearColor('red', 1)
      container.appendChild(this.renderer.domElement)

      this.orbitcontrols = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitcontrols.autoRotate = false
      this.clock = new THREE.Clock()

      // this.loadObj('dlj')
      // 包含材质
      new MTLLoader().setPath('/static/3DDetailModel/dlj/').load('dlj.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader().setMaterials(materials).setPath('/static/3DDetailModel/dlj/').load('dlj.obj', obj => {
          obj.scale.set(30, 30, 30)
          obj.position.set(0, 0, 0)
          this.scene.add(obj)
        })
      })

      this.renderer.render(this.scene, this.camera)
    },
    loadObj(type) {
      var mtlLoader = new MTLLoader()
      mtlLoader.setPath('../../static/model/3DDetailModel/' + type + '/')
      mtlLoader.crossOrigin = ''
      mtlLoader.load(type + '.mtl', function(materials) {
        materials.preload()
        var objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.setPath('../../static/model/3DDetailModel/' + type + '/')
        // objLoader.setPath('http://192.168.2.112:8080/YZPOWER/bimmodel/dlj/GHXDH_1/');
        objLoader.load(type + '.obj', function(obj) {
          obj.traverse(function(child) {
            this.myChildren.push(child)
            if (child instanceof THREE.Mesh) {
              child.material.wireframe = false
            }
          })
          this.mesh = obj
          this.myObjects.push(this.mesh)
          this.threeScene.add(obj)
          // threeCamera.lookAt(mesh);
        })
      })
    },
    animate() { // 添加动画渲染
      requestAnimationFrame(this.animate)
      // this.mesh.rotation.x += 0.01 // 纵向旋转
      this.mesh.rotation.y += 0.02 // 横向旋转
      // this.renderer.render(this.scene, this.camera)
    },
    load3d() {
      if (!this.renderer) {
        this.init('three')
        // this.animate()
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
