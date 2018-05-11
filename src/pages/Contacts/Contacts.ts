import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'contacts'
})

export default class Contacts extends Vue {
  private tabItems: Array<string> = ['friend', 'group']
  private selectedTab: string = 'friend'
  private searchValue: string = ''

  openSearch() {
    console.log(1234)
  }

  showContacts() {
    console.log('click')
  }

}
