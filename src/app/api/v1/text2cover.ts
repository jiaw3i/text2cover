/**
 * @description 文字转封面
 * @author jiawei
 * @date 2022-10-13
 */

import Router from 'koa-router';
import Resolve from "../../lib/resphandler";

const res = new Resolve();

const router: Router = new Router({
    prefix: '/v1/text2cover'
});

router.get('/do', async (ctx, next) => {
    ctx.body = {
        code: 200,
        success: true,
        message: '文字转封面'
    }
});

module.exports = router;