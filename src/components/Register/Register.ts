import Component from 'vue-class-component';
import Http from './lib/http'
import Vue from 'Vue'

@Component({
  name: 'Register',
})

export default class Register extends Vue {
  private title: string =  '注册';
  private identifyCode: string = '';
  private registerInfo: any = {
    username: '',
    password: '',
    secondpassword: '',
    mobilephone: '',
  };

  onSubmit () {
    console.log(this);
    Http.postRegisterInfo({
      username: this.registerInfo.username,
      password: this.registerInfo.username,
      mobilephone: this.registerInfo.mobilephone
    })
  }
}