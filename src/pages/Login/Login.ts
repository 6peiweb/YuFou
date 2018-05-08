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
    private username: string = ''
    private password: string = ''
    private VCode: string = ''
    private ICode: string =''
    private toast: any = undefined
    private sheetVisible: boolean = false
    private actions = [
      { name: '注册', method: this.register }
    ]

    loginSystem() {
        this.toast && this.toast.close()
        if (this.validUserInfo() === 'Allow To Login') {
            IMint.Indicator.open({
                text: '登录中...',
                spinnerType: 'snake'
            })
            setTimeout(() => {
                Http.getLoginSystem({
                    params: {
                        username: this.username,
                        password: this.password
                    }
                }).then((response: any) => {
                    if (response.data.data) return this.$router.push({ name: 'message' })
                    return (this.toast = (<any>this).$toast(`${response.data.message}`))
                }).finally(() => {
                    (<any>this.$refs.verifyCode).refreshImage()
                    IMint.Indicator.close()
                })
            }, 1500)
        }
    }

    validUserInfo() {
        if (!this.username.trim()) return (this.toast = (<any>this).$toast('用户名不能为空'))
        if (!this.password.trim()) return (this.toast = (<any>this).$toast('请输入密码'))
        if (!this.ICode.trim()) return (this.toast = (<any>this).$toast('请输入验证码'))
        if (this.ICode.trim().toLowerCase() !== this.VCode.toLowerCase()) return (this.toast = (<any>this).$toast('验证码输入错误'))
        return 'Allow To Login'
    }

    getVCode(code: string) {
        this.VCode = code
        console.log('验证码', code)
    }

    register() {
        this.$router.push({ name: 'register' })
    }

    moreOption() {
        this.sheetVisible = true
    }
    
}