import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { Sequelize } from 'sequelize';
import models from '../models';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import todoRouter from './routes/todos';
import createRouter from './routes/create';
import updateRouter from './routes/update';
const app = new Koa();
const router = new Router();

// todo .env
const sequelize = new Sequelize('todo_database', 'root', 'Aa12345!', {
  host: '127.0.0.1',
  dialect: 'mysql',
});
sequelize.sync();

// sequelize.query = async function() {
//   try {
//     // proxy this call
//     return Sequelize.prototype.query.apply(this, arguments);
//   } catch (err) {
//     // handle it with sentry
//     console.log(err);

//     // rethrow error
//     throw err;
//   }
// };

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => {
  ctx.body = `<h1>Root page</h1>
              <br>
              <p>Todolist - Root page</p>`;
});

router.use('/todos', todoRouter.routes());
router.use('/create', createRouter.routes());
router.use('/update', updateRouter.routes());
// router.use('/delete', todoRouter.routes());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
