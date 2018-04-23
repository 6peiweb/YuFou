import Component from 'vue-class-component'
import Vue from 'Vue'
import Message from '@/components/Message/Message.vue'
import Contacts from '@/components/Contacts/Contacts.vue'
import Setting from '@/components/Setting/Setting.vue'

@Component({
  name: 'app',
  watch: {
    selectedTab: 'watchSelectTab'
  },
  components: {
    Message,
    Contacts,
    Setting
  }
})

export default class App extends Vue {
  private tablist: Array<lp.Tabbar> = [
    { id: 'message', title: '消息', imgSrc: 'active-message.svg' },
    { id: 'contacts', title: '联系人', imgSrc: 'contacts.svg' },
    { id: 'setting', title: '设置', imgSrc: 'setting.svg' },
  ];
  private selectedTab: string = 'message';
  private selectedHead: object = {
    message: '消息',
    contacts: '联系人',
    setting: '设置'
  }

  getImgSrc(val: string) {
    return `image/header/${val}`
  }

  watchSelectTab(val: string) {
    this.tablist.forEach((tab) => {
      let src = tab.imgSrc
       tab.id === val ? (src.indexOf('active-') === -1) && (tab.imgSrc = 'active-' + src) : (src.indexOf('active-') !== -1) && (tab.imgSrc = src.replace('active-',''))
    })
  }
}
