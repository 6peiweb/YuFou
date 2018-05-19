const express = require('express');
const router = express.Router();
const { Friend, User, Message, MessageType } = require('../../sequelize');

router.get('/info', (req, res) => {
  if (!req.query.userId || !req.query.friendId) return res.status(400).send(`Lack of parameter`);
  
  let attributes = { exclude: ['UserUID', 'FriendGroupFGID'] },
      where = { F_UserID: req.query.userId, F_FriendID: req.query.friendId },
      include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

  Friend
    .findOne({ attributes, where, include })
    .then((friend) => {
      if (!friend) {
        let attributes = { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] },
            where = { U_ID:  req.query.friendId };

        return User
          .findOne({ attributes, where })
          .then((user) => (user = JSON.parse(JSON.stringify(user))) && (user.isFriend = false) || res.send(user));
      }

      (friend = JSON.parse(JSON.stringify(friend))) && (friend.isFriend = true) && res.send(friend);
    })
    .catch((err) => res.status(400).send(String(err)));
  
});

router.get('/messages', (req, res) => {
  if (!req.query.userId || !req.query.friendId) return res.status(400).send(`Lack of parameter`);
  
  let attributes = { exclude: ['UserUID', 'MessageTypeMTID'] },
      where = { M_FromUserID: [req.query.userId, req.query.friendId], M_ToUserID: [req.query.userId, req.query.friendId] },
      include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

  Message
    .findAndCountAll({ attributes, where, include })
    .then((messages) => res.send(messages))
    .catch((err) => res.status(400).send(String(err)));
  
});

router.post('/message', (req, res) => {
  if (!req.body.userId || !req.body.friendId || !req.body.message) return res.status(400).send(`Lack of parameter`);

  Message
    .create({ M_FromUserID: req.body.userId, M_ToUserID: req.body.friendId, M_Time: new Date(), M_Content: req.body.message, M_MessageTypeID: 1 })
    .then((message) => {
      let attributes = { exclude: ['UserUID', 'MessageTypeMTID'] },
          where = { M_ID: message.get('M_ID') },
          include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

      Message
        .findOne({ attributes, where, include })
        .then((messages) => res.send(messages))
    })
    .catch((err) => res.status(400).send(String(err)));
      
});

router.get('/message', (req, res) => {
  if (!req.query.M_ID ) return res.status(400).send(`Lack of parameter 'M_ID'`);

  let attributes = { exclude: ['UserUID', 'MessageTypeMTID'] },
      where = { M_ID: req.query.M_ID },
      include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

  Message
    .findOne({ attributes, where, include })
    .then((message) => res.send(message))
    .catch((err) => res.status(400).send(String(err)));
      
});

module.exports = router;
