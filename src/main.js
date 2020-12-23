import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/icons'
/* 引入资源请求插件 */
import VueResource from 'vue-resource'

/* 使用VueResource插件 */
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
