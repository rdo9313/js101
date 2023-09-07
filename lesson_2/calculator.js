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

function retrieveFirstNum(language) {
  prompt("firstNum", language);
  return readline.question();
}

function retrieveSecondNum(language) {
  prompt("secondNum", language);
  return readline.question();
}

function retrieveOperations(language) {
  prompt("operations", language);
  return readline.question();
}

function retrieveNewNum(language) {
  prompt("validNum", language);
  return readline.question();
}

function retrieveNewOperation(language) {
  prompt("validateNum", language);
  return readline.question();
}

function retrieveNewAnswer(language) {
  prompt("validateAnswer", language);
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

  let num1 = retrieveFirstNum(language);

  while (invalidNumber(num1)) {
    num1 = retrieveNewNum(language);
  }

  let num2 = retrieveSecondNum(language);

  while (invalidNumber(num2)) {
    num2 = retrieveNewNum(language);
  }

  let operation = retrieveOperations(language);

  while (!["1", "2", "3", "4"].includes(operation)) {
    operation = retrieveNewOperation(language);
  }

  let output = performCalculation(operation, num1, num2, language);

  displayResult(language, output);

  let answer = repeatAgain(language);

  while (invalidYesOrNo(answer)) {
    answer = retrieveNewAnswer(language);
  }

  if (["n", "no"].includes(answer.toLowerCase())) {
    displayGoodByeMessage(language);
    break;
  }
}
