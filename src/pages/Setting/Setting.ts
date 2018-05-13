import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'setting',
})

export default class Setting extends Vue {
  private route: lp.RouteConfig = { path: `home/${this.$store.getters.userInfo.U_ID}/owner` }
  private sheetVisible: boolean = false
  private actions = [
    { name: '退出登录', method: this.logout }
  ]

  logoutConfirm() {
    this.sheetVisible = true
  }

  logout() {
    this.$router.push(<lp.RawLocation>{name: 'login'})
  }
}
