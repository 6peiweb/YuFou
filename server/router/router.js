const express = require('express');
const router = express.Router();
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

module.exports = router;