import * as Cesium from 'cesium/Cesium'
export function patrol(viewer, path,) {
  this._path = path
  this._viewer = viewer
  this._start = Cesium.JulianDate.fromDate(new Date())
  this._stop = Cesium.JulianDate.addSeconds(this._start, 250, new Cesium.JulianDate()) // 360秒后结束
  this._isPatrol = true
  // 巡检路径上的点
  this._marks = []
  // 总点数
  this._totalPt_Count = 0
  // 路线实体
  this._tempRouteEntitles = null
  this._timeIncerment = 0
  // 是否自定义巡检路径
  this._patrolAdd = false
  this._totalTime_Span = 250
  // 添加到view中的小车实体
  this._patrolEntity = null
  this._curPatrolPoint
  this._speed = 1
  this._idForward = true
}
patrol.prototype.startPatrol = function() {
  this.defaultPatrol()
  this.createEntity()
}
// 获取绘制巡视线路
patrol.prototype.createEntity = function() {
  const color = '#ffffff'
  this._marks = []
  const tempArr = []

  this._totalPt_Count = this._path.length
  // totalTime_Span = totalPt_Count * 20;
  this._path.forEach((item, index) => {
    this._marks.push({
      xaxis: item.xaxis,
      yaxis: item.yaxis,
      zaxis: 1
    })
    tempArr.push(Cesium.Cartographic.fromDegrees(item.xaxis, item.yaxis))
  })

  this.craetePatrolEntity(this._marks, color)

  this._tempRouteEntitles = this._viewer.entities.add({
    id: 'tempRoute',
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
      start: this._start,
      stop: this._stop
    })]),
    /**
             * orientation 姿态：
             * 若以正北为参照
             * Heading: 初始方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角
             * Pitch: 正角度为平面之上，负角度为平面之下，即前后旋转，也叫俯仰角
             * Roll: 左右旋转，也叫翻滚角
             *
             * position 位置
             * */
    position: this.computeCirclularFlight(this._marks)
  })
  // todo this.createlineinOV()
}
patrol.prototype.computeCirclularFlight = function(marks) {
  /**
     * 关于position有多种类型，如SampledPositionProperty类型，是一个含有多个样本点位置的对象，
     * 主要用于动态轨迹生成，通过插值算法对轨迹进行插值，其中setInterpolationOptions方法用来设
     * 置插值方法与程度,它的某一时间的位置可以用position.getValue()方法获得，参数是朱利安时间
     * */
  const property = new Cesium.SampledPositionProperty()
  marks.forEach((item, index) => {
    const timeIncerment = index * this._totalTime_Span / (this._totalPt_Count - 1)
    const time = Cesium.JulianDate.addSeconds(this._start, timeIncerment, new Cesium.JulianDate())
    // const position = Cesium.Cartesian3.fromDegrees(item.xaxis, item.yaxis, item.zaxis + 10);
    const position = Cesium.Cartesian3.fromDegrees(item.xaxis, item.yaxis, 0.2)
    property.addSample(time, position)
  })
  return property
}
// 创建小车模型
patrol.prototype.craetePatrolEntity = function(marks, color) {
  // 确保查看器处于预期的时间
  this._viewer.clock.startTime = this._start.clone()
  this._viewer.clock.stopTime = this._stop.clone()
  this._viewer.clock.currentTime = this._start.clone()
  this._viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
  // 时间变化来控制速度
  this._viewer.clock.multiplier = 1.0
  this._viewer.clock.shouldAnimate = false

  var modelUrl = '../../static/model/PK4.gltf'

  this._patrolEntity = this._viewer.entities.add({
    id: 'patrol',
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
      start: this._start,
      stop: this._stop
    })]),
    /**
       * orientation 姿态：
       * 若以正北为参照
       * Heading: 初始方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角
       * Pitch: 正角度为平面之上，负角度为平面之下，即前后旋转，也叫俯仰角
       * Roll: 左右旋转，也叫翻滚角
       *
       * position 位置
       * */
    position: this.computeCirclularFlight(marks),
    orientation: new Cesium.VelocityOrientationProperty(this.computeCirclularFlight(marks)), // 姿态调整
    model: {
      uri: modelUrl
    },
    path: {
      resolution: 1,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.1,
        color: Cesium.Color.fromCssColorString(color)
      }),
      width: 20
    }
  })
  this._viewer.trackedEntity = this._patrolEntity
  /* setTimeout(function() {
      alert('转换视角了')
      // 相机位置
      this._viewer.camera.position = new Cesium.Cartesian3(-30, 0.0, 10.0)
      // 相机方向
      this._viewer.camera.direction = new Cesium.Cartesian3(1.0, 0.0, -0.30)
      this._viewer.camera.up = new Cesium.Cartesian3(0.0, 0.0, 1.0)
    } 500) */
  this._patrolEntity.position.setInterpolationOptions({
    interpolationDegree: 2,
    interpolationAlgorithm: Cesium.HermitePolynomialApproximation
  })
  /**
       * 监听场景渲染刷新
       * scene：场景
       * time：当前时间轴时间
       * */
  // this._viewer.scene.postUpdate.removeEventListener(this.cameraLookAt)
  // this._viewer.scene.postUpdate.addEventListener(this.cameraLookAt)
}
patrol.prototype.cameraLookAt = function(scene, time) {
  if (this._patrolEntity) {
    var position = this._patrolEntity.position.getValue(time)
    this._curPatrolPoint = this.carTolnglat(position.x, position.y, position.z)
    this.updatemarkerinOV(this._curPatrolPoint.y, this._curPatrolPoint.x)// ！！！！！！！！！！！4、调用鹰眼中绘制点
    if (!Cesium.defined(position)) {
      return
    }
    var transform
    // 判断entity是否存在姿态
    if (!Cesium.defined(this._patrolEntity.orientation)) {
      // console.log(position);
      transform = Cesium.Transforms.eastNorthUpToFixedFrame(position)
    } else {
      var orientation = this._patrolEntity.orientation.getValue(time)
      if (!Cesium.defined(orientation)) {
        return
      }
      transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation), position)
    }
    // Save camera state
    var offset = Cesium.Cartesian3.clone(this._viewer.camera.position)
    var direction = Cesium.Cartesian3.clone(this._viewer.camera.direction)
    var up = Cesium.Cartesian3.clone(this._viewer.camera.up)
    this._viewer.camera.lookAtTransform(transform)
    // Reset the camera state to the saved state so it appears fixed in the model's frame.
    Cesium.Cartesian3.clone(offset, this._viewer.camera.position)
    Cesium.Cartesian3.clone(direction, this._viewer.camera.direction)
    Cesium.Cartesian3.clone(up, this._viewer.camera.up)
    Cesium.Cartesian3.cross(direction, up, this._viewer.camera.right)
  }
}
// 笛卡尔坐标转换经纬度
patrol.prototype.carTolnglat = function(x, y, z) {
  const ellipsoid = this._viewer.scene.globe.ellipsoid
  const cartesian3 = new Cesium.Cartesian3(x, y, z)
  const cartographic = ellipsoid.cartesianToCartographic(cartesian3)
  const lat = Cesium.Math.toDegrees(cartographic.latitude)
  const lng = Cesium.Math.toDegrees(cartographic.longitude)
  const alt = cartographic.height
  return { x: lng, y: lat, z: alt }
}
// 开始前进
patrol.prototype.forwardPatrol = function() {
  this._idForward = true
  this._viewer.clock.shouldAnimate = true
  this._viewer.clock.multiplier = Math.abs(this._speed)
}
// 巡视后退
patrol.prototype.backPatrol = function() {
  this._idForward = false
  this._viewer.clock.shouldAnimate = true
  this._viewer.clock.multiplier = -Math.abs(this._speed)
}
// 暂停巡视
patrol.prototype.pausePatrol = function() {
  this._viewer.clock.shouldAnimate = false
}
// 退出巡视
patrol.prototype.exitPatrol = function() {
  this._isPatrol = false
  this._idForward = true
  this._viewer.clock.shouldAnimate = false
  this._speed = 1
  this._viewer.scene.postUpdate.removeEventListener(this.cameraLookAt)
  this._viewer.camera.position = new Cesium.Cartesian3()
  this._viewer.camera.direction = Cesium.Cartesian3.negate(Cesium.Cartesian3.UNIT_Z, new Cesium.Cartesian3())
  this._viewer.camera.up = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_Y)
  this._viewer.camera.right = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_X)
  this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
  // 退出巡视模式是要执行的代码
  overviewCtr.ispatrol = false
  overviewCtr.updatelines(null, null, false)
  overviewCtr.updatemarker(null, false)
  this._viewer.camera.setView({
    destination: new Cesium.Cartesian3(-2645286.980682097, 4705681.569435621, 3392368.425504031),
    orientation: {
      heading: 0.33756067020966185, // 方向
      pitch: -0.5799268949170941, // 倾斜角度
      roll: 0
    }
  })
  this.defaultPatrol()
}
// 初始化巡视
patrol.prototype.defaultPatrol = function() {
  this._viewer.clock.shouldAnimate = false
  this._viewer.clock.multiplier = 1
  this._speed = 1
  var entity = this._viewer.entities.getById('patrol')
  var tempRoute = this._viewer.entities.getById('tempRoute')
  if (tempRoute) {
    this._viewer.entities.remove(tempRoute)
  }
  if (entity) {
    this._viewer.entities.remove(entity)
  }
  this.patrolSlider = 1
  this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
}
// 巡视滑块格式化,实时获取value值
patrol.prototype.formatTooltip = function(val) {
  console.log('我正在拖动滑块时打印的value', val)
  this.patrolSliderVal = val
  if (this._isPatrol) {
    if (!this._idForward) {
      this._viewer.clock.multiplier = -val
    } else {
      this._viewer.clock.multiplier = val
    }
  }
}
// 改变巡视速度
patrol.prototype.patrolSpeed = function() {
  console.log('拖动结束，松开鼠标时打印的value', this.patrolSlider)
}
