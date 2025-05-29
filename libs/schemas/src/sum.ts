import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

export enum Suit {
  Heart = "heart",
  Spade = "spade",
  Dimond = "dimond",
  Club = "club",
}

export class Card extends Schema {
  @type(Suit) suit: Suit;
  @type("string") face: string;
}

export class Player extends Schema {
  @type({ map: Player }) cards = new MapSchema<Card>();
}

export class SumRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type([Card]) deck = new ArraySchema<Card>();
  @type([Card]) playedCards = new ArraySchema<Card>();
  @type("number") playTo: number = 21;
  @type("number") sum: number = 0;
  @type("string") winningPlayerSessionId: string = "";
}
