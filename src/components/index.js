// 全局注册组件
import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-header'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeade)
  }
}
