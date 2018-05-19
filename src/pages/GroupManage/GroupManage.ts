import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

@Component({
  name: 'groupManage'
})

export default class GroupManage extends Vue {
  private groupInfo: any = {}
  private groupName: string = ''
  private intro: string = ''
  private notice: string = ''

  created() { // 获取当前群组信息、获取到成员信息
    Http.getGroupInfo({ params: { groupId: this.$route.params.groupId } })
      .then((response: any) => {
        this.groupInfo = response.data
        this.groupName = this.groupInfo.UG_Name
        this.intro = this.groupInfo.UG_Intro
        this.notice = this.groupInfo.UG_Notice
      })
      .catch((error: any) => this.toast(`Failed to get group-Info by '${error}'`))
  }

  modifyGroupInfo() { // 更新群组信息
    let { groupName, intro, notice } = this
    IMint.Indicator.open({ text: '更新中...', spinnerType: 'snake' })
    Http.updateGroupInfo({groupId: this.$route.params.groupId, groupName, intro, notice})
      .then(() => setTimeout(() => this.toast(`更新成功!`), 1500))
      .catch((error: any) => setTimeout(() => this.toast(`Failed to update group-Info by '${error}'`), 1500))
      .finally(() => setTimeout(() => IMint.Indicator.close(), 1500))
  }

  jumpGroupDetail() { // 跳转到群组详情页
    this.$router.push(<lp.RawLocation>{ name: 'groupDetail', params: { groupId: this.$route.params.groupId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}