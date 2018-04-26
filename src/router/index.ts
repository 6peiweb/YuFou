import Vue from 'vue'
import Router from 'vue-router'
import App from '@/pages/App/App.vue'
import { appRouter } from './modules'
import Setting from '@/pages/Setting/Setting.vue'

Vue.use(Router)

const routes: Array<lp.RouteConfig> = [
  {
    path: '/',
    name: 'main',
    redirect: {
      name: 'message'
    }
  },
  {
    path: '/app',
    name: 'app',
    component: App,
    children: [
      ...appRouter
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
