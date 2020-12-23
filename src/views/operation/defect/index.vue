<!-- 缺陷管理 -->
<template>
  <div id="defectManagement">
    <div class="defectTitle">缺陷信息管理</div>
    <el-button class="add" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
    <input id="uploadEventFile" type="file" name="fileup" style="display:none" @change="fileChange($event)">
    <el-button class="import" icon="el-icon-upload" @click="importData($event)">导入</el-button>

    <el-dialog title="新增缺陷" :visible.sync="dialogFormVisible">
      <el-form id="addFlawForm" ref="add" :model="addform" :rules="rules">
        <el-form-item label="缺陷名称" prop="name" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.name" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="所属变电站" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.ssbdz" placeholder="请选择" style="width: 70%;" @change="bdzchange">
            <el-option label="京华变" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属线路" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.ssxl" placeholder="请选择" style="width: 70%;">
            <el-option v-for="(item, index) in dlxOptions" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.sblx" placeholder="请选择" style="width: 70%;" @change="sblxChange">
            <el-option label="电缆井" value="8" />
            <el-option label="环网柜" value="1" />
            <el-option label="配电房" value="3" />
            <el-option label="开关站" value="2" />
            <el-option label="杆塔" value="9" />
            <el-option label="电缆分支箱" value="7" />
            <el-option label="柱上开关" value="5" />
            <el-option label="箱式变压器" value="4" />
            <el-option label="柱上变压器" value="10" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备设施" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.sbss" placeholder="请选择" style="width: 70%;">
            <el-option v-for="(item, index) in facilities" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="缺陷类型" prop="qxlx" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.qxlx" placeholder="请选择" style="width: 70%;" @change="typechange">
            <el-option label="请选择" value="0" />
            <el-option label="架空线路缺陷类别" value="1" />
            <el-option label="柱上真空开关" value="21" />
            <el-option label="柱上SF6开关" value="33" />
            <el-option label="柱上隔离开关" value="45" />
            <el-option label="跌落式熔断器" value="53" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="flawTypeLevel" label="缺陷二类" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.qxlx2" placeholder="请选择" style="width: 70%;" @change="typechange2">
            <el-option label="请选择" value="0" />
            <el-option v-for="(item, index) in type2Options" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="flawTypeLevel2" label="缺陷三类" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.qxlx3" placeholder="请选择" style="width: 70%;" @change="typechange3">
            <el-option label="请选择" value="0" />
            <el-option v-for="(item, index) in type3Options" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="运维站" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.ywz" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="缺陷参照物位置" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.czw" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="缺陷内容" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.content" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="缺陷等级" prop="level" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.level" placeholder="请选择" style="width: 70%;">
            <el-option label="一般" value="1" />
            <el-option label="严重" value="2" />
            <el-option label="危急" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="来源" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.source" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="确认途径" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.confirm" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="上报人" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.report" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="消缺建议" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.advice" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="缺陷状态" prop="status" :label-width="addform.formLabelWidth">
          <el-select v-model="addform.status" placeholder="请选择" style="width: 70%;" @change="addClearFlaw">
            <el-option label="未处理" value="2" />
            <el-option label="已处理" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="消缺联系单编号" :label-width="addform.formLabelWidth">
          <el-input v-model="addform.number" autocomplete="off" style="width: 70%;" />
        </el-form-item>
        <el-form-item label="上报日期" prop="value3" :label-width="addform.formLabelWidth">
          <el-date-picker
            v-model="value3"
            type="date"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择上报日期"
            :picker-options="pickerOptions3"
            style="width: 70%;"
          />
        </el-form-item>
        <el-form-item v-show="isClear" label="消缺日期" :label-width="addform.formLabelWidth">
          <el-date-picker
            v-model="value4"
            type="date"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择上报日期"
            :picker-options="pickerOptions3"
            style="width: 70%;"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = true">取 消</el-button>
        <el-button type="primary" @click="submitAddFlaw();resetForm('add')">确 定</el-button>
      </div>
    </el-dialog>

    <div id="defectSearch" class="defectSearch">
      <div>
        <div class="defectSearchTitle">缺陷管理查询框</div>
        <div class="defectSearchArrow" @click="openSearch()">{{ isOpen?'收起':'展开' }}</div>
      </div>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        value-format="yyyy-MM-dd HH:mm:ss"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions1"
        class="date"
      />
      <el-form ref="form" :model="form">
        <el-form-item label="所属变电站">
          <el-select v-model="form.bdzid" placeholder="请选择变电站" class="bdz" @change="bdzchange">
            <el-option label="京华变" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属线路">
          <el-select v-model="form.dlxid" placeholder="请选择线路" class="xl">
            <el-option v-for="(item, index) in dlxOptions" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="缺陷类型">
          <el-select v-model="form.type" placeholder="请选择缺陷类型" class="type" @change="typechange">
            <el-option label="请选择" value="0" />
            <el-option label="架空线路缺陷类别" value="1" />
            <el-option label="柱上真空开关" value="21" />
            <el-option label="柱上SF6开关" value="33" />
            <el-option label="柱上隔离开关" value="45" />
            <el-option label="跌落式熔断器" value="53" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="flawTypeLevel" label="缺陷二类">
          <el-select v-model="form.type2" placeholder="请选择缺陷类型" class="type" @change="typechange2">
            <el-option label="请选择" value="0" />
            <el-option v-for="(item, index) in type2Options" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="flawTypeLevel2" label="缺陷三类">
          <el-select v-model="form.type3" placeholder="请选择缺陷类型" class="type" @change="typechange3">
            <el-option label="请选择" value="0" />
            <el-option v-for="(item, index) in type3Options" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="缺陷状态">
          <el-select v-model="form.status" placeholder="请选择缺陷状态" class="status">
            <el-option label="全部" value="" />
            <el-option label="已处理" value="1" />
            <el-option label="未处理" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search" @click="onSubmit">查 询</el-button>
        </el-form-item>
      </el-form>
      <a id="flawDownload" href="#">模板文件下载</a>
    </div>
    <div id="qxgl-xinxi">
      <div v-show="isSearch">未查询到数据...</div>
      <ul>
        <li v-for="(item, index) in allqxdata" :key="index" :qxid="item.id" :glsbid="item.sbs[0].glsbid ? item.sbs[0].glsbid : ''" :glsbtype="item.sbs[0].glsblx ? item.sbs[0].glsblx : ''" @click="locationPosition(item)">
          <div class="xiangqing">
            <div class="xq-left">
              <div>缺陷名称：{{ item.name }}</div>
              <div>缺陷类别：{{ item.lxname }}</div>
              <div>缺陷等级：{{ item.level }}</div>
              <div>上报日期：{{ item.tjsj }}</div>
              <div>消缺日期：{{ item.jjsj }}</div>
            </div>
            <div class="xq-right">
              <div v-if="item.status===2" class="xcqx" @click="eliminateShow($event)">消除缺陷</div>
              <img :src="item.status===1?eliminated:notEliminated" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="block paging">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="splitPage.total"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="splitPage.pagesize"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="isEliminated" class="xcqxtime">
      <el-date-picker
        v-model="value2"
        type="date"
        range-separator="-"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择消除日期"
        :picker-options="pickerOptions2"
        class="xcqxdate"
      />
      <el-button class="xcqxqx" @click="cancelFlaw">取消</el-button>
      <el-button class="xcqxqd" @click="confirmFlaw">确定</el-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/operation.js'
