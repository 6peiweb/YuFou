import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'register'
})

export default class Register extends Vue {
  private step: number = 1
  private size: number = 100 / 3
  private tabItem: Array<string> = ['email', 'captcha', 'fillInfo']
  private titleArray: Array<string> = ['第一步', '第二步', '第三步']
  private interval: any = null
  private email: string = ''

  get backRoute() {
    return this.$store.getters.routeInfo.from
  }

  get active() {
    return this.tabItem[this.step - 1]
  }

  set active(val: string) {
    this.step = this.tabItem.indexOf(val) + 1
  }

  validEmail() {
    if(!this.email.trim()) return (<any>this).$toast({ message: '邮箱不能为空', duration: 1500})
    if(!/.+@.+\..+/.test(this.email.trim())) return (<any>this).$toast({ message: '邮箱格式不正确', duration: 1500})
    this.increment()
  }

  backLogin() {
    this.$router.push((<lp.RawLocation>{ name: this.backRoute.name }))
  }

  increment() {
    this.step < 3 && this.step ++
    this.interval = setInterval(() => this.bigger(this.step))
  }

  bigger(count: number) {
    if(this.size >= 100 / 3 * count) return clearInterval(this.interval)
    this.size ++
  }

}
