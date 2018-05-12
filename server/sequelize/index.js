const User = require('./modules/user');
const UserState = require('./modules/user_state');
const UserGroup = require('./modules/user_group');
const UserFriendPolicy = require('./modules/user_friendpolicy');
const UserGroupMessage = require('./modules/user_groupmessage');

const Friend = require('./modules/friend');
const FriendGroup = require('./modules/friend_group');

const Message = require('./modules/message');
const MessageType = require('./modules/message_type');

// User表外键关系映射
UserState.hasMany(User);
User.belongsTo(UserState, {foreignKey: 'U_UserStateID'});
UserFriendPolicy.hasMany(User);
User.belongsTo(UserFriendPolicy, {foreignKey: 'U_FriendPolicyID'});

// UserGroup表外键关系映射
User.hasMany(UserGroup);
UserGroup.belongsTo(User, {foreignKey: 'UG_AdminID'});

// FriendGroup表外键关系映射
User.hasMany(FriendGroup);
FriendGroup.belongsTo(User, {foreignKey: 'FG_UserID'});

// Friend表外键关系映射
User.hasMany(Friend);
Friend.belongsTo(User, {foreignKey: 'F_FriendID'});
User.hasMany(Friend);
Friend.belongsTo(User, {foreignKey: 'F_UserID'});
FriendGroup.hasMany(Friend);
Friend.belongsTo(FriendGroup, {foreignKey: 'F_FriendGroupID'});

// Message表外键关系映射
User.hasMany(Message);
Message.belongsTo(User, {foreignKey: 'M_FromUserID'});
User.hasMany(Message);
Message.belongsTo(User, {foreignKey: 'M_ToUserID'});
MessageType.hasMany(Message);
Message.belongsTo(MessageType, {foreignKey: 'M_MessageTypeID'});

// UserGroupMessage表外键关系映射
User.hasMany(UserGroupMessage);
UserGroupMessage.belongsTo(User, {foreignKey: 'UGM_UserGroupID'});
User.hasMany(UserGroupMessage);
UserGroupMessage.belongsTo(User, {foreignKey: 'UGM_FromUserID'});
MessageType.hasMany(UserGroupMessage);
UserGroupMessage.belongsTo(MessageType, {foreignKey: 'UGM_MessageTypeID'});

module.exports = { User, UserState, UserGroup, UserFriendPolicy, UserGroupMessage, Friend, FriendGroup, Message, MessageType };
