import { NextFunction, Request, RequestHandler, Response } from "express";

export const wrap = (fn:RequestHandler):RequestHandler => {
    return async function(req:Request, res:Response, next:NextFunction){
        Promise.resolve(fn(req,res,next)).catch(next);
    }
    
}

export class AppError extends Error {
    statusCode: number;
    message: string;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        this.message = message;


        Error.captureStackTrace(this,this.constructor);
    }
    
};
