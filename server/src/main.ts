import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import routes from './routes';

require('dotenv').config();

const app = new Koa();

app.use(bodyParser());
app.use(routes.routes());
app.use(routes.allowedMethods());

const PORT = 3000;

app.listen(PORT);
console.log('App listening at port ', PORT);
