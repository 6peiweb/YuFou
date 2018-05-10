import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/http'
import CodeBox from '@/components/CodeBox/CodeBox.vue'

@Component({
  name: 'register',
  components: {
    CodeBox
  }
})

export default class Register extends Vue {
  private step: number = 1
  private size: number = 100 / 3
  private tabItem: Array<string> = ['email', 'captcha', 'fillInfo']
  private titleArray: Array<string> = ['第一步', '第二步', '第三步']
  private interval: any = null
  private email: string = ''
  private VCaptcha: string = ''
  private ICaptcha: string = ''
  private disp: number = 60
  private sheetVisible: boolean = false
  private actions = [
    { name: '注册', method: this.backLogin('login') }
  ]

  get backRoute() {
    return this.$store.getters.routeInfo.from
  }

  get active() {  // 当前step
    return this.tabItem[this.step - 1]
  }

  set active(val: string) {
    this.step = this.tabItem.indexOf(val) + 1
  }

  validEmail() {  // 正则校验邮箱
    if(!this.email.trim()) return (<any>this).$toast({ message: '邮箱不能为空', duration: 1500})
    if(!/.+@.+\..+/.test(this.email.trim())) return (<any>this).$toast({ message: '邮箱格式不正确', duration: 1500})
    this.sendEmail(true)
  }
  
  vaildCaptcha() {  // 检验验证码
    this.ICaptcha = (<any>this.$refs.codeBox).getCodeStr()
    IMint.Indicator.open({ text: '检验中...', spinnerType: 'snake' })
    setTimeout(() => {
      this.VCaptcha === this.ICaptcha ? this.increment() : (<any>this).$toast({ message: '验证码错误，请再次确认', duration: 1500})
      IMint.Indicator.close()
    }, 1500)
  }

  backLogin(routeName?: string) { // 返回上一个路由
    console.log(routeName)
    this.$router.push((<lp.RawLocation>{ name: routeName || this.backRoute.name }))
  }

  increment() { // 进行注册下一步
    this.step < 3 && this.step ++
    this.interval = setInterval(() => {
      if(this.size >= 100 / 3 * this.step) return clearInterval(this.interval)
      this.size ++
    })
  }

  getDisp() { // 重新获取倒计时
    let countDown = + new Date + 60000,
        timer = setInterval(() => {
      this.disp = Math.round((countDown - + new Date()) / 1000)
      !this.disp && clearInterval(timer)
    }, 1000)
  }

  sendEmail(key: boolean) { // 发送验证码邮件，发送弹窗
    IMint.Indicator.open({ text: '发送中...', spinnerType: 'snake' })
    setTimeout(() => {
      IMint.Indicator.close()
      key && this.increment() || this.getDisp()
      Http.postValidEmail({ 
        email: this.email 
      }).then((res: any) => res.data && res.data.data.sent && (this.VCaptcha = res.data.data.captcha))
    }, 1500)
  }

  moreOption() {  // 更多选项
    this.sheetVisible = true
  }

}
