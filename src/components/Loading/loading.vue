<template>
  <div class="loading">
    <div class="loading-content">
      <div class="pillar" />
      <div class="pillar" />
      <div class="pillar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100000;
  background-color: rgba($color: #fff, $alpha: 0.7);
  .loading-content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: auto;
    display: inline-block;
    vertical-align: middle;
  }
}
.pillar {
  display: inline-block;
  width: 8px;
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  background: #CB3A28;
}
.pillar:first-of-type {
  left: 0;
  animation: line-grow 0.5s ease alternate infinite;
}
.pillar:nth-of-type(2) {
  left: 20px;
  animation: line-grow 0.5s 0.2s ease alternate infinite;
}
.pillar:last-of-type {
  left: 40px;
  animation: line-grow 0.5s 0.4s ease alternate infinite;
}
@keyframes line-grow {
  0% {
    height: 0;
  }
  100% {
    height: 75%;
  }
}
</style>
