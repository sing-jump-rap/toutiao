import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'// 引入ui
import Component from './components'// 引入全局自定义组件
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI) // 注册ui
Vue.use(Component) // 注册全局自定义组件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将地址的常态值设置给baseUrl
Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
