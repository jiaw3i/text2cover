"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { HttpException } = require('../common/http-exception');
/**
 * 全局异常处理
 * @param ctx 请求上下文
 * @param next 下一个中间件
 */
const catchError = async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment === 'dev';
        // 如果是开发环境，并且不是已知异常，就抛出异常，方便调试
        if (isDev && !isHttpException) {
            throw error;
        }
        // 已知异常
        if (isHttpException) {
            ctx.body = {
                code: error.code,
                success: error.success,
                message: error.message,
                path: `${ctx.method} ${ctx.path}`
            };
            ctx.status = error.code;
        }
        else {
            // 未知异常
            ctx.body = {
                code: 500,
                success: false,
                message: '服务器出错',
                path: `${ctx.method} ${ctx.path}`
            };
            ctx.response.status = 500;
        }
    }
};
exports.default = catchError;
//# sourceMappingURL=exception.js.map