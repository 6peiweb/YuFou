import component from 'vue-class-component'
import Vue from 'vue'
import VerifyCode from '@/components/VerifyCode/VerifyCode.vue'
import Http from './lib/http'

@component({
    name: 'login',
    components: {
        VerifyCode
    }
})

export default class Login extends Vue {
    private userId: string = ''
    private password: string = ''
    private VCode: string = ''
    private ICode: string =''
    private toast: any = undefined
    private sheetVisible: boolean = false
    private actions = [
      { name: '注册', method: this.register }
    ]

    loginSystem() { // 登录验证id$密码
        this.toast && this.toast.close()
        if (this.validUserInfo() === 'Allow To Login') {
            IMint.Indicator.open({
                text: '登录中...',
                spinnerType: 'snake'
            })
            setTimeout(() => {
                Http.getLoginSystem({
                    params: {
                        username: this.userId,
                        password: this.password
                    }
                }).then((response: any) => {
                    if (response.data.data) return this.$router.push((<lp.RawLocation>{ name: 'message' }))
                    return (this.toast = (<any>this).$toast(`${response.data.message}`))
                }).catch(() => (<any>this.$refs.verifyCode).refreshImage()).finally(() => IMint.Indicator.close())
            }, 1500)
        }
    }

    validUserInfo() {   // 验证登录表单格式
        if (!this.userId.trim()) return (this.toast = (<any>this).$toast('YF_ID不能为空'))
        if (!this.password.trim()) return (this.toast = (<any>this).$toast('请输入密码'))
        if (!this.ICode.trim()) return (this.toast = (<any>this).$toast('请输入验证码'))
        if (this.ICode.trim().toLowerCase() !== this.VCode.toLowerCase()) return (this.toast = (<any>this).$toast('验证码输入错误'))
        return 'Allow To Login'
    }

    getVCode(code: string) {    // 子组件触发，获取图片验证码
        this.VCode = code
        console.log('验证码', code)
    }

    register() {    // 跳转到注册路由
        this.$router.push((<lp.RawLocation>{ name: 'register' }))
    }

    moreOption() {  // 更多选项
        this.sheetVisible = true
    }
    
}