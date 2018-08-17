var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REFRESH_TOKEN_TIMER: 900000,
  AMP_API_SERVER_HOST: '"https://amp.dev.adurolife.com"',
  LOGGER_LEVEL: '"debug"'
});
