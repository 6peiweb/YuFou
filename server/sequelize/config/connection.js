const Sequelize = require('sequelize');

const DBConfig = {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    max: 20,
    idle: 20000
  }
};

const sequelize = new Sequelize('WuChat', 'root', 'lp19970127', DBConfig);

module.exports = sequelize;