const { repeat } = require('lodash');

class Logger {
  static init() {
    this.levelChar = ' ';
    this.level = 0;
    this.levelSize = 4;
    this.maxLineLength = 80;
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

    if (process.env.TEST) { // don't log anything while in test mode
      return;
    }

    console.log.apply(console.log, args);
  }

  static info() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.cyan());

    this.log(args);
    //console.log.apply(console.log, args);
  }

  static error() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.red().bold());

    this.log(args);
    //console.log.apply(console.log, args);
  }

  static warn() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.yellow());

    this.log(args);
    //console.log.apply(console.log, args);
  }

  static success() {
    const args = this
      .makeArgs(arguments)
      .map(arg => `${arg}`.green());

    this.log(args);
    //console.log.apply(console.log, args);
  }

  static title(txt) {
    this.log(txt.magenta().bold());
  }

  static separator() {
    const separatorLine = repeat('.', this.maxLineLength - this.spacing());
    this.log(`\n${separatorLine}`.magenta());
  }

  static addLevel() {
    this.level ++;
  }

  static removeLevel() {
    this.level --;
  }

  static spacing() {
    return this.level * this.levelSize;
  }

  static levelSpacing() {
    return repeat(this.levelChar, this.spacing());
  }
}

Logger.init();

module.exports = Logger;
