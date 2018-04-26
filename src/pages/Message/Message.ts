import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'message',
  // beforeRouteLeave (to, from , next) {
  //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  //   if (answer) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // }
})

export default class Message extends Vue {
  private buttongroup: Array<object> = [
    {
      content: '置顶',
      style: {
        background: '#ccc4c4',
        color: '#fff'
      }
    },
    {
      content: '标为未读',
      style: {
        background: '#d47e21',
        color: '#fff'
      }
    },
    {
      content: '删除',
      style: {
        background: '#ef1b1b',
        color: '#fff'
      }
    }
  ]
  private items: Array<object> = []

  created() {
    for(let i = 0; i < 100; i ++) {
      this.items.push({
        id: i,
        title: `我是第${100 - i}个聊天记录`
      })
    }
  }

}
