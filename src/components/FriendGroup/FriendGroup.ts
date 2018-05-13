import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'friendGroup',
  props: {
    groupInfo: Object
  }
})


export default class FriendGroup extends Vue {
  private dropDown: boolean = false

  created() {
    // console.log(this.$props.groupInfo)
  }

  toggleShow() {
    this.dropDown = !this.dropDown
  }

  selectMember(userId: number) {
    this.$emit('selectFriend', userId)
  }

}