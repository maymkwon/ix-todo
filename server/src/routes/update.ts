import models from '../../models';
import Router from 'koa-router';
import { throwError, throwIf, sendSuccess, sendError } from '../helper/error';
import { Op } from 'sequelize';

const router = new Router();
const todoModel = models.Todos;

router.post('/', async (ctx, next) => {
  const data = ctx.request.body;
  try {
    if (!data) throwError(400, 'req', 'incorrect request')(null);
    const todo = await todoModel
      .findOne({ where: { [Op.or]: [{ id: data.id }] } })
      .then(
        throwIf(r => !r, 400, 'not found', 'Not found'),
        throwError(500, 'sequelize error', 'sequelize error')
      );

    console.log('!!!!!!!!!!!', todo);
    await todo.update(data).catch(error => {
      console.log('sequelize update error', error);
    });
    sendSuccess(ctx, 'SUCESS');
  } catch (error) {
    // console.log('ERROR', error);
    sendError(ctx, 404, '')(error);
  }
});

export default router;
