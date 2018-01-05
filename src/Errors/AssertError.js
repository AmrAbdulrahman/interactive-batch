const BaseError = require('./BaseError');

module.exports = class AssertError extends BaseError {
  constructor(message) {
    super(message);

    this.name = `IBError.AssertError`;
  }

  toString() {
    return `${this.stack}`;
  }
};
