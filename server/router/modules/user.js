const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const email = require('../../tools/email');
const { User, Message, UserGroupMessage, UserGroup } = require('../../sequelize');

router.get('/login', (req, res) => {  // 用户登录
  let attributes = ['U_ID', 'U_Password'],
      where = { U_UserID: req.query.username };

  User
    .findOne({ attributes, where })
    .then((user) => {
      if (!user) return res.send({ data: false, message: 'Not found user.' });
      if (user.get('U_Password') !== req.query.password) return res.send({ data: false, message: 'Login failure,password is not correct.' });
      return res.send({ data: true, U_ID: user.get('U_ID'), message: 'ok' });
    })
    .catch((err) => res.status(400).send(String(err)));

});

router.post('/email', (req, res) => { // 用户邮箱验证
  if (!req.body.email) return res.status(400).send(`Lack of parameter 'email'`);
  
  let attributes = [ [Sequelize.fn('COUNT', Sequelize.col('U_UserID')), 'count'] ],
      where = { U_Email: req.body.email };

  User
    .findOne({ attributes, where })
    .then((user) => {
      if (user.get('count') < 5) {
        let captcha = require('../tools/email/captcha')();
        email({ to: req.body.email, captcha })
          .then((response) => res.send({ data: { sent: true, captcha, ...response }, message: `The captcha has been sent to ${req.body.email}.` }))
          .catch((err) => res.send({ data: { sent: false, captcha: '', ...err }, message: 'The captcha sent failed, please send again.' }));
      } else {
        res.send({ data: { sent: false, captcha: '' }, message: 'The email has been registered five times.' });
      }
    })
    .catch((err) => res.status(400).send(String(err)));

});

router.post('/register', (req, res) => {  // 用户注册
  if (!req.body.yf_id || !req.body.username || !req.body.password || !req.body.email) return res.status(400).send('Lack of parameter');

  let attributes = [ [Sequelize.fn('COUNT', Sequelize.col('U_UserID')), 'count'], 'createdAt' ],
      where = { U_UserID: req.body.yf_id },
      instance = { U_UserID: req.body.yf_id, U_NickName: req.body.username, U_Password: req.body.password, U_Email: req.body.email, U_HeadPortrait: 'abc' };

  User
    .findOne({ attributes, where })
    .then((user) => {
      if (!user.get('count')) {
        User
          .create(instance)
          .then((user) => res.send({ 
            data: { registed: true, U_ID: user.get('U_ID'), U_UserID: user.get('U_UserID'), createdAt: user.get('createdAt') }, 
            message: `The yf_id '${req.body.yf_id}' registered successfully.` 
          }))
          .catch((err) => res.status(400).send(String(err)));
      } else {
        res.send({ data: { registed: false, user }, message: `The yf_id '${req.body.yf_id}' has been registered.` });
      }
    })
    .catch((err) => res.status(400).send(String(err)));

});

router.get('/info', (req, res) => { // 用户信息
  if (!req.query.userId) return res.status(400).send(`Lack of parameter 'userId'`);

  let attributes = { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] },
      where = { U_ID: req.query.userId };

  User
    .findOne({ attributes, where })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(String(err)));

});

router.put('/info', (req, res) => { // 更新用户信息
  if (!req.body.userId || !req.body.nickname) return res.status(400).send(`Lack of parameter`);

  let where = { U_ID: req.body.userId };

  User
    .update({ U_NickName: req.body.nickname, U_Sex: req.body.sex, U_Birthday: req.body.birthday, U_Address: req.body.address, U_SingaTure: req.body.singature }, { where })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(400).send(String(err)));

});

