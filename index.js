'use strict';

const { Colors, Logger, Args, Engine, Defer, Argv } = require('./src/Common/*');
const EntryFactory = require('./src/Entry/EntryFactory');
const Assert = require('./src/Assert/*');

function run() {
  const defer = new Defer();
  const argv = Argv.get();
  const batchFilePath = `${process.env.PWD}/${argv.file}`;

  Assert.fileExists(batchFilePath, `Can't load batch file at ${batchFilePath}`);

  const batchFunction = require(batchFilePath);

  Assert.isFunction(batchFunction, 'Batch file must exports a function');

  const commands = batchFunction({
    Args,
    Logger,
    Question: def => EntryFactory.create(EntryFactory.types.QUESTION, def),
    Command: def => EntryFactory.create(EntryFactory.types.COMMAND, def),
  });

  Assert.isArray(commands, 'Batch function must return an array');

  Engine.exec(commands)
    .then(() => {
      Logger.success('\nSUCCESS!');
      defer.resolve();
    })
    .catch(ex => {
      Logger.error(ex);
      defer.reject(ex);
    });

  return defer.promise;
}

module.exports = function interactiveBatch(argv) {
  try {
    return run();
  } catch (ex) {
    Logger.error(ex);
    throw ex;
  }
};
