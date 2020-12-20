const readline = require("readline-sync");
const TWENTY_ONE = 21;

class Deck {
  constructor() {
  }

  cards = [
    ["Ace", "Hearts"], ["2", "Hearts"], ["3", "Hearts"],
    ["4", "Hearts"], ["5", "Hearts"], ["6", "Hearts"],
    ["7", "Hearts"], ["8", "Hearts"], ["9", "Hearts"],
    ["10", "Hearts"], ["Jack", "Hearts"], ["Queen", "Hearts"],
    ["King", "Hearts"],

    ["Ace", "Diamonds"], ["2", "Diamonds"], ["3", "Diamonds"],
    ["4", "Diamonds"], ["5", "Diamonds"], ["6", "Diamonds"],
    ["7", "Diamonds"], ["8", "Diamonds"], ["9", "Diamonds"],
    ["10", "Diamonds"], ["Jack", "Diamonds"], ["Queen", "Diamonds"],
    ["King", "Diamonds"],

    ["Ace", "Clubs"], ["2", "Clubs"], ["3", "Clubs"],
    ["4", "Clubs"], ["5", "Clubs"], ["6", "Clubs"],
    ["7", "Clubs"], ["8", "Clubs"], ["9", "Clubs"],
    ["10", "Clubs"], ["Jack", "Clubs"], ["Queen", "Clubs"],
    ["King", "Clubs"],

    ["Ace", "Spades"], ["2", "Spades"], ["3", "Spades"],
    ["4", "Spades"], ["5", "Spades"], ["6", "Spades"],
    ["7", "Spades"], ["8", "Spades"], ["9", "Spades"],
    ["10", "Spades"], ["Jack", "Spades"], ["Queen", "Spades"],
    ["King", "Spades"]
  ]

  shuffle() {
    for (let index = this.cards.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1));

      [this.cards[index], this.cards[otherIndex]] = [this.cards[otherIndex], this.cards[index]];
    }
  }

  getSuitSymbol(card) {
    const SUITS_SYMBOL = {
      Hearts: "\u2764",
      Diamonds: "\u2756",
      Clubs: "\u2663",
      Spades: "\u2660",
    };

    if (card[1] === "Hearts") {
      return SUITS_SYMBOL.Hearts;
    } else if (card[1] === "Diamonds") {
      return SUITS_SYMBOL.Diamonds;
    } else if (card[1] === "Clubs") {
      return SUITS_SYMBOL.Clubs;
    } else if (card[1] === "Spades") {
      return SUITS_SYMBOL.Spades;
    } else {
      return "error";
    }
  }
}

class CardTable {
  constructor() {
  }

  display(player, dealer, deck) {
    console.clear();
    const IS_HAND_HIDDEN = false;

    console.log("___________________________");
    console.log("_______Dealers Cards_______\n");
    this.displayCards(dealer.hand, dealer.isHandHidden, deck);
    if (!dealer.isHandHidden) {
      console.log(`\nDealer has: ${dealer.handTotal}`);
    }
    console.log("___________________________");

    console.log("\n\n\n\n\n___________________________");
    console.log("_______Players Cards_______");
    console.log(`Your Money: $${player.money}\n`);
    this.displayCards(player.hand, IS_HAND_HIDDEN, deck);
    console.log(`\nYou have: ${player.handTotal}`);
    console.log("___________________________");
  }

  displayCards(cards, isHandHidden, deck) {
    this.printDashLine(cards);
    this.printCardLine1(cards, isHandHidden);
    this.printBlankCardLine(cards);
    this.printCardLine2(cards, isHandHidden, deck);
    this.printBlankCardLine(cards);
    this.printCardLine3(cards, isHandHidden);
    this.printDashLine(cards);
  }

  printDashLine(cards) {
    let line = "---------";

    cards.forEach((_) => {
      process.stdout.write(line.padEnd(12, " "));
    });
    console.log("");
  }

