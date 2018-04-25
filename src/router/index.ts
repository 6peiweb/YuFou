import Vue from 'vue'
import Router from 'vue-router'
import App from '@/pages/App/App.vue'
import AppRoute from './app.route'
import Setting from '@/pages/Setting/Setting.vue'

Vue.use(Router)

const routes: Array<lp.RouteConfig> = [
  {
    path: '/',
    name: 'app',
    component: App,
    redirect: {
      name: 'message'
    },
    children: [
      ...AppRoute
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  }
]

export default new Router({
  routes
})
