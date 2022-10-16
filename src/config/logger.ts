/**
 * 日志配置文件
 */

import path from "path";
import log4js from "koa-log4";

log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            filename: path.join('/data', '/logs/text2cover/access.log'),
            pattern: '-yyyy-MM-dd',
        },
        application: {
            type: 'dateFile',
            filename: path.join('/data', '/logs/text2cover/application.log'),
            pattern: '-yyyy-MM-dd',
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {appenders: ['out'], level: 'debug'},
        access: {appenders: ['access'], level: 'info'},
        application: {appenders: ['application'], level: 'WARN'}
    }
});


export const logger = log4js.getLogger('application');
export const accessLogger = log4js.koaLogger(log4js.getLogger('access'));