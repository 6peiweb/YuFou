const express = require('express');
const router = express.Router();
const { UserGroup, User, UserState } = require('../../sequelize');

router.get('/info', (req, res) => {
  if (!req.query.groupId) return res.status(400).send(`Lack of parameter 'groupId'`);

  let attributes = { exclude: ['UserUID'] },
      where = { UG_ID: req.query.groupId };

  UserGroup
    .findOne({ attributes, where })
    .then((group) => res.send(group))
    .catch((err) => res.status(400).send(String(err)));

});

router.put('/info', (req, res) => {
  if (!req.body.groupId || !req.body.groupName || !req.body.intro || !req.body.notice) return res.status(400).send(`Lack of parameter`);
  
  let where = { UG_ID: req.body.groupId };

  UserGroup
    .update({ UG_Name: req.body.groupName, UG_Intro: req.body.intro, UG_Notice: req.body.notice }, { where })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(String(err)));
  
});

router.get('/member', (req, res) => {
  if (!req.query.memberId) return res.status(400).send(`Lack of parameter 'memberId'`);
  
  let attributes = { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] },
    where = { U_ID: req.query.memberId };

  User
    .findOne({ attributes, where })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(String(err)));
  
});

router.delete('/member', (req, res) => {
    if (!req.query.memberId) return res.status(400).send(`Lack of parameter 'memberId'`);
    
    let attributes = { exclude: ['UserUID'] },
        where = { UG_Member: { $like: `%[${req.query.userId}]%` } };
  
    UserGroup
      .findOne({ attributes, where })
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(String(err)));
    
  });

module.exports = router;
