import { GameData } from '../domains/game';
import { GameRepository } from '../repositories/game-repository';

const gameRepository = new GameRepository();

export const listGamesHandler = async (): Promise<GameData[] | null> => {
  try {
    const result = await gameRepository.listGames();

    console.log('[listGamesHandler] games found');

    return result;
  } catch (error) {
    console.log('[listGamesHandler] Error: ', error);
  }

  return null;
};
