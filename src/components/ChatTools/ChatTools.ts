import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'chatTools',
  watch: {
    'messageContent': 'watchMessageConteng'
  }
})

export default class ChatTools extends Vue {
  private voice: boolean = false
  private messageContent: string = ''

  toggleWay(key: boolean) { // 切换输入方式（ps：涉及:src时，url-loader解析会从域名下拿资源，不会走相对路径）
    this.voice = key
  }

  getMessageContent() {
    setTimeout(() => {
      this.messageContent = (<any>this.$refs.messageContent).innerHTML
    })
  }

  watchMessageConteng(val: string) {
    (<any>this.$refs.content).style.height = `${(<any>this.$refs.messageContent).offsetHeight}px`
  }

}