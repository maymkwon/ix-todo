import models from '../../models';
import Router from 'koa-router';
import { throwError, throwIf, sendSuccess, sendError } from '../helper/error';
import { toNum } from '../helper/utils';

const router = new Router();
const todoModel = models.Todos;

router.delete('/', async (ctx, next) => {
  const { id } = ctx.request.query;
  try {
    await todoModel.destroy({
      where: { id: toNum(id) },
    });
    sendSuccess(ctx, 'SUCESS');
  } catch (error) {
    ctx.response.status = 404;
    ctx.body = '존재하지 않습니다.';
  }
});

export default router;
