const readline = require('readline');
const { isFunction, isNaN, toNumber, indexOf } = require('lodash');
const Defer = require('../Common/Defer');
const Args = require('../Common/Args');
const Logger = require('../Common/Logger');

function askQuestion({ arg, question, helpText, choices, defaultAnswer, required }) {
  const defer = new Defer();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


  if (isFunction(choices) === true) {
    choices = choices();
  }

  if (isFunction(helpText) === true) {
    helpText = helpText();
  }

  if (isFunction(defaultAnswer) === true) {
    defaultAnswer = defaultAnswer();
  }

  if (choices && defaultAnswer === '$last') {
    defaultAnswer = choices.length;
  }

  let defaultAnswerText = defaultAnswer ? `(${defaultAnswer}) `.bold() : '';
  let questionText = `\n${question}`.blue().bold();

  if (helpText) {
    questionText += `\n(${helpText})`;
  }

  if (choices) {
    let choicesText = choices
      .map((choice, index) => `[${index + 1}] ${choice}`)
      .join('\n');

    questionText += `\n\n${choicesText}\n\nChoice: ${defaultAnswerText.bold()}`;
  } else {
    questionText += `\nAnswer: ${defaultAnswerText}`;
  }

  function ask(questionText) {
    questionText = Logger.makeLogMessage(questionText);

    rl.question(questionText, answer => {
      answer = answer || defaultAnswer;

      if (required && (!answer || !(answer + '').length)) {
        return ask(`Please enter a response: ${defaultAnswerText}`.yellow());
      }

      if (choices) {
        let answerIndex = null;

        // string input
        if (isNaN(toNumber(answer))) {
          // if answer is not an option
          if (indexOf(choices, answer) === -1) {
            return ask(`Please enter a valid choice or number: ${defaultAnswerText}`.yellow());
          }

          // index of answer
          answerIndex = indexOf(choices, answer);

        // direct number
        } else {
          answerIndex = toNumber(answer) - 1;
        }

        if (answerIndex < 0 || answerIndex >= choices.length) {
          return ask(`Please enter a valid choice number between [1, ${choices.length}]: ${defaultAnswerText}`.yellow());
        }

        answer = choices[answerIndex];
      }

      endQuestion(answer);
    });
  }

  function endQuestion(answer) {
    Args.set(arg, answer);
    rl.close();
    defer.resolve();
  }

  ask(questionText);

  return defer.promise;
}

module.exports = askQuestion;
