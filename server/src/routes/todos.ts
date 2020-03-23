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
  const size = toNum(pageSize);
  if (page > 1) {
    offset = size * (page - 1);
  }
  const limit = size;

  const searchParams = {
    [Op.and]: {
      title: { [Op.like]: '%' + keyword + '%' },
      // done: { [Op.not]: null },
    },
  };

  const { count: totalCount, rows: contents } = await todoModel.findAndCountAll(
    {
      where: {
        // ...searchParams,
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    }
  );
  console.log('rowsrows', offset, limit);
  const data = { totalCount, contents };
  ctx.body = data;
});

router.get('/all', async (ctx, next) => {
  const { count: totalCount, rows: contents } = await todoModel.findAndCountAll(
    {
      where: {
        // relId: null,
      },
      order: [['createdAt', 'DESC']],
    }
  );
  const data = { totalCount, contents };
  ctx.body = data;
});

export default router;
