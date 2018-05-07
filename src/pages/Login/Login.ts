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

    loginSystem() {
        this.toast && this.toast.close()
        if (this.validUserInfo() === 'Allow To Login') {
            IMint.Indicator.open({
                text: '登录中...',
                spinnerType: 'snake'
            })
        }
    }

    validUserInfo() {
        if (!this.username.trim()) return (this.toast = (<any>this).$toast('用户名不能为空'))
        if (!this.password.trim()) return (this.toast = (<any>this).$toast('请输入密码'))
        if (!this.ICode.trim()) {
            return (this.toast = (<any>this).$toast('请输入验证码'))
        } else {
            if (this.ICode.trim() !== this.VCode) return (this.toast = (<any>this).$toast('验证码输入错误'))
        }
        return 'Allow To Login'
    }

    getVCode(code: string) {
        this.VCode = code
    }
    
}
