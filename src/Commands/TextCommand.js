const execSync = require('child_process').execSync;
const Args = require('../Common/Args');
const Logger = require('../Common/Logger');
const Argv = require('../Common/Argv');

module.exports = class TextCommand {
  constructor(command) {
    this.command = command;
  }

  exec() {
    const argv = Argv.get();
    const cmd = this.interpolatedCommand();

    if (argv.dry) {
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
