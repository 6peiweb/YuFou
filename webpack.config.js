const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?timeout=2000&reload=true';

const config = {
  entry: {
    main: ['./src/main.js', hotMiddlewareScript],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:8].js',
    publicPath: '/'
  },
  mode: 'development', // production || development 当前运行环境
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
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
          'sass-loadeer'
        ]
      },
      { 
        test: /\.ts$/,
        use: 'ts-loader'
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
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   compress: true,
  //   port: 3000,
  //   hot: true
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      LOCAL_ROOT: JSON.stringify("http://ziksang.com")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: './static/icon.png',
      template: './index.html',
      hash: true,
      cache: true
    }),
    new CleanWebpackPlugin(['dist']),
    new UglifyJsWebpackPlugin()
  ],
  cache: true
};

module.exports = config;