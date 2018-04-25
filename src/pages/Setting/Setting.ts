import Component from 'vue-class-component'
import Vue from 'Vue'

@Component({
  name: 'setting',
})

export default class Setting extends Vue {
  private selectedTab: string = 'message';
  private selectedHead: object = {
    message: '消息',
    address: '联系人',
    setting: '设置'
  }
}
