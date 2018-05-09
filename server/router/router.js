const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const email = require('../tools/email');
const { User, UserState, UserGroup, UserFriendPolicy, UserGroupMessage, Friend, FriendGroup, Message, MessageType } = require('../sequelize');

router.get('/api/user/:keyword/:pageNum', (req, res) => {
  let attributes = ['U_ID', 'U_UserID', 'U_NickName', 'U_UserStateID', 'U_FriendPolicyID'],
      where =  { U_Email: req.params.keyword },
      limit = 4,
      offset = (req.params.pageNum - 1) * limit,
      include = [
        { model: UserState, attributes: ['US_ID', 'US_Name'] }, 
        { model: UserFriendPolicy, attributes: ['UFP_ID', 'UFP_Type'] }
      ];

  User
    .findAndCountAll({ attributes, where, offset, limit, include })
    .then((user) => res.send(Object.assign(user, { pageNum: Number(req.params.pageNum), pageSize: limit })))
    .catch((err) => res.status(400).send(String(err)));

});

router.get('/api/user/login', (req, res) => {
  let attributes = ['U_Password'],
      where = { U_UserID: req.query.username };

  User
    .findOne({ attributes, where })
    .then((user) => {
      if (!user) return res.send({ data: false, message: 'Not found user.' });
      if (user['U_Password'] !== req.query.password) return res.send({ data: false, message: 'Login failure,password is not correct.' });
      return res.send({ data: true, message: 'ok' });
    })
    .catch((err) => res.status(400).send(String(err)));

});

router.post('/api/user/email', (req, res) => {
  if (!req.body.email) return res.status(400).send('Lack of parameter "email"');
  let attributes = [ [Sequelize.fn('COUNT', Sequelize.col('U_UserID')), 'count'] ]
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
        res.send({ data: { sent: false, captcha: '' }, message: 'The email has been registered five times.' })
      }
    })
    .catch((err) => res.statys(400).send(String(err)));

});

module.exports = router;