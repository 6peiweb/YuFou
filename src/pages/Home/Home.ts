import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'home',
  watch: {
    selectedTab: 'watchSelectTab',
    $route: 'watchRoute'
  }
})

export default class Home extends Vue {
  private tablist: Array<lp.Tabbar> = [
    { name: 'message', title: '消息', imgSrc: 'active-message.svg' },
    { name: 'contacts', title: '联系人', imgSrc: 'contacts.svg' },
    { name: 'owner', title: '我', imgSrc: 'owner.svg' }
  ]
  private selectedTab: any = 'message'
  private selectedHead: object = {
    message: '消息',
    contacts: '联系人',
    owner: '我'
  }
  public animation: string = 'fade'

  created() {
    this.selectedTab = this.$route.name
  }

  getImgSrc(val: string) {
    return `image/header/${val}`
  }

  watchSelectTab(val: string) {
    this.tablist.forEach((tab) => {
      let src = tab.imgSrc, prefix = 'active-'
       tab.name === val ? (src.indexOf(prefix) === -1) && (tab.imgSrc = prefix + src) : (src.indexOf(prefix) !== -1) && (tab.imgSrc = src.replace(prefix,''))
    })
  }

  watchRoute(newRoute: lp.RouteConfig) {
    this.selectedTab = newRoute.name
  }

}
