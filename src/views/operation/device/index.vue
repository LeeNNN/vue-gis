<!-- 设备管理 -->
<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="设备管理" name="1" height="100px">
        <div class="demo-input-suffix">
          <el-input v-model="filterText" class="demo-input-size" placeholder="输入关键字进行过滤">
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
        <div class="tree">
          <el-tree
            ref="tree"
            height="100px"
            class="el-tree"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="props"
            :filter-node-method="filterNode"
            @node-click="treeNodeClick"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级查询" name="2">
        <div>
          <div class="demo-input-suffix">
            所属变电站
            <el-select v-model="selectedStation">
              <el-option
                v-for="item in treeData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="demo-input-suffix">
            <label>所属线路</label>
            <el-select v-model="selectedLine" :default-first-option="true">
              <el-option
                v-for="item in selectLineData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="demo-input-suffix">
            类型
            <el-select v-model="selectedType" :default-first-option="true" value-key="id" @change="getAllFacByParams">
              <el-option
                v-for="(item,index) in selectTypeData"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="demo-input-suffix">
            <el-input class="demo-input-size" placeholder="输入关键字进行过滤">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </div>
          <el-table
            :data="tableData"
            height="200px"
            style="width: 100% "
            highlight-current-row
            @row-click="handleRowClick"
          >
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="name" label="名称" width="180" />
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item title="通道资源管理" name="3">
        <div class="passageway-box panel-box">
          <div class="panel-title">
            <div class="demo-input-suffix">
              所属变电站
              <el-select v-model="selectedStation" @change="handleLineSelect">
                <el-option
                  v-for="item in treeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="demo-input-suffix">
              所属线路
              <el-select v-model="selectedLine" @change="handleLineSelect">
                <el-option
                  v-for="item in selectLineData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <div class="filter-box layui-form">
            <div>
              起点：
              <el-select v-model="beginDianLanJin" filterable @change="beginDianLanJinChange">
                <el-option
                  v-for="item in beginDianLanJinData"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </div>
            <div>
              终点：
              <el-select v-model="endDianLanJin">
                <el-option
                  v-for="item in endDianLanJinData"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </div>
            <div>
              <el-button type="primary" @click="handleChannelSearch">通道资源查询</el-button>
            </div>
          </div>
          <div class="content-box">
            <div>
              <el-table
                :data="channelData"
                style="width: 100% "
                height="200px"
                @cell-click="channelCellClick"
              >
                <el-table-column prop="id" label="通道编号" kid="id" />
                <el-table-column prop="pname" label="起始电缆井" />
                <el-table-column prop="cname" label="终止电缆井" />
                <el-table-column :formatter="stateFormat" prop="status" label="状态" />
              </el-table>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getTree, getAllFacByParams } from '../../../api/operations/device.js'
import * as constants from '../../../api/contants.js'
import * as mapinfoMutation from '../../../store/mapinfo-mutation-type'
import { mapState, mapMutations } from 'vuex'
import {
  getAllDLJByDLX_get,
  getChannelCanUse,
  getAllDLJTD
} from '@/api/operation.js'

export default {
  name: 'Device',
  props: {},
  data() {
    return {
      activeName: '1',
      selectedStation: null,
      selectedLine: null,
      selectedType: null,
      beginDianLanJin: null,
      endDianLanJin: null,
      beginDianLanJinData: [],
      endDianLanJinData: [],
      filterText: '',

      tableData: [],
      props: {
        label: 'name' // 需要指定的节点渲染对象属性
      },
      selectStationData: [],
      selectLineData: [],
      selectTypeData: [],
      treeData: [],
      channelData: [],
      id: 0
      // defaultProps: {
      //   children: 'children',
      //   lable: 'name'
      // },
    }
  },
  computed: {
    ...mapState({ pointInfo: stata => stata.mapInfo.pointInfo })

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    pointInfo: {
      deep: true,
      handler: function(val) {
        console.log('监听到了' + val)
      }
    },
    selectedStation(val) {
      console.log(val)
      this.selectLineData = this.selectStationData.find(item => { return item.id === val }).children
      this.selectedLine = this.selectLineData[0].id
    }
  },

  created() {},
  mounted() {
    getTree().then(res => {
      this.treeData = res.data
      this.selectStationData = res.data
      this.selectStation = res.data[0].id
    })
    this.selectTypeData = constants.entityTypes
  },
  methods: {
    ...mapMutations({
      [mapinfoMutation.SHOW_BASIC_INFO]: mapinfoMutation.SHOW_BASIC_INFO
    }),
    // TODO
    testStore() {
      this.$store.commit(mapinfoMutation.SHOW_BASIC_INFO, {
        test: 'not ok',
        isShow: true
      })
      this.$store.commit(mapinfoMutation.SET_VIEWER, {
        viewer: { a: 'a' }
      })
    },
    // TODO
    testStoreSet() {
      this.$store.commit(mapinfoMutation.SHOW_BASIC_INFO, {
        test: 'ok',
        isShow: false
      })
    },
    // 树节点过滤事件
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 树节点点击触发事件
    treeNodeClick: function(node, data, value) {
      console.log('节点树：' + node.type + '节点的id：' + node.id + 'code：' + node.code)
      if (node.type) {
        const payload = { id: node.id, entityType: node.type, code: node.code, name: node.name }
        this.$emit('locationEntity', payload)
      }
    },
    // 高级查询，根据类型，站点和线路获取节点
    getAllFacByParams: function() {
      getAllFacByParams(

        this.selectStation,
        this.selectedLine,
        this.selectedType
      ).then(res => {
        this.tableData = res.data
      })
    },
    // 高级查询点击节点触发选择事件（跳转到地图所在点，以及展示信息）
    handleRowClick: function(row, event, column) {
      const entityType = constants.geteEtityType(this.selectedType)
      const payload = { id: row.id, entityType: entityType.type }
      console.log('节点树：' + entityType.type + '节点的id：' + row.id)
      this.$emit('locationEntity', payload)
    },
    // 根据电缆线和变电站获取所有的电缆井
    handleLineSelect: function() {
      getAllDLJByDLX_get('', this.selectStation, this.selectedLine).then(res => {
        this.beginDianLanJinData = res.data
      })
    },
    // 根據起始點和結束點查詢可用通道
    handleChannelSearch: function() {
      getAllDLJTD(this.endDianLanJin.code, this.beginDianLanJin.code).then(
        res => {
          this.channelData = res.data
          console.log(this.channelData)
        }
      )
    },
    // 根据起始点获取可用的电缆井
    beginDianLanJinChange: function(selectData) {
      console.log('dianlanjing', selectData.code)
      getChannelCanUse(selectData.code).then(res => {
        this.endDianLanJinData = res.data
      })
    },
    stateFormat(row, column) {
      if (row.status === 1) {
        return '已占用'
      } else if (row.status === 0) {
        return '未占用'
      } else if (row.status === 2) {
        return '管沟'
      } else if (row.status === 3) {
        return '无法勘测'
      }
    },
    channelCellClick(row, column, cell, event) {
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  min-width: 100%;
  font-size: 9px;
  display: inline-block;
}

.tree {
  overflow-y: auto;
  overflow-x: scroll;
  height: 400px;
}
</style>
