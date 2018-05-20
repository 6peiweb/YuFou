import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'
import ChatTools from '@/components/ChatTools/ChatTools.vue'
import MessageInfo from '@/components/MessageInfo/MessageInfo.vue'

@Component({
  name: 'groupChatView',
  components: {
    ChatTools,
    MessageInfo
  }
})

export default class GroupChatView extends Vue {
  private groupId: string = ''
  private groupInfo: any = {}
  private userId: number = this.$store.getters.userInfo.U_ID
  private messageList: any = []
  private socket: any = ISocket

  created() { // 获取朋友信息、一周的历史聊天记录
    this.groupId = this.$route.params.groupId
    Http.getGroupInfo({ params: { groupId: this.groupId } })
      .then((response: any) => this.groupInfo = response.data)
      .catch((error: any) => this.toast(`Failed to get group-Info by '${error}'`))
    
    Http.getGroupMessages({ params: { groupId: this.groupId } })
      .then((response: any) => {
        this.messageList = response.data.rows
        this.scrollToBottom()
      })
      .catch((error: any) => this.toast(`Failed to get group-Message by '${error}'`))
  }

  get groupName() {
    return this.groupInfo.UG_Name || ''
  }

  mounted() { // 注册socket客户端接收用户信息事件，接收消息
    this.socket.emit('joinGroup', this.groupId)
    this.socket.on('receiveGroupMsg', (UGM_ID: any) => Http.getGroupMessage({ params: { UGM_ID } })
    .then((response: any) => {
      this.messageList.push(response.data)
      this.scrollToBottom()
    })
    .catch((error: any) => this.toast(`Failed to receive group-Message by '${error}'`)))
  }

  beforeDestroy() {
    this.socket.emit('leaveGroup', this.groupId)
  }

  watchChatToolsHeight() {  // 监测chatTools的高度，使chatBlock的bottom等于chatTools的实际高度
    setTimeout(() => (<any>this.$refs.chatBlock) && ((<any>this.$refs.chatBlock).style.bottom = `${(<any>this.$refs.chatTools).$el.offsetHeight}px`), 200)
  }

  scrollToBottom() {  // 滚动条滚动到底部
    setTimeout(() => (<any>this.$refs.chatBlock) && ((<any>this.$refs.chatBlock).scrollTop = (<any>this.$refs.chatBlock).scrollHeight), 100)
  }

  postMessage(message: any) { // 发送消息给指定用户，触发socket sendGroupMsg事件
    Http.postGroupMessage({ userId: this.userId, groupId: this.groupId, message })
      .then((response: any) => {
        this.messageList.push(response.data)
        this.socket.emit('sendGroupMsg', this.groupId, response.data.UGM_ID)
        this.scrollToBottom()
      })
      .catch((error: any) => this.toast(`Failed to send friend-Message by '${error}'`))
  }

  loadTop() { // 下拉获取更多聊天记录
    (<any>this.$refs.loadmore).onTopLoaded()
  }

  jumpGroupDetail() { // 跳转到群组详情页面
    this.$router.push(<any>{ name: 'groupDetail', params: { groupId: this.groupId } })
  }

  jumpMessage() { // 跳转到message记录页面
    this.$router.push(<any>{ name: 'message', params: { userId: this.userId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }


}