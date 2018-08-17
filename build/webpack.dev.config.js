const webpack = require('webpack');
const merge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require(`path`);

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const env = process.env.NODE_ENV;
// const sourceMap = env === `development`;

const config = merge(baseWebpackConfig, {
  mode: env,
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve(`dist/index.html`),
      template: resolve(`static/index.html`),
      inject: true,
      minify: false
    })
  ]
});
module.exports = config;
