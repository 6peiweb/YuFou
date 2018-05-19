import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'
import ChatTools from '@/components/ChatTools/ChatTools.vue'
import MessageInfo from '@/components/MessageInfo/MessageInfo.vue'

@Component({
  name: 'friendChatView',
  components: {
    ChatTools,
    MessageInfo
  }
})

export default class FriendChatView extends Vue {
  private friendInfo: any = {}
  private userId: number = this.$store.getters.userInfo.U_ID
  private friendId: string = ''
  private messageList: any = []
  private socket: any = ISocket

  get friendName() {
    return this.friendInfo.F_Name || this.friendInfo.U_NickName
  }

  created() { // 获取朋友信息、一周的历史聊天记录
    this.friendId = this.$route.params.friendId
    Http.getFriendInfo({ params: { userId: this.userId, friendId: this.friendId } })
      .then((response: any) => {
        if (!response.data.isFriend) return this.friendInfo = response.data
        this.friendInfo = Object.assign(response.data.User, { F_Name: response.data.F_Name, isFriend: response.data.isFriend })
      })
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))

    Http.getFriendMessages({ params: { userId: this.userId, friendId: this.friendId } })
      .then((response: any) => {
        this.messageList = response.data.rows
        this.scrollToBottom()
      })
      .catch((error: any) => this.toast(`Failed to get friend-Message by '${error}'`))
  }

  mounted() { // 注册socket客户端接收用户信息事件，接收消息
    this.socket.on('receiveFriendMsg', (M_ID: any) => Http.getFriendMessage({ params: { M_ID } })
      .then((response: any) => {
        this.messageList.push(response.data)
        this.scrollToBottom()
      })
      .catch((error: any) => this.toast(`Failed to receive friend-Message by '${error}'`)))
  }

  watchChatToolsHeight() {  // 监测chatTools的高度，使chatBlock的bottom等于chatTools的实际高度
    setTimeout(() => (<any>this.$refs.chatBlock) && ((<any>this.$refs.chatBlock).style.bottom = `${(<any>this.$refs.chatTools).$el.offsetHeight}px`), 200)
  }

  scrollToBottom() {  // 滚动条滚动到底部
    setTimeout(() => (<any>this.$refs.chatBlock) && ((<any>this.$refs.chatBlock).scrollTop = (<any>this.$refs.chatBlock).scrollHeight), 100)
  }

  postMessage(message: any) { // 发送消息给指定用户，触发socket sendFriendMsg事件
    Http.postFriendMessage({ userId: this.userId, friendId: this.friendId, message })
      .then((response: any) => {
        this.messageList.push(response.data)
        this.socket.emit('sendFriendMsg', this.friendId, response.data.M_ID)
        this.scrollToBottom()
      })
      .catch((error: any) => this.toast(`Failed to send friend-Message by '${error}'`))
  }

  loadTop() { // 下拉获取更多聊天记录
    (<any>this.$refs.loadmore).onTopLoaded()
  }

  jumpMessage() { // 跳转到message记录页面
    this.$router.push(<any>{ name: 'message', params: { userId: this.userId } })
  }

  jumpUserDetail() { // 跳转到用户详情页面
    this.$router.push(<any>{ name: 'userDetail', params: { friendId: this.friendId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
