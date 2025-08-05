"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../utils/error");
const logger_1 = __importDefault(require("../utils/logger"));
const connectToDatabase = async () => {
    const URI = process.env.MONGO_URL;
    if (!URI) {
        throw new error_1.AppError("Database URL not defined", 500);
    }
    try {
        await mongoose_1.default.connect(URI);
        logger_1.default.info("Connected To Database");
    }
    catch (err) {
        logger_1.default.error("ERROR connectiong database: ", err);
        throw new error_1.AppError("Error connecting to database", 500);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map