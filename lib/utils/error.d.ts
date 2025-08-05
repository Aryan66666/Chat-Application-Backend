import { RequestHandler } from "express";
export declare const wrap: (fn: RequestHandler) => RequestHandler;
export declare class AppError extends Error {
    statusCode: number;
    message: string;
    constructor(message: string, statusCode: number);
}
//# sourceMappingURL=error.d.ts.map