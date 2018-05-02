const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const UserFriendPolicy = sequelize.define('User_FriendPolicy', {
  'UFP_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'UFP_Type': {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    comment: '好友添加方式'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: true,      // 是否自动添加时间戳createAt，updateAt
  comment: '用户好友策略表'
});

module.exports = UserFriendPolicy;
