import component from 'vue-class-component'
import Vue from 'vue'
// import VerifyCode from '@/components/VerifyCode/VerifyCode.vue'

@component({
    name: 'login'
})

export default class Login extends Vue {
    private username: string = ''
    private password: string = ''

    validLogin() {
        console.log(this.username)
    }
    
}
