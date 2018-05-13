import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'owner'
})

export default class Owner extends Vue {
  private UserName: string = this.$store.getters.userInfo.U_NickName
  private UserId: string = this.$store.getters.userInfo.U_UserID
  
  jumpSetting() {
    this.$router.push(<lp.RawLocation>{name: 'setting'})
  }

}
