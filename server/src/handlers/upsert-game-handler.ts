import { GameData } from '../domains/game';
import { GameRepository } from '../repositories/game-repository';
import { webSocketServer } from '../shared/websocket/server';

const gameRepository = new GameRepository();

export const upsertGameHandler = async (gameData: GameData): Promise<GameData | null> => {
  try {
    const result = await gameRepository.upsertGame(gameData);

    console.log('[upsertGameHandler] game upserted: ', result);

    webSocketServer.emit('new-move', result);

    return result;
  } catch (error) {
    console.log('[upsertGameHandler] Error: ', error);
  }

  return null;
};
