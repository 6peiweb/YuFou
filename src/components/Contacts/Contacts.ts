import Component from 'vue-class-component'
import Vue from 'Vue'

@Component({
  name: 'contacts',
})

export default class App extends Vue {
  private tablist: Array<lp.Tabbar> = [
    { id: 'message', title: '消息', imgSrc: 'active-message.svg' },
    { id: 'address', title: '联系人', imgSrc: 'address.svg' },
    { id: 'setting', title: '设置', imgSrc: 'setting.svg' },
  ];
  private selectedTab: string = 'message';
  private selectedHead: object = {
    message: '消息',
    address: '联系人',
    setting: '设置'
  }
}
