const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const email = require('../../tools/email');
const { User } = require('../../sequelize');

router.get('/login', (req, res) => {
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

router.post('/email', (req, res) => {
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

router.post('/register', (req, res) => {
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

router.get('/info', (req, res) => {
  if (!req.query.userId) return res.status(400).send(`Lack of parameter 'userId'`);

  let attributes = { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] },
      where = { U_ID: req.query.userId };

  User
    .findOne({ attributes, where })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(String(err)));

});

module.exports = router;