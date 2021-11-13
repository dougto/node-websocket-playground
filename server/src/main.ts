import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import './shared/websocket/server';
import routes from './routes';

require('dotenv').config();

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(routes.routes());
app.use(routes.allowedMethods());

const HTTP_PORT = process.env.HTTP_PORT as unknown as number || 3000;

app.listen(HTTP_PORT);
console.log('App listening at port ', HTTP_PORT);
