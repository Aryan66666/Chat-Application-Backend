require('colors'); // Top of file

import dotenv from 'dotenv';
import { AppError } from "./utils/error";
import logger from "./utils/logger";
import { connectToDatabase } from "./config/db";
import app from './app';
import "colors"
dotenv.config();

const port = process.env.PORT
if (!port) {
    throw new AppError("Port not defined", 500);
}

(async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            const url = `http://localhost:${port}`.blue;
            logger.info(`Server started on ${url}`);
        });
    } catch (err) {
        logger.error("Error Connecting to Database: ", err);
        process.exit(1); 
    }
})();
