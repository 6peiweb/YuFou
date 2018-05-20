const express = require('express');
const router = express.Router();
const { UserGroup, User, UserState, UserGroupMessage } = require('../../sequelize');

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
  if (!req.query.memberId || !req.query.groupId) return res.status(400).send(`Lack of parameter`);
  
  let attributes = { exclude: ['UserUID'] },
      where = { UG_ID: req.query.groupId };

  UserGroup
    .findOne({ attributes, where })
    .then((group) => {
      let UG_Member = deleteMember(group.get('UG_Member'), req.query.memberId),
          UG_AdminID = UG_Member.match(/\[(.*?)\]/)[1];
      
      UserGroup
        .update({ UG_Member, UG_AdminID }, { where })
        .then((response) => res.send(response))

    })
    .catch((err) => res.status(400).send(String(err)));
  
});

router.get('/messages', (req, res) => {
  if (!req.query.groupId) return res.status(400).send(`Lack of parameter 'groupId'`);
  
  let attributes = { exclude: ['UserUID', 'MessageTypeMTID'] },
      where = { UGM_UserGroupID: req.query.groupId },
      include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

  UserGroupMessage
    .findAndCountAll({ attributes, where, include })
    .then((messages) => res.send(messages))
    .catch((err) => res.status(400).send(String(err)));
  
});

router.post('/message', (req, res) => {
  if (!req.body.userId || !req.body.groupId || !req.body.message) return res.status(400).send(`Lack of parameter`);

  UserGroupMessage
    .create({ UGM_FromUserID: req.body.userId, UGM_UserGroupID: req.body.groupId, UGM_Time: new Date(), UGM_Content: req.body.message, UGM_MessageTypeID: 1 })
    .then((message) => {
      let attributes = { exclude: ['UserUID', 'MessageTypeMTID'] },
          where = { UGM_ID: message.get('UGM_ID') },
          include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

      UserGroupMessage
        .findOne({ attributes, where, include })
        .then((messages) => res.send(messages))
    })
    .catch((err) => res.status(400).send(String(err)));
      
});

router.get('/message', (req, res) => {
  if (!req.query.UGM_ID ) return res.status(400).send(`Lack of parameter 'UGM_ID'`);

  let attributes = { exclude: ['UserUID', 'MessageTypeMTID'] },
      where = { UGM_ID: req.query.UGM_ID },
      include = [ { model: User, attributes: { exclude: ['U_Password', 'U_FriendPolicyAnswer', 'U_FriendPolicyPassword', 'UserStateUSID', 'UserFriendPolicyUFPID'] } } ];

  UserGroupMessage
    .findOne({ attributes, where, include })
    .then((message) => res.send(message))
    .catch((err) => res.status(400).send(String(err)));
      
});

function deleteMember(str, id) {
  let memberList = str.split(','),
      newMemberList = [];

  for (let i in memberList) {
    memberList[i] !== `[${id}]` && newMemberList.push(memberList[i])
  }

  return newMemberList.join(',');
}

module.exports = router;
