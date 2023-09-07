/*  1) Prettier autosaves the case statements into separate lines.
    Should I disable auto-save and ignore its recommendations?
    2) Should I leave console.clear() in while loop or in functions?
    3) Should I separate prompts and readline into two separate functions?
    4) Should I encapsulate the while loops within the main loop into functions
    as well?
    5) Refactor all retrieve functions to pass a string for first param and
    interpolate into prompt argument?
*/
const MESSAGES = require("./calculator_messages.json");
const readline = require("readline-sync");

function displayWelcomeMessage(language) {
  prompt("welcome", language);
}

function displayGoodByeMessage(language) {
  prompt("goodbye", language);
}

function displayResult(language, output) {
  prompt("result", language, output);
}

function prompt(key, language, output = "") {
  let message = messages(key, language);
  console.log(`=> ${message} ${output}`);
}

function messages(message, lang = "start") {
  return MESSAGES[lang][message];
}

function chooseLanguage() {
  prompt("chooseLanguage");
  return readline.question().toLowerCase();
}

function validateLanguage() {
  prompt("validateLanguage");
  return readline.question().toLowerCase();
}

// function retrieveFirstNum(language) {
//   prompt("firstNum", language);
//   return readline.question();
// }

// function retrieveSecondNum(language) {
//   prompt("secondNum", language);
//   return readline.question();
// }

// function retrieveOperations(language) {
//   prompt("operations", language);
//   return readline.question();
// }

// function retrieveNewNum(language) {
//   prompt("validNum", language);
//   return readline.question();
// }

// function retrieveNewOperation(language) {
//   prompt("validateNum", language);
//   return readline.question();
// }

// function retrieveNewAnswer(language) {
//   prompt("validateAnswer", language);
//   return readline.question();
// }

function retrieve(string, language) {
  prompt(string, language);
  return readline.question();
}

function repeatAgain(language) {
  prompt("anotherCalc", language);
  return readline.question();
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

function invalidYesOrNo(string) {
  return !["y", "yes", "n", "no"].includes(string.toLowerCase());
}

function invalidLanguage(language) {
  return !["en", "english", "jp", "japanese"].includes(language);
}

function performCalculation(operation, num1, num2, language) {
  switch (operation) {
    case "1":
      return Number(num1) + Number(num2);
    case "2":
      return Number(num1) - Number(num2);
    case "3":
      return Number(num1) * Number(num2);
    case "4":
      return Math.abs(num2) === 0
        ? MESSAGES[language]["error"]
        : Number(num1) / Number(num2);
    default:
      return "No calculation here.";
  }
}

while (true) {
  let language;
  console.clear();

  language = chooseLanguage();

  while (invalidLanguage(language)) {
    language = validateLanguage();
  }

  console.clear();
  displayWelcomeMessage(language);

  let num1 = retrieve("firstNum", language);

  while (invalidNumber(num1)) {
    num1 = retrieve("validNum", language);
  }

  let num2 = retrieve("secondNum", language);

  while (invalidNumber(num2)) {
    num2 = retrieve("validNum", language);
  }

  let operation = retrieve("operations", language);

  while (!["1", "2", "3", "4"].includes(operation)) {
    operation = retrieve("validateNum", language);
  }

  let output = performCalculation(operation, num1, num2, language);

  displayResult(language, output);

  let answer = repeatAgain(language);

  while (invalidYesOrNo(answer)) {
    answer = retrieve("validateAnswer", language);
  }

  if (["n", "no"].includes(answer.toLowerCase())) {
    displayGoodByeMessage(language);
    break;
  }
}
