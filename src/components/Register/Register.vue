<template>
  <div class="register">
    <p class="register-header">{{ title }}</p>
    <div class="register-content">
      <div class="register-content-image">
        <img src="../../source/image/octopus.png" alt="我的头像">
      </div>
      <el-form :model="registerInfo" class="register-content-form">
        <el-input v-model="registerInfo.username" placeholder="用户名"></el-input>
        <el-input type="password" v-model="registerInfo.password" placeholder="密码"></el-input>
        <el-input type="password" v-model="registerInfo.secondpassword" placeholder="确认密码"></el-input>
        <el-input v-model="identifyCode" placeholder="验证码"></el-input>
        <el-button class="register-content-btn" type="primary" @click="onSubmit" round>{{ title }}</el-button>
      </el-form>
      <div class="register-content-tologin">
        <span class="register-content-prompt">已有账号？</span>
        <router-link tag="span" class="register-content-tablink" to="/">立即登录</router-link>
      </div>
    </div>
    <div class="register-footer"></div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      title: '注册',
      registerInfo: {
        username: '',
        password: '',
        secondpassword: ''
      },
      identifyCode: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('ss')
    }
  },
  components: {
    // Verify
  }
}
</script>

<style lang="sass">
@keyframes RegisterMobile
  from
    left: -100%
  to
    left: 0

.register
  position: absolute
  top: 0
  bottom: 0
  width: 100%
  background-color: #72DDA4
  animation: RegisterMobile 0.7s

.register-header
  position: absolute
  top: 60px
  left: 20px
  color: #FFF
  font-size: 27px
  font-weight: 700

.register-content
  position: absolute
  top: 20%
  bottom: 30px
  width: 92%
  transform: translateX(4%)
  background-color: #FEFEFE
  color: #72DDA4

.register-content-image
  position: absolute
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 200

.register-content-image img
  border: 3px solid #EEE
  border-radius: 50%
  background-color: #FEFEFE
  width: 100%
  height: 100%

.register-content-form
  position: absolute
  top: 20%
  left: 50%
  bottom: 15%
  width: 80%
  transform: translateX(-50%)

.el-input__inner
  margin-top: 10px

.el-input__inner:hover
  border-color: #72DDA4

.register-content-btn
  position: absolute
  bottom: 20px
  background-color: #72DDA4
  border-color:  #72DDA4
  width: 100%

.el-button--primary:focus, .el-button--primary:hover
  background: #62CD94
  border-color: #62CD94
  color: #fff

.el-button--primary.is-active, .el-button--primary:active
  background: #82EDB4
  border-color: #82EDB4
  color: #fff

.register-content-btn
  position: absolute
  bottom: 20px
  background-color: #72DDA4
  border-color:  #72DDA4
  width: 100%

.register-content-tologin
  position: absolute
  bottom: 8%
  width: 100%
  text-align: center

.register-content-prompt
  color: #AAA

.register-content-tablink
  text-decoration: underline

.register-footer
  position: absolute
  bottom: 10px
  left: 50%
  width: 80%
  height: 20px
  transform: translateX(-50%)
  background: #82EDB4
</style>
