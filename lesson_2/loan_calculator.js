const MESSAGES = require("./car_loan_calculator_messages.json");
const readline = require("readline-sync");
const MONTHS_IN_YEAR = 12;

function prompt(message) {
  if (Object.keys(MESSAGES).includes(message)) {
    console.log(`=> ${MESSAGES[message]}`);
  } else {
    console.log(`=> ${message}`);
  }
}

function displayWelcomeMessage() {
  prompt("welcome");
  displayLineBreak();
}

function displayGoodByeMessage() {
  prompt("goodbye");
}

function isEmpty(num) {
  return num.trim() === "";
}

function isNegative(num) {
  return Number(num) < 0;
}

function isNaN(num) {
  return Number.isNaN(Number(num));
}

function isInvalidNum(num) {
  return isEmpty(num) || isNegative(num) || isNaN(num);
}

function isInvalidAmount(num) {
  return num.split(".")[1] && num.split(".")[1].length > 2;
}

function isInvalidCalculateAgain(input) {
  return !["y", "yes", "n", "no"].includes(input.toLowerCase());
}

function getUserInput(string) {
  prompt(string);
  return readline.question();
}

function getAndValidateAmount() {
  let amount = getUserInput("requestLoan");

  while (isInvalidNum(amount) || isInvalidAmount(amount)) {
    prompt("validAmount");
    amount = readline.question();
  }

  return Number(amount);
}

function getAndValidateNum(input) {
  let num = getUserInput(input);
  return validateNum(num);
}

function getAndValidateCalculateAgain() {
  let input = getUserInput("calculateAgain");

  while (isInvalidCalculateAgain(input)) {
    prompt("validCalculateAgain");
    input = readline.question();
  }

  return input.toLowerCase();
}

function validateNum(num) {
  while (isInvalidNum(num)) {
    prompt("validNumber");
    num = readline.question();
  }
  return Number(num);
}

function calculateMonthlyInterest(apr) {
  return apr / 100 / MONTHS_IN_YEAR;
}

function calculateMonthDuration(yearDuration) {
  return yearDuration * MONTHS_IN_YEAR;
}

function calculateMonthlyPayment(amount, monthlyInterest, monthDuration) {
  let payment;

  if (monthDuration === 0) {
    payment = amount;
  } else if (monthlyInterest === 0) {
    payment = amount / monthDuration;
  } else {
    payment =
      amount *
      (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -monthDuration)));
  }
  return payment.toFixed(2);
}

function displayLineBreak() {
  prompt("lineBreak");
}

function askToContinue() {
  prompt("askToContinue");
  readline.question();
}

function displayResults(
  amount,
  apr,
  monthDuration,
  yearDuration,
  monthlyPayment
) {
  prompt("loanDetails");
  displayLineBreak();
  prompt(`Amount: $${amount}`);
  prompt(`APR: ${apr}%`);
  prompt(
    `Duration: ${Math.ceil(monthDuration)} months (${yearDuration} years)`
  );
  displayLineBreak();
  prompt(`Monthly Payment: $${monthlyPayment}`);
  displayLineBreak();
}

console.clear();
displayWelcomeMessage();
askToContinue();

while (true) {
  console.clear();
  let amount = getAndValidateAmount();

  console.clear();
  let apr = getAndValidateNum("requestAPR");

  console.clear();
  let yearDuration = getAndValidateNum("loanDuration");

  let monthlyInterest = calculateMonthlyInterest(apr);
  let monthDuration = calculateMonthDuration(yearDuration);
  let monthlyPayment = calculateMonthlyPayment(
    amount,
    monthlyInterest,
    monthDuration
  );

  console.clear();
  displayResults(amount, apr, monthDuration, yearDuration, monthlyPayment);
  askToContinue();

  console.clear();
  let calculateAgain = getAndValidateCalculateAgain();

  if (["n", "no"].includes(calculateAgain)) break;
}

console.clear();
displayGoodByeMessage();
