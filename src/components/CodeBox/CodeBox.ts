import Component from 'vue-class-component'
import Vue from 'vue'
import CodeEnum from './lib/enum'

@Component({
  name: 'codeBox',
  watch: {
    'index': 'watchIndex'
  }
})

export default class CodeBox extends Vue {
  private index: number = 0
  private codeList: Array<string> = []

  mounted() {
    this.init()
  }

  init() {  // 验证框初始化
    (<any>this.$refs[`box${this.index = 0}`]).focus()
    this.codeList = []
  }
  
  checkInput() {  // 检验非法输入、溢出输入
    if (CodeEnum.indexOf(this.codeList[this.index].toLocaleUpperCase()) === -1) return this.codeList[this.index] = ''
    this.index < 5 ? this.index ++ : (<any>this.$refs[`box${this.index}`]).blur()
  }

  watchIndex() {  // 监测当前验证框index
    (<any>this.$refs[`box${this.index}`]).focus()
  }

  getCodeStr() {  // 返回验证码
    return this.codeList.join('').toLocaleUpperCase()
  }

}
