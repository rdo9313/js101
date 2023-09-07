//change answer to yesorno
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
}

function displayGoodByeMessage() {
  prompt("goodbye");
}

function retrieveLoanAmount() {
  prompt("requestLoan");
  return readline.question();
}

function retrieveAPR() {
  prompt("requestAPR");
  return readline.question();
}

function retrieveDuration() {
  prompt("loanDuration");
  return readline.question();
}

function retrieveAnswer() {
  prompt("calculateAgain");
  return readline.question();
}

function isInvalidNum(num) {
  return num.trim() === "" || Number(num) < 0 || Number.isNaN(Number(num));
}

function isInvalidAnswer(answer) {
  return !["y", "yes", "n", "no"].includes(answer.toLowerCase());
}

function validateAnswer(answer) {
  while (isInvalidAnswer(answer)) {
    prompt("validAnswer");
    answer = readline.question();
  }
  return answer;
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
  console.clear();
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
displayLineBreak();
askToContinue();

while (true) {
  console.clear();
  let amount = retrieveLoanAmount();
  amount = validateNum(amount);
  console.clear();

  let apr = retrieveAPR();
  apr = validateNum(apr);
  console.clear();

  let yearDuration = retrieveDuration();
  yearDuration = validateNum(yearDuration);
  console.clear();

  let monthlyInterest = calculateMonthlyInterest(apr);
  let monthDuration = calculateMonthDuration(yearDuration);
  let monthlyPayment = calculateMonthlyPayment(
    amount,
    monthlyInterest,
    monthDuration
  );

  displayResults(amount, apr, monthDuration, yearDuration, monthlyPayment);
  askToContinue();

  let answer = retrieveAnswer();
  answer = validateAnswer(answer);

  if (["n", "no"].includes(answer)) break;
}

console.clear();
displayGoodByeMessage();