  printCardLine1(cards, isHandHidden) {
    let cardCount = cards.length;

    if (isHandHidden) {
      cardCount = 1;
      for (let i = 0; i < cardCount; i++) {
        let line1 = `|${cards[i][0].padEnd(7, " ")}|`;

        process.stdout.write(line1.padEnd(12, " "));
        process.stdout.write("|       |");
      }
      console.log("");

    } else {
      for (let i = 0; i < cardCount; i++) {
        let line1 = `|${cards[i][0].padEnd(7, " ")}|`;

        process.stdout.write(line1.padEnd(12, " "));
      }
      console.log("");
    }
  }

  printBlankCardLine(cards) {
    let cardCount = cards.length;
    let blankLine = "|       |";

    for (let i = 0; i < cardCount; i++) {
      process.stdout.write(blankLine.padEnd(12, " "));
    }
    console.log("");
  }

  printCardLine2(cards, isHandHidden, deck) {
    let cardCount = cards.length;

    if (isHandHidden) {
      cardCount = 1;

      for (let i = 0; i < cardCount; i++) {
        let symbol = deck.getSuitSymbol(cards[i]);
        let line2 = `|${symbol.padStart(4, " ")}   |`;
        process.stdout.write(line2.padEnd(12, " "));
        process.stdout.write("|       |");
      }
      console.log("");
    } else {
      for (let i = 0; i < cardCount; i++) {
        let symbol = deck.getSuitSymbol(cards[i]);
        let line2 = `|${symbol.padStart(4, " ")}   |`;
        process.stdout.write(line2.padEnd(12, " "));
      }
      console.log("");
    }
  }

  printCardLine3(cards, isHandHidden) {
    let cardCount = cards.length;

    if (isHandHidden) {
      cardCount = 1;

      for (let i = 0; i < cardCount; i++) {
        let line4 = `|${cards[i][0].padStart(7, " ")}|`;
        process.stdout.write(line4.padEnd(12, " "));
        process.stdout.write("|       |");
      }
      console.log("");
    } else {
      for (let i = 0; i < cardCount; i++) {
        let line4 = `|${cards[i][0].padStart(7, " ")}|`;
        process.stdout.write(line4.padEnd(12, " "));
      }
      console.log("");
    }
  }
}

class Player {
  static HIT = "h";
  static STAY = "s";
  static BROKE = 0;
  static MAX_WINNING_AMT = 10;

  constructor() {
    this.hand;
    this.handTotal;
    this.move;
    this.money = 5;
  }

  setPlayersMove() {
    let choice = readline.question("Hit or stay (h/s): ").trim().toLowerCase()[0];

    while (![Player.STAY, Player.HIT].includes(choice)) {
      choice = readline.question("Hit or stay (h/s): ").toLowerCase()[0];
    }
    this.move = choice;
  }

  reset() {
    this.move = Player.HIT;
    this.handTotal = 0;
  }
}

class Dealer extends Player {
  static STAY_VALUE = 17;

  constructor() {
    super();
    this.isHandHidden = true;
    this.deck = new Deck();
  }

  startingDeal() {
    const TWO_CARDS = 2;
    let startingHand = [];

    for (let cardsDealt = 1; cardsDealt <= TWO_CARDS; cardsDealt++) {
      startingHand.push(this.dealOneCard());
    }
    return startingHand;
  }

  dealOneCard() {
    return this.deck.cards.splice(0, 1)[0];
  }

  reset() {
    this.isHandHidden = true;
    this.handTotal = 0;
    this.deck = new Deck();
  }
}

class TwentyOneGame {
  constructor() {
    this.dealer = new Dealer();
    this.player = new Player();
    this.cardTable = new CardTable();
  }

  play() {
    this.displayWelcome();

    while (this.player.money > Player.BROKE && this.player.money < Player.MAX_WINNING_AMT) {
      this.dealer.deck.shuffle();
      this.player.hand = this.dealer.startingDeal();
      this.dealer.hand = this.dealer.startingDeal();

      while (!this.playersTurnIsOver()) {
        this.calculateHandTotal(this.player);
        this.calculateHandTotal(this.dealer);

        this.cardTable.display(this.player, this.dealer, this.dealer.deck);

        if (this.isBlackjack(this.player)) break;

        this.player.setPlayersMove();

        if (this.player.move === Player.HIT) {
          this.player.hand.push(this.dealer.dealOneCard());
        }
        this.calculateHandTotal(this.player);
      }

      while (!this.dealersTurnIsOver()) {
        if (this.dealer.handTotal < Dealer.STAY_VALUE) {
          this.dealer.hand.push(this.dealer.dealOneCard());
        }
        this.calculateHandTotal(this.dealer);
      }

      this.updateMoney();
      this.dealer.isHandHidden = false;
      this.cardTable.display(this.player, this.dealer, this.dealer.deck);

      this.displayWinner();

      this.player.reset();
      this.dealer.reset();
    }
    this.displayGoodbye();
  }

