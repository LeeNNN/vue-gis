// 全局的loading组件，常用在请求中
import Vue from 'vue'
import LoadingVue from './loading.vue'
const LoadingConstructor = Vue.extend(LoadingVue)
LoadingConstructor.prototype.close = function() {
  this.$nextTick(() => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  })
}

const Loading = (options = {}) => {
  const parent = document.body
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })
  parent.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
  })
  return instance
}
export default Loading

