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
        appId: '1308270548',
        secretId: 'AKID76ua3JL9j8KMAk7II6g3ILBoHQO82jCR',
        secretKey: '4vXv4zf8MZYIn393i9NN9mPq3Zt1vb3H',
        bucket: 'pl-1308270548',
        region: 'ap-beijing',
        url: 'https://pl-1308270548.cos.ap-beijing.myqcloud.com/',
    }
}