import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'configuration',
        name: 'Configuration',
        component: () => import('@/views/configuration'),
        meta: {
          title: '配置管理'
        }
      },
      {
        path: 'operation',
        name: 'Operation',
        component: () => import('@/views/operation'),
        redirect: '/layout/operation/device',
        meta: {
          title: '运维管理'
        },
        children: [
          {
            path: 'device',
            name: 'Device',
            component: () => import('@/views/operation/device'),
            meta: {
              title: '设备管理'
            }
          },
          {
            path: 'tour',
            name: 'Tour',
            component: () => import('@/views/operation/tour'),
            meta: {
              title: '巡视管理'
            }
          },
          {
            path: 'analysis',
            name: 'Analysis',
            component: () => import('@/views/operation/analysis'),
            meta: {
              title: '分析管理'
            }
          }, {
            path: 'fault',
            name: 'Fault',
            component: () => import('@/views/operation/fault'),
            meta: {
              title: '故障管理'
            }
          },
          {
            path: 'defect',
            name: 'Defect',
            component: () => import('@/views/operation/defect'),
            meta: {
              title: '缺陷管理'
            }
          },
          {
            path: 'danger',
            name: 'Danger',
            component: () => import('@/views/operation/danger'),
            meta: {
              title: '隐患管理'
            }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
