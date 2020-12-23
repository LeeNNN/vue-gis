/* eslint-disable no-redeclare */
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="nav"
      mode="horizontal"
      background-color="#23a591"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <el-menu-item
        v-for="(item, index) in routerList"
        v-show="isShow"
        :key="index"
        :index="item.path"
      >
        <img :src="require('@/assets/images/nav_01.png')" class="icon">
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>

    <div class="content">
      <div v-show="isShow" class="left-bar">
        <router-view
          @locationEntity="locationEntity"
          @refeshDanger="refeshDanger"
          @qxCreatePoint="qxCreatePoint"
          @gzCreatePoint="gzCreatePoint"
          @clickTree="clickTree"
        />
      </div>
      <!--
      <el-button @click="ugactive">显示</el-button>
      <el-button @click="ugdisable">隐藏</el-button>-->
      <div class="right-gis">
        <div id="cesiumContainer" />

        <dialog-bar v-model="sendVal" class="tankuang" :props-object="propsObject" />
        <div v-show="patrolRelatedData.isPatrol" id="patrolBox">
          <div class="title">
            <div>
              <span>巡视面板</span>
            </div>
            <div>
              <i class="el-icon-minus" />
            </div>
          </div>
          <div class="control">
            <div class="btns">
              <button id="forward" @click="forwardPatrol">行进</button>
              <button id="back-off" @click="backPatrol">后退</button>
              <button id="suspend" @click="pausePatrol">暂停</button>
              <button id="end" @click="exitPatrol">退出</button>
            </div>
            <div class="block">
              <span class="demonstration">速度</span>
              <el-slider
                id="slider-speed"
                v-model="patrolSlider"
                :format-tooltip="formatTooltip"
                :show-tooltip="false"
                :min="1"
                :max="10"
                @change="patrolSpeed"
              />
            </div>
          </div>
          <ul>
            <el-checkbox-group v-model="patrolRelatedData.checkList" class="filter">
              <li>
                <el-checkbox label="电缆井" />
              </li>
              <li>
                <el-checkbox label="环网柜" />
              </li>
              <li>
                <el-checkbox label="配电房" />
              </li>
              <li>
                <el-checkbox label="开关站" />
              </li>
              <li>
                <el-checkbox label="杆塔" />
              </li>
              <li>
                <el-checkbox label="电缆分支箱" />
              </li>
              <li>
                <el-checkbox label="柱上开关" />
              </li>
              <li>
                <el-checkbox label="箱式变压器" />
              </li>
              <li>
                <el-checkbox label="柱上变压器" />
              </li>
            </el-checkbox-group>
          </ul>
          <div class="content">
            <div class="route">
              <div class="line" />
              <ul class="byway-box" />
            </div>
          </div>
          <p>
            <a id="open-monitor" href="javascript:;">查看监控</a>
          </p>
        </div>
        <!--底部工具栏-->
        <div ref="toolBottomRef" class="tool-bar">
          <div>
            <div class="tool-fold-box" @click="acrowBottomTool">
              <i :class="isAcrow?'el-icon-caret-bottom':'el-icon-caret-top'" />
            </div>
            <ul v-show="isAcrow" class="tools">
              <li @click="bottomTotalBar('重置')">
                <img src="../../assets/img/tool_1.png" alt>
                <span>重置</span>
              </li>
              <li @click="bottomTotalBar('测距')">
                <img src="../../assets/img/tool_2.png" alt>
                <span>测距</span>
              </li>
              <li @click="bottomTotalBar('测高')">
                <img src="../../assets/img/tool_2.png" alt>
                <span>测高</span>
              </li>
              <li @click="bottomTotalBar('测角度')">
                <img src="../../assets/img/tool_2.png" alt>
                <span class>测角度</span>
              </li>
              <li @click="bottomTotalBar('侧面')">
                <img src="../../assets/img/tool_3.png" alt>
                <span>测面</span>
              </li>
              <li @click="bottomTotalBar('标记')">
                <img src="../../assets/img/tool_4.png" alt>
                <span>标记</span>
              </li>
              <li @click="bottomTotalBar('全屏')">
                <img src="../../assets/img/tool_5.png" alt>
                <span class="fullScreen" v-text="fullScreenText" />
              </li>
              <li class="tools-layer" @click="bottomTotalBar('图层')">
                <img src="../../assets/img/tool_6.png" alt>
                <span>图层</span>
                <i class="iconfont icon-jiantouxia fold-3 fold" />
              </li>
              <li class="other-layer" @click="bottomTotalBar('显示')">
                <img src="../../assets/img/tool_6.png" alt>
                <span>显示</span>
                <i class="iconfont icon-jiantouxia fold-8 fold" />
              </li>
            </ul>
            <!--<div class="slider-b">
                                <span>地表透明度</span>
                                <span class="transparency">100%</span>
                                <i class="iconfont icon-jiansvg"></i>
                                <div id="slider"></div>
                                <i class="iconfont icon-jia"></i>
            </div>-->
            <p
              v-show="isAcrow"
              class="underground"
              @click="openUnderGround"
              v-text="undergroundText"
            />
          </div>
        </div>

        <!--颜色图例-->
        <div
          ref="legendFrame"
          class="legend-frame frame"
          :class="legendFold?animationChangeBig:animationChangeSmall"
        >
          <i
            :class="legendFold?'el-icon-minus':'el-icon-plus'"
            style="color:white;"
            @click="iconLegendFold"
          />
          <div v-show="legendFold">
            <ul ref="legend_icon" class="legend-tubiao">
              <li v-for="(item,index) in deviceIconList" :key="index">
                <img
                  class="true_dlj"
                  :src="require('@/assets/img/'+(item.isSelect?item.imageSrc:item.imagePress)+'.png')"
                  @click="onItemClickListener(item)"
                >
                <span class="legend-txt">{{ item.name }}</span>
              </li>
            </ul>
            <div class="legend-xianlu">
              <div>
                <div class="color-line color-line-1" name="true_up" />
                <span>架空线</span>
              </div>
              <div>
                <div class="color-line color-line-2" name="true_down" />
                <span>电缆线</span>
              </div>
              <!-- <div><div class="color-line color-line-3"></div><span>连接段</span></div> -->
            </div>
          </div>
        </div>

        <!--鹰眼-->
        <div id="overview" class="leaflet-control-minimap" />
      </div>
    </div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'

import store from '@/store'
import * as L from 'leaflet'
// eslint-disable-next-line no-unused-vars
import widgets from 'cesium/Widgets/widgets.css'
import * as api from '../../api/operation.js'
import Contants from '@/api/contants'
import { underground } from '@/api/undergroundModel.js'
import CesiumOverviewMapControl from '../../utils/CesiumOverviewMapControl'
import dialogBar from '@/components/operations/dialog.vue'
import coordtransform from '../../utils/lanlontransform'

var mapurl = process.env.VUE_APP_MAP_URL
var viewer = null
var isUnderground = false
/* var ug = new underground(viewer, {
	depth: 5000,
	alpha: 0.2
}); */

/**
 * 鹰眼 ---------------------------------------------->
 * */
var overviewCtr = null // 定义鹰眼变量

/**
 * 动态绘制点，包括综合信息以及危险源信息
 * */
var pointEntities = []
// var pick = null;
// var cartesian = null;
var curData = null // 当前所点点位数据
var pointhight = [] // 哪些点已经高亮显示了
var pointstart = null // 起点高亮显示
var pointend = null // 终点高亮显示
var pointhightloc = null // 定位点并高亮显示
// var dlxEntities = []

/**
 * 获取全部线路
 * */
var dlxData = null

/**
 * 线路信息标识
 * 1为页面加载获取的所有线路标识
 * 2为点击电线获取的标识
 **/
