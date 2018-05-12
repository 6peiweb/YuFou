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

  created() {
    Http.getFriendGroup({ params: { userId: this.$store.getters.userInfo.U_ID || this.$route.params.userId }})
      .then((response: any) => this.friendGroup = response.data)
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))
    Http.getUserGroup({ params: { userId: this.$store.getters.userInfo.U_ID || this.$route.params.userId }})
      .then((response: any) => this.userGroup = response.data)
      .catch((error: any) => this.toast(`Failed to get friend-Info by '${error}'`))
  }

  openSearch() {
    console.log(1234)
  }

  showContacts() {
    console.log('click')
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
