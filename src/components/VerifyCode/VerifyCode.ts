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
    private VCode: string = ''
    private vCodeImage: any = {}

    mounted() {
        this.vCodeImage = new GVerify('imageCode')
        console.log(this.vCodeImage.options.code)
    }

    validate() {
        console.log(this.vCodeImage.options.code)
    }
}
