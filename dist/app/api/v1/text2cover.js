"use strict";
/**
 * @description 文字转封面
 * @author jiawei
 * @date 2022-10-13
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const resphandler_1 = tslib_1.__importDefault(require("../../lib/resphandler"));
const res = new resphandler_1.default();
const router = new koa_router_1.default({
    prefix: '/v1/text2cover'
});
router.get('/do', async (ctx, next) => {
    ctx.body = {
        code: 200,
        success: true,
        message: '文字转封面'
    };
});
//# sourceMappingURL=text2cover.js.map