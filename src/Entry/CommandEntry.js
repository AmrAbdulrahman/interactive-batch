const { isArray, isFunction, isString } = require('lodash');
const Logger = require('../Common/Logger');
const Condition = require('./Condition');

module.exports = class CommandEntry {
  constructor({condition, command, title, onTrue, onFalse}) {
    this.condition = condition ? new Condition(condition) : null;
    this.command = command;
    this.title = title;
    this.onTrue = onTrue;
    this.onFalse = onFalse;
  }

  exec() {
    let result = [];

    if (this.title) {
      Logger.title(`${this.title}`);
    }

    if (this.condition) {
      const conditionValue = this.condition.value();

      if (!!conditionValue === true) {
        Logger.info(`condition passes [value = ${conditionValue}]`);
      } else {
        Logger.info(`condition fails [value = ${conditionValue}]`);
      }
    }

    if (!this.condition || !!this.condition.value() === true) {
      if (this.command) {
        result.push(this.command);
      }

      if (this.onTrue) {
        result.push(this.onTrue);
      }

    // onFalse
    } else if (this.onFalse && this.condition && !!this.condition.value() === false) {
      result.push(this.onFalse);
    }

    return Promise.resolve(result);
  }

  toString() {
    if (isArray(this.command) === true) {
      return 'list';
    }

    if (isFunction(this.command) === true) {
      return 'function';
    }

    if (isString(this.command) === true) {
      return this.command;
    }

    if (this.condition) {
      return 'conditional command';
    }

    return 'command';
  }
};
