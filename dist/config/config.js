"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60 * 60 * 24
    }
};
//# sourceMappingURL=config.js.map