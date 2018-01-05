const { isFunction } = require('lodash');
const isString = require('./isString');
const AssertError = require('../Errors/AssertError');

module.exports = (something, message) => {
  isString(message);

  if (isFunction(something) === false) {
    throw new AssertError(message);
  }
};
