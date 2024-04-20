/**
 * 
 *  Card: one single card
    Deck: a deck of cards
    Player: abstract class representing players
    BlackjackPlayer: specific player
    Dealer: other kind of player
    Move: a move made by one of the players
    BlackjackGame: embeds game logic
 * 
 */

enum Suit {
  CLUB = "Club",
  DIAMOND = "Diamond",
  HEART = "Heart",
  SPADE = "Spade"
}

const SUIT_CHAR_MAP: Record<Suit, string> = {
  [Suit.CLUB]: "c",
  [Suit.DIAMOND]: "d",
  [Suit.HEART]: "h",
  [Suit.SPADE]: "s",
}

const FACE_VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

abstract class Card {
  // private available = true;

  protected faceValue: number;
  protected suit: Suit;

  constructor(value: number, suit: Suit) {
    this.faceValue = value;
    this.suit = suit;
  }

  public abstract getValue(): number;

  public getSuit() {
    return this.suit;
  }

  // public isAvailable() {
  //   return this.available;
  // }

  // public markUnavailable() {
  //   this.available = false;
  // }

  // public markAvailable() {
  //   this.available = true;
  // }

  public toString() {
    const valueChar = FACE_VALUES[this.faceValue - 1];
    const suitChar = SUIT_CHAR_MAP[this.suit];

    return valueChar + suitChar;
  }
}

class BlackJackCard extends Card {
  public override getValue(): number {
    if (this.isAce()) {
      return 1;
    } else if (this.isFaceCard()) {
      return 10;
    } else {
      return this.faceValue;
    }
  }

  public minValue() {
    if (this.isAce()) {
      return 1;
    } else {
      return this.getValue();
    }
  }

  public maxValue() {
    if (this.isAce()) {
      return 11;
    } else {
      return this.getValue();
    }
  }

  public isAce() {
    return this.faceValue === 1;
  }

  public isFaceCard() {
    return this.faceValue >= 11 && this.faceValue <= 13;
  }
}

class Deck<T extends BlackJackCard> {
  private cards: T[] = [];
  // private dealtIndex = 0;

  constructor() {
    this.createDeck();
    this.shuffle();
  }

  setDeckOfCards(cards: T[]) {
    this.cards = cards;
  }

  public shuffle() {
    const count = this.cards.length;
    for (let i = 0; i < count; i++) {
      const j = i + Math.floor(Math.random() * (count - i));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // public getRemainingCards() {
    // return this.cards.length - this.dealtIndex;
  // }

  public createDeck() {
    for (const suit of Object.values(Suit)) {
      for (let i = 1; i <= 13; i++) {
        this.cards.push(new BlackJackCard(i, suit) as T);
      }
    }
  }

  public removeOneCard() {
    if (this.cards.length === 0) throw new Error("No more cards");
    const card = this.cards.pop() as T;

    return card;
  }
}

abstract class Player {
  private name: string;
  private hand: BlackJackCard[] = [];

  abstract canPlay(): boolean;
  abstract wantsToPlay(): boolean;

  constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public getTotalPoints() {
    let minTotal = 0;
    let maxTotal = 0;

    for (const card of this.hand) {
      minTotal += card.minValue();
      maxTotal += card.maxValue();
    }

    if (maxTotal > 21) {
      return minTotal;
    } else {
      return maxTotal;
    }
  }

  public addCard(card: BlackJackCard) {
    this.hand.push(card);
  }

  public toString() {
    return this.name;
  }
}

class BlackJackPlayer extends Player {

  public override canPlay(): boolean {
    return this.getTotalPoints() < 21;  
  }

  public override wantsToPlay(): boolean {
    return this.getTotalPoints() < 17;
  }
}

class Dealer extends Player {
  public override canPlay(): boolean {
    return this.getTotalPoints() < 21;  
  }

  public override wantsToPlay(): boolean {
    return true;
  }
}

class Move {
  private person: Player;
  private card: Card;

  constructor (person: Player, card: Card) {
    this.person = person;
    this.card = card;
  }

  public getPerson() {
    this.person;
  }

  public getCard() {
    this.card;
  }

  public toString() {
    return `${this.person} received ${this.card}`;
  }
}

class BlackJackGame {
  private deckOfCards = new Deck();
  private dealer: Player = new Dealer("Max");
  // private player: Player | null = null;
  private player: Player;

  private moves: Move[] = [];

  private hiddenDealerCard: BlackJackCard | null = null;

  constructor(playerName: string) {
    this.player = new BlackJackPlayer(playerName);
  }

  public giveCard(player: Player, card: BlackJackCard) {
    const move = new Move(player, card);
    console.log(move.toString());
    this.moves.push(move);
    player.addCard(card);
  }

  public giveNewCard(player: Player) {
    this.giveCard(player, this.deckOfCards.removeOneCard());
  }

  public gameEnded() {
    return this.player.getTotalPoints() >= 21 || this.dealer.getTotalPoints() >= 21;
  }

  public showGameWinner() {
    if (this.player.getTotalPoints() >= 21) {
      console.log(`${this.player.getName()} has lost! ${this.player.getTotalPoints()} >= 21`);
    } else if (this.dealer.getTotalPoints() >= 21) {
      console.log(`${this.dealer.getName()} has lost! ${this.dealer.getTotalPoints()} >= 21`);
    } else {
      const winner = this.player.getTotalPoints() > this.dealer.getTotalPoints() ? this.player : this.dealer;

      console.log(`${winner.getName()} wins! ${winner.getTotalPoints()}`);
    }
  }

  public play() {
    console.log(this.deckOfCards);
    this.hiddenDealerCard = this.deckOfCards.removeOneCard();

    this.giveNewCard(this.dealer);
    this.giveNewCard(this.player);

    while (this.player.canPlay() && this.player.wantsToPlay() && !this.gameEnded()) {
      this.giveNewCard(this.player);
    }

    if (!this.gameEnded()) {
      this.giveCard(this.dealer, this.hiddenDealerCard);

      while (this.dealer.canPlay() && !this.gameEnded()) {
        this.giveNewCard(this.dealer);
      }
    }

    this.showGameWinner();
  }
}

const game = new BlackJackGame("John");
game.play();

