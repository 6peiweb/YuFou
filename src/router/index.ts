import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Register from '@/components/Register/Register.vue'

Vue.use(Router)

const routes: Array<lp.RouteConfig> = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

export default new Router({
  routes
})
