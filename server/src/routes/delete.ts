import models from '../../models';
import Router from 'koa-router';
import { throwError, throwIf, sendSuccess, sendError } from '../helper/error';

const router = new Router();
const todoModel = models.Todos;

router.post('/', async (ctx, next) => {
  const data = ctx.request.body;
  try {
    await todoModel
      .destroy({
        where: { id: data.id },
      })
      .catch(error => {
        console.log('sequelize update error', error);
      });
  } catch (error) {
    ctx.response.status = 404;
    ctx.body = '존재하지 않습니다.';
  }
});

export default router;
