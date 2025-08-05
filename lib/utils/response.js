"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const sendResponse = (res, statusCode, data, message) => {
    try {
        logger_1.default.info(`Response sent with status code: ${statusCode}`, {
            data: data,
            message: message,
        });
    }
    catch (logErr) {
        console.error("Logging failed in sendResponse:", logErr);
    }
    res.status(statusCode ?? 200).json({
        success: true,
        data: data,
        message: message,
    });
};
exports.default = sendResponse;
//# sourceMappingURL=response.js.map