const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./modules/user');
const classify = require('./modules/classify');
const friend = require('./modules/friend');
const group = require('./modules/group');

app.use(express.static('static'));
app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded
app.use('/api/user', user);
app.use('/api/classify', classify);
app.use('/api/friend', friend);
app.use('/api/group', group);

module.exports = app;
