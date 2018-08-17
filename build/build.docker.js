require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.build.docker.config')
var envFile = require('../config/docker.env')

var buildString = `Building app with Docker profile:
\tAMP_API_SERVER_HOST=${envFile.AMP_API_SERVER_HOST}
\tNODE_ENV=${envFile.NODE_ENV}
\tREFRESH_TOKEN_TIMER=${envFile.REFRESH_TOKEN_TIMER}
\tLOGGER_LEVEL=${envFile.LOGGER_LEVEL}

`;
console.log(buildString);
var spinner = ora('Building app...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory + '/index.html'), err => {
      if (err) throw err;
    })
  })
})
