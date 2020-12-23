import request from '@/utils/request'

export const getTree = () => {
  console.log('获取左侧树')
  return request({
    url: '/dljxg/toGetTree_get',
    method: 'get'
  })
}
export const getAllFacByParams = (
  bdzid,
  dlxid,
  type
) => {
  return request({
    url: '/equipment/getAllFacByParams_get',
    method: 'get',
    params: {
      bdzid,
      dlxid,
      type
    }
  })
}
