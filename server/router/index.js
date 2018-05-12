const express = require('express');
const app = express();
const user = require('./modules/user');
const group = require('./modules/group');
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded
app.use('/api/user', user);
app.use('/api/group', group);

module.exports = app;
