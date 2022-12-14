export default {
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
    },
    cos:{
        appId: '',
        secretId: '',
        secretKey: '',
        bucket: 'pl-',
        region: 'ap-beijing',
        url: 'https://pl-.cos.ap-beijing.myqcloud.com/',
    }
}
