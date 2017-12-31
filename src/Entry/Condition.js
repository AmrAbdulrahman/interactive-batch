const { isBoolean, isFunction } = require('lodash');

module.exports = class Condition {
  constructor(condition) {
    this.condition = condition;
  }

  value() {
    if (isBoolean(this.condition) === true) {
      return this.condition;
    }

    if (isFunction(this.condition) === true) {
      return this.condition();
    }

    throw new Error(`Valid condition types are 'boolean' and 'function'`);
  }
};
