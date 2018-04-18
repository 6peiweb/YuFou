import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import Register from '@/components/Register/Register.vue'

Vue.use(Router);

const routes: Array<any> =  [
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

export default new Router({
  routes
});
