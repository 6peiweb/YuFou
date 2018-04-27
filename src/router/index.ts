import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import { homeRouter } from './modules'
import Setting from '@/pages/Setting/Setting.vue'

Vue.use(Router)

const routes: Array<lp.RouteConfig> = [
  {
    path: '/',
    name: 'app',
    redirect: {
      name: 'message'
    }
  },
  {
    path: '/home',
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

// router.afterEach((to, from) => {
//   console.log('afterEach', to, from)
// })

export default router
