
const readline = require("readline-sync");
const RPS = ["rock", "paper", "scissors"];

class RPSGame {
    constructor() {
        this.human = new Human();
        this.computer = new Computer();
    }

    displayWelcomeMessage() {
        console.log("Welcome to Rock, Paper, Scissors!");
        console.log("The first to reach 5 points wins");
        console.log("\nPress ENTER to start the game");
        readline.question();
        console.clear();
      }
    
      displayGoodbyeMessage() {
        console.clear();
        this.displayScoreBoard();
        if (this.human.score === 5) {
          console.log("Congratulations! You won");
        } else {
          console.log("Computer is the winner better luck next time.");
        }
        console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
      }

      displayWinner() {
        console.clear();
        let humanMove = this.human.move;
        let computerMove = this.computer.move;
    
        console.log(`You chose: ${this.human.move}`);
        console.log(`The computer chose: ${this.computer.move}`);
    
        if ((humanMove === "rock" && computerMove === "scissors") ||
            (humanMove === "paper" && computerMove === "rock") ||
            (humanMove === "scissors" && computerMove === "paper")) {
          this.human.score += 1;
          console.log("You Win!\n");
        } else if ((humanMove === "rock" && computerMove === "paper") ||
                  (humanMove === "paper" && computerMove === "scissors") ||
                  (humanMove === "scissors" && computerMove === "rock")) {
          this.computer.score += 1;
          console.log("Computer Wins!\n");
        } else {
          console.log("It's a tie\n");
        }
        this.displayScoreBoard();
      }
    
      displayScoreBoard() {
        console.log("-".repeat(32));
        console.log("The first to reach 5 points wins");
        console.log(`Your Score: ${this.human.score}`);
        console.log(`Computer Score: ${this.computer.score}`);
        console.log("-".repeat(32) + "\n");
      }
    
      isWinner() {
        if (this.human.score === 5 || this.computer.score === 5) {
          return true;
        } else {
          return false;
        }
      }
    
      play() {
        this.displayWelcomeMessage();
        while (true) {
          this.human.choose();
          this.computer.choose();
          this.displayWinner();
          if (this.isWinner()) break;
        }
    
        this.displayGoodbyeMessage();
      }
}

class Player {
    constructor() {
        this.move = null;
        this.score = 0;
    }
}

class Human extends Player{
  constructor() {
    super();
  }

  choose() {
    const USER_PROMPT = "Please choose rock, paper, or scissors\n(r, p, and s) are recognized choices.";

    console.log(USER_PROMPT);
    let choice = readline.question().toLowerCase();
    choice = RPS.find(validInput => validInput[0] === choice[0]);

     while (!choice) {
        console.log("Sorry, invalid choice.");
        console.log(USER_PROMPT);
        choice = readline.question().toLowerCase();
        choice = RPS.find(validInput => validInput[0] === choice[0]);
    }

    this.move = choice;
    }
}


class Computer extends Player {
  constructor() {
      super();
  }

  choose() {
    let randomIndex = Math.floor(Math.random() * RPS.length);
    this.move = RPS[randomIndex];
  }
}

let game = new RPSGame();
game.play();