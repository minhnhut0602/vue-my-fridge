var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AMP_API_SERVER_HOST: JSON.stringify(process.env.AMP_API_SERVER_HOST)
});
