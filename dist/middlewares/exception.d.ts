/**
 * 全局异常处理
 * @param ctx 请求上下文
 * @param next 下一个中间件
 */
declare const catchError: (ctx: any, next: any) => Promise<void>;
export default catchError;
