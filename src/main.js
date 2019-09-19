import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 引入ui
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.proyotype.$http = axios // axios赋值给全局属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
