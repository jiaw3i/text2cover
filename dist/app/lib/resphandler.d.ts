declare class Resolve {
    fail(err?: {}, message?: string, errorCode?: number): {
        message: string;
        err: {};
        errorCode: number;
    };
    success(message?: string, errorCode?: number, code?: number): {
        message: string;
        code: number;
        errorCode: number;
    };
    json(data: any, message?: string, errorCode?: number, code?: number): {
        code: number;
        message: string;
        errorCode: number;
        data: any;
    };
}
export default Resolve;
