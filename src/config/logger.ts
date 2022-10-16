/**
 * 日志配置文件
 */

import path from "path";
import log4js from "koa-log4";

log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            filename: 'logs/access.log',
            pattern: '-yyyy-MM-dd',
        },
        application: {
            type: 'dateFile',
            filename: 'logs/application.log',
            pattern: '-yyyy-MM-dd',
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {appenders: ['out'], level: 'info'},
        access: {appenders: ['access'], level: 'info'},
        application: {appenders: ['application'], level: 'info'}
    }
});


export const logger = log4js.getLogger('application');
export const accessLogger = log4js.koaLogger(log4js.getLogger('access'));

// exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //记录所有访问级别的日志
// exports.logger = log4js.getLogger('application'); //记录所有应用级别的日志
