const ejs = require('ejs');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const reload = require('reload');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const router = require('./router/router');
const webpackDevConfig = require('../build/webpack.dev.conf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const server = http.createServer(app);
const compiler = webpack(webpackDevConfig);

reload(app);

app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded()); // 解析 application/x-www-form-urlencoded
app.use(router);
// app.engine('html', ejs.__express);
// app.set('views', path.resolve(__dirname, '../dist'));
// app.set('view engine', 'html');

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  stats: { colors: true },
  watchOptions: {
    poll: true
  }
}));

app.use(webpackHotMiddleware(compiler));

server.listen(4000, () => {
  console.log(`Your application is running here: ` + chalk.blue('http://0.0.0.0:4000'));
});