let readline = require("readline-sync");

function Square(marker = Square.UNUSED_SQUARE) {
  this.marker = marker;
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

Square.prototype.toString = function () {
  return this.marker;
}

Square.prototype.setMarker = function (marker) {
  this.marker = marker;
}

Square.prototype.isUnused = function () {
  return this.marker === Square.UNUSED_SQUARE;
}

Square.prototype.getMarker = function () {
  return this.marker;
}


function Board() {
  this.squares = {};
  for (let counter = 1; counter <= 9; ++counter) {
    this.squares[counter] = new Square();
  }
}

Board.prototype.display = function () {
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

Board.prototype.markSquareAt = function (key, marker) {
  this.squares[key].setMarker(marker);
}

Board.prototype.unusedSquares = function () {
  let keys = Object.keys(this.squares);
  return keys.filter(key => this.squares[key].isUnused());
}

Board.prototype.isFull = function () {
  return this.unusedSquares().length === 0;
}

Board.prototype.countMarkerFor = function (player, keys) {
  let markers = keys.filter(key => {
    return this.squares[key].getMarker() === player.getMarker();
  });

  return markers.length;
}


function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function () {
  return this.marker;
}

function Human() {
  Player.call(this, Square.HUMAN_MARKER);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_MARKER);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

TTTGame.prototype.play = function () {
  console.clear();
  this.displayWelcomeMessage();

  while (true) {
    this.board.display();

    this.humanMoves();
    if (this.gameOver()) break;

    this.computerMoves();
    if (this.gameOver()) break;
    console.clear();
  }
  console.clear();

  this.board.display()
  this.displayResults();
  this.displayGoodbyeMessage();
}

TTTGame.prototype.displayWelcomeMessage = function () {
  console.log("Welcome to Tic Tac Toe!");
}

TTTGame.prototype.displayGoodbyeMessage = function () {
  console.log("Thanks for playing Tic Tac Toe! Goodbye!");
}

TTTGame.prototype.displayResults = function () {
  if (this.isWinner(this.human)) {
    console.log("You won! Nice Job!");
  } else if (this.isWinner(this.computer)) {
    console.log("I won! Take that human!");
  } else {
    console.log("Cats game");
  }
}

TTTGame.prototype.isWinner = function (player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
    return this.board.countMarkerFor(player, row) === 3;
  });
}

TTTGame.prototype.humanMoves = function () {
  let choice;

  while (true) {
    let validChoices = this.board.unusedSquares();
    const prompt = `Choose a square (${validChoices.join(", ")}): `;
    choice = readline.question(prompt);

    if (validChoices.includes(choice)) break;

    console.log("Sorry, that's not a valid choice.");
    console.log("");
  }

  this.board.markSquareAt(choice, this.human.getMarker());
}

TTTGame.prototype.computerMoves = function () {
  let validChoices = this.board.unusedSquares();
  let choice;

  do {
    choice = Math.floor((9 * Math.random()) + 1).toString();
  } while (!validChoices.includes(choice));

  this.board.markSquareAt(choice, this.computer.getMarker());
}

TTTGame.prototype.gameOver = function () {
  return this.board.isFull() || this.someoneWon();
}

TTTGame.prototype.someoneWon = function () {
  return this.isWinner(this.human) || this.isWinner(this.computer);
}

let game = new TTTGame();
game.play();