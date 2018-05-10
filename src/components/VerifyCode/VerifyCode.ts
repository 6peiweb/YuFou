import Component from 'vue-class-component'
import Vue from 'vue'
const GVerify = require('@@/js/gVerify')

@Component({
    name: 'verifyCode',
    props: {
        idName: String,
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 30
        },
        type: {
            type: String,
            default: 'number'
        }
    }
})

export default class VerifyCode extends Vue {
    private vCodeImage: any = {}

    mounted() {
        this.vCodeImage = new GVerify(Object.assign(this.$props))
        this.postVCode()
    }

    refreshImage() {    // 刷新验证码
        this.vCodeImage.refresh()
        this.postVCode()
    }

    postVCode() {   // 获取图片中验证码
        this.$emit('getVCode', this.vCodeImage.options.code)
    }

}
