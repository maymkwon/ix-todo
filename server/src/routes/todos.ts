import models from '../../models';
import Router from 'koa-router';
import { toNum, isEmpty } from '../helper/utils';
import { Op } from 'sequelize';

const router = new Router();
const todoModel = models.Todos;

router.get('/', async (ctx, next) => {
  console.log(ctx);
  const { pageNo, pageSize, keyword = '', done } = ctx.request.query;
  let offset = 0;
  const page = toNum(pageNo);
  if (page > 1) {
    offset = toNum(pageNo) * (toNum(pageSize) - 1);
  }
  const limit = toNum(pageSize);

  const searchParams = {
    [Op.and]: {
      title: { [Op.like]: '%' + keyword + '%' },
      // done: { [Op.not]: null },
    },
  };

  const { count: totalCount, rows: contents } = await todoModel.findAndCountAll(
    {
      where: {
        ...searchParams,
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    }
  );
  const data = { totalCount, contents };
  ctx.body = data;
});

export default router;
