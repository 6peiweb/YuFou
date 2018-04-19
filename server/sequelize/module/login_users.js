const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('login_users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobilephone: {
    type: Sequelize.STRING(11),
    allowNull: false
  }
});