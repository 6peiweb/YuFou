const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

const FriendGroup = sequelize.define('Friend_Group', {
  'FG_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'FG_Name': {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    comment: '好友分组名'
  },
  'FG_UserID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: User,
    //   key: 'U_ID'
    // },
    comment: '用户ID'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: true,     // 是否自动添加时间戳createAt，updateAt
  comment: '好友分组表'
});

module.exports = FriendGroup;
