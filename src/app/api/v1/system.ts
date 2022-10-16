import Router from 'koa-router';
import {Result} from "../../models/Result";
import {text2cover} from "../../service/text2cover";
import {logger} from "../../../config/logger";


const router: Router = new Router({
    prefix: '/system'
});

router.get('/heartbeat', async (ctx, next) => {
    logger.info('request heartbeat api success');
    ctx.body = Result.success("ok");
});


module.exports = router;