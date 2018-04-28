const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Message_Type = sequelize.define('Message_Type', {
  'MT_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'MT_Name': {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    comment: '消息类型名'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: true,      // 是否自动添加时间戳createAt，updateAt
  comment: '消息类型表'
});

module.exports = Message_Type;
