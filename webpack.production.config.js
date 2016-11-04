var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),

  ROOT_PATH = path.resolve(__dirname),
  APP_PATH = path.resolve(ROOT_PATH, 'app'),
  BUILD_PATH = path.resolve(ROOT_PATH, 'build'),
  TEM_PATH = path.resolve(ROOT_PATH, 'templates'); // template文件夹路径

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    mobile: path.resolve(APP_PATH, 'mobile.js'),
    vendors: ['jquery', 'moment']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      title: 'Hello World App',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Hello Mobile App',
      template: path.resolve(TEM_PATH, 'mobile.html'),
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      }
    ],
    preLoaders: [
      {
        test: '\.jsx?$',
        include: APP_PATH,
        loader: 'jshint-loader'
      }
    ]
  },
  devtool: 'eval-source-map',
  jshint: {
    'esnext': true
  }
};
