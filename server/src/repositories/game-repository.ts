import { GameData, Game } from '../domains/game';
import { knexInstance } from '../shared/database/knex';
import { GameSchema } from '../shared/database/schemas/game-schema';

interface GameRepositoryDTO {
  listGames(): Promise<GameData[]>;
  upsertGame(game: GameData): Promise<GameData>;
}

export class GameRepository implements GameRepositoryDTO {
  async listGames(): Promise<GameData[]> {
    const gameRawData = await knexInstance<GameSchema>('games').select('id', 'moves', 'playerWhite', 'playerBlack', 'lastMove');

    const gameData: GameData[] = gameRawData.map(({
      id, lastMove, moves, playerBlack, playerWhite,
    }) => new Game({
      id,
      lastMove,
      moves: moves.split(','),
      players: {
        black: playerBlack,
        white: playerWhite,
      },
    }));

    return gameData;
  }

  async upsertGame({
    id, lastMove, moves, players,
  }: GameData): Promise<GameData> {
    const gameRawData = await knexInstance<GameSchema>('games').where({ id }).select('id');

    const gameExists = gameRawData.length > 0;

    if (gameExists) {
      await knexInstance<GameSchema>('games').where({ id }).update({
        lastMove, moves: moves.join(','), playerBlack: players.black, playerWhite: players.white,
      });

      const newGame = new Game({
        id, lastMove, moves, players,
      });

      return newGame;
    }

    await knexInstance<GameSchema>('games').insert({
      id, lastMove, moves: moves.join(','), playerBlack: players.black, playerWhite: players.white,
    });

    const newGame = new Game({
      id, lastMove, moves, players,
    });

    return newGame;
  }
}