router.put('/password', (req, res) => { // 更新用户密码
  if (!req.body.userId || !req.body.oldPassword || !req.body.newPassword) return res.status(400).send(`Lack of parameter`);

  let attributes = { exclude: ['U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] },
      where = { U_ID: req.body.userId };

  User
    .findOne({ attributes, where })
    .then((user) => {
      if (user.get('U_Password') === req.body.oldPassword) {
        User
        .update({ U_Password: req.body.newPassword }, { where })
        .then(() => res.send({ success: true, message: `Updated successfully.` }))
      } else {
        res.send({ success: false, message: `Updated failure, oldPassword do not match.` })
      }
    })
    .catch((err) => res.status(400).send(String(err)));

});

router.get('/records', (req, res) => { // 获取历史纪录
  if (!req.query.userId) return res.status(400).send(`Lack of parameter 'userId'`);

  let attributes = [[Sequelize.literal('distinct `M_FromUserID`'), 'fromId'], ['M_ToUserID', 'toId']],
      where = { $or: [ { M_FromUserId: req.query.userId }, { M_ToUserId: req.query.userId } ] };

  Message
    .findAll({ attributes, where })
    .then((userIds) => {
      let userIdList = [];
      
      for (let i in userIds) {
        let fromId = userIds[i].get('fromId'),
            toId = userIds[i].get('toId');

        fromId !== Number(req.query.userId) && userIdList.indexOf(fromId) === -1 && userIdList.push(fromId)
        toId !== Number(req.query.userId) && userIdList.indexOf(toId) === -1 && userIdList.push(toId)
      }

      let attributes = [['UG_ID', 'groupId']],
          where = { UG_Member: { $like: `%[${req.query.userId}]%` } };

      UserGroup
        .findAll({ attributes, where })
        .then((groupIds) => {
          let attributes = [[Sequelize.literal('distinct `UGM_UserGroupID`'), 'groupId']];

          UserGroupMessage
            .findAll({ attributes })
            .then((exitGroupIds) => {
              let groupIdList = [];

              for(let i in groupIds)
                for(let j in exitGroupIds)
                  exitGroupIds[j].get('groupId') === groupIds[i].get('groupId') && groupIdList.push(exitGroupIds[j].get('groupId'))
              
              res.send({ friendId: userIdList, groupId: groupIdList })
            })
        })

    })
    .catch((err) => res.status(400).send(String(err)));

});

router.get('/message', (req, res) => { // 获取历史消息
  if (!req.query.userId) return res.status(400).send(`Lack of parameter 'userId'`);

  if(req.query.friendId) {
    let attributes = [['M_ID', 'friendMessageId'], ['M_Content', 'content'], ['M_Time', 'time']],
        where = { M_FromUserID: req.query.friendId, M_ToUserID: req.query.userId },
        include = [ { model: User, attributes: [['U_ID', 'id'], ['U_NickName', 'name']] } ],
        order = [['M_Time', 'DESC']];

    Message
      .findOne({ attributes, where, include, order })
      .then((message) => res.send(message))
      .catch((err) => res.status(400).send(String(err)));
  }
  
  if(req.query.groupId) {
    let attributes = [['UGM_ID', 'groupMessageId'], ['UGM_Content', 'content'], ['UGM_Time', 'time']],
        where = { UGM_UserGroupID: req.query.groupId },
        include = [ { model: UserGroup, attributes: [['UG_ID', 'id'], ['UG_Name', 'name']] } ],
        order = [['UGM_Time', 'DESC']];

    UserGroupMessage
      .findOne({ attributes, where, include, order })
      .then((message) => res.send(message))
      .catch((err) => res.status(400).send(String(err)));
  }

});

router.get('/search', (req, res) => { // 获取查找到的好友
  if (!req.query.userId || !req.query.serachInfo) return res.status(400).send(`Lack of parameter`);

  let attributes = ['U_ID', 'U_UserID', 'U_NickName'],
      where = { $or: [ { U_UserID: { $like: `%${req.query.serachInfo}%` } }, { U_NickName: { $like: `%${req.query.serachInfo}%` } } ], U_ID: { $ne: req.query.userId } };

  User
    .findAll({ attributes, where })
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(String(err)));
})

module.exports = router;
