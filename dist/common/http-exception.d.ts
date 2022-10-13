export default class HttpException extends Error {
    readonly code: number;
    readonly success: boolean;
    readonly message: string;
    constructor(code: number, success: boolean, message: string);
}
export declare class ParameterException extends HttpException {
    constructor(message?: string);
}
export declare class NotFound extends HttpException {
    constructor(message?: string);
}
