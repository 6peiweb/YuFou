import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/http'
import FriendGroup from '@/components/FriendGroup/FriendGroup.vue'
import UserGroup from '@/components/UserGroup/UserGroup.vue'

@Component({
  name: 'contacts',
  components: {
    FriendGroup,
    UserGroup
  }
})

export default class Contacts extends Vue {
  private tabItems: Array<string> = ['friend', 'group']
  private selectedTab: string = 'friend'
  private friendGroup: Object = {}
  private userGroup: Object = {}

  created() { // 获取到好友分组信息、用户群组信息
    Http.getFriendGroup({ params: { userId: this.$store.getters.userInfo.U_ID || this.$route.params.userId }})
      .then((response: any) => this.friendGroup = response.data)
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))
    Http.getUserGroup({ params: { userId: this.$store.getters.userInfo.U_ID || this.$route.params.userId }})
      .then((response: any) => this.userGroup = response.data)
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))
  }

  openSearch() {  // 跳转到搜索页
    console.log(1234)
  }

  showContacts() {  
    console.log('click')
  }
  
  selectFriend(friendId: number) {  // 选中朋友进行下一步操作
    this.$router.push(<lp.RawLocation>{ name: 'userDetail', params: { friendId } })
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
