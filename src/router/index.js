import Vue from 'vue'
import Router from 'vue-router'

//my page
import Index from '@/pages/Index'
import My from '@/pages/My'
import Login from '@/pages/others/Login'
import Register from '@/pages/others/Register'
import Testing from '@/pages/Testing'
import Charts from '@/pages/Charts'


//我的
import Userinfo from '@/pages/my/Userinfo'
import Feedback from '@/pages/my/Feedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/testing',
      name: 'Testing',
      component: Testing
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    },
    {
      path: '/userinfo',
      name: 'Userinfo',
      component: Userinfo
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
  ]
})
