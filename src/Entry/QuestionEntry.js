const { isUndefined } = require('lodash');
const Args = require('../Common/Args');
const Defer = require('../Common/Defer');
const Logger = require('../Common/Logger');
const Engine = require('../Common/Engine');
const askQuestion = require('../Utils/askQuestion');
const Condition = require('./Condition');

module.exports = class QuestionEntry {
  constructor(question) {
    this.question = question;

    this.question.condition = question.condition ? new Condition(question.condition) : null;
    this.question.required = isUndefined(question.required) ? true : question.required;
  }

  exec() {
    const question = this.question;

    // no condition or it fullfils
    if (!question.condition || question.condition.value() === true) {
      const defer = new Defer();
      const result = [];

      this
        .ask()
        .then(() => {
          if (question.then) {
            result.push(question.then);
          }

          if (question.onYes && Args.isYes(question.arg)) {
            result.push(question.onYes);
          }

          if (question.onNo && Args.isNo(question.arg)) {
            result.push(question.onNo);
          }
        })
        .then(() => defer.resolve(result))
        .catch(defer.reject);

      return defer.promise;
    }

    Logger.warn(`Skipping conditional question [${question.arg}]`);
    return Promise.resolve(true);
  }

  ask() {
    return askQuestion(this.question);
  }

  toString() {
    const argText = `[key = ${this.question.arg}]`.bold();
    return `question ${argText}`;
  }
};
