import models from '../../models';
import Router from 'koa-router';
import { throwError, throwIf, sendSuccess, sendError } from '../helper/error';
import { isEmpty } from '../helper/utils';

const router = new Router();
const todoModel = models.Todos;

router.post('/', async (ctx, next) => {
  const data = ctx.request.body;
  try {
    if (!data) throwError(400, 'req', 'incorrect request')(null);

    await todoModel
      .findOrCreate({
        where: { title: data.title },
        defaults: {
          title: data.title,
          done: false,
          strtDt: data.strtDt,
          endDt: data.endDt,
        },
      })
      .spread((a, b) => {
        // console.log(a);
        // console.log(b);
        sendSuccess(ctx, 'SUCESS');
      })
      .catch(error => {
        console.log('생성 오류', error);
        throw error;
      });
  } catch (error) {
    ctx.response.status = 404;
    ctx.body = error;
  }
});

export default router;
