import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'
import MessageRecord from '@/components/MessageRecord/MessageRecord.vue'

@Component({
  name: 'message',
  components: {
    MessageRecord
  }
})

export default class Message extends Vue {
  private userId: number = this.$store.getters.userInfo.U_ID || 1
  private messageList: Array<object> = []
  private messageIds: Array<object> = []

  created() {
    Http.getUserRecords({ params: { userId: this.userId }})
      .then((response: any) => {
        this.messageIds = response.data
        for(let prop in this.messageIds) {
          for(let i in this.messageIds[prop]) {
            Http.getUserMessage({ params: { userId: this.userId, [prop]: (<any>this.messageIds[prop])[i] } })
              .then((response: any) => {
                if (response.data) {
                  response.data.time = new Date(response.data.time).toLocaleString()
                  this.messageList.push(response.data)
                }
              })
          }
        }
      })
      .catch((error: any) => this.toast(`Failed to get user-Messages by '${error}'`))
  }

  enterGroupChatView(groupId: number) {
    this.$router.push(<lp.RawLocation>{ name: 'groupChatView', params: { groupId } })
  }

  enterFriendChatView(friendId: number) {
    this.$router.push(<lp.RawLocation>{ name: 'friendChatView', params: { friendId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}

