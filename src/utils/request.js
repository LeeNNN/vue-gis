import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Loading from '@/components/Loading'
import { getToken } from '@/utils/auth'

let loadingInstance = null
function closeLoading() {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
// request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent
//     if (store.getters.token) {
//       config.headers['Authorization'] = getToken()
//     }
//     closeLoading()
//     loadingInstance = Loading()
//     return config
//   },
//   error => {
//     closeLoading()
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  response => {
    closeLoading()
    if (response.status === 200) {
      const res = response.data
      console.log(res)
      // if (res.header.code === 0) {
      return res
      // } else {
      //   process.env_NODE_ENV === 'development' && console.error(res.header.msg)
      //   Message({
      //     title: '系统提示',
      //     message: res.header.msg || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      //   return Promise.reject(new Error(res.header.msg || 'Error'))
      // }
    } else {
      // 异常处理
      Message({
        message: '系统异常',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(`请求状态码：${response.status}` || 'Error'))
    }

    // const res = response.data

    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    closeLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
