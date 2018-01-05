module.exports = class Argv {
  static get() {
    return require('yargs')(process.argv)
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
      .exitProcess(!process.env.TEST)
      .showHelpOnFail(!process.env.TEST)
      .argv;
  }
};
