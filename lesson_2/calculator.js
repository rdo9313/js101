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

function getAndValidateLanguage() {
  let language = chooseLanguage();

  while (invalidLanguage(language)) {
    language = validateLanguage();
  }

  return language;
}

function getAndValidateNum(string, language) {
  let num = retrieve(string, language);

  while (invalidNumber(num)) {
    num = retrieve("validNum", language);
  }

  return num;
}

function getAndValidateOperation(language) {
  let operation = retrieve("operations", language);

  while (!["1", "2", "3", "4"].includes(operation)) {
    operation = retrieve("validateNum", language);
  }

  return operation;
}

function getAndValidateAnswer(language) {
  let answer = repeatAgain(language);

  while (invalidYesOrNo(answer)) {
    answer = retrieve("validateAnswer", language);
  }

  return answer;
}

function validateLanguage() {
  prompt("validateLanguage");
  return readline.question().toLowerCase();
}

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
  // prettier-ignore
  switch (operation) {
    case "1": return Number(num1) + Number(num2);
    case "2": return Number(num1) - Number(num2);
    case "3": return Number(num1) * Number(num2);
    case "4": return Math.abs(num2) === 0
      ? MESSAGES[language]["error"]
      : Number(num1) / Number(num2);
    default: return "No calculation here.";
  }
}

while (true) {
  console.clear();
  let language = getAndValidateLanguage();
  console.clear();

  displayWelcomeMessage(language);

  let num1 = getAndValidateNum("firstNum", language);
  let num2 = getAndValidateNum("secondNum", language);

  let operation = getAndValidateOperation(language);
  let output = performCalculation(operation, num1, num2, language);

  displayResult(language, output);

  let answer = getAndValidateAnswer(language);

  if (["n", "no"].includes(answer.toLowerCase())) {
    displayGoodByeMessage(language);
    break;
  }
}
