import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { Sequelize, Op } from 'sequelize';
import models from '../models';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import todoRouter from './routes/todos';
import createRouter from './routes/create';
import updateRouter from './routes/update';
import deleteRouter from './routes/delete';
import config from '../config/config.json';

const defaultConfig = config.development;

const app = new Koa();
const router = new Router();

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

// todo .env
const sequelize = new Sequelize(
  defaultConfig.database,
  defaultConfig.username,
  defaultConfig.password,
  {
    host: defaultConfig.host,
    dialect: 'mysql',
    ...operatorsAliases,
  }
);
sequelize.sync();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => {
  ctx.body = `<h1>Root page</h1>
              <br>
              <p>Todolist - Root page</p>`;
});

// 하나의 라우터에서 처리할수 있음
// 기능별로 나누어 보았습니다.
router.use('/todos', todoRouter.routes());
router.use('/create', createRouter.routes());
router.use('/update', updateRouter.routes());
router.use('/delete', deleteRouter.routes());

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