import $ from 'jquery'
var pageno = 1
var pagesize = 5
var qxdata = {
  // status: 2,
  pageno: pageno,
  pagesize: pagesize
}
var lx = ''
var bdzid = ''
var dlxid = ''
var status = ''
var starttime = ''
var endtime = ''
var defectData = {
  lx: lx,
  bdzid: bdzid,
  dlxid: dlxid,
  status: status,
  starttime: starttime,
  endtime: endtime,
  pageno: pageno,
  pagesize: pagesize
}
export default {
  name: 'Defect',
  props: {},
  data() {
    return {
      allqxpoint: null, // 缺陷所有的点
      allqxdata: null, // 缺陷信息
      imgsrc: '',
      eliminated: require('../../../assets/img/duihao.png'),
      notEliminated: require('../../../assets/img/flaw_wcl.png'),
      isEliminated: false, //
      dialogFormVisible: false,
      // 新增缺陷表单参数
      addform: {
        name: '', // 缺陷名称
        ssbdz: '', // 所属变电站
        ssxl: '', // 所属线路
        sblx: '', // 设备类型
        sbss: '', // 设备设施
        qxlx: '', // 缺陷一类
        qxlx2: '', // 缺陷二类
        qxlx3: '', // 缺陷三类
        ywz: '', // 运维站
        czw: '', // 参照物
        content: '', // 缺陷内容
        level: '', // 缺陷等级,
        source: '', // 来源
        confirm: '', // 确认途径
        report: '', // 上报人
        advice: '', // 消缺建议
        status: '', // 缺陷状态
        number: '', // 消缺联系单编号
        delivery: false,
        formLabelWidth: '120px'
      },
      // 新增缺陷填写规则
      rules: {
        name: [{ required: true, message: '请输入缺陷名称', trigger: 'blur' }],
        qxlx: [{ required: true, message: '请选择缺陷类型', trigger: 'change' }],
        status: [{ required: true, message: '请选择缺陷状态', trigger: 'change' }],
        level: [{ required: true, message: '请选择缺陷等级', trigger: 'change' }],
        value3: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      },
      // 日期选择
      pickerOptions1: {
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
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      pickerOptions3: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '', // 查询缺陷日期的值
      value2: '', // 消除缺陷日期的值
      value3: '', // 新增缺陷上报日期的值
      value4: '', // 新增缺陷解决时间的值
      isClear: false, // 新增缺陷是否已解决
      // 表单的参数
      form: {
        bdzid: '',
        dlxid: '',
        type: '',
        type2: '',
        type3: '',
        status: ''
      },
      qxlx: '', // 查询缺陷缺陷类型
      qxlx2: '', // 新增缺陷缺陷类型
      dlxOptions: [], // 电缆线下拉框的内容
      facilities: [], // 设备设施
      type2Options: [], // 缺陷类型二级下拉框内容
      type3Options: [], // 缺陷类型三级下拉框内容
      flawTypeLevel: false, // 是否选择缺陷一级
      flawTypeLevel2: false, // 是否选择缺陷二级
      isOpen: false, // 缺陷查询框是否展开
      isSearch: true, // 是否查询到数据
      flawid: '', // 点击消除缺陷时的qxid
      sbs: null, // 设备设施相关
      qx: null, // 新增缺陷相关
      // 分页的参数
      splitPage: {
        pageno: 1, // 当前页数
        pagesize: 5, // 一页的数据量
        total: 0 // 总数据
      }
    }
  },
  created() {},
  mounted() {
    api.getAllQX({}).then(res => {
      if (res.code === 200 && res.data.total !== 0) {
        this.allqxpoint = res.data.list
        this.$emit('qxCreatePoint', this.allqxpoint)
      }
    })
    api.getAllQX(qxdata).then(res => {
      if (res.code === 200 && res.data.total !== 0) {
        this.isSearch = false
        this.allqxdata = res.data.list
        this.splitPage.total = res.data.total
        this.allqxdata.forEach((item, index) => {
          if (item.level === 1) {
            item.level = '一般'
          } else if (item.level === 2) {
            item.level = '严重'
          } else if (item.level === 3) {
            item.level = '危急'
          }
        })
      }
    })
  },
  methods: {
    // 点击缺陷进行地图定位，然后延迟打开弹框
    locationPosition: function(item) {
      console.log('点击的缺陷item', item)
      if (item) {
        this.$set(item, 'entityType', 'qx')
        this.$emit('locationEntity', item)
      }
    },
    // 导入文件
    importData: function(event) {
      event.preventDefault()
      $('#uploadEventFile').trigger('click')
    },
    fileChange: function(el) {
      el.preventDefault()// 取消默认行为
      const vm = this
      const uploadEventFile = $('#uploadEventFile').val()
      this.file = el.target.files[0]
      if (uploadEventFile === '') {
        alert('请择excel,再上传')
      } else if (uploadEventFile.lastIndexOf('.xls') > 0 || uploadEventFile.lastIndexOf('.XLS') > 0) {
        const formData = new FormData()
        // 向 formData 对象中添加文件
        formData.append('file', this.file)
        const config = {
        // 一定要定义头
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        // url为对应的后端接口
        vm.$http.post('/malfunction/toInsertQX_add', formData, config).then(function(response) {
          alert('上传成功')
        })
      } else {
        alert('只能上传excel文件')
      }
    },
    // 新增缺陷
    submitAddFlaw() {
      let data = null
      const sbssid = this.addform.sbss
      const sbglxx = this.facilities.filter(function(item, index) {
        return sbssid === item.id
      })
      if (sbglxx.length !== 0) {
        const glsbid = sbglxx[0].id // 关联设备id
        const glsblx = this.addform.sblx // 关联设备类型
        const glsbbm = sbglxx[0].code // 关联设备编码
        const glsbname = sbglxx[0].name // 关联设备名称
        this.sbs = [{
          glsbid: glsbid,
          glsblx: glsblx,
          glsbbm: glsbbm,
          glsbname: glsbname
        }]
      } else {
        this.sbs = null
      }
      const name = this.addform.name // 缺陷名称
      const bdzid = this.addform.ssbdz // 变电站id
      const dlxid = this.addform.ssxl // 电缆线id
      const ywz = this.addform.ywz // 运维站
      const qxczwwz = this.addform.czw // 参照物位置
      const description = this.addform.content // 缺陷内容
      const qxlevel = this.addform.level // 缺陷等级
      const source = this.addform.source // 来源
      const qrtj = this.addform.confirm // 确认途径
      const sbr = this.addform.report // 上报人
      const clcs = this.addform.advice // 消缺建议
      const lxdbh = this.addform.advice // 联系单建议
      const qxlx = this.qxlx2 // 缺陷类型
      const qxstatus = this.addform.status // 缺陷状态
      const tjsj = this.value3 // 提交时间
      const jjsj = this.value4 // 解决时间
      if (!qxlx) {
        alert('请选择缺陷类型!')
        return
      } else if (!$.trim(name)) {
        alert('请填写缺陷名称!')
        return
      } else if (!this.sbs) {
        alert('请选择设备设施!')
      } else {
        this.qx = {
          name: name,
          qxczwwz: qxczwwz,
          description: description,
          level: parseInt(qxlevel),
          ly: source,
          qrtj: qrtj,
          sbr: sbr,
          clcs: clcs,
          lxdbh: lxdbh,
          lx: parseInt(qxlx),
          ywz: ywz,
          bdzid: parseInt(bdzid),
          dlxid: parseInt(dlxid),
          status: parseInt(qxstatus),
          tjsj: tjsj || new Date()
        }
      }
      if (qxstatus === '1') {
        this.qx[jjsj] = jjsj
      }
      var data1 = JSON.stringify(this.qx)
      console.log(data1)
      if (this.sbs) {
        console.log(this.sbs)
        var data2 = JSON.stringify(this.sbs)
        console.log(data2)
        data = {
          qx: data1,
          sbs: data2
        }
      } else {
        data = {
          qx: data1
        }
      }
      console.log(data)
      api.addFlaw(data).then(res => {
        console.log(res)
      })
      this.dialogFormVisible = false
    },
    // 缺陷查询
    onSubmit() {
      if (this.value1) {
        defectData.starttime = this.value1[0]
        defectData.endtime = this.value1[1]
        defectData.dlxid = this.form.dlxid
        defectData.lx = this.qxlx
        defectData.status = this.form.status
        defectData.bdzid = this.form.bdzid
        console.log(JSON.stringify(defectData))
        api.getAllQX(defectData).then(res => {
          console.log('查询出来的缺陷', res)
          if (res.code === 200) {
            this.isSearch = false
            this.allqxdata = res.data.list
            this.splitPage.total = res.data.total
            this.allqxdata.forEach((item, index) => {
              if (item.level === 1) {
                item.level = '一般'
              } else if (item.level === 2) {
                item.level = '严重'
              } else if (item.level === 3) {
                item.level = '危急'
              }
            })
          } else {
            this.isSearch = true
            this.allqxdata = []
          }
          $('#defectSearch').animate({ height: '70px' }, 500)
          this.isOpen = false
        })
      }
    },
    // 选择变电站，获取电缆线
    bdzchange(e) {
      const data = {
        bdzid: e,
        pageno: pageno,
        pagesize: pagesize
      }
      api.getAllDLX(data).then(res => {
        this.dlxOptions = res.data.res
      })
    },
    // 选择缺陷类型一， 获取二级缺陷
    typechange(e) {
      this.type2Options = []
      this.type3Options = []
      this.form.type2 = '0'
      this.form.type3 = '0'
      this.addform.qxlx2 = '0'
      this.addform.qxlx3 = '0'
      this.flawTypeLevel = false
      this.flawTypeLevel2 = false
      console.log(e)
      if (e === '0') {
        this.flawTypeLevel = false
        this.flawTypeLevel2 = false
        this.qxlx = ''
        this.qxlx2 = ''
      } else {
        const data = {
          parentid: e
        }
        this.qxlx = e
        this.qxlx2 = e
        api.getFlawType(data).then(res => {
          console.log(res)
          if (res.data) {
            this.type2Options = res.data
            this.flawTypeLevel = true
          } else {
            this.type2Options = []
            this.flawTypeLevel = false
            this.flawTypeLevel2 = false
          }
        })
      }
    },
    // 选择二级缺陷，获取三级缺陷
    typechange2(e) {
      this.type3Options = []
      this.form.type3 = '0'
      this.addform.qxlx3 = '0'
      console.log(e)
      if (e === '0') {
        this.flawTypeLevel2 = false
      } else {
        const data = {
          parentid: e
        }
        this.qxlx = e
        this.qxlx2 = e
        api.getFlawType(data).then(res => {
          console.log(res)
          if (res.data) {
            this.type3Options = res.data
            this.flawTypeLevel2 = true
          } else {
            this.type3Options = []
            this.flawTypeLevel2 = false
          }
        })
      }
    },
    typechange3(e) {
      if (e !== '0') {
        this.qxlx = e
        this.qxlx2 = e
      }
    },
    // 展开/收起 查询框
    openSearch() {
      if (this.isOpen === false) {
        $('#defectSearch').animate({ height: '455px' }, 500)
        // 获取缺陷模板文件地址
        this.downloadFlawFile(1)
        this.isOpen = true
      } else {
        $('#defectSearch').animate({ height: '70px' }, 500)
        this.isOpen = false
      }
    },
    // 获取缺陷模板文件下载地址
    downloadFlawFile(type) {
      const data = {
        type: type
      }
      api.downloadFlaw(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          const downloadUrl = res.data
          const serverUrl = 'http://101.132.68.240:8081/YZPOWER/'
          const myurl = serverUrl + downloadUrl
          $('#flawDownload').attr('href', downloadUrl)
        }
      })
    },
    // 消除缺陷
    eliminateShow(e) {
      this.flawid = e.target.parentElement.parentElement.parentElement.getAttribute('qxid')
      this.isEliminated = true
      const pgleft = event.pageX - 200
      const pgtop = event.pageY - 115
      console.log(pgleft, pgtop)
      // console.log($('.layout').height(), $('.nav').height())
      $('.xcqxtime').css('left', pgleft)
      $('.xcqxtime').css('top', pgtop)
    },
    // 消除取消
    cancelFlaw() {
      this.isEliminated = false
      this.value2 = ''
    },
    // 确认消除
    confirmFlaw() {
      const data = {
        id: this.flawid,
        jjsj: this.value2
      }
      console.log(data)
      api.eliminatedFlaw(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          alert('消除成功')
          this.cancelFlaw()
          api.getAllQX({}).then(res => {
            if (res.code === 200 && res.data.total !== 0) {
              this.allqxpoint = res.data.list
              this.$emit('qxCreatePoint', this.allqxpoint)
            }
          })
        }
      })
    },
    // 新增缺陷中选择线路获取设备
    sblxChange(e) {
      console.log(e)
      const data = {
        bdzid: this.addform.ssbdz,
        dlxid: this.addform.ssxl,
        type: e
      }
      api.getAllFacByParams(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.facilities = res.data
        }
      })
    },
    // 新增缺陷已解决
    addClearFlaw(e) {
      console.log(e)
      if (e === '1') {
        this.isClear = true
      } else {
        this.isClear = false
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 如果是查询出来的数据
      if (this.isSearch === false) {
        var data = {
          starttime: this.value1[0],
          endtime: this.value1[1],
          dlxid: this.form.dlxid,
          lx: this.qxlx,
          status: this.form.status,
          bdzid: this.form.bdzid,
          pageno: val,
          pagesize: pagesize
        }
      } else {
        data = {
          pageno: val,
          pagesize: this.splitPage.pagesize
        }
      }
      api.getAllQX(data).then(res => {
        if (res.code === 200) {
          this.isSearch = false
          this.allqxdata = res.data.list
          this.splitPage.total = res.data.total
          this.allqxdata.forEach((item, index) => {
            if (item.level === 1) {
              item.level = '一般'
            } else if (item.level === 2) {
              item.level = '严重'
            } else if (item.level === 3) {
              item.level = '危急'
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#defectManagement{
  position: relative;
  height: 100%;
  .defectTitle{
    top: 5px;
    left: 5px;
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    color: #1dac8e;
    height: 20px;
    line-height: 20px;
  }
  .add{
    position: absolute;
    right: 110px;
    top: 2px;
  }
  .import{
    position: absolute;
    right: 30px;
    top: 2px;
  }
  .yhfileup{
    display: none;
  }
  .defectSearch{
    padding: 0 15px;
    border: 1px solid #ddd;
    left: 20px;
    top: 35px;
    font-size: 12px;
    width: 300px;
    height: 70px; // 455
    overflow: hidden;
    position: absolute;
    background-color: #ffffff;
    z-index: 2;
    >div{
      height: 30px;
      line-height: 30px;
      position: relative;
      .defectSearchTitle{
        color: #1dac8e;
        position: absolute;
      }
      .defectSearchArrow{
        color: #999;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
    el-dialog{
      input{
        width: 203px;
      }
    }
    .date{
      width: 100%;
      margin-bottom: 18px;
    }
    .bdz{
      width: 185px;
      margin: 0;
    }
    .xl{
      width: 200px;
      margin: 0;
    }
    .type{
      width: 200px;
      margin: 0;
    }
    .status{
      width: 200px;
      margin: 0;
    }
    .search{
      width: 100%;
      background-color: #1dac8e;
      color: #fff;
    }
    #flawDownload:hover{
      color: #1dac8e;
    }
  }
  #qxgl-xinxi {
    position: absolute;
    top: 105px;
    bottom: 55px;
    padding-left: 20px;
    width: 320px;
    height: 640px;
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
        width: 472px;
        div {
          line-height: 20px;
        }
      }
      .xq-right {
        width: 100%;
        position: relative;
        .xcqx {
          position: absolute;
          top: 10px;
          left: 30px;
          font-size: 12px;
          border-radius: 14px;
          background-color: #ededed;
          border: 5px solid #ededed;
          cursor: pointer;
          &:hover {
            background-color: #FFFFFF;
          }
        }
        img{
          position: absolute;
          top: 40px;
          left: 40px;
        }

      }
    }
  }
  .paging{
    position: absolute;
    top: 765px;
    width: 320px;
    text-align: center;
  }
  .xcqxtime {
    // display: none;
    position: absolute;
    z-index: 2;
    width: 200px;
    height: 100px;
    padding: 16px;
    background-color: #fff;
    border: 1px solid #ededed;
    border-radius: 5px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
    .xcqxdate{
      width: 100%;
    }
    button {
      width: 80px;
      height: 30px;
      margin-top: 5px;
    }
    .xcqxqd {
      margin-left: 6px;
      background-color: #1dac8e;
      color: #fff;
    }
  }
}

</style>
