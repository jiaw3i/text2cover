class Resolve {
    fail(err = {}, message = '操作失败', errorCode = 10001) {
        return {
            message,
            err,
            errorCode
        }
    }

    success(message = 'success', errorCode = 0, code = 200) {
        return {
            message,
            code,
            errorCode
        }
    }

    json(data, message = 'success', errorCode = 0, code = 200) {
        return {
            code,
            message,
            errorCode,
            data
        }
    }
}
export default Resolve;
