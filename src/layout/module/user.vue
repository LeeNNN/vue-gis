<template>
  <div class="user">
    <img :src="require('@/assets/images/thumbnail.jpg')" class="thumbnail">
    <span>{{ username }}</span>
    <svg-icon :icon-class="'right'" :class-name="'right-icon'" />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      username: '超级管理员-admin'
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  .thumbnail {
    width: 40px;
    height: 40px;
    stroke:#727171;
    vertical-align: middle;
    border-radius: 20px;
  }
  span {
    font-size: 14px;
    color: white;
    margin: 5px;
  }
  .right-icon {
    width: 15px;
    height: 15px;
    fill: white;
    transform: rotate(90deg);
  }
}
</style>