  displayWinner() {
    if (this.isBlackjack(this.player) && this.isBlackjack(this.dealer)) {
      console.log("Push, no winner");
    } else if (this.isBlackjack(this.player)) {
      console.log("BACKJACK, YOU WIN!");
    } else if (this.dealer.handTotal === this.player.handTotal) {
      console.log("Push, it's a tie");
    } else if (this.isBustingHand(this.dealer) && this.player.handTotal <= TWENTY_ONE) {
      console.log("Dealer busts, you win!");
    } else if (this.isBustingHand(this.player) && this.dealer.handTotal <= TWENTY_ONE) {
      console.log("You busted, sorry not a winner");
    } else if (this.isBustingHand(this.player) && this.isBustingHand(this.dealer)) {
      console.log("Sorry dealer wins even if we both bust");
    } else if (this.dealer.handTotal > this.player.handTotal) {
      console.log("Sorry, not a winner");
    } else if (this.player.handTotal > this.dealer.handTotal) {
      console.log("You win!");
    }

    if (this.player.money > Player.BROKE && this.player.money < Player.MAX_WINNING_AMT) {
      readline.question("\nPress enter to play the next hand");
    }
  }

  updateMoney() {
    if (this.isBlackjack(this.player)) {
      this.player.money += 1;
    } else if (this.isBustingHand(this.dealer) && this.player.handTotal <= TWENTY_ONE) {
      this.player.money += 1;
    } else if (this.isBustingHand(this.player) && this.dealer.handTotal <= TWENTY_ONE) {
      this.player.money -= 1;
    } else if (this.isBustingHand(this.player) && this.isBustingHand(this.dealer)) {
      this.player.money -= 1;
    } else if (this.dealer.handTotal > this.player.handTotal) {
      this.player.money -= 1;
    } else if (this.player.handTotal > this.dealer.handTotal) {
      this.player.money += 1;
    }
  }

  isBlackjack(player) {
    return player.handTotal === TWENTY_ONE && player.hand.length === 2;
  }

  isBustingHand(player) {
    return player.handTotal > TWENTY_ONE;
  }

  playersTurnIsOver() {
    return this.player.move === Player.STAY ||
      this.isBustingHand(this.player);
  }

  dealersTurnIsOver() {
    return this.isBlackjack(this.dealer) ||
      this.dealer.handTotal >= Dealer.STAY_VALUE ||
      this.isBustingHand(this.dealer) ||
      this.isBustingHand(this.player);
  }

  calculateHandTotal(player) {
    let cardValues = player.hand.map(card => card[0]);
    let total = 0;

    cardValues.forEach((value) => {
      if (value === "Ace") {
        total += 11;
      } else if (["Jack", "Queen", "King"].includes(value)) {
        total += 10;
      } else {
        total += Number(value);
      }
    });

    cardValues.filter(value => value === "Ace").forEach((_) => {
      if (total > 21) total -= 10;
    });

    player.handTotal = total;
  }

  displayWelcome() {
    console.clear();
    console.log("Welcome to Twenty one");
    console.log("Your starting money is $5");
    console.log("The game ends if you beat the house and double your starting money");
    console.log("or you go broke\n");
    readline.question("Press enter to start the game");
  }

  displayGoodbye() {
    if (this.player.money === Player.BROKE) {
      console.log("You went broke");
    } else if (this.player.money === Player.MAX_WINNING_AMT) {
      console.log("Congrats you beat the house!");
    }
    console.log("Thanks for playing!");
  }
}

let game = new TwentyOneGame();
game.play();
