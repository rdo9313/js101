// ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result of the operation
const MESSAGES = require("./calculator_messages.json");
const readline = require("readline-sync");

function prompt(key, language, output = "") {
  let message = messages(key, language);
  console.log(`=> ${message} ${output}`);
}

function messages(message, lang = "start") {
  return MESSAGES[lang][message];
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

function invalidAnswer(string) {
  return !["y", "yes", "n", "no"].includes(string.toLowerCase());
}

function invalidLanguage(language) {
  return !["en", "english", "jp", "japanese"].includes(language.toLowerCase());
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

  prompt("chooseLanguage");
  language = readline.question();

  while (invalidLanguage(language)) {
    prompt("validateLanguage");
    language = readline.question();
  }

  console.clear();
  prompt("welcome", language);

  prompt("firstNum", language);
  let num1 = readline.question();

  while (invalidNumber(num1)) {
    prompt("validNum", language);
    num1 = readline.question();
  }

  prompt("secondNum", language);
  let num2 = readline.question();

  while (invalidNumber(num2)) {
    prompt("validNum", language);
    num2 = readline.question();
  }

  prompt("operations", language);
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt("validateNum", language);
    operation = readline.question();
  }

  let output = performCalculation(operation, num1, num2, language);
  // switch (operation) {
  //   case "1":
  //     output = Number(num1) + Number(num2);
  //     break;
  //   case "2":
  //     output = Number(num1) - Number(num2);
  //     break;
  //   case "3":
  //     output = Number(num1) * Number(num2);
  //     break;
  //   case "4":
  //     output =
  //       Math.abs(num2) === 0
  //         ? MESSAGES[language]["error"]
  //         : Number(num1) / Number(num2);
  //     break;
  // }

  prompt("result", language, output);

  prompt("anotherCalc", language);
  let answer = readline.question();

  while (invalidAnswer(answer)) {
    prompt("validateAnswer", language);
    answer = readline.question();
  }

  if (["n", "no"].includes(answer.toLowerCase())) {
    prompt("goodbye", language);
    break;
  }
}
