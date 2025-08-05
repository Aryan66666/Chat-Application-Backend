import mongoose from "mongoose";
import { AppError } from "../utils/error";
import logger from "../utils/logger";

export const connectToDatabase = async() => {

    const URI = process.env.MONGO_URL;
    if(!URI){
        throw new AppError("Database URL not defined", 500);
    }
    try{
    await mongoose.connect(URI)
    logger.info("Connected To Database");
    }
    catch(err){
        logger.error("ERROR connectiong database: ",err)
        throw new AppError("Error connecting to database",500);
    }


}