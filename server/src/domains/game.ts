export interface GameData {
  id: number;
  moves: string[];
  players: {
    white: string;
    black: string;
  }
  lastMove: string;
}

export class Game {
  id: number;

  moves: string[];

  lastMove: string;

  players: {
    white: string;
    black: string;
  };

  constructor({
    id, moves, players, lastMove,
  }: GameData) {
    this.id = id;
    this.moves = moves;
    this.players = players;
    this.lastMove = lastMove;
  }
}
