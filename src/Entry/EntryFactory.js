const { has } = require('lodash');
const QuestionEntry = require('./QuestionEntry');
const CommandEntry = require('./CommandEntry');

module.exports = class EntryFactory {
  static create(TYPE, def) {
    if (has(this.types, TYPE) === false) {
      throw new Error(`Invalid object type ${TYPE}`);
    }

    switch (TYPE) {
      case this.types.QUESTION:
        return new QuestionEntry(def);
      case this.types.COMMAND:
        return new CommandEntry(def);
      default:
        return null;
    }
  }

  static get types() {
    return {
      QUESTION: 'QUESTION',
      COMMAND: 'COMMAND',
    };
  }
};
