module.exports = class Argv {
  static set(argv) {
    this.argv = argv;
  }

  static get() {
    return require('yargs')(this.argv)
      .option('file', {
        alias: 'f',
        describe: 'The batch file to process',
        required: true,
        type: 'string',
      })
      .option('arguments', {
        alias: 'a',
        describe: 'A JS or JSON arguments file',
        type: 'string',
      })
      .option('ask-ahead', {
        alias: 'A',
        describe: 'Ask all questions before execution',
        type: 'boolean',
      })
      .option('dry', {
        alias: 'd',
        describe: 'Run the batch file without actually executing the commands',
        type: 'boolean',
      })
      .argv;
  }
};
