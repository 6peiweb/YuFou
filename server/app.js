const ejs = require('ejs');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const reload = require('reload');
const express = require('express');
const webpack = require('webpack');
const router = require('./router/router');
const webpackDevConfig = require('../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const server = http.createServer(app);
const compiler = webpack(webpackDevConfig);

reload(app);

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

server.listen(3000, () => {
  console.log(`Your application is running here: ` + chalk.blue('http://localhost:3000'));
});