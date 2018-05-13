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

  toggleShow() {  // 切换展示分组详情
    this.dropDown = !this.dropDown
  }

  selectMember(userId: number) {  // 选中成员，出发父组建selectFriend事件
    this.$emit('selectFriend', userId)
  }

}