const { isUndefined } = require('lodash');
const Args = require('../Common/Args');
const Defer = require('../Common/Defer');
const Logger = require('../Common/Logger');
const Engine = require('../Common/Engine');
const askQuestion = require('../Utils/askQuestion');
const Condition = require('./Condition');

module.exports = class QuestionEntry {
  constructor({condition, arg, question, helpText, choices,
    defaultAnswer, then, onYes, onNo, required}) {

    this.condition = condition ? new Condition(condition) : null;
    this.arg = arg;
    this.question = question;
    this.helpText = helpText;
    this.choices = choices;
    this.defaultAnswer = defaultAnswer;
    this.then = then;
    this.onYes = onYes;
    this.onNo = onNo;
    this.required = isUndefined(required) ? true : required;
  }

  exec() {
    // no condition or it fullfils
    if (!this.condition || this.condition.value() === true) {
      const defer = new Defer();
      let result = [];

      this
        .ask()
        .then(() => this.then ? result.push(this.then) : null)
        .then(() => {
          if (this.onYes && Args.isYes(this.arg)) {
            result.push(this.onYes);
          }

          if (this.onNo && Args.isNo(this.arg)) {
            result.push(this.onNo);
          }
        })
        .then(() => defer.resolve(result))
        .catch(defer.reject);

      return defer.promise;
    }

    Logger.warn(`Skipping conditional question [${this.arg}]`);
    return Promise.resolve(true);
  }

  ask() {
    return askQuestion({
      arg: this.arg,
      question: this.question,
      helpText: this.helpText,
      choices: this.choices,
      defaultAnswer: this.defaultAnswer,
      required: this.required,
    });
  }

  toString() {
    const argText = `[key = ${this.arg}]`.bold();
    return `question ${argText}`;
  }
};
