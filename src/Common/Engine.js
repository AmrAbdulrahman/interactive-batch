const { isFunction, isArray, isString, isUndefined } = require('lodash');
const TextCommand = require('../Commands/TextCommand');
const FunctionCommand = require('../Commands/FunctionCommand');
const Defer = require('./Defer');
const Logger = require('./Logger');
const isPromise = require('../Utils/isPromise');
const isExecutable = require('../Utils/isExecutable');

module.exports = class Engine {
  static exec(something) {
    const defer = new Defer();
    let promise = null;

    if (isString(something) === true) {
      promise = this.execTextCommand(something);

    } else if (isFunction(something) === true) {
      promise = this.execFunctionCommand(something);

    // FunctionCommand, TextCommand, CommandEntry, QuestionEntry
    } else if (isExecutable(something) === true) {
      promise = this.execExecutableObject(something);

    } else if (isArray(something) === true) {
      promise = this.execArray(something);

    } else if (isPromise(something) === true) {
      promise = something;

    } else {
      promise = Promise.resolve(something);
    }

    promise
      .then(defer.resolve)
      .catch(defer.reject);

    return defer.promise;
  }

  static execArray(array) {
    const defer = new Defer();

    var roll = (index = 0) => {
      if (index >= array.length) {
        return defer.resolve();
      }

      const something = array[index];

      this.exec(something)
        .then(() => roll(index + 1))
        .catch(defer.reject);
    };

    // start rolling over items
    roll(0);

    return defer.promise;
  }

  static execTextCommand(command) {
    const textCommand = new TextCommand(command);

    this.logExecutionMessage(`Executing command ${textCommand.toString()}`);

    return textCommand.exec();
  }

  static execFunctionCommand(func) {
    const functionCommand = new FunctionCommand(func);
    const defer = new Defer();
    let hasSubCommands = false;

    this.logExecutionMessage(`Executing function ${functionCommand.toString()}`);

    // process function return values recursively if any
    functionCommand
      .exec()
      .then(value => {
        if (value) {
          hasSubCommands = true;
          Logger.addLevel();
          return this.exec(value);
        }
      })
      .then(() => hasSubCommands ? Logger.removeLevel() : null)
      .then(defer.resolve)
      .catch(defer.reject);

    return defer.promise;
  }

  static execExecutableObject(obj) {
    const defer = new Defer();
    let hasSubCommands = false;

    this.logExecutionMessage(`Executing ${obj.toString()}`);

    // process command and then its return value if any
    obj
      .exec()
      .then(value => {
        if (value) {
          hasSubCommands = true;
          Logger.addLevel();
          return this.exec(value);
        }
      })
      .then(() => hasSubCommands ? Logger.removeLevel() : null)
      .then(defer.resolve)
      .catch(defer.reject);

    return defer.promise;
  }

  static logExecutionMessage(message) {
    Logger.separator();
    Logger.log(`> ${message}`.magenta());
  }
};
