<template>
  <div v-show="showMask" class="dialog">
    <div class="dialog-container">
      <div class="dialog-title">
        <span>{{ propsObject.title }}</span>
        <div @click="closeMask">  <i class="el-icon-close" /></div>
      </div>

      <div v-if="tabSelect==1">
        <el-tabs v-model="activeName" class="dialog-eltab" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in editableTabs2" :key="index" :label="item.title" :name="item.title" />
        </el-tabs>
        <div
          v-for="(item,index) in propsObject.basicAttributes"
          :key="index"
          class="dialog-list"
        >
          <div
            class="dialog-list-item"
          >{{ item.title }}</div>
          <div
            class="dialog-item-content"
          >{{ item.content }}</div>
        </div>
      </div>
      <div v-else-if="tabSelect==2">
        <el-tabs v-model="activeName" class="dialog-eltab" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in editableTabs2" :key="index" :label="item.title" :name="item.title" />
        </el-tabs>
        <div
          v-for="(item,index) in propsObject.extendAttributes"
          :key="index"
          class="dialog-list"
        >
          <div
            class="dialog-list-item"
          >{{ item.title }}</div>
          <div
            class="dialog-item-content"
          >{{ item.content }}</div>
        </div>
      </div>
      <div v-else-if="tabSelect==3" @click="jiazai3D">
        <span style="margin-left:20px;margin-right:20px;">3D模型</span>
      </div>
      <div v-else-if="tabSelect==4||tabSelect==5||tabSelect==6">
        <div
          v-for="(item,index) in propsObject.moreAttributes"
          :key="index"
          class="dialog-list"
        >
          <div
            class="dialog-list-item"
          >{{ item.title }}</div>
          <div
            class="dialog-item-content"
          >{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as loadThree from '../../utils/loadThreeModel'

export default {
  props: {
    value: {},
    // 类型包括 defalut 默认， fault 故障 defect 缺陷，hiddenDanger 隐患
    propsObject: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showMask: false,
      activeName: '',
      tabSelect: 1,
      titleList1: [
        { title: '基本属性' },
        { title: '扩展属性' },
        { title: '3D模型' }
      ],
      titleList2: [
        { title: '故障' }
      ],
      titleList3: [
        { title: '缺陷' }
      ],
      titleList4: [
        { title: '隐患' }
      ],
      editableTabs2: []
    }
  },
  watch: {
    value(newVal, oldValt) {
      this.showMask = newVal
    },
    showMask(val) {
      this.$emit('input', val)
    },
    propsObject: {
      handler(newVal) {
        if (newVal.type === 'gz') {
          this.tabSelect = 4
        } else if (newVal.type === 'qx') {
          this.tabSelect = 5
        } else if (newVal.type === 'yh') {
          this.tabSelect = 6
        }
        console.log('propsObject：', newVal) // 接收父组件的值
      },
      deep: true,
      immediate: true
    }

  },
  mounted() {
    console.log('on mounted 执行 ....')
    this.showMask = this.value
    // if (this.type === 'default') {
    //   for (let index = 0; index < this.titleList1.length; index++) {
    //     this.$set(this.editableTabs2, index, this.titleList1[index])
    //   }
    // } else if (this.type === 'fault') {
    //   for (let index = 0; index < this.titleList2.length; index++) {
    //     this.$set(this.editableTabs2, index, this.titleList2[index])
    //   }
    // } else if (this.type === 'defect') {
    //   for (let index = 0; index < this.titleList3.length; index++) {
    //     this.$set(this.editableTabs2, index, this.titleList3[index])
    //   }
    // }
    // console.log('on mounted 执行完毕---》' + this.activeName)
  },
  methods: {
    jiazai3D() {
      alert('jiazai3D')
    },
    handleClick(tab, event) {
      console.log(tab, event)
      if (event.target.innerHTML === '基本属性') {
        this.tabSelect = 1
      } else if (event.target.innerHTML === '扩展属性') {
        this.tabSelect = 2
      } else if (event.target.innerHTML === '3D模型') {
        this.tabSelect = 3
      } else if (event.target.innerHTML === '故障') {
        this.tabSelect = 4
      } else if (event.target.innerHTML === '缺陷') {
        this.tabSelect = 5
      } else if (event.target.innerHTML === '隐患') {
        this.tabSelect = 6
      } else {
        this.tabSelect = 7
      }
    },
    closeMask() {
      this.showMask = false
    },
    closeBtn() {
      this.$emit('cancel')
      this.closeMask()
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 9999;
  .dialog-container {
    width: 400px;
    height: 380px;
    background: #ffffff;
    position: absolute;
    // top: 200px;
    // left: 200px;
    // transform: translate(-50%, -50%);
    border-radius: 8px;
    .dialog-title {
      height: 35px;
      padding-left: 15px;
      padding-right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      background-color: #1dac8e;
      border-radius: 4px 4px 0 0;
    }
    .dialog-list{
      margin-left:20px;
      margin-right:20px;
      margin-top:10px;
      display:flex;
      align-items:center;
      overflow: auto;
    }
    .dialog-list-item{
      width:30%;
      font-size:13px;
      background:#EDEDED;
      padding-left:5px;
      padding-top:3px;
      padding-bottom:3px;
    }
      .dialog-item-content{
        width:70%;
        margin-left:20px;
        font-size:13px;
        background:#EDEDED;
        padding-left:5px;
        padding-top:3px;
        padding-bottom:3px;
      }
    .dialog-eltab {
      margin-left: 20px;
      margin-right: 20px;
    }
    .content {
      color: #797979;
      line-height: 26px;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .inp {
      margin: 10px 0 0 20px;
      width: 200px;
      height: 40px;
      padding-left: 4px;
      border-radius: 4px;
      border: none;
      background: #efefef;
      outline: none;
      &:focus {
        border: 1px solid #509ee3;
      }
    }
    .btns {
      width: 100%;
      height: 60px;
      // line-height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: right;
      padding: 0 16px;
      box-sizing: border-box;
      & > div {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 0 14px;
        color: #ffffff;
        background: #f1f1f1;
        border-radius: 8px;
        margin-right: 12px;
        cursor: pointer;
      }
      .default-btn {
        color: #787878;
        &:hover {
          color: #509ee3;
        }
      }
      .danger-btn {
        background: #ef8c8c;
        &:hover {
          background: rgb(224, 135, 135);
        }
        &:active {
          background: #ef8c8c;
        }
      }
      .confirm-btn {
        color: #ffffff;
        background: #509ee3;
        &:hover {
          background: #6fb0eb;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
}
</style>
