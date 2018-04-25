import Message from '@/pages/Message/Message.vue'
import Contacts from '@/pages/Contacts/Contacts.vue'
import Owner from '@/pages/Owner/Owner.vue'

const appRoutes: Array<lp.RouteConfig> = [
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
    path: '/owner',
    name: 'owner',
    component: Owner
  }
]

export default appRoutes
