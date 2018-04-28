const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

const User_Group = sequelize.define('User_Group', {
  'UG_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'UG_Name': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    comment: '群昵称'
  },
  'UG_AdminID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: User,
      key: 'U_ID'
    },
    comment: '群主ID'
  },
  'UG_Icon': {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: '群图标'
  },
  'UG_Notice': {
    type: Sequelize.STRING(150),
    allowNull: true,
    comment: '群公告'
  },
  'UG_Intro': {
    type: Sequelize.STRING(150),
    allowNull: true,
    comment: '群简介'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: false,     // 是否自动添加时间戳createAt，updateAt
  comment: '用户群组表'
});

module.exports = User_Group;
