const entityTypes = {
  dlj: {
    'id': 8,
    'name': '电缆井',
    'type': 'dlj'
  },
  hwg: {
    'id': 1,
    'name': '环网柜',
    'type': 'hwg'
  },
  pds: {
    'id': 3,
    'name': '配电房',
    'type': 'pds'
  },
  kgz: {
    'id': 2,
    'name': '开关站',
    'type': 'kgz'
  },
  gt: {
    'id': 9,
    'name': '杆塔',
    'type': 'gt'
  },
  dlfzx: {
    'id': 7,
    'name': '电缆分支箱',
    'type': 'dlfzx'
  },
  zskg: {
    'id': 5,
    'name': '柱上开关',
    'type': 'zskg'
  },
  xb: {
    'id': 4,
    'name': '箱式变压器',
    'type': 'xb'
  },
  zsbyq: {
    'id': 10,
    'name': '柱上变压器',
    'type': 'zsbyq'
  }

}

const geteEtityType = function(id) {
  for (var p in entityTypes) {
    if (entityTypes[p].id === id) {
      return entityTypes[p]
    }
  }
  return null
}
// 1两通井 2三通井 3四通井 4转角井
const dljType = [{ 'id': 1, 'name': '直线 井' }, { 'id': 2, 'name': '三通井' }, { 'id': 3, 'name': '四通井' }, { 'id': 4, 'name': '转角井' }]

const geteDljType = function(id) {
  for (var index in dljType) {
    if (dljType[index].id === id) {
      return dljType[index].name
    }
  }
  return null
}
// 获取故障集合
const getGZArray = function(data) {
  return [
    { title: '故障时间', content: data.gzsj },
    { title: '解决时间', content: data.jjsj },
    { title: '故障类型', content: data.gzfl },
    { title: '地区', content: data.dq },
    { title: '单位', content: data.dw },
    { title: '运维站', content: data.ywz },
    { title: '所属班组', content: data.ssbz },
    { title: '保护动作情况', content: data.bhdzqk },
    { title: '原因描述', content: data.yyms }]
}
// 获取缺陷集合
export const getQXArray = function(data) {
  return [
    { title: '缺陷名称', content: data.name },
    { title: '缺陷类别', content: data.lxname },
    { title: '缺陷内容', content: data.description },
    { title: '缺陷来源', content: data.ly },
    { title: '上报人', content: data.sbr },
    { title: '关联设备名称', content: data.glsbbm },
    { title: '消缺建议', content: data.clcs },
    { title: '上报日期', content: data.tjsj },
    { title: '消缺日期', content: data.jjsj }]
}

// 获取隐患集合
export const getYHArray = function(data) {
  return [
    { title: '隐患名称', content: data.name },
    { title: '树木种类', content: data.smzl },
    { title: '隐患内容', content: data.description },
    { title: '赔青标注', content: data.pqbz },
    { title: '班组', content: data.bz },
    { title: '关联设备名称', content: data.glsbbm },
    { title: '运维站', content: data.ywz },
    { title: '提交时间', content: data.tjsj },
    { title: '锯树日期', content: data.jssj }]
}
// 获取配电室集合
export const getPDSArray = function(info) {
  return [
    { title: '配变台数', content: 1 },
    { title: '配变总容量(kVA)', content: 250 },
    { title: '电压等级', content: info.dydj },
    { title: '所属电站', content: info.ssdz },
    { title: '所属调度', content: info.ssdd },
    { title: '调度单位', content: info.dddw },
    { title: '投运日期', content: info.tyrq }]
}
// 获取配电室间隔集合
export const getPDSJGArray = function(info) {
  return [
    { title: '间隔单元名称', content: info.jgdymc },
    { title: '间隔单元编码', content: info.jgdybh },
    { title: '间隔单元类型', content: info.jgdylx },
    { title: '运维单位', content: info.jgdylx },
    { title: '所属地市 ', content: info.ssds },
    { title: '设备编码', content: info.sbbm },
    { title: '责任人', content: info.sbzr }]
}

// 获取电缆井集合
export const getDLJArray = function(info) {
  return [
    { title: '电缆井名称', content: info.name },
    { title: '电缆井类型', content: geteDljType(info.type) },
    { title: '竣工日期', content: info.jgrq },
    { title: '所属线路', content: info.ssxl },
    { title: '所属变电站', content: info.bdz }]
}

// 获取电缆井间隔集合
export const getDLJJGArray = function(info) {
  return [
    { title: '供电单元名称', content: info.gddymc },
    { title: '编码', content: info.code },
    { title: '责任人', content: info.sbzr }]
}

