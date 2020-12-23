import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
// requireAll(req)

const includeSvg = require.context('./includeSvg', false, /\.svg$/)
requireAll(includeSvg)
const excludeSvg = require.context('./excludeSvg', false, /\.svg$/)
requireAll(excludeSvg)
