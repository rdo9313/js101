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
const PLAYER = "player";
const COMPUTER = "computer";
const TIE = "tie";

function prompt(message) {
  console.log(`=> ${message}`);
}

function askToContinue() {
  prompt("Please press enter to continue:");
  readline.question();
}

function displayWelcomeMessage() {
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
  prompt("Thank you for playing RPSLS. Have a great day!");
}

function displayLineBreak() {
  prompt("-----------------------------------------------------------------");
}

// prettier-ignore
function convertChoice(choice) {
  choice = choice.toLowerCase();
  switch (choice) {
    case "r": return "rock";
    case "p": return "paper";
    case "s": return "scissors";
    case "l": return "lizard";
    case "sp": return "spock";
    default: return choice;
  }
}

function displayScore(score) {
  displayLineBreak();
  prompt(`Your score: ${score[PLAYER]}
   Computer score: ${score[COMPUTER]}`);
  displayLineBreak();
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);
  if (determineWinner(choice, computerChoice) === PLAYER) {
    prompt("You win!");
  } else if (determineWinner(choice, computerChoice) === COMPUTER) {
    prompt("Computer wins!");
  } else if (determineWinner(choice, computerChoice) === TIE) {
    prompt("It's a tie!");
  } else {
    console.log("There is a problem.");
  }
}

function displayFinalWinner(score) {
  if (score[PLAYER] === WINNING_SCORE) {
    prompt("Congratulations! You took the computer down!");
  } else {
    prompt("Computer won. Better luck next time!");
  }
}

function determineWinner(choice, computerChoice) {
  if (WINNING_COMBOS[choice].includes(computerChoice)) {
    return PLAYER;
  } else if (WINNING_COMBOS[computerChoice].includes(choice)) {
    return COMPUTER;
  } else {
    return TIE;
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

function getAndValidateChoice() {
  let choice = getUserChoice();
  choice = convertChoice(choice);

  while (!VALID_CHOICES.includes(choice)) {
    choice = getUserValidChoice();
    choice = convertChoice(choice);
  }

  return choice;
}

function getAndValidatePlayAgain() {
  let playAgain = getUserPlayAgain();

  while (!isValidPlayAgain(playAgain)) {
    playAgain = getUserValidPlayAgain();
  }

  return playAgain;
}

function generateRandomChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return VALID_CHOICES[randomIndex];
}

function isValidPlayAgain(playAgain) {
  return ["y", "yes", "n", "no"].includes(playAgain);
}

function updateScore(choice, computerChoice, score) {
  if (determineWinner(choice, computerChoice) === PLAYER) {
    score[PLAYER] += 1;
  } else if (determineWinner(choice, computerChoice) === COMPUTER) {
    score[COMPUTER] += 1;
  }
}

function getUserChoice() {
  prompt(`Choose between ${formatChoiceDisplay().join(", ")}:`);
  return readline.question();
}

function getUserValidChoice() {
  prompt("That's not a valid choice.");
  return readline.question();
}

function getUserPlayAgain() {
  prompt("Would you like to play again (y/n)?");
  return readline.question().toLowerCase();
}

function getUserValidPlayAgain() {
  prompt("Please input a valid answer (y/n):");
  return readline.question().toLowerCase();
}

console.clear();
displayWelcomeMessage();
askToContinue();

while (true) {
  let score = { player: 0, computer: 0 };

  while (Math.max(...Object.values(score)) < WINNING_SCORE) {
    console.clear();
    let choice = getAndValidateChoice();
    let computerChoice = generateRandomChoice();

    console.clear();
    displayWinner(choice, computerChoice);
    updateScore(choice, computerChoice, score);
    displayScore(score);
    askToContinue();
  }

  console.clear();
  displayFinalWinner(score);
  let playAgain = getAndValidatePlayAgain();

  if (["n", "no"].includes(playAgain)) break;
}

console.clear();
displayGoodByeMessage();
