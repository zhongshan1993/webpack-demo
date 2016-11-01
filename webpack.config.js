var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),

  ROOT_PATH = path.resolve(__dirname),
  APP_PATH = path.resolve(ROOT_PATH, 'app'),
  BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World App'
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
  devServer: {
    historyApiFallBack: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000',
        secure: false
      }
    }
  },
  devtool: 'eval-source-map',
  jshint: {
    'esnext': true
  }
};
