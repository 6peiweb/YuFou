const express = require('express');
const router = express.Router();
const { FriendGroup, Friend, User, UserState, UserGroup } = require('../../sequelize');

router.get('/friends', (req, res) => {  // 好友分组
  if (!req.query.userId) return res.status(400).send(`Lack of parameter 'userId'`);

  let attributes = { exclude: ['UserUID'] },
      where = { FG_UserID: req.query.userId };

  FriendGroup
    .findAll({ attributes, where })
    .then((groups) => {
      let promiseList = [];

      for(let i in groups) {
        let attributes = { exclude: ['UserUID', 'FriendGroupFGID'] },
          where = { F_UserID: req.query.userId, F_FriendGroupID: groups[i].get('FG_ID') },
          include = [ 
            { 
              model: User,
              attributes: ['U_ID', 'U_UserID', 'U_NickName', 'U_SingaTure', 'U_Sex', 'U_HeadPortrait', 'U_UserStateID'],
              include: { model: UserState, attributes: { exclude: ['createdAt', 'updatedAt'] } }
            }
          ];
        
        promiseList[i] = Friend.findAndCountAll({ attributes, where, include });
      }

      Promise
        .all(promiseList)
        .then((result) => {
          let latestResult = JSON.parse(JSON.stringify(groups));
          for(let i in latestResult) {
            latestResult[i] = Object.assign(latestResult[i], result[i]);
          }
          res.send(latestResult);
        })
        .catch((err) => res.status(400).send(String(err)));
    })
    .catch((err) => res.status(400).send(String(err)));

})

router.get('/users', (req, res) => {  // 群聊分组
  if (!req.query.userId) return res.status(400).send(`Lack of parameter 'userId'`);

  let attributes = { exclude: ['UserUID'] },
      where = { UG_AdminID: req.query.userId },
      promiseList = [];
    
    promiseList[0] = UserGroup.findAndCountAll({ attributes, where });
  
    where = { UG_AdminID: { $not: req.query.userId }, UG_Member: { $like: `%[${req.query.userId}]%` } };

    promiseList[1] = UserGroup.findAndCountAll({ attributes, where });

  Promise
    .all(promiseList)
    .then((result) => {
      let latestResult = JSON.parse(JSON.stringify(result));
      latestResult[0].Group_Name = '我创建的群聊';
      latestResult[1].Group_Name = '我加入的群聊';
      res.send(latestResult);
    })
    .catch((err) => res.status(400).send(String(err)));

})

module.exports = router;
