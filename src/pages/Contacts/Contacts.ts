import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/http'
import GroupMember from '@/components/GroupMember/GroupMember.vue'

@Component({
  name: 'contacts',
  components: {
    GroupMember
  }
})

export default class Contacts extends Vue {
  private tabItems: Array<string> = ['friend', 'group']
  private selectedTab: string = 'friend'
  private groupList: Object = {}

  created() {
    Http.getFriendGroup({ params: { userId: this.$store.getters.userInfo.U_ID || this.$route.params.userId }})
      .then((response: any) => {
        console.log(response)
        this.groupList = response.data
      })
  }

  openSearch() {
    console.log(1234)
  }

  showContacts() {
    console.log('click')
  }

}
