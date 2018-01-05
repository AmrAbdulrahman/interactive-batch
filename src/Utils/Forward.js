const path = require('path');
const fs = require('fs');

module.exports = (exclude = []) => {
  const { base, index } = (() => {
    try {
      throw new Error('Just to get caller file path');
    } catch (ex) {
      try {
        const callerRowIndex = 3;
        const callerLine = ex.stack.split('\n')[callerRowIndex];

        // get the (path:row:col) out of the stack line
        let callerPath = callerLine.match(/\([\/\-\.\:\w\s\\\*]*\)/ig)[0];

        // remove surrounding braces
        callerPath = callerPath.replace(/[\(\)]*/ig, '');

        // remove :row:col suffix
        callerPath = callerPath.replace(/:[\d]+:[\d]+/ig, '');

        // remove file name
        const lastSlashIndex = callerPath.lastIndexOf('/');

        return {
          base: callerPath.substr(0, lastSlashIndex),
          index: callerPath.substr(lastSlashIndex + 1).replace('.js', ''),
        };
      } catch (ex) {
        throw new Error(`Can't parse basePath`);
      }
    }
  })();

  return fs
    .readdirSync(base)
    .map(file => file.replace('.js', ''))
    .filter(file => file !== index && exclude.indexOf(file) === -1)
    .reduce((result, file) => {
      result[file] = require(path.join(base, file));
      return result;
    }, {});
};
