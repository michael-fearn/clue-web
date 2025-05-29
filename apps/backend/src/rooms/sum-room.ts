import { Room, Client, Delayed } from "@colyseus/core";
import { Card, Player, Suit, SumRoomState } from "@lib/schemas";

export class SumRoom extends Room<SumRoomState, Player> {
  maxClients = 4;
  state = new SumRoomState();

  onCreate(options: any) {
    this.state.deck.push(...this.generateDeck());
    this.state.deck.shuffle();

    this.onMessage("play-card", (client, cardKey: string) => {
      const player = this.state.players.get(client.sessionId);
      
      if (!player.cards.has(cardKey)) throw new Error("Bad cardIndex");
      
      const card = player.cards.get(cardKey);
      player.cards.delete(cardKey);

      this.state.sum = this.state.sum + this.getCardValue(card);

      if (this.state.playTo < this.state.sum)
        this.state.winningPlayerSessionId = client.sessionId;

      this.clock.setTimeout(() => {
        this.resetRoom();
      }, 5000);
    });
  }

  resetRoom() {
    this.state.players.forEach((player) => player.cards.clear());
    this.state.deck.clear();
    this.state.deck.push(...this.generateDeck());
    this.state.sum = 0;
    this.state.winningPlayerSessionId = "";
  }

  onJoin(client: Client, options: any) {
    const player = new Player();
    this.state.players.set(client.sessionId, player);

    const card = this.state.deck.pop();
    player.cards.set(this.getCardKey(card), card);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  getCardKey(card: Card): string {
    return card.suit + ":" + card.face;
  }

  generateDeck() {
    const cards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
      "ace",
    ]
      .map((face) =>
        Object.keys(Suit).map((suit) => {
          const card = new Card();
          card.suit = suit as Suit;
          card.face = face;
          return card;
        })
      )
      .flat(1);
    const joker1 = new Card();
    joker1.face = "joker";
    cards.push(joker1);

    const joker2 = new Card();
    joker1.face = "joker";
    cards.push(joker2);
    return cards;
  }

  getCardValue(card: Card) {
    return {
      ace: 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      jack: 11,
      queen: 12,
      king: 13,
    }[card.face];
  }
}
