import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'groupMember',
  props: {
    groupInfo: Object
  }
})


export default class GroupMember extends Vue {
  private dropDown: boolean = false

  created() {
    console.log((<any>this).groupInfo)
  }

  showMembers() {
    this.dropDown = !this.dropDown
  }

}