import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import { homeRouter } from './modules'
import Setting from '@/pages/Setting/Setting.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import UserDetail from '@/pages/UserDetail/UserDetail.vue'
import FriendChatView from '@/pages/FriendChatView/FriendChatView.vue'

Vue.use(Router)

const routes: Array<lp.RouteConfig> = [
  {
    path: '/',
    name: 'app',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/home/:userId',
    name: 'home',
    component: Home,
    children: [
      ...homeRouter
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/userDetail/:friendId',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/friendChatView/:friendId',
    name: 'friendChatView',
    component: FriendChatView
  }
]

const router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach', to, from)
//   next()
// })

// router.beforeResolve((to, from, next) => {
//   console.log('beforeResolve', to, from)
//   next()
// })

router.afterEach((to, from) => {
  router.app.$store && router.app.$store.dispatch('update_routeInfo', { to, from })
})

export default router