// 获取杆塔集合
export const getGTArray = function(gtObject) {
  return [
    { title: '杆塔名称', content: gtObject.name },
    { title: '杆塔类型', content: getGtType(gtObject.gtlx) },
    { title: '投运日期', content: gtObject.tyrq },
    { title: '所属线路', content: gtObject.ssxl }, // 根据电缆线的id获取上一层的电缆线路的名称
    { title: '档距(m)', content: gtObject.dj },
    { title: '杆塔高', content: gtObject.gtg },
    { title: '电流', content: gtObject.dl },
    { title: '电压', content: gtObject.dy }]
}

// 获取杆塔间隔集合
export const getGTJGArray = function(gtObject) {
  return [
    { title: '名称', content: gtObject.sbmc },
    { title: '编码', content: gtObject.gtbh },
    { title: '责任人', content: gtObject.sbzr }]
}

// 获取环网柜集合
export const getHWGArray = function(info) {
  return [
    { title: '电缆井名称', content: info.name },
    { title: '电缆井类型', content: geteDljType(info.type) },
    { title: '竣工日期', content: info.jgrq },
    { title: '所属线路', content: info.ssxl },
    { title: '所属变电站', content: info.bdz }]
}

// 获取环网柜间隔集合
export const getHWGJJGArray = function(info) {
  return [
    { title: '供电单元名称', content: info.gddymc },
    { title: '编码', content: info.code },
    { title: '责任人', content: info.sbzr }]
}

// 杆塔类型：
// 1单回柱上开关
// 2单回直线杆
// 3单回转角杆
// 4单回终端杆
// 5单回变压器
// 6双回柱上开关
// 7双回直线杆
// 8双回转角杆
// 9双回终端杆
// 10双回变压器
export const gtType = [{ id: 1, name: '单回柱上开关' }, { id: 2, name: '单回直线杆' }, { id: 3, name: '单回转角杆' }, { id: 4, name: '单回终端杆' },
  { id: 5, name: '单回变压器' }, { id: 6, name: '双回柱上开关' }, { id: 7, name: '双回直线杆' }, { id: 8, name: '双回转角杆' },
  { id: 9, name: '双回终端杆' }, { id: 10, name: '双回变压器' }]

export const getGtType = function(id) {
  for (var index in gtType) {
    if (gtType[index].id === id) {
      return gtType[index].name
    }
  }
  return null
}
// 图列列表
export const deviceIconList = [
  { id: 1, name: '电缆井', imageSrc: 'dlj', imagePress: 'dlj1', isSelect: true, type: 'dlj' },
  { id: 2, name: '环网柜', imageSrc: 'hwg', imagePress: 'hwg1', isSelect: true, type: 'hwg' },
  { id: 3, name: '配电室', imageSrc: 'pds', imagePress: 'pds1', isSelect: true, type: 'pds' },
  { id: 4, name: '开关站', imageSrc: 'kgz', imagePress: 'kgz1', isSelect: true, type: 'kgz' },
  { id: 5, name: '杆塔', imageSrc: 'gt', imagePress: 'gt1', isSelect: true, type: 'gt' },
  { id: 6, name: '电缆分支箱', imageSrc: 'dlfzx', imagePress: 'dlfzx1', isSelect: true, type: 'dlfzx' },
  { id: 7, name: '柱上开关', imageSrc: 'zskg', imagePress: 'zskg1', isSelect: true, type: 'zskg' },
  { id: 8, name: '箱式变压器', imageSrc: 'xb', imagePress: 'xb1', isSelect: true, type: 'xb' },
  { id: 9, name: '柱上变压器', imageSrc: 'zsbyq', imagePress: 'zsbyq1', isSelect: true, type: 'zsbyq' },
  { id: 10, name: '缺陷', imageSrc: 'flaw_wcl', imagePress: 'flaw_wcl', isSelect: true, type: 'qx' },
  { id: 11, name: '隐患', imageSrc: 'hiddentrouble', imagePress: 'hiddentrouble', isSelect: true, type: 'yh' }
  //, { id: 12, name: '', imageSrc: '', imagePress: '', isSelect: false },
  // { id: 13, name: '架空线', imageSrc: 'color-line color-line-1', imagePress: '', isSelect: true },
  // { id: 14, name: '电缆线', imageSrc: 'color-line color-line-2', imagePress: '', isSelect: true }
]

export default {
  entityTypes,
  dljType,
  deviceIconList,
  geteDljType,
  geteEtityType,
  getGZArray,
  getQXArray,
  getYHArray,
  getPDSArray,
  getDLJArray,
  getDLJJGArray,
  getGTArray,
  getGTJGArray,
  getHWGArray,
  getHWGJJGArray
}
