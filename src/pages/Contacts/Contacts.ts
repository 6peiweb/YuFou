import Component from 'vue-class-component'
import Vue from 'Vue'

@Component({
  name: 'contacts',
})

export default class Contacts extends Vue {
  private selectedTab: string = 'message';
  private selectedHead: object = {
    message: '消息',
    address: '联系人',
    setting: '设置'
  }
}
