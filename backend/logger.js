let log4js = require('log4js');

let level = null;
if (process.env.NODE_ENV === 'test') {
  level = 'error';
} else {
  level = 'info';
}

log4js.configure({
  appenders: {
    'out': { type: 'stdout' },
    'app': {
      type: 'file',
      filename: 'log/letstalk.log',
      maxLogSize: 10 * 1024 * 1024, // in bytes
      backups: 3,
      compress: true
    }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: level }
  }
});

module.exports = log4js;
