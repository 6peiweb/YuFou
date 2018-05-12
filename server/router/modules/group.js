const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User } = require('../../sequelize');

router.get('/friends', (req, res) => {
  res.send('12321');
})

module.exports = router;