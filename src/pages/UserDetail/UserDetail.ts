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
  private sheetVisible: boolean = false
  private actions = [
    { name: '删除好友', method: this.deleteFriend }
  ]

  get birthday() {
    let birthdayTime = (<any>this.friendInfo).U_Birthday,
        time: any = new Date(birthdayTime).toLocaleString().match(/(\d*)\/(\d*)\/(\d*)/)
    if (!birthdayTime) return null
    return `${time[1]}年${time[2]}月${time[3]}日`
  }

  created() {
    this.friendId = this.$route.params.friendId
    Http.getFriendInfo({ params: { userId: this.userId, friendId: this.friendId } })
      .then((response: any) => {
        if (!response.data.isFriend) return this.friendInfo = response.data
        this.friendInfo = Object.assign(response.data.User, { F_ID: response.data.F_ID, F_Name: response.data.F_Name, isFriend: response.data.isFriend })
      })
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))
  }

  modifyRemark() {
    console.log(this.friendInfo)
    IMint.MessageBox
      .prompt('请输入备注')
      .then((result: any) => {
        if (!result.value) return this.toast('输入不能为空！')
        Http.putFriendRemark({ userId: this.userId, friendId: this.friendId, remark: result.value })
          .then(() => {
            this.enterFriendChatView()
            this.toast(`[${(<any>this.friendInfo).U_NickName}]备注已修改为[${result.value}]`)
          })
      })
      .catch((error: any) => console.log(error))
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

  deleteOptions() {
    this.sheetVisible = true
  }

  deleteFriend() {
    Http.deleteFriend({ params: { userId: this.userId, friendId: this.friendId } })
      .then(() => {
        this.$router.push(<lp.RawLocation>{ name: 'message', params: { userId: this.userId } })
        setTimeout(() =>  this.toast(`删除好友[${(<any>this.friendInfo).U_NickName}]成功！`), 500)
      })
      .catch((error: any) => this.toast(`Failed to delete friend-Info by '${error}'`))
  }

  jumpContacts() {
    this.$router.push(<any>{ name: 'contacts', params: { userId: this.userId } })
  }


  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }


}
