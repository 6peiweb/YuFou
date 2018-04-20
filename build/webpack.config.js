const path = require('path');
const config = require('../config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    App: ['./src/App.ts', config.hotMiddlewareScript],
  },
  output: {
    path: path.resolve(__dirname, '../.dist'),
    filename: '[name]-[hash:8].js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // production || development 当前运行环境
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      { 
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', 'tsx', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: './static/icon.png',
      template: './index.html',
      hash: true,
      cache: true
    }),
    new CleanWebpackPlugin(['.dist'], {
      root: path.resolve(__dirname, '..'),
      verbose: true
    }),
    new UglifyJsWebpackPlugin()
  ],
  cache: true
};
