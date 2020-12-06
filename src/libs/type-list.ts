// 返回数据类型定义
export interface ResponseType {
    code: number;
    flag: boolean;
    message?: string | undefined;
    data?: any;
}