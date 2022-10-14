import {createCanvas} from "canvas";
import sharp from 'sharp';
import TextToSVG from 'text-to-svg';
import fs from "fs";
import path from "path";
import {gradients} from "../lib/gradient";


export async function text2cover(text: string, options: any = {}): Promise<string> {

    let size = {
        width: 300,
        height: 200
    };
    let colors = gradients[0].colors;
    let angle = 0;

    let canvas = createCanvas(size.width, size.height, "svg");
    let context = canvas.getContext("2d");

    // Create gradient
    let gradient = context.createLinearGradient(0, 0, size.width, size.height);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);

    context.fillStyle = gradient;
    context.fillRect(0, 0, size.width, size.height);

    let gradientBuffer = canvas.toBuffer();


    // let fontPath = path.join(__dirname, '../../fonts/arial.ttf');

    //Create an image with the background color
    await sharp(Buffer.from(gradientBuffer)).toFile('background.png');

    // let fontPath = `_${options.font || 'msyh.ttc'}`;
    // 将text转换为svg

    // console.log("fontPath", fontPath);
    // const textToSVG = TextToSVG.loadSync(fontPath);
    //
    // let svgOptions = {
    //     x: 0, // x坐标
    //     y: 0, // y坐标
    //     fontSize: options.fontSize || 100, // 字体大小
    //     anchor: 'top', // 文字锚点
    //     // attributes: {fill: 'red'}, // 文字属性
    //     attributes: {
    //         fill: options.color || 'black', // 文字颜色
    //     }
    // }
    //
    // let textSvg = textToSVG.getSVG("back", svgOptions);
    //
    // // console.log(textSvg);
    //
    // // let background = options.background || {r: 255, g: 255, b: 255, alpha: 1};
    // await sharp(Buffer.from(textSvg))
    //     .composite([
    //         {input: Buffer.from(text), gravity: 'center'}
    //     ]).toBuffer().then(data => {
    //         return data.toString('base64');
    //     }).catch(err => {
    //         console.log(err);
    //     });

    return '';
}

// Degrees to radians
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
