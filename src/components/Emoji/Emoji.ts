import Component from 'vue-class-component'
import Vue from 'vue'
const EmojiData = require('@@/js/emoji.data')

@Component({
  name: 'emoji'
})

export default class Emoji extends Vue {
  private panels: Array<string> = ['表情', '自然', '物品', '地点', '符号']
  private activeIndex: number = 0

  get emojis() {
    return this.panels.map(item => Object.keys(EmojiData[item]))
  }

  changeActive (index: number) {
    this.activeIndex = index
  }

  getPureName (name: string) {
    return name.replace(/:/g, '')
  }

  selectItem (emojiCode: string) {
    this.$emit('select', emojiCode)
  }

}
