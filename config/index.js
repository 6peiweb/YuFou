const path = require('path');
const devEnv = require('./dev.env');
const prodEnv = require('./prod.env');

module.exports = {
  hotMiddlewareScript: 'webpack-hot-middleware/client?timeout=2000&reload=true',
  dev: {
    env: devEnv
  },
  prod: {
    env: prodEnv
  }
}