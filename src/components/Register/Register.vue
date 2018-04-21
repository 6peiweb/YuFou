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
        <el-input v-model="registerInfo.mobilephone" placeholder="手机号码"></el-input>
        <el-input v-model="identifyCode" placeholder="验证码"></el-input>
        <el-button class="register-content-btn" type="primary" @click="onSubmit()" round>{{ title }}</el-button>
      </el-form>
      <div class="register-content-tologin">
        <span class="register-content-prompt">已有账号？</span>
        <router-link tag="span" class="register-content-tablink" to="/">立即登录</router-link>
      </div>
    </div>
    <div class="register-footer"></div>
  </div>
</template>

<script src="./Register.ts" lang="ts"></script>
<style src="./Register.scss" lang="scss"></style>
