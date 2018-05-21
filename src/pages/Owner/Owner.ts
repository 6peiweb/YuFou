import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'owner'
})

export default class Owner extends Vue {
  private userId: number = this.$store.getters.userInfo.U_ID
  private nickname: string = this.$store.getters.userInfo.U_NickName
  private chatId: string = this.$store.getters.userInfo.U_UserID
  
  jumpSetting() {
    this.$router.push(<lp.RawLocation>{name: 'setting'})
  }

  jumpPersonalInfo() {
    this.$router.push(<any>{ name: 'personalInfo', params: { userId: this.userId } })
  }

}
