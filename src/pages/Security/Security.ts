import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

@Component({
  name: 'security'
})

export default class Security extends Vue {
  private userId: number = this.$store.getters.userInfo.U_ID
  private oldPassword: string = ''
  private newPassword: string = ''
  private regainPW: string = ''

  jumpSetting() {
    this.$router.push(<lp.RawLocation>{name: 'setting'})
  }

  modifyUserPassword() {
    let params = {
      userId: this.userId,
      oldPassword: (<any>ILib.md5)(this.oldPassword),
      newPassword: (<any>ILib.md5)(this.newPassword)
    }
    if(!this.vaildUserInfo()) {
      IMint.Indicator.open({ text: '更新中...', spinnerType: 'snake' })
      setTimeout(() => {
        Http.putUserPassword(params)
          .then((response: any) => {
            if (response.data.success) {
              this.jumpSetting()
              return this.toast('密码更新成功！')
            }
            return this.toast('旧密码输入不正确，密码更新失败！')
          })
          .catch((error: any) => this.toast(error))
          .finally(() =>  IMint.Indicator.close())
      }, 1500)
    }
  }

  vaildUserInfo() {  // 检验用户输入
    if(!this.oldPassword.length) return this.toast('请输入旧密码')
    if(!this.newPassword.length) return this.toast('请输入新密码')
    if(this.oldPassword === this.newPassword) return this.toast('新密码与当前密码不能一致')
    if(this.newPassword.length < 8 || this.newPassword.length > 16) return this.toast('密码为8-16个字符')
    if(!this.regainPW.length) return this.toast('请填写确认密码')
    if(this.newPassword !== this.regainPW) return this.toast('两次密码输入不一致')
    return false
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }
  
}
