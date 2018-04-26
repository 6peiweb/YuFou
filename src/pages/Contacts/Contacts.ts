import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'contacts'
})

export default class Contacts extends Vue {
  private selectedTab: string = 'message'
}
