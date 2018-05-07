import component from 'vue-class-component'
import Vue from 'vue'
import VerifyCode from '@/components/VerifyCode/VerifyCode.vue'
import Http from './lib/http'
const { Indicator } = require('mint-ui')

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

    loginSystem() {
        this.validUserInfo()
        Indicator.open('加载中...')
        console.log(1234)
    }

    validUserInfo() {
        return 'asd'
    }

    getVCode(code: string) {
        this.VCode = code
    }
    
}
