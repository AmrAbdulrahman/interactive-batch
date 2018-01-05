const shouldNotBeReached = require('./shouldNotBeReached');

module.exports = (fn, {name, match}) => {
  let exception = null;

  try {
    fn();
  } catch (ex) {
    exception = ex;
  }

  if (exception) {
    if (name) {
      exception.name.should.equal(name);
    }

    if (match) {
      match.forEach(term => exception.message.should.contain(term));
    }

    return true;
  }

  shouldNotBeReached('no exception has been thrown');
};
