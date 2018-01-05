const setProcessArgs = require('./setProcessArgs');

module.exports = (argsStr) => {
  process.env.TEST = true;
  setProcessArgs(argsStr);

  return require('../../')();
};
