import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

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
  private socket: any = ISocket

  created() {   // 初始化选中tab、获取用户信息
    this.selectedTab = this.$route.name
    Http.getUserInfo({ params: { userId: this.$route.params.userId } })
      .then((response: any) => {
        this.$store.dispatch('update_userInfo', response.data)
        this.socket.emit('setUID', this.$route.params.userId)
      })
      .catch((error: any) => this.toast(`Failed to get user-Info by '${error}'`))
      
  }

  getImgSrc(val: string) {
    return `image/header/${val}`
  }

  watchSelectTab(val: string) { // 切换tab图标
    this.tablist.forEach((tab) => {
      let src = tab.imgSrc, prefix = 'active-'
       tab.name === val ? (src.indexOf(prefix) === -1) && (tab.imgSrc = prefix + src) : (src.indexOf(prefix) !== -1) && (tab.imgSrc = src.replace(prefix,''))
    })
  }

  watchRoute(newRoute: lp.RouteConfig) {  // 监听主页面路由变化
    this.selectedTab = newRoute.name
  }

  jumpAddFriend() {
    this.$router.push(<any>{ name: 'addFriend', params: { userId: this.$route.params.userId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
