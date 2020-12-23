<template>
  <div id="app">
    <!-- <el-button size="medium">按钮</el-button>
    <el-button size="small">按钮</el-button>
    <el-button size="mini">按钮</el-button>
    <svg-Icon :icon-class="'back'" /> -->
    <!-- <layout /> -->
    <!-- <div class="bottom" /> -->
    <router-view />
  </div>
</template>
<script>
// import SvgIcon from '@/components/SvgIcon'
// import Layout from '@/layout'
export default {
  name: 'App',
  components: {
    // SvgIcon,
    // Layout
  },
  data() {
    return {
      activeIndex2: '1'
    }
  }
}
</script>
<style lang="scss">
// #app {
  // padding-top: 55px;
  // // min-width: 1280px;
  // // 固定宽度
  // max-width: 1280px;
  // width: 100%;
  // // overflow: hidden;
  // margin: 0 auto;
  // box-shadow: 0 -64px 2px 2px #eaeaea;
// }
</style>
