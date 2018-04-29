const express = require('express');
const router = express.Router();
const { User, User_State, User_Group, User_FriendPolicy, User_GroupMessage, Friend, Friend_Group, Message, Message_Type } = require('../sequelize');

router.get('/api/user/:keyword/:pageNum', (req, res) => {
  let where =  { U_Email: req.params.keyword },
      limit = 4,
      offset = (req.params.pageNum - 1) * limit;
  User
  .findAndCountAll({ where, offset, limit })
  .then((user) => {
    res.send(user);
  })
  .catch((err) => res.status(400).send(String(err)));

});

module.exports = router;