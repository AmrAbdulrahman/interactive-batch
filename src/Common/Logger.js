const { repeat } = require('lodash');

class Logger {
  static init() {
    this.levelChar = ' ';
    this.level = 0;
    this.levelSize = 4;
  }

  static makeArg(arg) {
    arg = arg + '';

    return arg
      .split('\n')
      .map(line => `${this.levelSpacing()}${line}`)
      .join('\n');
  }

  static makeArgs(args) {
    return [...args].map(arg => this.makeArg(arg));
  }

  static makeLogMessage(message) {
    return this.makeArg(message);
  }

  static log() {
    const args = this.makeArgs(arguments);

    console.log.apply(console.log, args);
  }

  static info() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.cyan());

    console.log.apply(console.log, args);
  }

  static error() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.red().bold());

    console.log.apply(console.log, args);
  }

  static warn() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.yellow());

    console.log.apply(console.log, args);
  }

  static success() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.green());

    console.log.apply(console.log, args);
  }

  static title(txt) {
    this.log(txt.magenta().bold());
  }

  static addLevel() {
    this.level += this.levelSize;
  }

  static removeLevel() {
    this.level -= this.levelSize;
  }

  static levelSpacing() {
    return repeat(this.levelChar, this.level);
  }
}

Logger.init();

module.exports = Logger;
