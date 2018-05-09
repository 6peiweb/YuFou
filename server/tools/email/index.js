const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config')

const transport = nodemailer.createTransport(smtpTransport(config));  // 开启一个 SMTP 连接池
 
const content = (options) => {
  return {
    from: '与否验证中心<2771873200@qq.com>',
    to: `${options.to}`,
    subject: '与否 App 邮箱验证',
    text: `
      以下是您的验证码：
      ${options.captcha}
    
      您好！
    
      我们收到了来自您的【与否】通行证的安全请求。请使用上面的验证码注册您的账号。
    
      请注意：该验证码将在10分钟后过期，请尽快验证！
    
      希望【与否】为您带来愉悦！
      【与否】开发人员-liupei`,
    html: require('./html')(options.captcha)
  }
}

module.exports = (options) => new Promise((resolve, reject) => {
  transport.sendMail(content(options), (err, res) => {
    transport.close();
    !err ? resolve(res) : reject(err);
  });
});
