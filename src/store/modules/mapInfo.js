import * as mapinfoMutation from '../mapinfo-mutation-type'
const state = {

  pointInfo: {
    isShow: false,
    data: {
      'a': 1,
      'b': 2
    }
  },
  errorInfo: {
    isShow: false,
    data: {}
  }

}
// const getters = {
//   showErr: state => state.errorInfo.isShow,
//   showInfo: state => state.pointInfo.isShow
// }
const mutations = {
  [mapinfoMutation.SHOW_BASIC_INFO](state, payload) {
    state.pointInfo.isShow = payload.isShow
    state.pointInfo.data = payload
  },
  [mapinfoMutation.SET_VIEWER](state, payload) {
    state.viewer = payload.viewer
  }
}
const actions = {

}
export default {
  state,
  // getters,
  mutations,
  actions
}
