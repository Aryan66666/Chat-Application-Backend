import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const storage = multer.memoryStorage();

export const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback) => {
    if(file.mimetype ==='image/jpeg')
        cb(null,true)
    else{
        cb(new Error('Only jpg files are allowed'))
    }
}
