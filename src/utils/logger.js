import Vue from 'vue';
import VueLogger from 'vuejs-logger';

// const options = {
//   // optional : defaults to true if not specified
//   isEnabled: true,
//   // required ['debug', 'info', 'warn', 'error', 'fatal']
//   logLevel : 'debug',
//   // optional : defaults to false if not specified
//   stringifyArguments : false,
//   // optional : defaults to false if not specified
//   showLogLevel : false,
//   // optional : defaults to false if not specified
//   showMethodName : false,
//   // optional : defaults to '|' if not specified
//   separator: '|',
//   // optional : defaults to false if not specified
//   showConsoleColors: false
// }
const options = {
  isEnabled: true,
  logLevel: process.env.LOGGER_LEVEL,
  stringifyArguments: false,
  showLogLevel: false,
  showMethodName: false,
  separator: '|',
  showConsoleColors: false
};
Vue.use(VueLogger, options);

const debug = function (title, value) {
  const logEnum = process.env.LOGGER_LEVEL;
  switch (logEnum) {
    case 'debug':
    case 'info':
    case 'warn':
      Vue.$log.warn(title, value);
      break;
  };
};

const error = function (title, value) {
  const logEnum = process.env.LOGGER_LEVEL;
  switch (logEnum) {
    case 'error':
    case 'fatal':
      Vue.$log.fatal(title, value);
      break;
  };
};

export default {
  debug,
  error
};
