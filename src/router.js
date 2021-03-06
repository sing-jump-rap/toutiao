import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'
import Login from './views/login'
import Main from './views/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: 'comment', // 评论列表路径
          component: () => import('./views/comment')
        }, {
          path: 'material',
          component: () => import('./views/material')
        }, {
          path: 'articles',
          component: () => import('./views/articles')
        }, {
          path: 'publish/:articleId', // 定义参数
          component: () => import('./views/publish')
        }, {
          path: 'publish',
          component: () => import('./views/publish')
        }, {
          // 账户信息
          path: 'account',
          component: () => import('./views/account')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
