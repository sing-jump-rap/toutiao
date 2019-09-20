// 引入
import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断拦截范围
  if (to.path.startsWith('/home')) {
    // 拦截范围
    var token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      // 强制跳回登录页
      next('/login')
    }
  } else {
    //   放行
    next()
  }
})
// 导出
export default router
