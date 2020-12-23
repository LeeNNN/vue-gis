<!-- 隐患管理 -->
<template>
  <div id="dangerManagement">
    <div class="dangerTitle">隐患信息管理</div>
    <el-button class="add" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
    <input id="uploadEventFile" type="file" name="fileup" style="display:none" @change="fileChange($event)">
    <el-button class="import" icon="el-icon-upload" @click="importData($event)">导入</el-button>
    <div class="dangerSearch">
      <div>
        <div class="dangerSearchTitle">隐患管理查询框</div>
        <div class="dangerSearchArrow" @click="openSearch()">{{ isOpen?'收起':'展开' }}</div>
      </div>
      <el-form ref="form" :model="form">
        <el-date-picker
          v-model="form.dangerSearchDate"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="date"
        />
        <el-form-item label="所属变电站">
          <el-select v-model="form.bdzid" placeholder="请选择变电站" class="bdz" @change="bdzchange">
            <el-option v-for="(item, index) in getBDZ" :key="index" :label="item.bdzmc" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属线路">
          <el-select v-model="form.dlxid" placeholder="请选择线路" class="ssxl">
            <el-option v-for="(item, index) in dlxOptions" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="隐患类型">
          <el-select v-model="form.type" placeholder="请选择线路" class="commonWidth">
            <el-option label="树木隐患" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="隐患状态">
          <el-select v-model="form.status" placeholder="请选择线路" class="commonWidth">
            <el-option label="已处理" value="1" />
            <el-option label="未处理" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search" @click="onSubmit">查 询</el-button>
        </el-form-item>
      </el-form>
      <a id="dangerDownload" href="#">模板文件下载</a>
    </div>
    <el-dialog title="新增隐患" :visible.sync="dialogFormVisible">
      <div id="add-danger-body">
        <el-form :model="addform">
          <el-form-item>
            <span>所属变电站：</span>
            <el-select v-model="addform.bdzid" @change="addbdzchange">
              <el-option v-for="(item,index) in getBDZ" :key="index" :label="item.bdzmc" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>所属线路：</span>
            <el-select v-model="addform.dlxid">
              <el-option v-for="(item,index) in dlxOptions" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>设备类型：</span>
            <el-select v-model="addform.glsblx" placeholder="请选择" @change="sblxChange">
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
          <el-form-item>
            <span>设备设施：</span>
            <el-select v-model="addform.facilities">
              <el-option v-for="(item, index) in facilitiesOptions" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>隐患类型：</span>
            <el-select v-model="addform.type">
              <el-option label="树木隐患" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>隐患状态：</span>
            <el-select v-model="addform.status" @change="chuli">
              <el-option label="已处理" value="1" />
              <el-option label="未处理" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="isChuli">
            <span>锯树日期：</span>
            <el-date-picker
              v-model="addform.jssj"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions2"
            />
          </el-form-item>
          <el-form-item>
            <span>隐患名称：</span>
            <el-input v-model="addform.name" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>运维站：</span>
            <el-input v-model="addform.ywz" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>班组：</span>
            <el-input v-model="addform.bz" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>树木缺陷：</span>
            <el-input v-model="addform.description" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>树木种类：</span>
            <el-input v-model="addform.smzl" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>通道内碰线树木：</span>
            <el-input v-model="addform.tdnpx" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>通道内碰未线树木：</span>
            <el-input v-model="addform.tdnwpx" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>通道内树木小计：</span>
            <el-input v-model="addform.tdnxj" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>清理碰线树木：</span>
            <el-input v-model="addform.qlpx" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>清理未碰线树木：</span>
            <el-input v-model="addform.qlwpx" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>赔青备注：</span>
            <el-input v-model="addform.pqbz" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>村组名称：</span>
            <el-input v-model="addform.czmc" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>备注：</span>
            <el-input v-model="addform.bzxx" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>锯树树木：</span>
            <el-input v-model="addform.jssm" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>通道状况：</span>
            <el-input v-model="addform.tdzk" autocomplete="off" style="width: 203px;" />
          </el-form-item>
          <el-form-item>
            <span>提交时间：</span>
            <el-date-picker
              v-model="addform.tjsj"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions2"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <div id="yhgl-xinxi">
      <div v-show="isSearch">未查询到数据...</div>
      <ul>
        <li v-for="(item, index) in allyhdata" :key="index" :yhid="item.id" :glsbid="item.sbs[0].glsbid" @click="locationPosition(item)">
          <div class="xiangqing">
            <div class="xq-left">
              <div>树木缺陷：{{ item.description }}</div>
              <div>树木种类：{{ item.smzl }}</div>
              <div>赔青备注：{{ item.pqbz }}</div>
              <div>提交时间：{{ item.tjsj }}</div>
              <div>锯树时间：{{ item.jssj }}</div>
            </div>
            <div class="xq-right">
              <div v-if="item.status===2" :id="item.id" class="xcyh" :yhid="item.id" :glsbid="item.sbs[0].glsbid" @click.stop="cleanDanger" @click="eliminateShow($event)">消除隐患</div>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="isEliminated" class="xcyhtime">
      <el-date-picker
        v-model="xcyhdate"
        type="date"
        range-separator="-"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择消除日期"
        :picker-options="pickerOptions2"
        class="xcyhdate"
      />
      <el-button class="xcyhqx" @click="cancelDanger">取消</el-button>
      <el-button class="xcyhqd" @click="confirmDanger">确定</el-button>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/operation.js'
