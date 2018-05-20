import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

@Component({
  name: 'groupDetail'
})

export default class GroupDetail extends Vue {
  private userId: number = this.$store.getters.userInfo.U_ID
  private groupInfo: any = {}
  private members: Array<number> = []
  private sheetVisible: boolean = false
  private actions = [
    { name: '退出群组', method: this.exitGroup }
  ]

  get title() {
    return `聊天信息(${this.members.length})`
  }

  created() { // 获取当前群组信息、获取到成员信息
    Http.getGroupInfo({ params: { groupId: this.$route.params.groupId } })
      .then((response: any) => {
        this.groupInfo = response.data
        this.groupInfo.UG_Member.replace(/\[(.+?)\]/g, '$1').split(',').forEach((memberId: any) => {
          Http.getGroupMemberInfo({ params: { memberId } })
            .then((response: any) => this.members.push(response.data))
        })
      })
      .catch((error: any) => this.toast(`Failed to get group-Info by '${error}'`))
  }

  jumpContacts() {  // 跳转到联系人页面
    this.$router.push(<any>{ name: 'contacts', params: { userId: this.userId } })
  }

  jumpUserDetail(friendId: number) {  // 选中成员进行下一步操作
    this.$router.push(<lp.RawLocation>{ name: 'userDetail', params: { friendId } })
  }

  jumpAddMember() { // 群组添加成员
    console.log(this.groupInfo)
  }

  jumpDeleteMember() {  // 群组删除成员

  }

  jumpGroupManage() { // 群组管理
    this.$router.push(<lp.RawLocation>{ name: 'groupManage', params: { groupId: this.groupInfo.UG_ID } })
  }

  enterGroupChatView() {
    this.$router.push(<lp.RawLocation>{ name: 'groupChatView', params: { groupId: this.groupInfo.UG_ID } })
  }

  exitOptions() { // 调出群组选项
    this.sheetVisible = true
  }

  exitGroup() { // 退出群组
    console.log(this.userId)
    Http.deleteGroupMember({ params: { memberId: this.userId, groupId: this.groupInfo.UG_ID } })
      .then(() => {
        this.$router.push(<lp.RawLocation>{ name: 'message', params: { userId: this.userId } })
        setTimeout(() =>  this.toast('退出成功！'), 500)
      })
      .catch((error: any) => this.toast(`Failed to delete group-Member by '${error}'`))
  }

  isAdmin() {
    return this.userId === this.groupInfo.UG_AdminID
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
