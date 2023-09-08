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

function askToContinue() {
  prompt("Please press enter to continue:");
  readline.question();
}

function displayWelcomeMessage() {
  console.clear();
  prompt("Welcome to Rock Paper Scissors Lizard Spock!");
  prompt(
    `For the full explanation and rules of this game, please go here:
  https://web.archive.org/web/20181217114425/http://www.samkass.com/theories/RPSSL.html`
  );
  prompt(
    `First player to ${WINNING_SCORE} wins is declared the winner. Good luck!`
  );
  displayLineBreak();
}

function displayGoodByeMessage() {
  console.clear();
  prompt("Thank you for playing RPSLS. Have a great day!");
}

function displayLineBreak() {
  prompt("-----------------------------------------------------------------");
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

function displayScore(score) {
  displayLineBreak();
  prompt(`Your score: ${score["player"]}
   Computer score: ${score["computer"]}`);
  displayLineBreak();
}

function displayWinner(choice, computerChoice) {
  console.clear();
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

function isValidPlayAgain(playAgain) {
  return ["y", "yes", "n", "no"].includes(playAgain);
}

function updateScore(choice, computerChoice, score) {
  if (determineWinner(choice, computerChoice) === "player") {
    score["player"] += 1;
  } else if (determineWinner(choice, computerChoice) === "computer") {
    score["computer"] += 1;
  }
}

function retrieveChoice() {
  console.clear();
  prompt(`Choose between ${formatChoiceDisplay().join(", ")}:`);
  return readline.question();
}

function retrieveValidChoice() {
  prompt("That's not a valid choice.");
  return readline.question();
}

function retrievePlayAgain(score) {
  console.clear();
  if (score["player"] === 3) {
    prompt("Congratulations! You took the computer down!");
  } else {
    prompt("Computer won. Better luck next time!");
  }
  prompt("Would you like to play again (y/n)?");
  return readline.question().toLowerCase();
}

function retrieveValidPlayAgain() {
  prompt("Please input a valid answer (y/n):");
  return readline.question().toLowerCase();
}

displayWelcomeMessage();
askToContinue();

while (true) {
  let score = { player: 0, computer: 0 };

  while (Math.max(...Object.values(score)) < WINNING_SCORE) {
    let choice = retrieveChoice();
    choice = convertChoice(choice);

    while (!VALID_CHOICES.includes(choice)) {
      choice = retrieveValidChoice();
      choice = convertChoice(choice);
    }

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    displayWinner(choice, computerChoice);
    updateScore(choice, computerChoice, score);
    displayScore(score);
    askToContinue();
  }

  let playAgain = retrievePlayAgain(score);
  while (!isValidPlayAgain(playAgain)) {
    playAgain = retrieveValidPlayAgain();
  }

  if (["n", "no"].includes(playAgain)) break;
}

displayGoodByeMessage();
