// 全局注册组件
import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)// zuoce
    Vue.component('layout-header', layoutHeade)// 头部
    Vue.component('bread-crumb', breadCrumb)// 面包屑
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
  }
}
