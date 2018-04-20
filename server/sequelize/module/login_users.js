const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('login_user', {
  id: { 
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment:'主键'
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    comment: '用户名'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '登录密码'
  },
  mobilephone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    comment: '验证手机号'
  }
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  underscored: true, // 数据段采用_蛇形命名规则
  comment: '用户登录表'
});