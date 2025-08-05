import { Response } from "express";
import logger from "./logger";

 const sendResponse = (res:Response, statusCode?:number, data?:any, message?:string) => {
    try{
        logger.info(`Response sent with status code: ${statusCode}`,{
            data:data,
            message:message,
        })
    }
    catch(logErr){
        console.error("Logging failed in sendResponse:", logErr)
    }
    res.status(statusCode??200).json({
        success: true,
        data:data,
        message:message,
    });
    
}

export default sendResponse;
