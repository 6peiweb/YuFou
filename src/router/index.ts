import Vue from 'vue'
import Router from 'vue-router'
import App from '@/pages/main/App.vue'
import Message from '@/pages/Message/Message.vue'
import Contacts from '@/pages/Contacts/Contacts.vue'
import Setting from '@/pages/Setting/Setting.vue'

Vue.use(Router)

const routes: Array<lp.RouteConfig> = [
  {
    path: '/',
    name: 'app',
    component: App,
    redirect: {
      name: 'message'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts
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
