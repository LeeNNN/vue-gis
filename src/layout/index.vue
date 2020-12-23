<template>
  <div style="padding-top: 54px;">
    <div class="layout">
      <div class="logo" />
      <div class="content">
        <el-menu
          :default-active="activeIndex"
          class="nav"
          mode="horizontal"
          background-color="rgba(0,0,0,0)"
          text-color="#fff"
          active-text-color="#fff"
          router
          @select="selectMenu"
        >
          <el-menu-item
            v-for="(item, index) in routerList"
            :key="index"
            :index="item.path"
          >
            <img :src="require('@/assets/images/nav_01.png')" class="icon">
            <!-- <svg-Icon :icon-class="item.icon" :class-name="'icon'" /> -->
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
        <el-dropdown>
          <user class="login" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改信息</el-dropdown-item>
            <el-dropdown-item>安全管理</el-dropdown-item>
            <el-dropdown-item>退了</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import User from './module/user'
// import { debounce } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    User
  },
  data() {
    return {
      // activeIndex: '/',
      routerList: [
        { path: '/', title: '首页', icon: '' },
        { path: '/layout/operation', title: '运维管理', icon: 'nav_01' },
        { path: '/layout/configuration', title: '配置管理', icon: 'nav_01' }
      ],
      scrollEvent: null,
      show: true,
      alpha: 1,
      top: 0
    }
  },
  computed: {
    ...mapGetters([
      'navSelectIndex'
    ]),
    activeIndex() {
      return this.routerList.map(item => item.path)[this.navSelectIndex]
    }
  },
  watch: {
    $route(val) {
      const index = this.routerList.map(item => item.path).indexOf(val.path)
      if (index >= 0) {
        this.$store.dispatch('nav/updateSelectIndex', index)
      }
    }
  },
  beforeDestroy() {
  },
  methods: {
    selectMenu(path) {
      this.$store.dispatch('nav/updateSelectIndex', this.routerList.map(item => item.path).indexOf(path))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.layout {
  @include clearfix;
  position: fixed;
  top: 0;
  height: 54px;
  width: 100%;
  background: linear-gradient(90deg, #23a591, #57d7a3);
  overflow: hidden;
  padding: 0 15px;
  .logo {
    display: inline-block;
    width: 339px;
    height: 54px;
    box-sizing: content-box;
    background-image: url('~@/assets/images/logo.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  .content {
    float: right;
    @include clearfix;
  }
  /deep/.el-menu--horizontal {
    border-bottom: none;
  }
  .nav {
    float: left;
    /deep/.el-menu-item{
      height: 54px;
      line-height: 54px;
      // border-bottom: none;
      &.is-active {
        // border-bottom: none;
        border-bottom: 4px solid #23a591;
        font-weight: bolder;
        .icon {
          stroke: white;
        }
      }
      span {
        font-size: 13px;
      }
    }
  }
  .login {
    float: right;
    height: 54px;
    line-height: 54px;
    margin-left: 30px;
    cursor: pointer;
  }
}
.icon {
  height: 28px;
  width: 28px;
  margin-right: 5px;
  stroke: #A0A0A0;
  vertical-align: middle;
}
</style>