import $ from 'jquery'
/*
 * 隐患管理
 * */
// 打开隐患管理
export default {
  name: 'Danger',
  props: {},
  data() {
    return {
      allyhpoint: null,
      allyhdata: null,
      imgsrc: '',
      eliminated: require('../../../assets/img/duihao.png'),
      notEliminated: require('../../../assets/img/hiddentrouble.png'),
      yhcxData: '', // 隐患查询条件
      form: {
        dangerSearchDate: '', // 查询日期
        bdzid: '', // 选择变电站
        dlxid: '', // 所属线路
        type: '', // 隐患类型
        status: '' // 隐患状态
      },
      xcyhdate: '', // 消除隐患的日期
      isEliminated: false, // 消除缺陷框是否显示
      dangerid: '', // 点击消除隐患时的yhid
      getBDZ: [], // 变电站下拉框
      dlxOptions: [], // 电缆线下拉框的内容
      isOpen: false, // 隐患查询框是否展开
      isSearch: true, // 是否查询到数据
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
      // 新增隐患的参数
      bdzOptions: [],
      facilitiesOptions: [],
      dialogFormVisible: false,
      isChuli: false, // 是否处理
      sbs: null, // 关联设备信息
      addform: {
        bdzid: '', // 选择变电站
        dlxid: '', // 选择线路
        glsblx: '', // 选择设备类型
        facilities: '', // 设备设施
        type: '', // 隐患类型
        jjsj: '', // 锯树时间
        name: '', // 隐患名称
        ywz: '', // 运维站
        bz: '', // 班组
        description: '', // 树木缺陷
        smzl: '', // 树木种类
        tdnpx: '', // 通道内彭县
        tdnwpx: '', // 通道内未碰线
        tdnxj: '', // 通道内小计
        qlpx: '', // 清理碰线树木
        qlwpx: '', // 清理未碰线树木
        pqbz: '', // 赔青备注
        czmc: '', // 村组名称
        bzxx: '', // 备注信息
        jssm: '', // 锯树树木
        tdzk: '', // 通到状况
        tjsj: '' // 提交时间
      },
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
    Api.getAllYH({}).then(res => {
      console.log(res)
      if (res.code === 200 && res.data.total !== 0) {
        this.allyhpoint = res.data.list
        this.$emit('refeshDanger', this.allyhpoint)
      }
    })
    const yhdata = {
      pageno: this.splitPage.pageno,
      pagesize: this.splitPage.pagesize
    }
    Api.getAllYH(yhdata).then(res => {
      console.log(res)
      if (res.code === 200) {
        this.isSearch = false
        this.allyhdata = res.data.list
        this.splitPage.total = res.data.total
      }
    })
    Api.getSubstation({}).then(res => {
      if (res.code === 200) {
        this.getBDZ = res.data.list
      }
    })
  },
  methods: {
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
        vm.$http.post('/malfunction/toInsertYH_add', formData, config).then(function(response) {
          alert('上传成功')
        })
      } else {
        alert('只能上传excel文件')
      }
    },
    // 点击隐患进行地图定位，然后延迟打开弹框
    locationPosition: function(item) {
      if (item) {
        console.log('点击的隐患item', item)
        this.$set(item, 'entityType', 'yh')
        this.$emit('locationEntity', item)
      }
    },
    // 展开/收起 查询框
    openSearch() {
      if (this.isOpen === false) {
        $('.dangerSearch').animate({ height: '355px' }, 500)
        // 获取隐患下载模板文件地址
        this.downloadModelFile(2)
        this.isOpen = true
      } else {
        $('.dangerSearch').animate({ height: '70px' }, 500)
        this.isOpen = false
      }
    },
    // 选择变电站，获取电缆线
    bdzchange(e) {
      const data = {
        bdzid: e,
        pageno: 0,
        pagesize: 0
      }
      Api.getAllDLX(data).then(res => {
        if (res.code === 200) {
          this.dlxOptions = res.data.res
        }
      })
    },
    // 新增时选择变电站，获取电缆线，最好不与查询方法公用，会互相影响
    addbdzchange(e) {
      const data = {
        bdzid: e,
        pageno: 0,
        pagesize: 0
      }
      Api.getAllDLX(data).then(res => {
        if (res.code === 200) {
          this.dlxOptions = res.data.res
        }
      })
    },
    // 选择设备类型
    sblxChange(e) {
      const data = {
        bdzid: this.addform.bdzid,
        dlxid: this.addform.dlxid,
        type: e
      }
      Api.getAllFacByParams(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.facilitiesOptions = res.data
        }
      })
    },
    // 隐患状态选择
    chuli(e) {
      if (e === '1') {
        this.isChuli = true
      } else {
        this.isChuli = false
      }
    },
    // 查询隐患
    onSubmit() {
      if (this.form.dangerSearchDate) {
        const starttime = this.form.dangerSearchDate[0]
        const endtime = this.form.dangerSearchDate[1]
        this.yhcxData = {
          starttime: starttime,
          endtime: endtime,
          pageno: this.splitPage.pageno,
          pagesize: this.splitPage.pagesize
        }
        if (this.form.bdzid) {
          this.yhcxData['bdzid'] = this.form.bdzid
        }
        if (this.form.dlxid) {
          this.yhcxData['dlxid'] = this.form.dlxid
        }
        if (this.form.type) {
          this.yhcxData['yhlx'] = this.form.type
        }
        if (this.form.status) {
          this.yhcxData['status'] = this.form.status
        }
        console.log(this.yhcxData)
        Api.getAllYH(this.yhcxData).then(res => {
          if (res.code === 200) {
            this.isSearch = false
            this.allyhdata = res.data.list
            this.splitPage.total = res.data.total
          } else {
            this.isSearch = true
            this.allyhdata = []
          }
          $('.dangerSearch').animate({ height: '70px' }, 500)
          this.isOpen = false
        })
      }
    },
    // 获取隐患模板文件下载地址
    downloadModelFile(type) {
      const data = {
        type: type
      }
      Api.downloadFlaw(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          const downloadUrl = res.data
          const serverUrl = 'http://101.132.68.240:8081/YZPOWER/'
          const myurl = serverUrl + downloadUrl
          $('#dangerDownload').attr('href', downloadUrl)
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 如果是查询出来的数据
      if (this.isSearch === false) {
        var data = {
          starttime: this.form.dangerSearchDate[0],
          endtime: this.form.dangerSearchDate[1],
          pageno: val,
          pagesize: this.splitPage.pagesize
        }
      } else {
        data = {
          pageno: val,
          pagesize: this.splitPage.pagesize
        }
      }
      Api.getAllYH(data).then(res => {
        if (res.code === 200) {
          this.isSearch = false
          this.allyhdata = res.data.list
          this.splitPage.total = res.data.total
        }
      })
    },
    // 消除缺陷
    eliminateShow(e) {
      this.dangerid = e.target.parentElement.parentElement.parentElement.getAttribute('yhid')
      this.isEliminated = true
      const pgleft = event.pageX - 200
      const pgtop = event.pageY - 115
      console.log(pgleft, pgtop)
      // console.log($('.layout').height(), $('.nav').height())
      $('.xcyhtime').css('left', pgleft)
      $('.xcyhtime').css('top', pgtop)
    },
    // 消除取消
    cancelDanger() {
      this.isEliminated = false
      this.xcyhdate = ''
    },
    // 确认消除
    confirmDanger() {
      const data = {
        id: this.dangerid,
        jjsj: this.xcyhdate
      }
      console.log(data)
      Api.eliminatedDanger(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          alert('消除成功')
          this.cancelDanger()
          Api.getAllYH({}).then(res => {
            if (res.code === 200 && res.data.total !== 0) {
              this.allyhpoint = res.data.list
              this.$emit('refeshDanger', this.allyhpoint)
            }
          })
        }
      })
    },
    // 确认新增
    addConfirm() {
      const sbssid = this.addform.facilities
      const sbglxx = this.facilitiesOptions.filter(function(item, index) {
        return sbssid === item.id
      })
      if (sbglxx.length !== 0) {
        const glsbid = sbglxx[0].id // 关联设备id
        const glsblx = this.addform.type ? this.addform.type : 1 // 关联设备类型
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
      console.log(this.sbs)
      const addyhdata = {
        bdzid: this.addform.bdzid,
        dlxid: this.addform.dlxid,
        status: this.addform.status,
        name: this.addform.name,
        ywz: this.addform.ywz,
        bz: this.addform.bz,
        description: this.addform.description,
        smzl: this.addform.smzl,
        tdnpx: this.addform.tdnpx,
        tdnwpx: this.addform.tdnwpx,
        tdnxj: this.addform.tdnxj,
        qlpx: this.addform.qlpx,
        qlwpx: this.addform.qlwpx,
        pqbz: this.addform.pqbz,
        czmc: this.addform.czmc,
        bzxx: this.addform.bzxx,
        jssm: this.addform.jssm,
        tdzk: this.addform.tdzk,
        tjsj: this.addform.tjsj
      }
      if (this.addform.status === '1') {
        addyhdata['jssj'] = this.addform.jssj
      }
      const data1 = addyhdata
      if (this.sbs) {
        const data2 = this.sbs
        var data = {
          yh: data1,
          sbs: data2
        }
      } else {
        data = {
          yh: data1
        }
      }
      console.log(data)
      Api.addDanger(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#dangerManagement{
  position: relative;
  .dangerTitle{
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
  .dangerSearch{
    padding: 0 15px;
    border: 1px solid #ddd;
    left: 20px;
    top: 35px;
    font-size: 12px;
    width: 300px;
    height: 70px;
    position: absolute;
    overflow: hidden;
    background-color: #ffffff;
    z-index: 2;
    >div{
      height: 30px;
      line-height: 30px;
      position: relative;
      .dangerSearchTitle{
        color: #1dac8e;
        position: absolute;
      }
      .dangerSearchArrow{
        color: #999;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
    .date{
      margin-bottom: 18px;
      width: 100%;
    }
    .commonWidth{
      width: 200px;
    }
    .bdz{
      width: 185px;
    }
    .ssxl{
      width: 200px;
    }
    .search{
      width: 100%;
      background-color: #1dac8e;
      color: #fff;
    }
    #dangerDownload:hover{
      color: #1dac8e;
    }
  }
  #yhgl-xinxi {
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
        .xcyh {
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
        img{
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
  .paging{
    position: absolute;
    top: 765px;
    width: 320px;
    text-align: center;
  }
  .xcyhtime {
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
    .xcyhdate{
      width: 100%;
    }
    button {
      width: 80px;
      height: 30px;
      margin-top: 5px;
    }
    .xcyhqd {
      margin-left: 6px;
      background-color: #1dac8e;
      color: #fff;
    }
  }
}

</style>
