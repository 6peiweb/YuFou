const os = require('os');
// const ejs = require('ejs');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const reload = require('reload');
const webpack = require('webpack');
const app = require('./router')
const webpackDevConfig = require('../build/webpack.dev.conf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const server = http.createServer(app);
const compiler = webpack(webpackDevConfig);
const ip = (os.networkInterfaces().en0 || os.networkInterfaces().WLAN)[1].address;
const port = 4000;

reload(app);

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

server.listen(port, () => {
  console.log(`Your application is running here: ` + chalk.blue(`http://${ip}:${port}`));
});
