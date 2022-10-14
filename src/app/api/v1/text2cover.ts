/**
 * @description 文字转封面
 * @author jiawei
 * @date 2022-10-13
 */

import Router from 'koa-router';
import Resolve from "../../lib/resphandler";
import {text2cover} from "../../service/text2cover";

const res = new Resolve();

const router: Router = new Router({
    prefix: '/text2cover'
});

router.post('/', async (ctx, next) => {
    // ctx.accepts('application/json');
    let params;

    let param = ctx.request.body;

    console.log(param.text)
    let base64 = text2cover(param.text);
    ctx.body = {
        code: 200,
        success: true,
        message: base64
    }
});

module.exports = router;