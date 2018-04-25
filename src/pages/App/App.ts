import Component from 'vue-class-component'
import Vue from 'Vue'

@Component({
  name: 'app',
  watch: {
    selectedTab: 'watchSelectTab',
    $route: 'watchRoute'
  }
})

export default class App extends Vue {
  private tablist: Array<lp.Tabbar> = [
    { id: 'message', title: '消息', imgSrc: 'active-message.svg' },
    { id: 'contacts', title: '联系人', imgSrc: 'contacts.svg' },
    { id: 'owner', title: '我', imgSrc: 'owner.svg' }
  ]
  private selectedTab: any = 'message'
  private selectedHead: object = {
    message: '消息',
    contacts: '联系人',
    owner: '我'
  }

  created() {
    this.selectedTab = this.$route.name
  }

  getImgSrc(val: string) {
    return `image/header/${val}`
  }

  watchSelectTab(val: string) {
    this.tablist.forEach((tab) => {
      let src = tab.imgSrc, prefix = 'active-'
       tab.id === val ? (src.indexOf(prefix) === -1) && (tab.imgSrc = prefix + src) : (src.indexOf(prefix) !== -1) && (tab.imgSrc = src.replace(prefix,''))
    })
  }

  watchRoute(to: any, from: any) {
    // console.log(to);
    // console.log(from);
  }

}
