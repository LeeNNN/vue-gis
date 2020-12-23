const state = {
  selectIndex: 0
}
const mutations = {
  SET_SELECTINDEX(state, index) {
    state.selectIndex = index
  }
}
const actions = {
  updateSelectIndex({ commit }, index) {
    return new Promise((resolve, reject) => {
      commit('SET_SELECTINDEX', index)
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
