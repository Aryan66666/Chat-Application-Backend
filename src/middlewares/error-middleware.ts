import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const errorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    try {
        logger.error(`Error: ${message}`, {
            statusCode,
            stack: err.stack
        });
    } catch (logErr) {
        console.error("Logging failed in errorMiddleware:", logErr);
    }
   
    res.status(statusCode).json({
        success:false,
        message:message
    })
}

