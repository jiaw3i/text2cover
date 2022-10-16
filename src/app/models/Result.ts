export class Result {
    code: number;
    success: boolean;
    message: string;
    data: any;

    constructor(code: number, success: boolean, message: string, data: any) {
        this.code = code;
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(data: any, message: string = 'success', code: number = 200): Result {
        return new Result(code, true, message, data);
    }

    static fail(data: any, message: string = 'fail', code: number = 400): Result {
        return new Result(code, false, message, data);
    }

    static json(data: any, success: boolean = true, message: string = 'success', code: number = 200): Result {
        return new Result(code, success, message, data);
    }

}