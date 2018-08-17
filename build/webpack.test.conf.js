'use strict';
// This is the webpack config used for unit tests.

const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const baseWebpackConfig = require('./webpack.base.config');

const env = process.env.NODE_ENV;
const sourceMap = env === `development`;

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          `vue-style-loader`,
          {
            loader: `css-loader`,
            options: {
              sourceMap
            }
          },
          {
            loader: `sass-loader`,
            options: {
              importer: nodeSassMagicImporter(),
              sourceMap
            }
          }
        ]
      }
    ]
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
