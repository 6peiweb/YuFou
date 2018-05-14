const express = require('express')
const router = express.Router()
const { Friend, User } = require('../../sequelize')

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

module.exports = router;
