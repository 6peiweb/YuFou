const path = require('path');
const config = require('../config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    env: [process.env.NODE_ENV === 'development' ? './src/config/dev/index.ts' : './src/config/prod/index.ts'],
    app: ['./src/App.ts', config.hotMiddlewareScript],
  },
  output: {
    path: path.resolve(__dirname, '../.dist'),
    filename: '[name]-[hash:8].js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production', // production || development 当前运行环境
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
          appendTsSuffixTo: [/\.vue$/]
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
      cache: true,
      inject: true,
      chunksSortMode: (a, b) => {
        const orders = ['env', 'app']; // 对chunk在index.html中的排列顺序
        return orders.indexOf(a.names[0]) - orders.indexOf(b.names[0]);
      }
    }),
    new CleanWebpackPlugin(['.dist'], {
      root: path.resolve(__dirname, '..'),
      verbose: true
    }),
    new UglifyJsWebpackPlugin()
  ],
  cache: true
};
