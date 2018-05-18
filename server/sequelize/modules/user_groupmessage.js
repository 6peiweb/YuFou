const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const User_Group = require('./user_group');
const Message_Type = require('./message_type');

const UserGroupMessage = sequelize.define('User_GroupMessage', {
  'UGM_ID': {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    comment: '主键'
  },
  'UGM_UserGroupID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: User_Group,
    //   key: 'UG_ID'
    // },
    comment: '群ID'
  },
  'UGM_FromUserID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: User,
    //   key: 'U_ID'
    // },
    comment: '发送者ID'
  },
  'M_Time': {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '消息发送时间'
  },
  'UGM_Content': {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '消息内容'
  },
  'UGM_Expires': {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    comment: '消息到期时间'
  },
  'UGM_Status': {
    type: Sequelize.ENUM('发送中','发送成功','发送失败'),
    allowNull: false,
    defaultValue: '发送成功',
    comment: '发送状态'
  },
  'UGM_MessageTypeID': {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    // references: {
    //   model: Message_Type,
    //   key: 'MT_ID'
    // },
    comment: '消息类型ID'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model 对应的表名将与model名相同
  timestamps: false,     // 是否自动添加时间戳createAt，updateAt
  comment: '用户群组消息记录表'
});

module.exports = UserGroupMessage;
