import models from '../../models';
import Router from 'koa-router';

const router = new Router();
const todoModel = models.Todos;

router.post('/create', async (ctx, next) => {
  const data = ctx.request.body;
  try {
    await todoModel
      .findOrCreate({
        where: { id: data.title },
        defaults: {
          ...data,
        },
      })
      .spread((memo, created) => {
        if (created) {
          console.log('New Memo: ', memo.dataValues);
        } else {
          console.log('Old Memo: ', memo.dataValues);
        }
      });
    // if (updateTodos) {
    //   ctx.body = updateTodos;
    // }
  } catch (error) {
    ctx.response.status = 404;
    ctx.body = '존재하지 않습니다.';
  }
});

export default router;
