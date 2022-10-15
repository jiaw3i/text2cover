import {createCanvas} from "canvas";
import sharp from 'sharp';
import {gradients} from "../lib/gradient";
import {CosClient} from "../lib/cos";
import fs from "fs";
import COS from "cos-nodejs-sdk-v5";


export async function text2cover(text: string, options: any = {}): Promise<string> {

    let textSvg = createSvg(text);
    let gradientBuffer = createBackground();

    let filename = `${text}_${Date.now()}.png`;

    // await sharp(Buffer.from(textSvg)).toFile('text.png');
    // await sharp(gradientBuffer).toFile('background.png');
    await sharp(gradientBuffer)
        .composite([
            {input: Buffer.from(textSvg), gravity: 'center'}
        ]).toFile(filename);

    let file = {
        name: filename,
        data: fs.createReadStream(filename),
    };
    await CosClient.uploadFile(file);
    let filePath = `text2cover/${filename}`;
    let signAuthorization = CosClient.getSignAuthorization(filePath);
    let objUrl = CosClient.cos.getObjectUrl({
        Bucket: CosClient.config.Bucket,
        Region: CosClient.config.Region,
        Key: filePath,
        Sign: true,
        Expires: 60 * 2,
        Headers: {
            Authorization: signAuthorization,
        }
    }, function (err, data) {
        console.log(err || data.Url);
    });


    return objUrl;
}

// Degrees to radians
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

/**
 * 创建背景
 */
function createBackground() {
    let size = {
        width: 800,
        height: 400
    }
    let len = gradients.length;
    let gradientObj = gradients[Math.floor(Math.random() * len)];
    let canvas = createCanvas(size.width, size.height, "svg");
    let context = canvas.getContext("2d");

    // Create gradient
    let gradient = context.createLinearGradient(0, 0, size.width, size.height);
    gradient.addColorStop(0, gradientObj.colors[0]);
    gradient.addColorStop(1, gradientObj.colors[1]);

    context.fillStyle = gradient;
    context.fillRect(0, 0, size.width, size.height);

    return canvas.toBuffer();
}

/**
 * 创建文字svg
 * @param text 文字
 */
function createSvg(text: string) {
    const fontSizeRange = {
        minSize: 15,
        maxSize: 30,
    }
    const size = {
        width: 800,
        height: 400
    }

    // get random font size within range
    let fontSize = Math.floor(Math.random() * (fontSizeRange.maxSize - fontSizeRange.minSize + 1) + fontSizeRange.minSize);
    let fontColor = '#000000';
    return Buffer.from(`<svg width="${size.width}" height="${size.height}" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="50%"  fill="${fontColor}" font-size="${fontSize}" font-weight="600" font-family="Times New Roman" text-anchor="middle" dominant-baseline="middle">
        ${text}
        </text>
    </svg>`);
}