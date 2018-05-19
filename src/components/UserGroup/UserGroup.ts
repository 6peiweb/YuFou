import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'userGroup',
  props: {
    groupInfo: Object
  }
})


export default class UserGroup extends Vue {
  private dropDown: boolean = false

  created() {
    // console.log(this.$props.groupInfo)
  }

  selectGroup(groupId: number) {  // 选中群组，触发父组件selectGroup事件
    this.$emit('selectGroup', groupId)
  }

  toggleShow() {
    this.dropDown = !this.dropDown
  }

}