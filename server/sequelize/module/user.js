const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User_State = require('./user_state');
const User_FriendPolicy = require('./user_friendpolicy');

const User = sequelize.define('User', {
  'U_ID': { 
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment:'主键'
  },
  'U_UserID': {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  'U_NickName': {
    type: Sequelize.STRING(20),
    allowNull: false,
    comment: '昵称'
  },
  'U_Password': {
    type: Sequelize.STRING(20),
    allowNull: false,
    comment: '密码'
  },
  'U_SingaTure': {
    type: Sequelize.STRING(150),
    defaultValue: '这个人太懒了，什么都没有留下~',
    comment: '个性签名'
  },
  'U_Sex': {
    type: Sequelize.ENUM('男', '女', '未知'),
    defaultValue: '未知',
    comment: '性别'
  },
  'U_Birthday': {
    type: Sequelize.DATE,
    comment: '生日'
  },
  'U_Email': {
    type: Sequelize.STRING(20),
    allowNull: false,
    comment: '邮箱'
  },
  'U_HeadPortrait': {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: '头像'
  },
  'U_UserStateID': {
    type: Sequelize.INTEGER(11),
    references: {
      model: User_State,
      key: 'US_ID'
    },
    defaultValue: 1,
    comment: '用户状态ID'
  },
  'U_FriendPolicyID': {
    type: Sequelize.INTEGER(11),
    references: {
      model: User_FriendPolicy,
      key: 'UFP_ID'
    },
    defaultValue: 1,
    comment: '好友策略ID'
  },
  'U_FriendPolicyQuestion': {
    type: Sequelize.STRING(30),
    comment: '好友策略问题'
  },
  'U_FriendPolicyAnswer': {
    type: Sequelize.STRING(30),
    comment: '好友策略答案'
  },
  'U_FriendPolicyPassword': {
    type: Sequelize.STRING(20),
    comment: '好友策略密码'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: true,      // 是否自动添加时间戳createAt，updateAt
  comment: '用户表'
});

module.exports = User;
