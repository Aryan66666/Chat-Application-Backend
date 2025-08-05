"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    try {
        logger_1.default.error(`Error: ${message}`, {
            statusCode,
            stack: err.stack
        });
    }
    catch (logErr) {
        console.error("Logging failed in errorMiddleware:", logErr);
    }
    res.status(statusCode).json({
        success: false,
        message: message
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error-middleware.js.map