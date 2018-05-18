import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'
import ChatTools from '@/components/ChatTools/ChatTools.vue'
import Message from '@/components/Message/Message.vue'

@Component({
  name: 'friendChatView',
  components: {
    ChatTools,
    Message
  }
})

export default class FriendChatView extends Vue {
  private friendInfo: any = {}
  private userId: number = this.$store.getters.userInfo.U_ID
  private friendId: string = ''
  private messageList: any = []

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

    Http.getFriendMessage({ params: { userId: this.userId, friendId: this.friendId } })
      .then((response: any) => this.messageList = response.data.rows)
      .catch((error: any) => this.toast(`Failed to get friend-Message by '${error}'`))
  }

  mounted() {
    this.scrollToBottom()
  }

  watchChatToolsHeight() {
    setTimeout(() => (<any>this.$refs.chatBlock) && ((<any>this.$refs.chatBlock).style.bottom = `${(<any>this.$refs.chatTools).$el.offsetHeight}px`), 200)
  }

  scrollToBottom() {
    setTimeout(() => (<any>this.$refs.chatBlock).scrollTop = (<any>this.$refs.chatBlock).scrollHeight, 100)
  }

  postMessage(message: any) {
    this.messageList.push({ M_Content: message, M_FromUserID: 1 })
    this.scrollToBottom()
    console.log(message)
  }

  loadTop() {
    (<any>this.$refs.loadmore).onTopLoaded()
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
