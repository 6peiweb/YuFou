const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.prod.env.NODE_ENV);
}

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config');

module.exports = webpackMerge(webpackCommonConfig, {

});
