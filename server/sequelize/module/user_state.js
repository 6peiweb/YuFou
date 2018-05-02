const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const UserState = sequelize.define('User_State', {
  'US_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'US_Name': {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    comment: '状态名'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: true,      // 是否自动添加时间戳createAt，updateAt
  comment: '用户状态表'
});

module.exports = UserState;
