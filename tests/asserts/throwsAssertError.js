const throwsError = require('./throwsError');

module.exports = (fn) => {
  throwsError(fn, {
    name: 'IBError.AssertError',
  });
};
