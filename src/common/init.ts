import Router from 'koa-router';
import Koa from 'koa';
import config from "../config/config";
import HttpException, {NotFound, ParameterException} from "./http-exception"
import fs from "fs";
import get from "lodash";

class InitManager {
    private static app: Koa;

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
        const mainRouter: Router = new Router();
        const path: string = `${process.cwd()}/src/app/api/v1`;
        const files: string[] = getFiles(path);
        for (let file of files) {
            // 获取文件后缀名
            const extension: string = file.substring(
                file.lastIndexOf("."),
                file.length
            );
            if (extension === ".ts") {
                // 加载api文件夹下所有文件
                // 并检测文件是否是koa的路由
                // 如果是路由便将路由加载
                const mod: Router = require(file);
                if (mod instanceof Router) {
                    console.info(`loading a router instance from file: ${file}`);
                    // 将机械出来的路由应用到app对象中
                    this.app.use(mod.routes()).use(mod.allowedMethods());
                }
            }
        }
    }

    // 加载配置文件
    static loadConfig(path = '') {
        global.config = config;
    }

    // 加载异常类
    static loadHttpException() {
        global.errs = [HttpException, ParameterException, NotFound];
    }
}


/**
 * 获取文件夹下所有文件名
 *
 * @export
 * @param {string} dir
 * @returns
 */
export function getFiles(dir: string): string[] {
    let res: string[] = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = dir + "/" + file;
        if (fs.statSync(name).isDirectory()) {
            const tmp = getFiles(name);
            res = res.concat(tmp);
        } else {
            res.push(name);
        }
    }
    return res;
}

export default InitManager;