const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Friend_Group = require('./friend_group');

const Friend = sequelize.define('Friend', {
  'F_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'F_FriendID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: User,
    //   key: 'U_ID'
    // },
    comment: '好友ID'
  },
  'F_UserID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: User,
    //   key: 'U_ID'
    // },
    comment: '用户ID'
  },
  'F_Name': {
    type: Sequelize.STRING(20),
    allowNull: true,
    comment: '好友备注昵称'
  },
  'F_FriendGroupID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: Friend_Group,
    //   key: 'FG_ID'
    // },
    comment: '好友所属组ID'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: false,     // 是否自动添加时间戳createAt，updateAt
  comment: '好友表'
});

module.exports = Friend;
