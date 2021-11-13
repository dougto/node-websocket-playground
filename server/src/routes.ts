import Router from 'koa-router';
import { upsertGameHandler } from './handlers/upsert-game-handler';
import { listGamesHandler } from './handlers/list-games-handler';

const router = new Router({ prefix: '/games' });

router.get('/', async (ctx) => {
  ctx.body = await listGamesHandler();
});

router.post('/', async (ctx) => {
  ctx.body = await upsertGameHandler(ctx.request.body);
});

export default router;
