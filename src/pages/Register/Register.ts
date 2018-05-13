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
  private yf_id: string = ''
  private username: string = ''
  private password: string = ''
  private regainPW: string = ''
  private VCaptcha: string = ''
  private ICaptcha: string = ''
  private disp: number = 60
  private sheetVisible: boolean = false
  private actions = [
    { name: '登录', method: this.login }
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
    if(!this.email.trim()) return this.toast('邮箱不能为空')
    if(!/.+@.+\..+/.test(this.email.trim())) return this.toast('邮箱格式不正确')
    this.sendEmail(true)
  }
  
  vaildCaptcha() {  // 检验验证码
    this.ICaptcha = (<any>this.$refs.codeBox).getCodeStr()
    console.log('邮箱验证码', this.VCaptcha)
    IMint.Indicator.open({ text: '检验中...', spinnerType: 'snake' })
    setTimeout(() => {
      this.VCaptcha === this.ICaptcha ? this.increment() : this.toast('验证码错误，请再次确认')
      IMint.Indicator.close()
    }, 1500)
  }

  vaildUserInfo() {  // 检验用户信息
    if(!this.yf_id.length) return this.toast('请填写YF_ID')
    if(!/^[a-zA-Z][a-zA-Z\d_]{5,11}/.test(this.yf_id)) return this.toast('YF_ID为6-12个字符，只包含(数字、字母、下划线_)，不能以数字开头')
    if(!this.username.trim().length) return this.toast('请填写用户名')
    if(this.username.trim().length > 12) return this.toast('用户名长度不能超过12个字符')
    if(!this.password.length) return this.toast('请填写密码')
    if(this.password.length < 8 || this.password.length > 16) return this.toast('密码为8-16个字符')
    if(!this.regainPW.length) return this.toast('请填写确认密码')
    if(this.password !== this.regainPW) return this.toast('两次密码输入不一致')
    return false
  }

  completed() { // 注册用户
    let params = {
      yf_id: this.yf_id,
      username: this.username,
      password: (<any>ILib.md5)(this.password),
      email: this.email
    }
    if(!this.vaildUserInfo()) {
      IMint.Indicator.open({ text: '注册中...', spinnerType: 'snake' })
      setTimeout(() => {
        Http.postRegister(params)
          .then((response: any) => {
            if (response.data.data.registed) {
              this.$router.push(<lp.RawLocation>{ name: 'login' })
              return this.toast('注册成功')
            }
            return this.toast(`${response.data.message}`)
          })
          .catch((error: any) => this.toast(error))
          .finally(() =>  IMint.Indicator.close())
      }, 1500)
    }
  }

  backup() {  // 返回注册第一步
    this.step = 1
    this.interval = setInterval(() => this.setTimer(this.step, -1))
  }

  backLogin() { // 返回上一个路由
    this.$router.push(<lp.RawLocation>{ name: this.backRoute.name })
  }

  login() { // 返回登录
    this.$router.push(<lp.RawLocation>{ name: 'login' })
  }

  increment() { // 进行注册下一步
    this.step < 3 && this.step ++
    this.interval = setInterval(() => this.setTimer(this.step, 1))
  }

  setTimer(step: number, direction: number) {  // 进度条滚动长度，方向 -1向左， 1向右
    let condition = direction > 0 ? this.size >= 100 / 3 * step : this.size <= 100 / 3 * step
    if (condition) return clearInterval(this.interval)
    this.size += direction
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

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

  moreOption() {  // 更多选项
    this.sheetVisible = true
  }

}