var characteristicall = []
var characteristic = []
var start = Cesium.JulianDate.fromDate(new Date())
var stop = Cesium.JulianDate.addSeconds(start, 250, new Cesium.JulianDate()) // 360秒后结束
export default {
  name: 'OtherTask',
  store,
  components: { 'dialog-bar': dialogBar },
  props: {},
  data() {
    return {
      undergroundControll: {},
      sendVal: false,
      isShow: true,
      legendFold: true,
      isAcrow: true,
      animationChangeSmall: 'animationChangeSmall',
      animationChangeBig: 'animationChangeBig',
      fullScreenText: '全屏',
      undergroundText: '地下模式',
      deviceIconList: Contants.deviceIconList,
      propsObject: {
        title: String,
        type: String,
        basicAttributes: [],
        extendAttributes: [],
        moreAttributes: []
      },
      activeIndex: '/layout/operation/device',
      routerList: [
        { path: '/layout/operation/device', title: '设备管理', icon: '' },
        { path: '/layout/operation/tour', title: '巡视管理', icon: '' },
        { path: '/layout/operation/analysis', title: '分析管理', icon: '' },
        { path: '/layout/operation/fault', title: '故障管理', icon: '' },
        { path: '/layout/operation/defect', title: '缺陷管理', icon: '' },
        { path: '/layout/operation/danger', title: '隐患管理', icon: '' }
      ],
      mapData: {
        // 电缆井
        dlj: [],
        // 环网柜
        hwg: [],
        // 配电室
        pds: [],
        // 开关站
        kgz: [],
        // 杆塔
        gt: [],
        // 全部电缆分支箱
        dlfzx: [],
        // 柱上开关
        zskg: [],
        // 箱变
        xb: [],
        // 柱上变压器
        zsbyq: [],
        // 电缆线
        dlx: []
      },
      entityData: {
        // 地理井
        dlj: [],
        // 环网柜
        hwg: [],
        // 配电室
        pds: [],
        // 开关站
        kgz: [],
        // 杆塔
        gt: [],
        // 全部电缆分支箱
        dlfzx: [],
        // 柱上开关
        zskg: [],
        // 箱变
        xb: [],
        // 柱上变压器
        zsbyq: [],
        // 电缆线
        dlx: [],
        // 隐患
        yh: [],
        // 缺陷
        qx: [],
        // 故障
        gz: []
      },
      patrolSlider: 0,
      patrolSliderVal: 1, // 滑块实时value
      patrolRelatedData: {
        // 是否在巡视,打开关闭巡视弹框
        isPatrol: false,
        // 设定了模拟时间的边界
        totalTime_Span: 250,
        totalPt_Count: 0,
        timeIncerment: 0,
        // 创建用于巡查的实体
        patrolEntity: null,
        /**
         * 获取巡视路径
         * */
        marks: [], // 用以存放巡视线路点位信息
        tempRouteEntitles: null,
        /**
         * 自定义巡视路径
         * */
        patrolAdd: false,
        curPatrolPoint: null, // 巡视行进途中
        speed: 1, // 巡视速度
        idForward: true, // 判断前进|后退
        // 复选框
        checkList: [
          '电缆井',
          '环网柜',
          '配电房',
          '开关站',
          '杆塔',
          '电缆分支箱',
          '柱上开关',
          '箱式变压器',
          '柱上变压器'
        ]
      }
    }
  },
  /**
   *  路由切换时清理数据
   *  后期需要加跳转判断
   */
  beforeRouteUpdate(to, from, next) {
    // 选择菜单下 初始化数据默认值
    this.sendVal = false
    console.log('selectMenu _ flag  ', from.name)
    if (pointhightloc) {
      const point = viewer.entities.getById(pointhightloc)
      point.billboard.width = 24
      point.billboard.height = 24
      point.label.show = false
      pointhightloc = null
    }
    if (from.name === 'Danger') {
      if (this.entityData.yh) {
        this.entityData.yh.forEach(item => {
          viewer.entities.remove(item)
        })
        this.entityData.yh = []
      }
    }
    if (from.name === 'Defect') {
      if (this.entityData.qx) {
        this.entityData.qx.forEach(item => {
          viewer.entities.remove(item)
        })
        this.entityData.qx = []
      }
    }
    if (from.name === 'Fault') {
      if (this.entityData.gz) {
        this.entityData.gz.forEach(item => {
          viewer.entities.remove(item)
        })
        this.entityData.gz = []
      }
    }
    next()
  },
  mounted() {
    /* 加载Cesium */
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTIzNzY5OC1hOWM2LTRiMWMtYTc5YS1lNjFmZmJhNDcxZjEiLCJpZCI6MTEzNjIsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NjAxMzMzOTZ9.u3sp8GEkT7NjKeexeoUzMjgND6FHk0iGhdV-YxrJw-o'
    var vartdtImagerLayerProvider = new Cesium.ArcGisMapServerImageryProvider({
      url:
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    })
    var terrainLayer = new Cesium.CesiumTerrainProvider({
      url: 'http://192.168.2.172:8880/demtile/tiles' // 默认立体地表
    })
    viewer = new Cesium.Viewer('cesiumContainer', {
      // terrainProvider: terrainLayer,
      imageryProvider: vartdtImagerLayerProvider,
      animation: false, // 是否创建动画小器件，左下角仪表
      baseLayerPicker: false, // 是否显示图层选择器
      fullscreenButton: false, // 是否显示全屏按钮
      geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
      homeButton: false, // 是否显示Home按钮
      infoBox: false, // 是否显示信息框
      sceneModePicker: false, // 是否显示3D/2D选择器
      selectionIndicator: false, // 是否显示选取指示器组件
      timeline: false, // 是否显示时间轴
      sceneMode: Cesium.SceneMode.SCENE3D, // 设定3维地图的默认场景模式:Cesium.SceneMode.SCENE2D、Cesium.SceneMode.SCENE3D、Cesium.SceneMode.MORPHING
      navigationHelpButton: false, // 是否显示右上角的帮助按钮
      scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      navigationInstructionsInitiallyVisible: false,
      showRenderLoopErrors: false // 是否显示渲染错误
    })
    viewer.scene.logarithmicDepthBuffer = true
    viewer._cesiumWidget._creditContainer.style.display = 'none' // 去除Cesium左下角版权信息
    viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0)
    viewer.scene.globe.depthTestAgainstTerrain = !0
    // viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
    /* 相机转动添加监听事件 */
    viewer.scene.camera.moveEnd.addEventListener(function(percentage) {
      // this.centers();
      // var direction = viewer.camera._direction
      // var x = Cesium.Math.toDegrees(direction.x);
      // var y = Cesium.Math.toDegrees(direction.y);
      // var z = Cesium.Math.toDegrees(direction.z);

      var rectangle = viewer.camera.computeViewRectangle()
      var west = (rectangle.west / Math.PI) * 180
      var north = (rectangle.north / Math.PI) * 180
      var east = (rectangle.east / Math.PI) * 180
      var south = (rectangle.south / Math.PI) * 180
      var centerx = (west + east) / 2
      var centery = (north + south) / 2
      console.log(centerx, centery)
      // 鉴于高德、leaflet获取的边界都是southwest和northeast字段来表示，本例保持一致性
      // this.updatemarkerinOV(centery, centerx)
      var newpoint = coordtransform.GPSToChina(centerx, centery)
      console.log(newpoint)
      if (overviewCtr) {
        overviewCtr.updatemarker([newpoint.lat, newpoint.lng], true)
      } else {
        console.log('鹰眼还未实例化')
      }
    })
    // 加载红色边界
    this.loadBound()
    // 加载鹰眼
    this.initOverview(viewer)
    // 获取电缆井信息
    this.getAllDLJInfo({})
    /** *
     * BEGIN 加载点位信息
     */
    // 获取电缆线信息
    this.getAllDLX({})
    // 获取全部环网柜
    this.getAllHWGInfo({})
    // 获取全部配电房
    this.getAllPDSInfo({})
    // 获取全部开关站
    this.getAllKGZInfo({})
    // 获取全部杆塔
    this.getAllGTInfo({})
    // 获取全部电缆分支箱
    this.getAllDLFZXInfo({ pageno: 1, pagesize: 20 })
    // 获取全部柱上开关
    // this.getAllZSKGInfo({})
    // 获取全部箱式变压器
    this.getAllXBInfo({})
    // 获取全部柱上变压器
    this.getAllZSBYQInfo({})
    // 获取标识
    this.getAllXLDGet(1)
    /** *
     * END 加载点位信息
     */
    // /**
    //  *BEGIN 加载3Dtiles模型
    //  */
    // 加载杆塔模型
    // this.loadGTTiles()
    // 加载电缆井盖模型
    // this.loadDLJUpTiles()
    // 加载电缆井底座
    // this.loadDLJDownTiles()
    // 加载配电室外壳
    // this.loadPDSUpTiles()
    // 加载配电室内部
    // this.loadPDSDownTiles()
    // 加载人工建筑模型
    // this.loadBuilding3dTile()
    // 加载倾斜摄影
    // this.loadArtificialBuilding()
    // /** *
    //  * END 加载点位信息
    //  */
    this.setHightLightEvent()
    // // eslint-disable-next-line new-cap
    this.undergroundControll = new underground(viewer, {
      depth: 5000,
      alpha: 0.1
    })
  },
  created() {},
  methods: {
    ugactive() {
      this.undergroundControll.activate()
    },
    ugdisable() {
      this.undergroundControll.disable()
    },
    clickTree(data) {
      console.log('点击的tree的信息', data)
      if (data) {
        this.startPatrol(data.pid, data.id)
      }
    },
    startPatrol(treeId, treeNode) {
      if (treeId) {
        this.patrolRelatedData.isPatrol = true
        const id = treeId
        const zxid = treeNode
        this.defaultPatrol()
        this.toGetXSXL(id, zxid, false)
      }
    },
    // 获取绘制巡视线路
    toGetXSXL(dlxid, dlxzxid, type) {
      const color = '#ffffff'
      this.patrolRelatedData.marks = []
      const tempArr = []
      const data = {
        dlxid: dlxid,
        dlxzxid: dlxzxid
      }
      api.getXSXL(data).then(res => {
        console.log('xsxl=====', res)
        if (res.code === 200) {
          var data = res.data
          this.patrolRelatedData.totalPt_Count = data.length
          // totalTime_Span = totalPt_Count * 20;
          data.forEach((item, index) => {
            this.patrolRelatedData.marks.push({
              xaxis: item.xaxis,
              yaxis: item.yaxis,
              zaxis: 1
            })
            tempArr.push(
              Cesium.Cartographic.fromDegrees(item.xaxis, item.yaxis)
            )
          })
          if (!type) {
            this.craetePatrolEntity(this.patrolRelatedData.marks, color)
          } else {
            this.patrolRelatedData.tempRouteEntitles = viewer.entities.add({
              id: 'tempRoute',
              availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                  start: start,
                  stop: stop
                })
              ]),
              /**
               * orientation 姿态：
               * 若以正北为参照
               * Heading: 初始方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角
               * Pitch: 正角度为平面之上，负角度为平面之下，即前后旋转，也叫俯仰角
               * Roll: 左右旋转，也叫翻滚角
               *
               * position 位置
               * */
              position: this.computeCirclularFlight(
                this.patrolRelatedData.marks
              )
            })
          }
          this.createlineinOV()
        }
        console.log(this.patrolRelatedData.marks)
      })
    },
    computeCirclularFlight(marks) {
      /**
       * 关于position有多种类型，如SampledPositionProperty类型，是一个含有多个样本点位置的对象，
       * 主要用于动态轨迹生成，通过插值算法对轨迹进行插值，其中setInterpolationOptions方法用来设
       * 置插值方法与程度,它的某一时间的位置可以用position.getValue()方法获得，参数是朱利安时间
       * */
      const property = new Cesium.SampledPositionProperty()
      marks.forEach((item, index) => {
        this.patrolRelatedData.timeIncerment =
          (index * this.patrolRelatedData.totalTime_Span) /
          (this.patrolRelatedData.totalPt_Count - 1)
        const time = Cesium.JulianDate.addSeconds(
          start,
          this.patrolRelatedData.timeIncerment,
          new Cesium.JulianDate()
        )
        // const position = Cesium.Cartesian3.fromDegrees(item.xaxis, item.yaxis, item.zaxis + 10);
        const position = Cesium.Cartesian3.fromDegrees(
          item.xaxis,
          item.yaxis,
          0.2
        )
        property.addSample(time, position)
      })
      // console.log(property)
      return property
    },
    // 创建小车模型
    craetePatrolEntity(marks, color) {
      // 确保查看器处于预期的时间
      viewer.clock.startTime = start.clone()
      viewer.clock.stopTime = stop.clone()
      viewer.clock.currentTime = start.clone()
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
      // 时间变化来控制速度
      viewer.clock.multiplier = 1.0
      viewer.clock.shouldAnimate = false
      if (!this.patrolRelatedData.patrolAdd) {
        // 推荐巡视
        var modelUrl = '../../assets/model/PK4.gltf'
      } else {
        // 自定义巡视
        modelUrl = ''
      }
      this.patrolRelatedData.patrolEntity = viewer.entities.add({
        id: 'patrol',
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop
          })
        ]),
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
        orientation: new Cesium.VelocityOrientationProperty(
          this.computeCirclularFlight(marks)
        ), // 姿态调整
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
      viewer.trackedEntity = this.patrolRelatedData.patrolEntity
      /* setTimeout(function() {
        alert('转换视角了')
        // 相机位置
        viewer.camera.position = new Cesium.Cartesian3(-30, 0.0, 10.0)
        // 相机方向
        viewer.camera.direction = new Cesium.Cartesian3(1.0, 0.0, -0.30)
        viewer.camera.up = new Cesium.Cartesian3(0.0, 0.0, 1.0)
      }, 500) */
      this.patrolRelatedData.patrolEntity.position.setInterpolationOptions({
        interpolationDegree: 2,
        interpolationAlgorithm: Cesium.HermitePolynomialApproximation
      })
      /**
       * 监听场景渲染刷新
       * scene：场景
       * time：当前时间轴时间
       * */
      // viewer.scene.postUpdate.removeEventListener(this.cameraLookAt)
      // viewer.scene.postUpdate.addEventListener(this.cameraLookAt)
    },
    cameraLookAt(scene, time) {
      if (this.patrolRelatedData.patrolEntity) {
        var position = this.patrolRelatedData.patrolEntity.position.getValue(
          time
        )
        this.patrolRelatedData.curPatrolPoint = this.carTolnglat(
          position.x,
          position.y,
          position.z
        )
        this.updatemarkerinOV(
          this.patrolRelatedData.curPatrolPoint.y,
          this.patrolRelatedData.curPatrolPoint.x
        ) // ！！！！！！！！！！！4、调用鹰眼中绘制点
        if (!Cesium.defined(position)) {
          return
        }
        var transform
        // 判断entity是否存在姿态
        if (!Cesium.defined(this.patrolRelatedData.patrolEntity.orientation)) {
          // console.log(position);
          transform = Cesium.Transforms.eastNorthUpToFixedFrame(position)
        } else {
          var orientation = this.patrolRelatedData.patrolEntity.orientation.getValue(
            time
          )
          if (!Cesium.defined(orientation)) {
            return
          }
          transform = Cesium.Matrix4.fromRotationTranslation(
            Cesium.Matrix3.fromQuaternion(orientation),
            position
          )
        }
        // Save camera state
        var offset = Cesium.Cartesian3.clone(viewer.camera.position)
        var direction = Cesium.Cartesian3.clone(viewer.camera.direction)
        var up = Cesium.Cartesian3.clone(viewer.camera.up)
        viewer.camera.lookAtTransform(transform)
        // Reset the camera state to the saved state so it appears fixed in the model's frame.
        Cesium.Cartesian3.clone(offset, viewer.camera.position)
        Cesium.Cartesian3.clone(direction, viewer.camera.direction)
        Cesium.Cartesian3.clone(up, viewer.camera.up)
        Cesium.Cartesian3.cross(direction, up, viewer.camera.right)
      }
    },
    // 笛卡尔坐标转换经纬度
    carTolnglat(x, y, z) {
      const ellipsoid = viewer.scene.globe.ellipsoid
      const cartesian3 = new Cesium.Cartesian3(x, y, z)
      const cartographic = ellipsoid.cartesianToCartographic(cartesian3)
      const lat = Cesium.Math.toDegrees(cartographic.latitude)
      const lng = Cesium.Math.toDegrees(cartographic.longitude)
      const alt = cartographic.height
      return { x: lng, y: lat, z: alt }
    },
    // 开始前进
    forwardPatrol() {
      this.patrolRelatedData.idForward = true
      viewer.clock.shouldAnimate = true
      viewer.clock.multiplier = Math.abs(this.patrolRelatedData.speed)
    },
    // 巡视后退
    backPatrol() {
      this.patrolRelatedData.idForward = false
      viewer.clock.shouldAnimate = true
      viewer.clock.multiplier = -Math.abs(this.patrolRelatedData.speed)
    },
    // 暂停巡视
    pausePatrol() {
      viewer.clock.shouldAnimate = false
    },
    // 退出巡视
    exitPatrol() {
      this.patrolRelatedData.isPatrol = false
      this.patrolRelatedData.idForward = true
      viewer.clock.shouldAnimate = false
      this.patrolRelatedData.speed = 1
      viewer.scene.postUpdate.removeEventListener(this.cameraLookAt)
      viewer.camera.position = new Cesium.Cartesian3()
      viewer.camera.direction = Cesium.Cartesian3.negate(
        Cesium.Cartesian3.UNIT_Z,
        new Cesium.Cartesian3()
      )
      viewer.camera.up = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_Y)
      viewer.camera.right = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_X)
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      // 退出巡视模式是要执行的代码
      overviewCtr.ispatrol = false
      overviewCtr.updatelines(null, null, false)
      overviewCtr.updatemarker(null, false)
      viewer.camera.setView({
        destination: new Cesium.Cartesian3(
          -2645286.980682097,
          4705681.569435621,
          3392368.425504031
        ),
        orientation: {
          heading: 0.33756067020966185, // 方向
          pitch: -0.5799268949170941, // 倾斜角度
          roll: 0
        }
      })
      this.defaultPatrol()
    },
    // 初始化巡视
    defaultPatrol() {
      viewer.clock.shouldAnimate = false
      viewer.clock.multiplier = 1
      this.patrolRelatedData.speed = 1
      var entity = viewer.entities.getById('patrol')
      var tempRoute = viewer.entities.getById('tempRoute')
      if (tempRoute) {
        viewer.entities.remove(tempRoute)
      }
      if (entity) {
        viewer.entities.remove(entity)
      }
      this.patrolSlider = 1
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    },
    // 巡视滑块格式化,实时获取value值,改变巡视速度
    formatTooltip(val) {
      console.log('我正在拖动滑块时打印的value', val)
      this.patrolSliderVal = val
      if (this.patrolRelatedData.isPatrol) {
        if (!this.patrolRelatedData.idForward) {
          viewer.clock.multiplier = -val
        } else {
          viewer.clock.multiplier = val
        }
      }
    },
    // 改变巡视速度
    patrolSpeed() {
      console.log('拖动结束，松开鼠标时打印的value', this.patrolSlider)
    },
    /* 鹰眼*/
    initOverview(viewer) {
      var url =
        'http://mt0.google.cn/vt/lyrs=t,r&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}' //! !!!!!!!!!也可以换
      // 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      var layer = new L.TileLayer(url, {
        minZoom: 0,
        maxZoom: 20
      }) //* *******必须要有的鹰眼底图
      var container = document.getElementById('overview')
      var options = {
        container: container,
        toggleDisplay: true,
        width: 300, //* ******鹰眼窗口的宽高
        height: 300,
        position: 'bottomright', //* *******鹰眼窗口的位置
        aimingRectOptions: {
          //* *******鹰眼里矩形框样式参数
          color: '#ff1100',
          weight: 1
          // opacity: 0,
          // fillOpacity: 0
        },
        shadowRectOptions: {
          color: '#0000AA',
          weight: 1,
          opacity: 0,
          fillOpacity: 0
        }
      }
      overviewCtr = new CesiumOverviewMapControl(viewer, layer, options) //* ********鹰眼实例化
    },
    // 在鹰眼中绘制要巡视的线
    createlineinOV() {
      var maxwd = 0
      var maxjd = 0
      var minwd = 0
      var minjd = 0
      var lines = []

      var line = []
      for (var i = 0; i < this.patrolRelatedData.marks.length; i++) {
        if (i === 0) {
          maxwd = this.patrolRelatedData.marks[i].yaxis
          maxjd = this.patrolRelatedData.marks[i].xaxis
          minwd = this.patrolRelatedData.marks[i].yaxis
          minjd = this.patrolRelatedData.marks[i].xaxis
        } else {
          if (minjd >= this.patrolRelatedData.marks[i].xaxis) {
            minjd = this.patrolRelatedData.marks[i].xaxis
          } else if (maxjd < this.patrolRelatedData.marks[i].xaxis) {
            maxjd = this.patrolRelatedData.marks[i].xaxis
          }

          if (minwd >= this.patrolRelatedData.marks[i].yaxis) {
            minwd = this.patrolRelatedData.marks[i].yaxis
          } else if (maxwd < this.patrolRelatedData.marks[i].yaxis) {
            maxwd = this.patrolRelatedData.marks[i].yaxis
          }
        }

        var linep = coordtransform.GPSToChina(
          this.patrolRelatedData.marks[i].yaxis,
          this.patrolRelatedData.marks[i].xaxis
        )
        line.push([linep.lat, linep.lng])
      }
      lines.push(line)
      var maxp = coordtransform.GPSToChina(maxwd, maxjd)
      var minp = coordtransform.GPSToChina(minwd, minjd)
      var bound = [maxp.lat, maxp.lng, minp.lat, minp.lng]
      overviewCtr.updatelines(lines, bound, true)
    },
    // 在鹰眼中绘制当前巡视点
    updatemarkerinOV(wd, jd) {
      console.log(wd, jd)
      var newpoint = coordtransform.GPSToChina(wd, jd)
      console.log(newpoint)
      overviewCtr.updatemarker([newpoint.lat, newpoint.lng], true)
    },
    // 获取三维球体中心点坐标
    centers() {
      console.log(789789789)
      var direction = viewer.camera._direction
      // var x = Cesium.Math.toDegrees(direction.x);
      // var y = Cesium.Math.toDegrees(direction.y);
      // var z = Cesium.Math.toDegrees(direction.z);

      var rectangle = viewer.camera.computeViewRectangle()
      var west = (rectangle.west / Math.PI) * 180
      var north = (rectangle.north / Math.PI) * 180
      var east = (rectangle.east / Math.PI) * 180
      var south = (rectangle.south / Math.PI) * 180
      var centerx = (west + east) / 2
      var centery = (north + south) / 2
      // 鉴于高德、leaflet获取的边界都是southwest和northeast字段来表示，本例保持一致性
      this.updatemarkerinOV(centery, centerx)
    },
    // 隐患打点
    refeshDanger(data) {
      this.entityData.yh = []
      if (data) {
        data.forEach(item => {
          this.$set(item, 'isBillboardShow', true)
          var img = require('@/assets/img/hidden_trouble_2.png')
          if (item.status !== undefined && item.status === 2) {
            img = require('@/assets/img/hiddentrouble.png')
          }

          var yhpoint = viewer.entities.add({
            name: 'yhpoint',
            properties: {
              name: item.name,
              code: item.sbs.glsbbm,
              xaxis: item.axaxis,
              yaxis: item.ayaxis,
              status: item.status
            },
            id: 'yh_' + item.id,
            position: Cesium.Cartesian3.fromDegrees(
              item.axaxis,
              item.ayaxis,
              3.5
            ), // 转换三维笛卡尔坐标
            show: true,
            label: {
              show: false,
              text: item.namelocationPosition,
              font: '14px Helvetica',
              showBackground: true,
              backgroundColor: Cesium.Color(0, 0, 0, 0.45),
              pixelOffset: new Cesium.Cartesian2(0, -35)
            },
            billboard: {
              // 图标
              show: item.isBillboardShow,
              width: 24,
              height: 24,
              image: img,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
          })
          this.entityData.yh.push(yhpoint)
        })
      }
    },
    // 缺陷打点
    qxCreatePoint(data) {
      this.entityData.qx = []
      if (data) {
        data.forEach(item => {
          this.$set(item, 'isBillboardShow', true)
          if (item.status !== undefined && item.status === 2) {
            var img = require('@/assets/img/flaw_wcl.png')
          } else {
            img = require('@/assets/img/flaw_ycl.png')
          }
          var qxpoint = viewer.entities.add({
            name: 'qxpoint',
            properties: {
              name: item.name,
              code: item.sbs[0].glsbbm,
              xaxis: item.axaxis,
              yaxis: item.ayaxis,
              status: item.status
            },
            id: 'qx_' + item.id,
            position: Cesium.Cartesian3.fromDegrees(
              item.axaxis,
              item.ayaxis,
              3.5
            ), // 转换三维笛卡尔坐标
            show: true,
            label: {
              show: false,
              text: item.name,
              font: '14px Helvetica',
              showBackground: true,
              backgroundColor: Cesium.Color(0, 0, 0, 0.45),
              pixelOffset: new Cesium.Cartesian2(0, -35)
            },
            billboard: {
              // 图标
              show: item.isBillboardShow,
              width: 24,
              height: 24,
              image: img,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
          })
          this.entityData.qx.push(qxpoint)
        })
      }
    },
    // 故障打点
    gzCreatePoint(data) {
      this.entityData.gz = []
      if (data) {
        data.forEach(item => {
          this.$set(item, 'isBillboardShow', true)
          if (item.status !== undefined && item.status === 2) {
            var img = require('@/assets/img/duihao.png')
          } else {
            img = require('@/assets/img/gantanhao2.png')
          }
          var gzpoint = viewer.entities.add({
            name: 'gzpoint',
            properties: {
              name: item.dw,
              code: item.glsbcode,
              xaxis: item.axaxis,
              yaxis: item.ayaxis,
              status: item.status
            },
            id: 'gz_' + item.id,
            position: Cesium.Cartesian3.fromDegrees(
              item.xaxis,
              item.yaxis,
              3.5
            ), // 转换三维笛卡尔坐标
            show: true,
            label: {
              show: false,
              text: item.glsbname,
              font: '14px Helvetica',
              showBackground: true,
              backgroundColor: Cesium.Color(0, 0, 0, 0.45),
              pixelOffset: new Cesium.Cartesian2(0, -35)
            },
            billboard: {
              // 图标
              show: item.isBillboardShow,
              width: 24,
              height: 24,
              image: img,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
          })
          this.entityData.gz.push(gzpoint)
        })
      }
    },
    modelguanbi() {},
    sdguanbi() {},
    openMask() {
      this.sendVal = true
    },
    loadBound() {
      var gaoliangarea = viewer.entities.add({
        name: '描边',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            119.39130568609946,
            32.393643316116204,
            119.39419758659004,
            32.37818210066864,
            119.38282537232601,
            32.37648970270498,
            119.37936688749896,
            32.37237370838388,
            119.37939656198435,
            32.37151807573637,
            119.37923162993798,
            32.37097444225962,
            119.37892861553755,
            32.370516487881204,
            119.37817697795448,
            32.369902122178,
            119.37635068070595,
            32.36938352176418,
            119.37233025943195,
            32.36776051362739,
            119.36969313864363,
            32.36648143576216,
            119.36913249529489,
            32.36613350513574,
            119.35736317371781,
            32.354440670443175,
            119.35662291788049,
            32.353996216961995,
            119.35409875687154,
            32.35334958906696,
            119.34534200858201,
            32.352018807425736,
            119.34279464241007,
            32.36695610567939,
            119.34523737038002,
            32.36723353526987,
            119.3475753012051,
            32.368101226305264,
            119.3409477419284,
            32.37807107488749,
            119.3381448466475,
            32.38689991275638,
            119.33725662793196,
            32.39596891844526,
            119.33806955531435,
            32.40295736660073,
            119.34217420601348,
            32.41335862921195,
            119.34759248262162,
            32.41187840905624,
            119.35015903364507,
            32.410031513225924,
            119.3540854925288,
            32.40845125538492,
            119.36080321610841,
            32.40559583326215,
            119.36317307888382,
            32.40347861182397,
            119.36796579178878,
            32.40068072783961,
            119.36943312946512,
            32.399214243962355,
            119.36988712518382,
            32.396868026129674,
            119.37292948155873,
            32.396208620289144,
            119.37449019344011,
            32.39475285068366,
            119.37554251782853,
            32.39220064445835,
            119.39124569647065,
            32.39366524748803,
            119.39130568609946,
            32.393643316116204
          ]),
          width: 5,
          clampToGround: true, // 是否贴地
          material: Cesium.Color.RED.withAlpha(1)
        }
      })
      viewer.zoomTo(gaoliangarea) // 相机视角移动
    },

    /*
     *  加载人工3DTiles模型
     */
    load3dTileByXYZ(tilesinfo) {
      tilesinfo.sbname = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: tilesinfo.url,
          maximumNumberOfLoadedTiles: 100, // 最大加载瓦片个数
          name: tilesinfo.description,
          show: true
        })
      )
      const longitude = tilesinfo.longitudehpd
      const latitude = tilesinfo.latitudehpd
      const height = tilesinfo.heighthpd
      tilesinfo.sbname.readyPromise.then(function(argument) {
        let hpr = new Cesium.Matrix3()
        const hprObj = new Cesium.HeadingPitchRoll(31.41, 0, 0)
        hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr)
        const modelMatrix = Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
          ),
          new Cesium.Cartesian3(),
          new Cesium.Matrix4()
        )
        Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix)
        tilesinfo.sbname._root.transform = modelMatrix
      })
    },
    // 电缆井井盖
    // loadDLJUpTiles() {
    //   const tilesData = api.get3Dtiles(4)
    //   tilesData.forEach(item => {
    //     this.load3dTileByXYZ(item)
    //   })
    // },
    // // 电缆井底座
    // loadDLJDownTiles() {
    //   const tilesData = api.get3Dtiles(3)
    //   tilesData.forEach(item => {
    //     this.load3dTileByXYZ(item)
    //   })
    // },
    // // 加载杆塔模型
    // loadGTTiles() {
    //   const tilesData = api.get3Dtiles(7)
    //   tilesData.forEach(item => {
    //     this.load3dTileByXYZ(item)
    //   })
    // },
    // 配电室外壳模型
    // loadPDSUpTiles() {
    //   const tilesData = api.get3Dtiles(5)
    //   tilesData.forEach(item => {
    //     this.load3dTileByXYZ(item)
    //   })
    // },
    // // 配电室内部模型
    // loadPDSDownTiles() {
    //   const tilesData = api.get3Dtiles(6)
    //   tilesData.forEach(item => {
    //     this.load3dTileByXYZ(item)
    //   })
    // },
    // 人工建筑模型
    // loadBuilding3dTile() {
    //   const tilesData = api.get3Dtiles(2)
    //   tilesData.forEach(item => {
    //     this.load3dTileByXYZ(item)
    //   })
    // },

    /*
     *   加载倾斜摄影
     */
    // loadPhoto3DTiles(photo3DTilesData) {
    //   const qxsyTilesetp = viewer.scene.primitives.add(
    //     new Cesium.Cesium3DTileset({
    //       url: photo3DTilesData.url,
    //       name: photo3DTilesData.name,
    //       maximumScreenSpaceError: 2,
    //       show: true
    //     })
    //   )
    // },
    // // 倾斜摄影
    // loadArtificialBuilding() {
    //   const tilesData = api.get3Dtiles(1)
    //   tilesData.forEach(item => {
    //     this.loadPhoto3DTiles(item)
    //   })
    // },

    /* 设置高亮*/
    setHightLightEvent() {
      var oldPtMove
      var silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage()
      silhouetteBlue.uniforms.color = Cesium.Color.AQUA
      silhouetteBlue.uniforms.length = 0.01
      silhouetteBlue.selected = []

      var silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage()
      silhouetteGreen.uniforms.color = Cesium.Color.LEMONCHIFFON
      silhouetteGreen.uniforms.length = 0.01
      silhouetteGreen.selected = []
      viewer.scene.postProcessStages.add(
        Cesium.PostProcessStageLibrary.createSilhouetteStage([
          silhouetteBlue,
          silhouetteGreen
        ])
      )
      // var aasssbbb = null;
      var dj_handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      dj_handler.setInputAction(movement => {
        if (oldPtMove && oldPtMove._id !== pointhightloc && pointhightloc) {
          const nodeId = oldPtMove._id.split('_')[0]
          // 图标分级 通过鼠标移动监听当前焦点是否离开point，如离开point则恢复初始设置的大小，否则还是原有大小的。
          if (oldPtMove.properties.data._value === 1) {
            if (pickedFeature && pickedFeature.id) {
              console.log(
                'pickedFeature_data',
                pickedFeature.id.properties.data
              )
            }
            if (nodeId === 'kgz' || nodeId === 'pds') {
              oldPtMove.billboard.width = 50
              oldPtMove.billboard.height = 50
            } else if (
              nodeId === 'xb' ||
              nodeId === 'hwg' ||
              nodeId === 'zsbyq' ||
              nodeId === 'zskg'
            ) {
              oldPtMove.billboard.width = 40
              oldPtMove.billboard.height = 40
            } else {
              oldPtMove.billboard.width = 24
              oldPtMove.billboard.height = 24
            }
            oldPtMove.label.show = false
          } else {
            console.log('oldPtMove _ id  ' + pointhightloc)
          }
        }
        var pickedFeature = viewer.scene.pick(movement.endPosition)
        if (Cesium.defined(pickedFeature)) {
          const tagName = pickedFeature.id._name
          console.log('tagName _' + tagName)
          if (pickedFeature.id.properties) {
            if (pickedFeature.id.properties.data) {
              console.log(
                'pickedFeature _' + tagName + '_data',
                pickedFeature.id.properties.data
              )
              console.log('value', pickedFeature.id.properties.data._value)
            }
          }
          if (
            pickedFeature.id &&
            tagName === 'point' &&
            pickedFeature.id.properties.data._value === 1 &&
            pointhightloc
          ) {
            console.log('properties', pickedFeature.id.properties)
            if (
              pickedFeature.id._id.split('_')[0] === 'kgz' ||
              pickedFeature.id._id.split('_')[0] === 'pds'
            ) {
              pickedFeature.id.billboard.width = 50
              pickedFeature.id.billboard.height = 50
            } else if (
              pickedFeature.id._id.split('_')[0] === 'xb' ||
              pickedFeature.id._id.split('_')[0] === 'hwg' ||
              pickedFeature.id._id.split('_')[0] === 'zsbyq' ||
              pickedFeature.id._id.split('_')[0] === 'zskg'
            ) {
              pickedFeature.id.billboard.width = 40
              pickedFeature.id.billboard.height = 40
            } else {
              pickedFeature.id.billboard.width = 35
              pickedFeature.id.billboard.height = 35
            }
            pickedFeature.id.label.show = true
            oldPtMove = pickedFeature.id
            if (
              !pointhightloc.startsWith('gz') &&
              !pointhightloc.startsWith('yh') &&
              !pointhightloc.startsWith('qx')
            ) {
              console.log('end', '执行结束方法体')
            }
          }
        } else {
          silhouetteBlue.selected = []
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

      dj_handler.setInputAction(movement => {
        var pickedFeature = viewer.scene.pick(movement.position)
        // aasssbbb = pickedFeature.primitive;
        if (Cesium.defined(pickedFeature)) {
          silhouetteGreen.selected = [pickedFeature]
        } else {
          silhouetteGreen.selected = []
        }
        console.log('pickedFeature', pickedFeature)
        if (pickedFeature && pickedFeature.id) {
          var targetId = pickedFeature.id._id
          console.log('targetId', targetId)
          if (targetId.startsWith('dlj')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var dljObject = this.mapData.dlj.find(d => d.id === id)
            console.log('dljObject', dljObject)
            if (dljObject) {
              this.$set(dljObject, 'entityType', 'dlj')
              this.showDialog(dljObject)
            }
          } else if (targetId.startsWith('gt')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var gtObject = this.mapData.gt.find(d => d.id === id)
            console.log('gtObject', gtObject)
            if (gtObject) {
              this.$set(gtObject, 'entityType', 'gt')
              this.showDialog(gtObject)
            }
          } else if (targetId.startsWith('hwg')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var hwgObject = this.mapData.hwg.find(d => d.id === id)
            console.log('hwgObject', hwgObject)
            if (hwgObject) {
              this.$set(hwgObject, 'entityType', 'hwg')
              this.showDialog(hwgObject)
            }
          } else if (targetId.startsWith('pds')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var pdsObject = this.mapData.pds.find(d => d.id === id)
            console.log('pdsObject', pdsObject)
            if (pdsObject) {
              this.$set(pdsObject, 'entityType', 'pds')
              this.showDialog(pdsObject)
            }
          } else if (targetId.startsWith('dlx')) {
            // dlx_10001_1006_1_up_0
            const id = parseInt(targetId.split('_')[3])
            console.log('id', id)
            var dlxObject = this.mapData.dlx.find(d => d.id === id)
            console.log('dlxObject', dlxObject)
            // if (dlxObject) {
            //   this.$set(dlxObject, 'entityType', 'dlx')
            // }
          } else if (targetId.startsWith('gz')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var gzObject = this.entityData.gz.find(d => d.id === targetId)
            console.log('gzObject', gzObject.id)
            if (gzObject) {
              this.$set(gzObject, 'entityType', 'gz')
              this.showDialog(gzObject)
            }
          } else if (targetId.startsWith('qx')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var qxObject = this.entityData.qx.find(d => d.id === targetId)
            console.log('qxObject', qxObject.id)
            if (qxObject) {
              this.$set(qxObject, 'entityType', 'qx')
              this.showDialog(qxObject)
            }
          } else if (targetId.startsWith('yh')) {
            const id = parseInt(targetId.split('_')[1])
            console.log('id', id)
            var yhObject = this.entityData.yh.find(d => d.id === targetId)
            console.log('qxObject', yhObject.id)
            if (yhObject) {
              this.$set(yhObject, 'entityType', 'yh')
              this.showDialog(yhObject)
            }
          }
        }

        if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
          var propertyNames = pickedFeature.getPropertyNames()
          console.log('  pickedFeature', pickedFeature)
          var length = propertyNames.length
          for (var i = 0; i < length; ++i) {
            var propertyName = propertyNames[i]
            if (propertyName === 'id') {
              var data = {
                code: pickedFeature.getProperty(propertyName)
              }
            }
            console.log(
              propertyName + ': ' + pickedFeature.getProperty(propertyName)
            )
            if (
              pickedFeature.getProperty(propertyName) === 'dm1120' ||
              pickedFeature.getProperty(propertyName) === 'ml1120'
            ) {
              silhouetteGreen.selected = []
            }
          }
        } else {
          // this.modelguanbi()
          // this.sdguanbi()
          // 点击空白处删除所有手动打上的电线标识
          characteristic.forEach(function(item) {
            var radarid = item._id
            var radar = viewer.entities.getById(radarid)
            viewer.entities.remove(radar)
          })
          characteristic = []
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    /**
			创建点
		*/
    createPoint(name, item, height) {
      // 根据当前所打点的名字选用不同图片
      let img
      if (name === 'danger') {
        img = require('@/assets/img/danger.png')
      } else if (item.gzstatus !== undefined && item.gzstatus === 0) {
        img = require('@/assets/img/' + name + '_danger.png')
      } else {
        img = require('@/assets/img/' + name + '.png')
      }

      var point = viewer.entities.add({
        name: 'point',
        properties: {
          name: item.name,
          type: name,
          code: item.code,
          xaxis: item.xaxis,
          yaxis: item.yaxis,
          status: item.gzstatus,
          data: 1
        },
        id: name + '_' + item.id,
        position: Cesium.Cartesian3.fromDegrees(item.xaxis, item.yaxis, height), // 转换三维笛卡尔坐标
        show: true,
        label: {
          show: false,
          text: item.name,
          font: '14px Helvetica',
          showBackground: true,
          backgroundColor: Cesium.Color(0, 0, 0, 0.45),
          pixelOffset: new Cesium.Cartesian2(0, -35),
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
        billboard: {
          // 图标
          show: item.isBillboardShow,
          width: 24,
          height: 24,
          image: img,
          // 抽稀
          scaleByDistance: new Cesium.NearFarScalar(500, 1, 2000, 0.2),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            3000
          ),
          disableDepthTestDistance: Number.POSITIVE_INFINITY // 广告牌不进行深度检测
          // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        }
      })
      pointEntities.push(point)
      return point
    },
    /**
     * 动态绘制线路-地上
     * */
    createLineUp(linepoints, code, item, color) {
      var dlx = viewer.entities.add({
        name: 'route',
        id: 'dlx_' + code,
        // clampToGround: true,
        properties: {
          name: item.zxname,
          type: 'up'
        },
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(linepoints),
          width: 2,
          // material: Cesium.Color.fromCssColorString(color)
          material: Cesium.Color.DEEPSKYBLUE.withAlpha(1)
          // clampToGround:true
        }
      })
      this.entityData.dlx.push(dlx)
    },

    /**
     * 动态绘制线路-地下
     * */
    createLineDown(linepoints, code, item, color) {
      var dlx = viewer.entities.add({
        name: 'route',
        id: 'dlx_' + code,
        properties: {
          name: item.zxname,
          type: 'down'
        },
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(linepoints),
          width: 2,
          material: Cesium.Color.GOLD.withAlpha(1)
        }
      })
      this.entityData.dlx.push(dlx)
    },
    /**
     * 路线标识
     *
     */
    createIdentification(item) {
      if (item.xlds) {
        item.xlds.forEach((item1, index1) => {
          var circuit = viewer.entities.add({
            name: 'dlxbs',
            id: 'dlxbs_' + item1.id,
            position: Cesium.Cartesian3.fromDegrees(
              item1.xaxis,
              item1.yaxis,
              3.5
            ), // 转换三维笛卡尔坐标
            show: true,
            code: item.code,
            label: {
              show: true,
              text: item1.dlxname,
              font: '12px Helvetica',
              showBackground: true,
              outlineWidth: 2.0,
              outlineColor: Cesium.Color.WHITE,
              backgroundColor: Cesium.Color.CORNFLOWERBLUE,
              // pixelOffset: new Cesium.Cartesian2(0, -35),
              scaleByDistance: new Cesium.NearFarScalar(500, 1, 2000, 0.7),
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1500
              ),
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
          })
          characteristicall.push(circuit)
        })
      }
    },
    getAllXLDGet(bstype) {
      api.getAllXLDGet(bstype).then(res => {
        console.log(res)
        if (res && res.code === 200) {
          res.data.forEach((item, index) => {
            this.createIdentification(item)
          })
        }
      })
    },
    getAllDLJInfo(req) {
      api.getAllDLJInfo(req).then(res => {
        // console.log(res)
        const points = []
        if (res && res.code === 200) {
          this.mapData.dlj = res.data.list
          console.log('获取所有电缆井', this.mapData.dlj)
          this.mapData.dlj.forEach((item, index) => {
            item['etype'] = Contants.entityTypes.dlj.type
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.dlj.forEach((item, index) => {
            const point = this.createPoint('dlj', item, 3)
            points.push(point)
          })
        }
      })
    },
    getAllPDSInfo(req) {
      api.getAllPDSInfo(req).then(res => {
        // console.log(res);
        const points = []
        if (res && res.code === 200) {
          this.mapData.pds = res.data.list
          console.log('获取全部配电房', this.mapData.pds)
          this.mapData.pds.forEach((item, index) => {
            item['etype'] = Contants.entityTypes.pds.id
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.pds.forEach((item, index) => {
            const point = this.createPoint('pds', item, 3.5)
            points.push(point)
          })
        }
      })
    },
    getAllKGZInfo(req) {
      api.getAllKGZInfo(req).then(res => {
        // console.log(res);
        const points = []
        if (res && res.code === 200) {
          this.mapData.kgz = res.data.list
          console.log('获取全部开关站', this.mapData.kgz)
          this.mapData.kgz.forEach((item, index) => {
            item['etype'] = Contants.entityTypes.kgz.id
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.kgz.forEach((item, index) => {
            const point = this.createPoint('kgz', item, 3.5)
            points.push(point)
          })
        }
      })
    },

    getAllGTInfo(req) {
      api.getAllGTInfo(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.gt = res.data.list
          console.log('获取全部杆塔', this.mapData.gt)
          this.mapData.gt.forEach((item, index) => {
            item['etype'] = 9
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.gt.forEach((item, index) => {
            this.createPoint('gt', item, 13.5)
          })
        }
      })
    },

    getAllDLFZXInfo(req) {
      api.getAllDLFZXInfo(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.dlfzx = res.data.results
          console.log('获取全部电缆分支箱', this.mapData.dlfzx)
          this.mapData.dlfzx.forEach((item, index) => {
            item['etype'] = 7
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.dlfzx.forEach((item, index) => {
            this.createPoint('dlfzx', item, 3.5)
          })
        }
      })
    },
    getAllZSBYQInfo(req) {
      api.getAllZSBYQInfo(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.zsbyq = res.data.list
          console.log('获取全部柱上变压器', this.mapData.zsbyq)
          this.mapData.zsbyq.forEach((item, index) => {
            item['etype'] = 10
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.zsbyq.forEach((item, index) => {
            this.createPoint('zsbyq', item, 10)
          })
        }
      })
    },
    getAllXBInfo(req) {
      api.getAllXBInfo(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.xb = res.data.list
          console.log('获取全部箱式变压器', this.mapData.xb)
          this.mapData.xb.forEach((item, index) => {
            item['etype'] = 4
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.xb.forEach((item, index) => {
            this.createPoint('xb', item, 3.5)
          })
        }
      })
    },
    getAllZSKGInfo(req) {
      api.getAllZSKGInfo(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.zskg = res.data.list
          console.log('获取全部柱上开关', this.mapData.zskg)
          this.mapData.zskg.forEach((item, index) => {
            item['etype'] = Contants.entityTypes.zskg.id
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.zskg.forEach((item, index) => {
            this.createPoint('zskg', item, 10)
          })
        }
      })
    },
    getAllDLX(req) {
      api.getAllDLX(req).then(res => {
        console.log(res)
        if (res && res.code === 200) {
          this.dlxData = res.data.res
          console.log('获取电缆线', this.dlxData)
          this.dlxData.forEach((item, index) => {
            this.$set(item, 'isBillboardShow', true)
            if (item.zx && item.zx.length > 0) {
              item.zx.forEach((item1, index1) => {
                if (item1.needs && item1.needs.length > 0) {
                  item1.needs.forEach((item3, index3) => {
                    var tempLine1 = []
                    item3.forEach((item4, index4) => {
                      tempLine1.push(item4.xaxis)
                      tempLine1.push(item4.yaxis)
                      tempLine1.push(3)
                    })
                    this.createLineDown(
                      tempLine1,
                      item.code +
                        '_' +
                        item1.zxcode +
                        '_' +
                        item.id +
                        '_down_' +
                        index3,
                      item1,
                      '#00000'
                    )
                  })
                }
                if (item1.clxs && item1.clxs.length > 0) {
                  item1.clxs.forEach((item7, index7) => {
                    var tempLine3 = []
                    item7.forEach((item8, index8) => {
                      tempLine3.push(item8.xaxis)
                      tempLine3.push(item8.yaxis)
                      tempLine3.push(3)
                    })
                    this.createLineDown(
                      tempLine3,
                      item.code +
                        '_' +
                        item1.zxcode +
                        '_' +
                        item.id +
                        '_relate_' +
                        index7,
                      item1,
                      '#00000'
                    )
                  })
                }
                if (item1.dsxs && item1.dsxs.length > 0) {
                  item1.dsxs.forEach((item5, index5) => {
                    var tempLine2 = []
                    item5.forEach((item6, index6) => {
                      tempLine2.push(item6.xaxis)
                      tempLine2.push(item6.yaxis)
                      tempLine2.push(13.5)
                    })
                    this.createLineUp(
                      tempLine2,
                      item.code +
                        '_' +
                        item1.zxcode +
                        '_' +
                        item.id +
                        '_up_' +
                        index5,
                      item1,
                      '#00fffb'
                    )
                  })
                }
              })
            }
            // this.createIdentification(item)
          })
        }
      })
    },
    getAllHWGInfo(req) {
      api.getAllHWGInfo(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.hwg = res.data.list
          console.log('获取全部环网柜', this.mapData.hwg)
          this.mapData.hwg.forEach((item, index) => {
            item['etype'] = Contants.entityTypes.hwg.id
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.hwg.forEach((item, index) => {
            this.createPoint('hwg', item, 3.5)
          })
        }
      })
    },
    getAllJGGet(req) {
      api.getAllJGGet(req).then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          this.mapData.pds = res.data.list
          console.log('获取全部配电室柜', this.mapData.pds)
          this.mapData.hwg.forEach((item, index) => {
            item['etype'] = Contants.entityTypes.pds.id
            this.$set(item, 'isBillboardShow', true)
          })
          this.mapData.pds.forEach((item, index) => {
            this.createPoint('pds', item, 3.5)
          })
        }
      })
    },
    gaoliang(type) {
      var flog = true
      var x = 1
      var count = 0
      // 1、架空线 2、地下线
      return new Cesium.ColorMaterialProperty(
        new Cesium.CallbackProperty(function() {
          if (count < 2) {
            if (flog) {
              x = x - 0.05
              if (x <= 0) {
                flog = false
              }
            } else {
              x = x + 0.05
              if (x >= 1) {
                flog = true
                count++
              }
            }
          }
          return type === 1
            ? Cesium.Color.DEEPSKYBLUE.withAlpha(x)
            : Cesium.Color.GOLD.withAlpha(x)
        }, false)
      )
    },
    // 定位到实体位置TODO 还需要增加高亮，放大，电缆线目前未完成定位
    // payinfo 包括三个内容id，type：dlx，code：如果是电缆线的话，需要这个字段
    locationEntity(item) {
      if (item) {
        console.log(item)
        var pointsList = []
        if (item.entityType === 'dlx') {
          this.entityData.dlx.forEach(dl => {
            if (dl._id.startsWith('dlx_' + item.code)) {
              console.log('type', dl._properties.type._value)
              if (dl._properties.type._value === 'up') {
                dl.polyline.material = this.gaoliang(1)
              } else if (dl._properties.type._value === 'down') {
                dl.polyline.material = this.gaoliang(2)
              }
              dl.polyline.width = 5
              pointsList.push(dl)
            } else {
              if (dl._properties.type._value === 'up') {
                dl.polyline.material = Cesium.Color.DEEPSKYBLUE.withAlpha(0.5)
              } else if (dl._properties.type._value === 'down') {
                dl.polyline.material = Cesium.Color.GOLD.withAlpha(0.5)
              }
              dl.polyline.width = 2
              pointsList.push(dl)
            }
          })
          if (pointsList) {
            console.log('point 数量：' + pointsList.length)
            viewer.flyTo(pointsList, {
              duration: 2
            })
          }
        } else {
          console.log('pointhightloc：', pointhightloc)
          const tempPoint = viewer.entities.getById(
            item.entityType + '_' + item.id
          )
          if (tempPoint) {
            tempPoint.billboard.width = 40
            tempPoint.billboard.height = 40
            tempPoint.label.show = true
            viewer.flyTo(tempPoint, {
              duration: 2,
              complete: this.showDialog(item)
            })
          }
        }
      }
    },
    setPointhightloc(data) {
      console.log('setPointhightloc before------>：', pointhightloc)
      if (pointhightloc) {
        const point = viewer.entities.getById(pointhightloc)
        point.billboard.width = 24
        point.billboard.height = 24
        point.label.show = false
      }
      if (data.id.toString().indexOf('_') !== -1) {
        pointhightloc = data.id
      } else {
        pointhightloc = data.entityType + '_' + data.id
      }
      console.log('setPointhightloc behind------>：', pointhightloc)
    },
    // 显示弹框
    showDialog(data) {
      const id = data.id
      this.propsObject.type = data.entityType
      // 类型包括 defalut 默认， gz 故障 qx 缺陷，yh 隐患
      console.log(
        '显示弹框：' + 'id：' + id + '  type：' + this.propsObject.type
      )
      if (this.propsObject.type === 'gz') {
        this.sendVal = true
        this.setPointhightloc(data)
        this.propsObject.title = '故障信息'
        this.propsObject.moreAttributes = Contants.getGZArray(data)
      } else if (this.propsObject.type === 'qx') {
        this.sendVal = true
        this.setPointhightloc(data)
        this.propsObject.title = '缺陷信息'
        this.propsObject.moreAttributes = Contants.getQXArray(data)
      } else if (this.propsObject.type === 'yh') {
        this.sendVal = true
        this.setPointhightloc(data)
        this.propsObject.title = '隐患信息'
        this.propsObject.moreAttributes = Contants.getYHArray(data)
      } else if (this.propsObject.type === 'pds') {
        api.getAllJGGet({ pdscode: data.code }).then(res => {
          console.log(res)
          if (res && res.code === 200) {
            this.sendVal = true
            this.setPointhightloc(data)
            console.log('获取间隔信息', res.data)
            var info = res.data[0]
            this.propsObject.title = info.shdz
            this.propsObject.basicAttributes = Contants.getPDSArray(info)
            this.propsObject.extendAttributes = Contants.getPDSJGArray(info)
          } else {
            this.sendVal = false
            this.$message({
              message: '暂无相关信息',
              type: 'warning'
            })
          }
        })
      } else if (this.propsObject.type === 'dlj') {
        this.sendVal = true
        this.setPointhightloc(data)
        if (this.mapData.dlj) {
          var info = this.mapData.dlj.find(d => d.id === id)
          if (info) {
            this.propsObject.title = info.name
            this.propsObject.basicAttributes = Contants.getDLJArray(info)
            this.propsObject.extendAttributes = Contants.getDLJJGArray(info)
          }
        }
      } else if (this.propsObject.type === 'gt') {
        this.sendVal = true
        this.setPointhightloc(data)
        if (this.mapData.gt) {
          console.log(this.mapData.gt.length)
          var gtObject = this.mapData.gt.find(d => d.id === id)
          if (gtObject) {
            this.propsObject.title = gtObject.name
            console.log(gtObject)
            this.propsObject.basicAttributes = Contants.getGTArray(info)
            this.propsObject.extendAttributes = Contants.getGTJGArray(info)
          }
        }
      } else if (this.propsObject.type === 'hwg') {
        this.sendVal = true
        this.setPointhightloc(data)
        if (this.mapData.hwg) {
          console.log(this.mapData.hwg.length)
          var hwgObject = this.mapData.hwg.find(d => d.id === id)
          this.propsObject.title = hwgObject.name
          console.log(hwgObject)
          this.propsObject.basicAttributes = Contants.getHWGArray(hwgObject)
          this.propsObject.extendAttributes = Contants.getHWGJJGArray(
            hwgObject
          )
        }
      } else {
        this.sendVal = false
      }
      console.log('listItem--->size:' + this.propsObject.moreAttributes.length)
    },
    // 图例收起展开
    iconLegendFold() {
      this.legendFold = !this.legendFold
    },
    // 图例点击事件
    onItemClickListener(item) {
      var itemObject = this.deviceIconList.find(d => d.id === item.id)
      itemObject.isSelect = !itemObject.isSelect
      console.log('item.type:' + itemObject.type)
      for (let i = 0; i < pointEntities.length; i++) {
        const item = pointEntities[i]
        if (item.id.startsWith(itemObject.type)) {
          item.billboard.show = itemObject.isSelect
        }
      }
    },
    // 底部工具收缩隐藏
    acrowBottomTool() {
      this.isAcrow = !this.isAcrow
      if (this.isAcrow) {
        this.$refs.toolBottomRef.style.cssText = 'height:40px;'
      } else {
        this.$refs.toolBottomRef.style.cssText = 'height:0px;'
      }
    },
    // 底部工具弹框
    bottomTotalBar(data) {
      switch (data) {
        case '重置':
          this.resetMap()
          break
        case '测距':
          this.measureLine()
          break
        case '测高':
          this.measureHeight()
          break
        case '测角度':
          this.measureAngle()
          break
        case '侧面':
          this.startMeasureArea()
          break
        case '标记':
          alert('标记')
          this.markPointEvent()
          break
        case '全屏':
          this.fullScreen()
          break
        case '图层':
          break
        case '显示':
          break
      }
    },
    // 重置
    resetMap() {},
    // 测距
    measureLine() {},
    // 测高
    measureHeight() {},
    // 测角度
    measureAngle() {},
    // 侧面
    startMeasureArea() {},
    // 标记
    markPointEvent() {},
    // 全屏
    fullScreen() {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.fullScreenText = '全屏'
      } else {
        this.fullScreenText = '取消全屏'
      }
    },
    /**
     * 地下模式
     */
    openUnderGround() {
      if (!isUnderground) {
        this.undergroundText = '地上模式'
        this.ugactive()
        isUnderground = true
      } else {
        this.undergroundText = '地下模式'
        this.ugdisable()
        isUnderground = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../../styles/leaflet/Control.MiniMap.css");
@import url("../../styles/leaflet/leaflet.css");
// 加号图标样式
.el-icon-plus {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 888;
}
// 减号图标样式
.el-icon-minus {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 888;
}
// 点击加号图标由大变小动画样式
.animationChangeSmall {
  width: 45px;
  height: 45px;
  animation: changeSmall 1s;
}
@keyframes changeSmall {
  from {
    width: 250px;
    height: 194px;
    opacity: 0;
  }
  to {
    width: 45px;
    height: 45px;
    opacity: 1;
  }
}
// 点击减号图标由小变大动画样式
.animationChangeBig {
  width: 250px;
  height: 194px;
  animation: changeBig 1s;
}
@keyframes changeBig {
  from {
    width: 45px;
    height: 45px;
    opacity: 0;
  }
  to {
    width: 250px;
    height: 194px;
    opacity: 1;
  }
}
.content {
  display: flex;
  flex-direction: row;
  .tool-bar {
    height: 40px;
    position: absolute;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.45);
  }
  .tool-bar > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .tool-bar .tool-fold-box {
    width: 70px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 50%;
    top: -20px;
    margin-left: -35px;
    text-align: center;
    color: #fff;
    border-radius: 2px 2px 0 0;
    background-color: #1dac8e;
  }
  .tool-bar .tool-fold-box i {
    transition: all 0.25s linear;
    display: block;
  }
  .tool-bar .tools {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  .tool-bar .tools img {
    vertical-align: middle;
  }
  .tool-bar .tools span {
    vertical-align: middle;
    margin-left: 5px;
    margin-right: 10px;
    font-size: 12px;
  }
  .tool-bar .tools i {
    transition: all 0.1s linear;
    font-size: 12px;
    vertical-align: middle;
    display: inline-block;
  }
  .tool-bar .tools li {
    cursor: pointer;
    color: #fff;
    margin-left: 10px;
  }
  .tool-bar .tools li:hover {
    color: #55d5a3;
  }
  .tool-bar .underground {
    cursor: pointer;
    color: #fff;
  }
  .tool-bar .slider-b {
    display: flex;
    align-items: center;
    color: #fff;
  }
  .tool-bar .slider-b span:first-child {
    margin-right: 10px;
  }
  .tool-bar .slider-b i:nth-of-type(1) {
    margin-right: 20px;
  }
  .tool-bar .slider-b i:nth-of-type(2) {
    margin-left: 15px;
  }
  .tool-bar .slider-b .transparency {
    margin-right: 20px;
  }
  .tool-bar .slider-b #slider {
    width: 200px;
  }
  .left-bar {
    width: 350px;
    height: calc(100vh - 120px);
    overflow-y: auto;
  }
  .right-gis {
    flex: 1;
    position: relative;
    #cesiumContainer {
      // height: 100%;
    }
    .legend-frame {
      position: absolute;
      bottom: 45px;
      left: 5px;
      border-radius: 8px;
      background-color: black;
      opacity: 0.9;
      overflow: hidden;
      #legend-fold {
        position: absolute;
        top: 5px;
        right: 10px;
        color: #fff;
      }
      > div {
        height: 100%;
        padding: 10px;
        position: relative;
        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          li {
            width: 50%;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
          }
          // .true_dlj{
          //   background:url(../img/dlj.png)no-repeat 20px 20px;
          // }
          // .false_dlj{
          //   background-image:url(../img/dlj1.png) no-repeat 20px 20px;
          // }
          img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            cursor: pointer;
          }
          .legend-txt {
            color: #fff;
          }
        }
        > div {
          display: flex;
          align-items: center;
          overflow: hidden;
          > div {
            width: 33.3%;
            display: flex;
            align-items: center;
            .color-line {
              width: 20px;
              height: 5px;
              margin-right: 5px;
              cursor: pointer;
            }
            .color-line-1 {
              background-color: deepskyblue;
            }
            .color-line-2 {
              background-color: gold;
            }
            .color-line-3 {
              background-color: darkorange;
            }
            span {
              color: #fff;
            }
          }
        }
        .legend-xianlu {
          display: flex;
          justify-content: space-around;
          div {
            margin-right: 38px;
          }
        }
      }
    }
    #addDanger {
      background-color: skyblue;
      position: absolute;
      width: 400px;
      height: 600px;
      z-index: 2;
      top: 0;
      left: 20px;
    }
    #overview {
      z-index: 999;
      // border: 1px solid red;
      width: 300px;
      height: 300px;
      position: absolute;
      right: 10px;
      bottom: 50px;
    }
    #patrolBox {
      font-size: 14px;
      width: 275px;
      height: 450px;
      z-index: 2;
      background-color: #fff;
      position: absolute;
      top: 10px;
      left: 20px;
      border-radius: 4px 4px 0 0;
      .title {
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        background-color: #1dac8e;
        border-radius: 4px 4px 0 0;
        > div:first-child {
          overflow: hidden;
        }
        > div:nth-of-type(2) {
          flex: none;
          width: 35px;
          text-align: center;
          cursor: pointer;
        }
      }
      .control {
        height: 90px;
        padding: 5px 0;
        > div {
          height: 50%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .demonstration {
          padding-left: 5px;
        }
        button {
          width: 50px;
          height: 30px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #f5f5f5;
        }
        button:hover {
          color: #fff;
          border-color: #1dac8e;
          background-color: #1dac8e;
          cursor: pointer;
        }
        #slider-speed {
          width: 180px;
          background-color: #f0f0f0;
        }
      }
      .filter {
        height: 150px;
        padding: 5px 15px;
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #ddd;
        background-color: #f0f0f0;
        overflow-y: auto;
        li {
          width: 50%;
          margin-bottom: 5px;
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
      .content {
        height: 155px;
        .route {
          height: 100%;
          padding: 10px 0 10px 10px;
          position: relative;
          overflow-y: auto;
          .line {
            width: 2px;
            position: absolute;
            left: 22px;
            top: 10px;
            bottom: 10px;
            background-color: #f0f0f0;
          }
          > ul {
            height: 100%;
            padding-left: 25px;
            overflow: auto;
            li {
              cursor: pointer;
              height: 25px;
              padding-left: 10px;
              margin-bottom: 15px;
              position: relative;
              color: #ccc;
              a {
                color: #ccc;
              }
            }
            li:first-child {
              margin-top: 10px;
            }
            li:before {
              content: url("../../assets/img/cycle_1.png");
              position: absolute;
              top: 50%;
              margin-top: -22px;
              left: -30px;
            }
            li:hover {
              color: #1dac8e;
              a {
                color: #1dac8e;
              }
              &:before {
                content: url("../../assets/img/cycle_2.png");
              }
            }
            .lastest {
              color: #221d2b;
              a {
                color: #221d2b;
              }
              &:before {
                content: url("../../assets/img/cycle.png");
              }
            }
          }
        }
      }
      > p {
        padding-left: 15px;
      }
    }
  }
}
</style>

