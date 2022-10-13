"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.ParameterException = void 0;
class HttpException extends Error {
    code;
    success;
    message;
    constructor(code, success, message) {
        super(message);
        this.code = code;
        this.success = success;
        this.message = message;
    }
}
exports.default = HttpException;
class ParameterException extends HttpException {
    constructor(message = "参数错误") {
        super(200, false, message);
    }
}
exports.ParameterException = ParameterException;
class NotFound extends HttpException {
    constructor(message = "资源未找到") {
        super(200, false, message);
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=http-exception.js.map