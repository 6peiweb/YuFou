import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import { homeRouter } from './modules'
import Setting from '@/pages/Setting/Setting.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import UserDetail from '@/pages/UserDetail/UserDetail.vue'
import GroupDetail from '@/pages/GroupDetail/GroupDetail.vue'
import GroupManage from '@/pages/GroupManage/GroupManage.vue'
import FriendChatView from '@/pages/FriendChatView/FriendChatView.vue'
import GroupChatView from '@/pages/GroupChatView/GroupChatView.vue'
import PersonalInfo from '@/pages/PersonalInfo/PersonalInfo.vue'
import Security from '@/pages/Security/Security.vue'
import AddFriend from '@/pages/AddFriend/AddFriend.vue'

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
    path: '/groupDetail/:groupId',
    name: 'groupDetail',
    component: GroupDetail
  },
  {
    path: '/groupManage/:groupId',
    name: 'groupManage',
    component: GroupManage
  },
  {
    path: '/friendChatView/:friendId',
    name: 'friendChatView',
    component: FriendChatView
  },
  {
    path: '/groupChatView/:groupId',
    name: 'groupChatView',
    component: GroupChatView
  },
  {
    path: '/personalInfo/:userId',
    name: 'personalInfo',
    component: PersonalInfo
  },
  {
    path: '/security/:userId',
    name: 'security',
    component: Security
  },
  {
    path: '/addFriend/:userId',
    name: 'addFriend',
    component: AddFriend
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
