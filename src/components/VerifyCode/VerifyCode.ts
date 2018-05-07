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

    refreshImage() {
        this.vCodeImage.refresh()
        this.postVCode()
    }

    postVCode() {
        this.$emit('getVCode', this.vCodeImage.options.code)
    }

}
