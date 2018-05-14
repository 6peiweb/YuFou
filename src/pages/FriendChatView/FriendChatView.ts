import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'
import ChatTools from '@/components/ChatTools/ChatTools.vue'

@Component({
  name: 'friendChatView',
  components: {
    ChatTools
  }
})

export default class FriendChatView extends Vue {
  private friendInfo: any = {}
  private userId: number = this.$store.getters.userInfo.U_ID || 1
  private friendId: string = ''

  get friendName() {
    return this.friendInfo.F_Name || this.friendInfo.U_NickName
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

  jumpMessage() {
    this.$router.push(<any>{ name: 'message', params: { userId: this.userId } })
  }

  jumpUserDetail() {
    this.$router.push(<any>{ name: 'userDetail', params: { friendId: this.friendId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
