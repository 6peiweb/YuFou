import Component from 'vue-class-component'
import Vue from 'vue'
import Http from './lib/Http'

@Component({
  name: 'personalInfo'
})

export default class PersonalInfo extends Vue {
  private userId: string = this.$store.getters.userInfo.U_ID
  private nickname: string = this.$store.getters.userInfo.U_NickName
  private sex: string = this.$store.getters.userInfo.U_Sex
  private birthday: string = this.$store.getters.userInfo.U_Birthday
  private address: string = this.$store.getters.userInfo.U_Address
  private singature: string = this.$store.getters.userInfo.U_SingaTure
  private sexPopupVisible: boolean = false
  private sexSlots: Array<object> = [
    { flex: 1, values: ['男', '女', '未知'], className: 'sexSlot', textAlign: 'center' }
  ]
  private sexpickerValue: string = ''
  private datepickerValue: any = new Date()

  get showBirthday() {
    return this.getFormatDate(this.birthday)
  }

  modifyPersonalInfo() {
    IMint.Indicator.open({ text: '更新中...', spinnerType: 'snake' })
    setTimeout(() => {
      Http.putUserInfo({ userId: this.userId, nickname: this.nickname, sex: this.sex, birthday: this.birthday, address: this.address, singature: this.singature })
        .then(() => 
          Http.getUserInfo({ params: { userId: this.userId } })
            .then((response: any) => {
              this.$store.dispatch('update_userInfo', response.data)
              this.jumpOwner()
              this.toast(`更新个人信息成功!`)
        }))
        .catch((error: any) => this.toast(`Failed to update user-Info by '${error}'`))
        .finally(() =>  IMint.Indicator.close())
    }, 1500)

  }

  jumpOwner() {
    this.$router.push(<any>{ name: 'owner', params: { userId: this.userId } })
  }

  sexChange(picker: any, values: any) {
    this.sexpickerValue = values[0]
  }

  toggleSexPicker() {
    this.sexPopupVisible = !this.sexPopupVisible
  }

  sexConfirm() {
    this.sex = this.sexpickerValue
    this.toggleSexPicker()
  }

  openDatePicker() {
    (<any>this.$refs.datepicker).open()
  }

  birthDayConfirm(date: any) {
    this.getFormatDate(date)
  }

  getFormatDate(date: any) {
    if(!date) return null
    this.birthday = new Date(date).toString()
    let time: any = new Date(date).toLocaleString().match(/(\d*)\/(\d*)\/(\d*)/)
    return `${time[1]}年${time[2]}月${time[3]}日`
  }

  toast(message: string) {  // 弹出提示框
    return (<any>this).$toast({ message, duration: 1500})
  }

}
