/// <reference path="./typings/index.d.ts" />
/// <reference path="./typings/global.d.ts" />

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

const vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
