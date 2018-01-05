const { describe, before, it } = require('mocha');
const { expect } = require('chai');
const ib = require('./utils/ibWrapper');
const asserts = require('./asserts/*');

require('chai').should();

describe('Args', () => {
  describe('file arg', () => {
    it('should not work if --file is missing', () => {
      const commandWithNoArgs = () => ib('');

      asserts.throwsError(commandWithNoArgs, {
        name: 'YError',
        match: ['Missing', 'file'],
      });
    });

    it('should not work if --file arg is wrong', () => {
      const commandWithWrongFileArg = () => ib(`--file doesntexist.js`);
      asserts.throwsAssertError(commandWithWrongFileArg);
    });

    it('should not work if batch file exports non-function value', () => {
      const commandWithWrongFileArg = () => ib(`--file exports-non-function.batch.js`);
      asserts.throwsAssertError(commandWithWrongFileArg);
    });

    it('should not work if batch file function returns non array value', () => {
      const commandWithWrongFileArg = () => ib(`--file returns-non-array.batch.js`);
      asserts.throwsAssertError(commandWithWrongFileArg);
    });

    it('should work if --file arg is correct', () => {
      return ib(`--file tests/samples/valid.batch.js`);
    });

    it('should also work with alias -f', () => {
      return ib(`-f tests/samples/valid.batch.js`);
    });
  });
});
