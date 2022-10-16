import COS from 'cos-nodejs-sdk-v5';
import {logger} from "../../config/logger";

export class CosClient {
    /**
     * 腾讯云cos客户端
     */
    static cos: COS;
    static config: {
        AppId: string;
        SecretId: string;
        SecretKey: string;
        Bucket: string;
        Region: string;
    };


    static init(config) {
        this.config = config;
        this.cos = new COS({
            SecretId: config.SecretId,
            SecretKey: config.SecretKey,
        });

    }

    static async uploadFile(file): Promise<string> {
        let params = {
            Bucket: this.config.Bucket,
            Region: this.config.Region,
            Key: `text2cover/${file.name}`,
            Body: file.data,
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            }
        };
        logger.info("cos put object params=", params);
        let result = await this.cos.putObject(params);
        logger.info("cos put object result=", result);
        return result.Location;
    }


    static getSignAuthorization(filePath: string) {
        return COS.getAuthorization(
            {
                SecretId: this.config.SecretId,
                SecretKey: this.config.SecretKey,
                Method: 'get',
                Key: filePath,
                Expires: 60 * 2,
                Query: {},
                Headers: {}
            }
        );
    }
}