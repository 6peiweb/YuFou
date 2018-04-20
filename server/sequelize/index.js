const Sequelize = require('sequelize');
const DBConfig = require('./config');
const sequelize = new Sequelize('kings', 'root', 'lp19970127', DBConfig);

const User = require('./module/login_users')(sequelize);

// User
//   .create({username: 'Liu ya123g', password: '女', mobilephone: '17609781231'})
//   .then((user) => {
//     console.log(user);
//     // console.log(user.get('password'));
//     // console.log(user.get('mobilephone'));
//   })
//   .catch((err) => console.log(err));


module.exports = { User };