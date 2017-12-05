import Vue from 'vue'
import Router from 'vue-router'

//my page
import Index from '@/pages/Index'
import My from '@/pages/My'
import Login from '@/pages/others/Login'

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
    }
  ]
})
