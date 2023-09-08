const readline = require("readline-sync");
const WINNING_COMBOS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};
const WINNING_SCORE = 3;
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];

function prompt(message) {
  console.log(`=> ${message}`);
}

function convertChoice(choice) {
  choice = choice.toLowerCase();
  switch (choice) {
    case "r":
      return "rock";
    case "p":
      return "paper";
    case "s":
      return "scissors";
    case "l":
      return "lizard";
    case "sp":
      return "spock";
    default:
      return choice;
  }
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);
  if (determineWinner(choice, computerChoice) === "player") {
    prompt("You win!");
  } else if (determineWinner(choice, computerChoice) === "computer") {
    prompt("Computer wins!");
  } else {
    prompt("It's a tie!");
  }
}

function determineWinner(choice, computerChoice) {
  if (WINNING_COMBOS[choice].includes(computerChoice)) {
    return "player";
  } else if (WINNING_COMBOS[computerChoice].includes(choice)) {
    return "computer";
  } else {
    return "tie";
  }
}

function formatChoiceDisplay() {
  return VALID_CHOICES.map((choice) => {
    if (choice.startsWith("sp")) {
      return "(" + choice.slice(0, 2) + ")" + choice.slice(2);
    } else {
      return "(" + choice.slice(0, 1) + ")" + choice.slice(1);
    }
  });
}

function updateScore(choice, computerChoice, score) {
  if (determineWinner(choice, computerChoice) === "player") {
    score["player"] += 1;
  } else if (determineWinner(choice, computerChoice) === "computer") {
    score["computer"] += 1;
  }
}

function retrieveChoice() {
  prompt(`Choose between ${formatChoiceDisplay().join(", ")}:`);
  return readline.question();
}

while (true) {
  let score = { player: 0, computer: 0 };
  while (Math.max(...Object.values(score)) < 3) {
    let choice = retrieveChoice();
    choice = convertChoice(choice);
    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice.");
      choice = readline.question();
      choice = convertChoice(choice);
    }

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    displayWinner(choice, computerChoice);
    updateScore(choice, computerChoice, score);
    console.log(`${score["player"]}:${score["computer"]}`);
  }

  prompt("Do you want to play again (y/n)?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== "n" && answer[0] !== "y") {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== "y") break;
}
