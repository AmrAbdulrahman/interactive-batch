const fs = require('fs');
const AssertError = require('../Errors/AssertError');
const isString = require('./isString');

module.exports = (path, message) => {
  isString(message);

  if (fs.existsSync(path) === false) {
    throw new AssertError(message);
  }
};
