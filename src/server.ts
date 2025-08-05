import dotenv from 'dotenv';
import { AppError } from "./utils/error";
import logger from "./utils/logger";
import { connectToDatabase } from "./config/db";
import app from './app';
dotenv.config();

const port = process.env.PORT
if (!port) {
    throw new AppError("Port not defined", 500);
}

(async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            logger.info(`Server Started on http://localhost:${port}`);
        });
    } catch (err) {
        logger.error("Error Connecting to Database: ", err);
        process.exit(1); 
    }
})();