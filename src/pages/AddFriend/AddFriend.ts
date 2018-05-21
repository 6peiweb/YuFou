import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

@Component({
  name: 'addFriend'
})

export default class AddFriend extends Vue {
  private userId: number = this.$store.getters.userInfo.U_ID
  private serachInfo: string = ''
  private selectedFriend: Array<any> = []
  private searchContent: Array<any> = []

  searchFriend() {
    console.log(this.userId)
    Http.getUserSearch({ params: { userId: this.userId, serachInfo: this.serachInfo } })
    .then((response: any) => {
      this.searchContent = []
      for(let i in response.data)
        this.searchContent.push({
          label: `${response.data[i].U_NickName}(${response.data[i].U_UserID})`,
          value: response.data[i].U_ID,
        })
    })
  }

  addFriend() {
    console.log(this.selectedFriend)
  }

  jumpMessage() {  // 跳转至消息页面
    this.$router.push(<lp.RawLocation>{ name: 'message', params: { userId: this.userId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }
  
}
