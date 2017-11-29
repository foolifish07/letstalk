let log = require('loglevel');

if (process.env.NODE_ENV === 'test') {
  log.setLevel(3);
} else {
  log.setLevel(2);
}

module.exports = log;
