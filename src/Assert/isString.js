const { isString } = require('lodash');
const AssertError = require('../Errors/AssertError');

module.exports = (something, message = `(${something}) must be a string`) => {
  if (isString(something) === false) {
    throw new AssertError(message);
  }
};
