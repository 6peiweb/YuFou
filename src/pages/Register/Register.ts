import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'register'
})

export default class Register extends Vue {
  private active: string = 'animation1'
  private step: number = 1
  private size: number = 100 / 3
  private titleArray: Array<string> = ['第一步', '第二步', '第三步']
  private interval: any = null

  get backRoute() {
    return this.$store.getters.routeInfo.from
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