const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
  res.status(200).json({ message: "成功" });
});

router.get('/admin', (req, res, next) => {
  res.status(200).json({ id: 0, name: "admin" });
});

module.exports = router;