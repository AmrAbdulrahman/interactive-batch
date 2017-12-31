module.exports = class FunctionCommand {
  constructor(command) {
    this.command = command;
  }

  exec() {
    return Promise.resolve(this.command());
  }

  toString() {
    const name = this.command.name;
    return name ? `[${name}]`.bold() : '';
  }
};
