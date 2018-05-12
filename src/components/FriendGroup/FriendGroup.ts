import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'friendGroup',
  props: {
    groupName: String,
    members: Array
  }
})


export default class FriendGroup extends Vue {
  private dropDown: boolean = false

  created() {
    console.log(this)
  }

  showMembers() {
    this.dropDown = !this.dropDown
  }

}