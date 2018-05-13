import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

@Component({
  name: 'userDetail'
})

export default class UserDetail extends Vue {
  private friendInfo: Object = {}
  private userId: number = this.$store.getters.userInfo.U_ID
  private friendId: string = ''

  get birthday() {
    let birthdayTime = (<any>this.friendInfo).U_Birthday,
        time: any = new Date(birthdayTime).toLocaleString().match(/\/(.+)\/(.+) /)
    if (!birthdayTime) return null
    return `${time[1]}月${time[2]}日`
  }

  created() {
    this.friendId = this.$route.params.friendId
    Http.getFriendInfo({ params: { userId: this.userId, friendId: this.friendId } })
      .then((response: any) => {
        if (!response.data.isFriend) return this.friendInfo = response.data
        this.friendInfo = Object.assign(response.data.User, { F_Name: response.data.F_Name, isFriend: response.data.isFriend })
      })
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))
  }

  copyEmail(value: string) {
    IMint.MessageBox
      .confirm(`确定复制[${value}]到剪切板`)
      .then(() => IClipboard('Copy', value))
      .catch(() => console.log(value))
  }

  enterFriendChatView() {
    this.$router.push(<lp.RawLocation>{ name: 'friendChatView', params: { friendId: this.friendId } })
  }


  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }


}
