import Component from 'vue-class-component'
import Vue from 'vue'
import FriendGroup from '@/components/FriendGroup/FriendGroup.vue'

@Component({
  name: 'contacts',
  components: {
    FriendGroup
  }
})

export default class Contacts extends Vue {
  private tabItems: Array<string> = ['friend', 'group']
  private selectedTab: string = 'friend'
  private groupList: Object = {
    '我的好友': [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4],
    '家人': [1,2,3,4],
    '朋友': [1,2,3,4],
    '前女友': [1,2,3,4]
  }

  openSearch() {
    console.log(1234)
  }

  showContacts() {
    console.log('click')
  }

}
