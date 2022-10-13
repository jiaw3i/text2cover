"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Koa = tslib_1.__importStar(require("koa"));
const cors = tslib_1.__importStar(require("koa2-cors"));
const bodyParser = tslib_1.__importStar(require("koa-bodyparser"));
const exception_1 = tslib_1.__importDefault(require("./middlewares/exception"));
const rateLimit = tslib_1.__importStar(require("koa-ratelimit"));
const init_1 = tslib_1.__importDefault(require("./common/init"));
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
}));
// 解析请求体
app.use(bodyParser());
// 错误处理
app.use(exception_1.default);
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
}));
init_1.default.initCore(app);
app.listen(3030, () => {
    console.log('server is running at http://localhost:3030');
});
module.exports = app;
//# sourceMappingURL=app.js.map