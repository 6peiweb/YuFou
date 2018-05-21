import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'messageRecord',
  props: {
    title: String,
    time: String,
    value: Object
  }
})


export default class MessageRecord extends Vue {
  get name() {
    let message = this.$props.value
    if (message.User_Group) return message.User_Group.name
    return message.User.name
  }

  enterChatView(message: any) {
    if (message.User_Group) return this.$emit('enterGroupChatView', message.User_Group.id)
    return this.$emit('enterFriendChatView', message.User.id)
  }

}
