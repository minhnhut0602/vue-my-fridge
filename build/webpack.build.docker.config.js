const webpack = require('webpack');
const merge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const baseWebpackConfig = require('./webpack.base.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require(`path`);
const buildConfig = require('../config');
const utils = require('./utils');
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const UglifyJsPlugin = require(`uglifyjs-webpack-plugin`);

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const env = process.env.NODE_ENV;
const sourceMap = env === `development`;

const config = merge(baseWebpackConfig, {
  mode: env,
  output: {
    path: buildConfig.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  // cheap-module-eval-source-map is faster for development
  devtool: sourceMap ? `cheap-module-eval-source-map` : undefined,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/docker.env')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve(`dist/index.html`),
      template: resolve(`static/index.html`),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: buildConfig.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
});

config.optimization.minimizer = [
  new UglifyJsPlugin({
    cache: true,
    parallel: true
  }),
  new OptimizeCSSAssetsPlugin()
];

config.plugins.push(new MiniCssExtractPlugin({
  filename: utils.assetsPath('css/[name].[chunkhash].css'),
  chunkFilename: utils.assetsPath('css/[id].[chunkhash].css')
}));

const sassLoader = config.module.rules.find(({ test }) => test.test('.scss'));
// Replace the `vue-style-loader` with
// the MiniCssExtractPlugin loader.
sassLoader.use[0] = MiniCssExtractPlugin.loader;

module.exports = config;
