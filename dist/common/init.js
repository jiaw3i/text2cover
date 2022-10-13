"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const config_1 = tslib_1.__importDefault(require("../config/config"));
const http_exception_1 = tslib_1.__importStar(require("./http-exception"));
const fs = tslib_1.__importStar(require("fs"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
class InitManager {
    static app;
    static initCore(app) {
        // 入口方法
        InitManager.app = app;
        // 加载全部路由
        InitManager.initLoadRouters();
        // 加载异常类
        InitManager.loadHttpException();
        // 加载配置文件
        InitManager.loadConfig();
    }
    // 加载所有路由
    static initLoadRouters() {
        // 路由自动加载
        const mainRouter = new koa_router_1.default();
        const path = `${process.cwd()}\\src\\app\\api\\v1`;
        const files = getFiles(path);
        for (let file of files) {
            // 获取文件后缀名
            const extension = file.substring(file.lastIndexOf("."), file.length);
            if (extension === ".ts") {
                // 加载api文件夹下所有文件
                // 并检测文件是否是koa的路由
                // 如果是路由便将路由加载
                const mod = require(file);
                if (mod instanceof koa_router_1.default) {
                    // consola.info(`loading a router instance from file: ${file}`);
                    (0, lodash_1.default)(mod, "stack", []).forEach((ly) => {
                        console.info(`loading a route: ${(0, lodash_1.default)(ly, "path")}`);
                    });
                    mainRouter.use(mod.routes()).use(mod.allowedMethods());
                }
            }
        }
    }
    // 加载配置文件
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.ts';
        global.config = config_1.default;
    }
    // 加载异常类
    static loadHttpException() {
        global.errs = [http_exception_1.default, http_exception_1.ParameterException, http_exception_1.NotFound];
    }
}
/**
 * 获取文件夹下所有文件名
 *
 * @export
 * @param {string} dir
 * @returns
 */
function getFiles(dir) {
    let res = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = dir + "/" + file;
        if (fs.statSync(name).isDirectory()) {
            const tmp = getFiles(name);
            res = res.concat(tmp);
        }
        else {
            res.push(name);
        }
    }
    return res;
}
exports.getFiles = getFiles;
exports.default = InitManager;
//# sourceMappingURL=init.js.map