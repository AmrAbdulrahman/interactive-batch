'use strict';

const colors = require('./src/Common/Colors');
const Logger = require('./src/Common/Logger');
const Args = require('./src/Common/Args');
const Engine = require('./src/Common/Engine');
const EntryFactory = require('./src/Entry/EntryFactory');
const Argv = require('./src/Common/Argv');

function run() {
  const argv = Argv.get();
  const batchFilePath = argv.file;

  const commands = require(`${process.env.PWD}/${batchFilePath}`)({
    Args,
    Logger,
    Question: def => EntryFactory.create(EntryFactory.types.QUESTION, def),
    Command: def => EntryFactory.create(EntryFactory.types.COMMAND, def),
  });

  Engine.exec(commands)
    .then(() => Logger.success('\nSUCCESS!'))
    .catch(ex => Logger.error(ex, `\n${ex.stack}`));
}

module.exports = function interactiveBatch(argv) {
  try {
    Argv.set(argv);
    run();
  } catch (ex) {
    Logger.error(ex, `\n${ex.stack}`);
    throw 'Aborting...'.red();
  }
};
