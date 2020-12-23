<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(route, index) in routerList"
        :key="index"
        :to="{name: route.name}"
      >
        {{ route.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    routerList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
