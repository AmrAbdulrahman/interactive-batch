const { isFunction } = require('lodash');

module.exports = (obj) => {
  return obj && isFunction(obj.exec);
};
