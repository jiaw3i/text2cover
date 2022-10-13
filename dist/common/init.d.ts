declare class InitManager {
    private static app;
    static initCore(app: any): void;
    static initLoadRouters(): void;
    static loadConfig(path?: string): void;
    static loadHttpException(): void;
}
/**
 * 获取文件夹下所有文件名
 *
 * @export
 * @param {string} dir
 * @returns
 */
export declare function getFiles(dir: string): string[];
export default InitManager;
