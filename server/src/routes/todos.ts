import models from '../../models';
import Router from 'koa-router';

const router = new Router();
const todoModel = models.Todos;

router.get('/', async (ctx, next) => {
  const todos = await todoModel.findAll();
  ctx.body = todos;
});

export default router;
