import Component from 'vue-class-component'
import Vue from 'vue'
import Emoji from '@/components/Emoji/Emoji.vue'
import createEmoji from './lib/createEmoji'
import { resolve } from 'url';
import { rejects } from 'assert';

@Component({
  name: 'chatTools',
  watch: {
    'messageContent': 'watchMessageConteng'
  },
  props: {
    ration: {
      type: Number,
      default: 24
    }
  },
  components: {
    Emoji
  }
})

export default class ChatTools extends Vue {
  private voice: boolean = false
  private showEmoji: boolean = false
  private messageContent: string = ''
  private inputContentStyle: any = { height: '' }
  private textareaStyle: any = undefined
  private voiceStyle: any = undefined
  private lastEditRange: any = undefined
  private textarea: any = {}

  created() {
    this.inputContentStyle.height = `${this.$props.ration}px`
    this.textareaStyle = { fontSize: `${2 / 3 * this.$props.ration}px`, lineHeight: `${this.$props.ration}px`, maxHeight: `${ 6 * this.$props.ration }px` }
    this.voiceStyle = { textAlign: 'center', height: `${this.$props.ration}px`, lineHeight: `${this.$props.ration}px` }
  }

  mounted() {
    this.textarea = this.$refs.messageContent
  }

  toggleWay(key: boolean) { // 切换输入方式（ps：涉及:src时，url-loader解析会从域名下拿资源，不会走相对路径）
    this.voice = key
  }

  listenUserInput(e: any) {  
    this.getMessageContent()
      .then(() => {
        if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault()
          this.$emit('postMessage', this.messageContent)
          this.textarea.innerHTML = ''
        }
      })
      .catch((err) => console.log(err))
  }

  getMessageContent() { // 等待输入完毕获取到输入的值
    return new Promise((resolve, reject) => {
      this.messageContent = this.textarea.innerHTML
      this.lastEditRange = getSelection().getRangeAt(0)
      resolve()
    })
  }

  watchMessageConteng() { // 用div.textarea的高度撑开外层的高度
    this.inputContentStyle.height = `${this.textarea.offsetHeight}px`
  }


  toggleEmoji() { // 切换表情的显示
    this.toggleWay(false)
    this.showEmoji = !this.showEmoji
    this.emitChatBlockScroll()
  }

  selectEmoji (emojiCode: string) {  // 选中表情，把document光标对象移到输入表情最后
    let sourceElement = this.textarea,
        selection = getSelection(),
        emojiElement = createEmoji(emojiCode, 16),
        range

    sourceElement.focus()
    this.lastEditRange = selection.getRangeAt(0)

    if (selection.anchorNode.nodeName !== '#text') {
      sourceElement.childNodes.length > 0 ? sourceElement.insertBefore(emojiElement, sourceElement.childNodes[selection.anchorOffset]) : sourceElement.appendChild(emojiElement)
      range = document.createRange()
      range.selectNodeContents(emojiElement)
      range.setStart(sourceElement, this.lastEditRange.startOffset + 1)
    } else {
      this.lastEditRange.commonAncestorContainer.splitText(this.lastEditRange.startOffset)
      range = selection.getRangeAt(0)
      sourceElement.insertBefore(emojiElement, this.lastEditRange.commonAncestorContainer.nextSibling)
      range.setStart(sourceElement, this.getCurrentCursorSite(sourceElement, this.lastEditRange.commonAncestorContainer) + 2)
    }

    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
    this.lastEditRange = range
    this.getMessageContent()
  }

  getCurrentCursorSite(sourceElement: any, targetElement: any) {  // 获取历史光标位置
    for(let i in sourceElement.childNodes) {
      if(sourceElement.childNodes[i] === targetElement) return Number(i)
    }
    return 0
  }

  emitChatBlockScroll() {
    this.$emit('scrollToBottom')
  }

}