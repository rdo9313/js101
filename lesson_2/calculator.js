// ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result of the operation
const LANGUAGE = "en";
const MESSAGES = require("./calculator_messages.json");
const readline = require("readline-sync");

function prompt(key, output = "") {
  let message = messages(key, LANGUAGE);
  console.log(`=> ${message} ${output}`);
}

function messages(message, lang = "en") {
  return MESSAGES[lang][message];
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

function invalidAnswer(string) {
  return !["y", "yes", "n", "no"].includes(string.toLowerCase());
}

while (true) {
  console.clear();
  prompt("welcome");

  prompt("firstNum");
  let num1 = readline.question();

  while (invalidNumber(num1)) {
    prompt("validNum");
    num1 = readline.question();
  }

  prompt("secondNum");
  let num2 = readline.question();

  while (invalidNumber(num2)) {
    prompt("validNum");
    num2 = readline.question();
  }

  prompt("operations");
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt("validateNum");
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case "1":
      output = Number(num1) + Number(num2);
      break;
    case "2":
      output = Number(num1) - Number(num2);
      break;
    case "3":
      output = Number(num1) * Number(num2);
      break;
    case "4":
      output = Number(num1) / Number(num2);
      break;
  }

  prompt("result", output);

  prompt("anotherCalc");
  let answer = readline.question();

  while (invalidAnswer(answer)) {
    prompt("validateAnswer");
    answer = readline.question();
  }

  if (["n", "no"].includes(answer.toLowerCase())) break;
}

prompt("goodbye");
