import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'messageInfo',
  props: {
    isSelf: Boolean,
    message: Object,
    spoker: {
      type: String,
      default: ''
    }
  }
})

export default class MessageInfo extends Vue {
  private name: string = ''
  private style = {
    height: ''
  }

  mounted() { // 组件渲染完，获取到内容的高度
    this.$nextTick(() => this.style.height = `${(<any>this.$refs.content).offsetHeight}px`)
    this.name = this.$props.spoker
  }

}