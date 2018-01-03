const execSync = require('child_process').execSync;

module.exports = class GitHelper {
  static getCurrentBranch() {
    return execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .replace('\n', '');
  }

  static getAllBranches() {
    return execSync('git branch')
      .toString()
      .split('\n')
      .map(branch => branch.replace(/[\s\*]/g, ''))
      .filter(branch => branch.length);
  }
};
