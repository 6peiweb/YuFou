const sequelize = require('../sequelize');
const express = require('express');
const router = express.Router();

router.post('/api/user/register', (req, res, next) => {
  let { username, password, mobilephone } = req.body;
  if(!username || !password || !mobilephone) return res.sendStatus(400); // 注册验证必须有用户名、密码、手机号

  let limit = { where: { username } };
  sequelize.User
  .findOne(limit)
  .then((exitUser) => {
    !exitUser && sequelize.User
      .create({ username, password, mobilephone })
      .then(() => res.send({ msg: `用户[${username}]注册成功！` }))
      .catch((err) => res.status(400).send(String(err)));
    exitUser && res.send({ msg: `用户名[${username}]已存在，请更换用户名！` });
  })
  .catch((err) => res.status(400).send(String(err)));

});

router.get('/admin', (req, res, next) => {
  res.status(200).json({ id: 0, name: "admin" });
});

module.exports = router;