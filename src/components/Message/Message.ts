import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'message',
  props: {
    isSelf: Boolean,
    message: Object
  }
})

export default class Message extends Vue {
  private name: string = ''
  private style = {
    height: ''
  }

  mounted() {
    this.$nextTick(() => {
      this.style.height = `${(<any>this.$refs.content).offsetHeight}px`
    })
  }

}