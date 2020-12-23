import request from '@/utils/request'
export const getLineTree =  () => {
  console.log('获取左侧树')
  return request({
    url: '/dljxg/toGetLineTree_get',
    method: 'get'
  })
}

