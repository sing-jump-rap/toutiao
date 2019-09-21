// 负责对axios的拦截处理
import axios from 'axios'
import router from '../permission'// 导入实例
import { Message } from 'element-ui'// 引入element中的提示方法
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理

  var token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}` //   统一注入token
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
export default axios
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data ? response.data : {} // 对没有data的接口if处理
}, function (error) {
  // 对响应错误做处理
  let status = error.response.status// 获取失败的状态码
  let message = '未知错误'
  //   判断异常类型
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message, type: 'warning' })
  // 异常处理函数已经处理了所有错误，所以不再进入登录页面中的catch，终止错误
  return new Promise(function () {

  })
})
