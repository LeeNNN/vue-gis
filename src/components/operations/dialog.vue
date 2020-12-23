<template>
  <div v-show="showMask" class="dialog">
    <div class="dialog-container">
      <div class="dialog-title">
        <span>{{ propsObject.title }}</span>
        <div @click="closeMask">
          <i class="el-icon-close" />
        </div>
      </div>
      <el-tabs v-model="activeName" class="dialog-eltab" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="index"
          :label="item.title"
          :name="item.title"
        />
      </el-tabs>
      <div v-if="tabSelect==1">
        <div v-for="(item,index) in propsObject.basicAttributes" :key="index" class="dialog-list">
          <div class="dialog-list-item">{{ item.title }}</div>
          <div class="dialog-item-content">{{ item.content }}</div>
        </div>
      </div>
      <div v-else-if="tabSelect==2">
        <div v-for="(item,index) in propsObject.extendAttributes" :key="index" class="dialog-list">
          <div class="dialog-list-item">{{ item.title }}</div>
          <div class="dialog-item-content">{{ item.content }}</div>
        </div>
      </div>
      <div v-else-if="tabSelect==3">
        <div>
          <LoadThreeD />
        </div>
      </div>
      <div v-else-if="tabSelect==4||tabSelect==5||tabSelect==6">
        <div v-for="(item,index) in propsObject.moreAttributes" :key="index" class="dialog-list">
          <div class="dialog-list-item">{{ item.title }}</div>
          <div class="dialog-item-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadThreeD from '../LoadThreeD/LoadThreeD.vue'
export default {
  components: {
    LoadThreeD
  },
  props: {
    value: { Boolean },
    // 类型包括 gz 故障 qx 缺陷，yh 隐患 , pds 配电室 ，dlj 电缆井 ，gt 杆塔
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
      activeName: '基本属性',
      tabSelect: 1,
      tabHeadList: [
        { title: '基本属性' },
        { title: '扩展属性' },
        { title: '3D模型' }
      ],
      editableTabs2: []
    }
  },
  watch: {
    value(newVal, oldValt) {
      console.log('on watch 执行 ....', newVal)
      this.showMask = newVal
    },
    showMask(val) {
      this.$emit('input', val)
    },
    propsObject: {
      handler(newVal) {
        console.log('is show dialog ....', this.showMask)
        if (newVal.type === 'gz') {
          this.tabSelect = 4
          this.editableTabs2 = []
        } else if (newVal.type === 'qx') {
          this.tabSelect = 5
          this.editableTabs2 = []
        } else if (newVal.type === 'yh') {
          this.tabSelect = 6
          this.editableTabs2 = []
        } else if (
          newVal.type === 'pds' ||
          newVal.type === 'dlj' ||
          newVal.type === 'gt' ||
          newVal.type === 'hwg'
        ) {
          this.tabSelect = 1
          this.activeName = '基本属性'
          for (let index = 0; index < this.tabHeadList.length; index++) {
            this.$set(this.editableTabs2, index, this.tabHeadList[index])
          }
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
    // console.log('on mounted 执行完毕---》' + this.activeName)
  },
  methods: {
    load3D() {
      alert('加载3D模型')
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
    width: 350px;
    height: 380px;
    background: #ffffff;
    position: absolute;
    top: 10%;
    left: 75%;
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
    .dialog-list {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      overflow: auto;
    }
    .dialog-list-item {
      width: 30%;
      font-size: 13px;
      background: #ededed;
      padding-left: 5px;
      padding-top: 3px;
      padding-bottom: 3px;
    }
    .dialog-item-content {
      width: 70%;
      margin-left: 20px;
      font-size: 13px;
      background: #ededed;
      padding-left: 5px;
      padding-top: 3px;
      padding-bottom: 3px;
    }
    .dialog-eltab {
      margin-left: 20px;
      margin-right: 20px;
    }
    #three{
      height: 200px;
    }
  }
}
</style>
