const { get, set } = require('lodash');
const Logger = require('./Logger');

module.exports = class Args {
  static get(key) {
    return get(this, key, '');
  }

  static set(key, value = '') {
    Logger.info(`Setting ${key} = ${value}`);
    return set(this, key, value);
  }

  static isYes(key) {
    const keyValue = this.get(key);
    return !!keyValue.match(/^y(es)?$/i);
  }

  static isNo(key) {
    const keyValue = this.get(key);
    return !!keyValue.match(/^n(o)?$/i);
  }
};
