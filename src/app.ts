import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import catchError from "./middlewares/exception";
import rateLimit from 'koa-ratelimit';
import InitManager from './common/init';
import {logger, accessLogger} from "./config/logger";

const app = new Koa();

/**
 * 应用级中间件
 * 使用方式：app.use(middleware)
 * 路由级中间件
 * 使用方式：router.use(middleware)
 * 错误处理中间件
 * 使用方式：app.use(middleware)
 * 第三方中间件
 * 使用方式：app.use(middleware)
 */

// 跨域
app.use(cors({
        origin: function (ctx) {
            return '*';
        },
    })
);
// 解析请求体
app.use(bodyParser());
// 错误处理
app.use(catchError);
app.use(accessLogger());
const db = new Map();
// 限流中间件 rate-limit
app.use(rateLimit({
        driver: 'memory',
        db,
        duration: 60000,
        errorMessage: 'Rate limit exceeded, please try again later.',
        id: (ctx) => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total',
        },
        max: 100,
        disableHeader: false,
        whitelist: (ctx) => {
        },
        blacklist: (ctx) => {
        },
    })
);

InitManager.initCore(app);

app.listen(3030, () => {
    console.log('server is running at http://localhost:3030');
})

module.exports = app;