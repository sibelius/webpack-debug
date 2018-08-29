const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const HappyPack = require('happypack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const webpackServeWaitpage = require('webpack-serve-waitpage');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const HOST = process.env.HOST || 'entria.feedback.local';
const PORT = process.env.PORT || '5000';

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, './'),
  entry: ['./src/index.js'],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: false,
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: 'happypack/loader?id=js',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf|csv)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=styles',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: false,
    port: PORT,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    watchOptions: {
      aggregateTimeout: 800,
      ignored: ['data', 'node_modules'],
    },
    stats: {
      // reasons: true,
      source: true,
      timings: true,
      warnings: true,
    },
    hotOnly: true,
  },
  plugins: [
    new dotEnv({
      path: './.env',
    }),
    // new HardSourceWebpackPlugin({
    //   cacheDirectory: path.join(__dirname, 'hard-source-cache/dev/[confighash]'),
    // }),
    new HappyPack({
      id: 'js',
      threads: 4,
      // https://github.com/babel/babel-loader#options
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new HappyPack({
      id: 'styles',
      threads: 2,
      loaders: ['style-loader', 'css-loader'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'none',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
