import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'setting',
})

export default class Setting extends Vue {
  private userId: number = this.$store.getters.userInfo.U_ID
  private route: lp.RouteConfig = { path: `home/${this.$store.getters.userInfo.U_ID}/owner` }
  private sheetVisible: boolean = false
  private actions = [
    { name: '退出登录', method: this.logout }
  ]

  logoutConfirm() {
    this.sheetVisible = true
  }

  jumpSecurity() {
    this.$router.push(<any>{ name: 'security', params: { userId: this.userId } })
  }

  logout() {
    this.$router.push(<lp.RawLocation>{name: 'login'})
  }
}
