import request from '@/utils/request'

export const getTree = ({
  treeId = 1
}) => {
  console.log('加载user')
  return request({
    url: '/dljxg/getAllDLJByDLX_get2',
    method: 'get',
    params: {
      treeId
    }
  })
}