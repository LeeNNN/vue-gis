<!-- 巡视管理 -->
<template>
  <div>
    巡视管理
    <el-input
      v-model="filterText"
      label="搜索"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      :data="tree"
      class="filter-tree"
      node-key="id"
      highlight-current
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="props"
      :filter-node-method="filterNode"
      @node-click="treeNodeClick"
    />
  </div>
</template>

<script>

import { getLineTree } from '@/api/operations/tour.js'

export default {

  name: 'Tour',
  props: {},
  data() {
    return {
      filterText: '',
      props: {
        label: 'name' // 需要指定的节点渲染对象属性
      },
      tree: [],
      id: 0
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
  },
  mounted() {
    getLineTree().then(res => {
      console.log('get result1', res.data)

      this.tree = res.data
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    treeNodeClick: function(node, data, value) {
      console.log('node:', data.data)
      this.$emit('clickTree', data.data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
