// 负责对axios的拦截处理
import axios from 'axios'
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
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  return Promise.reject(error)
})
