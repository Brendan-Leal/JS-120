let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  static reset() {
    return new Board();
  }

  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[counter] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  | ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  | ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  | ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayNumberedSquares() {
    console.log("");
    console.log("     |     |");
    console.log("  1  |  2  | 3");
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log("  4  |  5  | 6");
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log("  7  |  8  | 9");
    console.log("     |     |");
    console.log("");

  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0
  }

  countMarkerFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  squareAvailable(row) {
    let openSquare = false;

    row.forEach(square => {
      if (this.squares[square].marker === Square.UNUSED_SQUARE) {
        openSquare = true;
      }
    });

    return openSquare;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.wins = 0;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  static joinOr(choices, punctuation = ", ", penultimateWord = "or") {

    if (choices.length === 1) {
      return String(choices[0]);
    } else if (choices.length === 2) {
      return choices.join(" " + penultimateWord + " ");
    } else {
      choices = choices.map((element, arrIdx) => {
        if (arrIdx === choices.length - 2) {
          return element + punctuation + penultimateWord + " ";
        } else if (arrIdx === choices.length - 1) {
          return String(element);
        } else {
          return String(element) + punctuation;
        }
      });
      return choices.join("");
    }
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  playOnce() {
    console.clear();
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMovesSmart();
      if (this.gameOver()) break;
      console.clear();
    }
    console.clear();

    this.board.display()
    this.displayResults();
    this.displayGoodbyeMessage();
  }

  playMultiple() {
    console.clear();
    this.displayWelcomeMessage();
    let replay = "y";

    while (replay === "y") {
      while (true) {
        this.board.display();

        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMovesSmart();
        if (this.gameOver()) break;
        console.clear();
      }
      console.clear();

      this.board.display()
      this.displayResults();
      this.board = Board.reset();
      replay = this.playAgain();
    }
    this.displayGoodbyeMessage();
  }

  playMatch() {
    console.clear();
    this.displayWelcomeMessage(true);

    while (this.human.wins < 3 && this.computer.wins < 3) {
      while (true) {
        this.displayScore();
        this.board.display();

        this.humanMoves();
        if (this.gameOver()) {
          console.clear();
          break;
        }
        console.clear();

        this.computerMovesSmart();
        if (this.gameOver()) {
          console.clear();
          break;
        }
        console.clear();
      }

      console.clear();

      this.displayScore();
      this.board.display()
      this.displayResults();

      if (this.human.wins < 3 && this.computer.wins < 3) {
        readline.question("Press enter to play the next game");
        console.clear();
      }
      this.board = Board.reset();
    }
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage(isMatch = false) {

    console.log("Welcome to Tic Tac Toe!");
    console.log("Take a look at how the squares are numbered and make your choices accordingly");
    if (isMatch) {
      console.log("The first one to win 3 games is the ultimate winner");
    }

    this.board.displayNumberedSquares()
    readline.question("Press enter when you are ready to play.");
    console.clear();
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayScore() {

    if (this.isWinner(this.computer)) {
      this.computer.wins += 1;
    } else if (this.isWinner(this.human)) {
      this.human.wins += 1;
    }

    console.log("   SCORE BOARD");
    console.log("+---------------+");
    console.log(`|Computer: ${this.computer.wins}    |`);
    console.log(`|You: ${this.human.wins}         |`);
    console.log("+---------------+");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Nice Job!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! Take that human!");
    } else {
      console.log("Cats game");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMovesRandom() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  computerMovesSmart() {
    if (this.potentialWinningRowFor(this.computer)) {
      this.computerTakeBestMove(this.computer);
    } else if (this.potentialWinningRowFor(this.human)){
      this.computerTakeBestMove(this.human)
    } else {
      this.computerMovesRandom();
    }
  }

  computerTakeBestMove(player) {
    let row = this.potentialWinningRowFor(player);

    row.forEach(square => {
      if (this.board.unusedSquares().includes(square)) {
        this.board.markSquareAt(square, Square.COMPUTER_MARKER);
      }
    });
  }

  potentialWinningRowFor(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.find(row => {
        return this.board.countMarkerFor(player, row) === 2 && this.board.squareAvailable(row);
      });      
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkerFor(player, row) === 3;
    });
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  playAgain() {
    let choice = readline.question("Do you want to play another game? [y/n]: ");

    while (choice.toLowerCase() !== "y" && choice.toLowerCase() !== "n") {
      console.log("INVALID OPTION");
      choice = readline.question("Do you want to play another game? [y/n]: ");
    }
    console.clear();

    return choice.toLowerCase();
  }
}



let game = new TTTGame();
game.playMatch();
game.playOnce();
game.playMultiple();