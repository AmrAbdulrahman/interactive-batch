const execSync = require('child_process').execSync;
const Args = require('../Common/Args');
const Logger = require('../Common/Logger');
const argv = require('../Common/argv');

module.exports = class TextCommand {
  constructor(command) {
    this.command = command;
  }

  exec() {
    const cmd = this.interpolatedCommand();

    if (argv.dry || argv.d) {
      Logger.warn(`[DRY]: ${cmd}`);
    } else {
      execSync(cmd, {stdio: 'inherit'});
    }

    return Promise.resolve();
  }

  interpolatedCommand() {
    let cmd = this.command;
    const argsBindings = cmd.match(/{{[a-z\-\s]*}}/ig) || [];

    argsBindings.forEach(arg => {
      const argKey = arg.replace(/[{}]/g, '');
      const argValue = Args.get(argKey) || 'NOT_SET';

      cmd = cmd.replace(new RegExp(arg, 'ig'), argValue);
    });

    return cmd;
  }

  toString() {
    return `[${this.interpolatedCommand()}]`;
  }
};
