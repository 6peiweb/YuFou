/*
 * 初始化全局依赖的一些工具类
 */

const axios = require('axios')
const { Indicator, MessageBox } = require('mint-ui')

window['ILib'] = {
  md5: require('md5'),
  http: axios.create({
    timeout: 10 * 1000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
}

window['IMint'] = {
  Indicator,
  MessageBox
}
