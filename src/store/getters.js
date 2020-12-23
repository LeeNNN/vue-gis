const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  userId: state => state.user.userId,
  roleId: state => state.user.roleId,
  zfbid: state => state.user.zfbid,
  changePwd: state => state.user.changePwd,
  postId: state => state.user.postId,
  navSelectIndex: state => state.nav.selectIndex
}
export default getters
