export default class HttpException extends Error {
    public readonly code: number;
    public readonly success: boolean;
    public readonly message: string;

    constructor(code: number, success: boolean, message: string) {
        super(message);
        this.code = code;
        this.success = success;
        this.message = message;
    }
}

export class ParameterException extends HttpException {
    constructor(message: string = "参数错误") {
        super(200, false, message);
    }
}

export class NotFound extends HttpException {
    constructor(message: string = "资源未找到") {
        super(200, false, message);
    }
}


