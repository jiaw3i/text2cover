/**
 * @description 文字转封面
 * @author jiawei
 * @date 2022-10-13
 */

import Router from 'koa-router';
import {text2cover} from "../../service/text2cover";
import {logger} from "../../../config/logger";

const router: Router = new Router({
    prefix: '/text2cover'
});

router.post('/', async (ctx, next) => {

    logger.info('request text2cover api~');
    let param = ctx.request.body;

    console.log(param?.text)
    let url = await text2cover(param?.text as string);
    ctx.body = {
        code: 200,
        success: true,
        message: "链接生成成功，2分钟内有效",
        data: url
    }
});

module.exports = router;