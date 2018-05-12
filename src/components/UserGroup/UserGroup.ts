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
    console.log(this.$props.groupInfo)
  }

  toggleShow() {
    this.dropDown = !this.dropDown
  }

}