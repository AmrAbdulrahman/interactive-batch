const { isArray } = require('lodash');
const isString = require('./isString');
const AssertError = require('../Errors/AssertError');

module.exports = (something, message) => {
  isString(message);

  if (isArray(something) === false) {
    throw new AssertError(message);
  }
};
