const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./modules/user');
const group = require('./modules/group');
const friend = require('./modules/friend');

app.use(express.static('static'));
app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded
app.use('/api/user', user);
app.use('/api/group', group);
app.use('/api/friend', friend);

module.exports = app;
