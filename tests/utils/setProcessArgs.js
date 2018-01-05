module.exports = (argsStr = '') => {
  const argsArr = argsStr.split(' ');
  process.argv = [process.execPath, ...argsArr];
};
