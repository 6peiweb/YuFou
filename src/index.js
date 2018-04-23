/// <reference path="./typings/index.d.ts" />
/// <reference path="./typings/global.d.ts" />

import Vue from 'vue'
import router from './router'
import App from './pages/main/App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@@/css/mint-ui-fix.css'

Vue.use(Mint);

const vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
