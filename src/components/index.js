// 全局注册组件
import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-header'
import breadCrumb from './common/bread-crumb'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeade)
    Vue.component('bread-crumb', breadCrumb)
  }
}
