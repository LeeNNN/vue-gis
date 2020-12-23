<!-- 故障管理 -->
<template>
  <div id="faultManagement">
    <div class="faultTitle">故障信息管理</div>
    <div class="faultSearch">
      <div class="faultSearchTitle">
        <span>故障管理查询框</span>
      </div>
      <div class="faultTime">
        <!-- <span>故障时间：</span> -->
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div class="faultType">
        <el-form ref="form" :model="form">
          <!-- <span>故障类型：</span> -->
          <el-form-item label="故障类型">
            <el-select v-model="form.type" placeholder="请选择故障类型" class="faultTypeSelect">
              <el-option label="外力因素" value="1" />
              <el-option label="设备本体" value="2" />
              <el-option label="运行维护不当" value="3" />
              <el-option label="用户原因" value="4" />
              <el-option label="自然因素" value="5" />
              <el-option label="其他原因" value="6" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="faultKeywords">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input class="kw" v-model="formInline.kw" placeholder="请输入搜索关键词" />
          </el-form-item>
          <el-form-item>
            <el-button class="searchButton" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="gzgl-xinxi">
      <ul>
        <li v-for="(item, index) in allgzdata" :key="index" @click="locationPosition(item)">
          <div class="xiangqing">
            <div class="xq-left">
              <div>故障类型：{{ item.gzfl }}</div>
              <div>单位名称：{{ item.bdzmc }}</div>
              <div>故障时间：{{ item.gzsj }}</div>
              <div>关联设备：{{ item.glsbname }}</div>
            </div>
            <div class="xq-right">
              <div class="range">影响范围</div>
              <img :src="imgsrc" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { getAllGZ } from '@/api/operation.js'
var pageno = 0
var pagesize = 0
var gzdata = {
  pageno: pageno,
  pagesize: pagesize
}
var gzstarttime = ''
var gzendtime = ''
var gzfl = ''
var query = ''
var faultData = {
  gzstarttime: gzstarttime,
  gzendtime: gzendtime,
  gzfl: gzfl,
  query: query
}

export default {
  name: 'Fault',
  props: {},
  data() {
    return {
      allgzdata: null,
      searchFaultData: null,
      imgsrc: '',
      eliminated: require('../../../assets/img/duihao.png'),
      notEliminated: require('../../../assets/img/gantanhao2.png'),
      faultType: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      form: {
        type: '',
        keyword: ''
      },
      faultKeywords: '',
      formInline: {
        kw: '',
        region: ''
      }
    }
  },
  created() {},
  mounted() {
    getAllGZ(gzdata).then(res => {
      console.log(res)
      if (res.code === 200) {
        this.allgzdata = res.data.list
        this.imgsrc = this.notEliminated
        this.$emit('gzCreatePoint', this.allgzdata)
        this.allgzdata.forEach((item, index) => {
          if (item.gzfl === 1) {
            item.gzfl = '外力因素'
          } else if (item.gzfl === 2) {
            item.gzfl = '设备本体'
          } else if (item.gzfl === 3) {
            item.gzfl = '运行维护不当'
          } else if (item.gzfl === 4) {
            item.gzfl = '用户原因'
          } else if (item.gzfl === 5) {
            item.gzfl = '自然因素'
          } else if (item.gzfl === 6) {
            item.gzfl = '其他原因'
          }
        })
      }
    })
  },
  methods: {
    // 点击故障进行地图定位，然后延迟打开弹框
    locationPosition: function(item) {
      if (item) {
        console.log('点击的故障Item', item)
        this.$set(item, 'entityType', 'gz')
        this.$emit('locationEntity', item)
      }
    },
    onSubmit() {
      if (this.value1) {
        faultData.gzstarttime = this.value1[0]
        faultData.gzendtime = this.value1[1]
        faultData.gzfl = this.form.type
        faultData.query = this.formInline.kw
        alert(JSON.stringify(faultData))
        getAllGZ(faultData).then(res => {
          console.log('搜索出来的故障', res)
          this.allgzdata = res.data.list
          this.$emit('gzCreatePoint', this.allgzdata)
          this.allgzdata.forEach((item, index) => {
            if (item.gzfl === 1) {
              item.gzfl = '外力因素'
            } else if (item.gzfl === 2) {
              item.gzfl = '设备本体'
            } else if (item.gzfl === 3) {
              item.gzfl = '运行维护不当'
            } else if (item.gzfl === 4) {
              item.gzfl = '用户原因'
            } else if (item.gzfl === 5) {
              item.gzfl = '自然因素'
            } else if (item.gzfl === 6) {
              item.gzfl = '其他原因'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#faultManagement{
  position: relative;
  .faultTitle{
    top: 5px;
    left: 5px;
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    color: #1dac8e;
    height: 20px;
    line-height: 20px;
  }
  .faultSearch{
    // position: absolute;
    padding: 0 15px;
    border: 1px solid #ddd;
    left: 20px;
    top: 35px;
    font-size: 12px;
    width: 300px;
    height: 150px;
    position: absolute;
    background-color: #ffffff;
    z-index: 2;
    color: #1dac8e;
    div{
      // border: 1px solid red;
      height: 30px;
      line-height: 30px;
      margin-bottom: 5px;
    }
    .faultTime{
      >div{
        width: 100%;
      }
    }
    .faultType{
      >div{
        width: 100%;
      }
      .faultTypeSelect{
        width: 200px;
      }
    }
    .kw{
      width: 188px;
    }
    .searchButton{
      background-color: #1dac8e;
      color: #ffffff;
      width: 60px;
    }
  }
  #gzgl-xinxi {
    position: absolute;
    top: 185px;
    bottom: 55px;
    padding-left:20px;
    width: 320px;
    height: 400px;
    overflow: auto;
    .xiangqing {
      font-size: 12px;
      border: 1px solid #dddddd;
      margin: 17px 0;
      padding: 4px 0 4px 12px;
      display: flex;
      //height: 155px;
      &:hover {
        background-color: #ededed;
      }
      .xq-left {
        width: 450px;
        div {
          line-height: 20px;
        }
      }
      .xq-right {
        width: 100%;
        position: relative;
        .range {
          position: absolute;
          top: 10px;
          left: 30px;
          font-size: 12px;
          border-radius: 14px;
          background-color: #ededed;
          border: 5px solid #ededed;
          cursor: pointer;
          &:hover {
            background-color: #ffffff;
          }
        }
        img {
          position: absolute;
          top: 40px;
          left: 40px;
        }
        .yhycl {
          position: absolute;
          top: 7px;
          left: -3px;
          font-size: 12px;
          border-radius: 14px;
          background-color: #ededed;
          //color: white
          border: 5px solid #ededed;
          &:hover {
            //border-color: #1dac8e;
            background-color: #ffffff;
            //color: #FFFFFF;
          }
        }
        .pic {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

</style>
