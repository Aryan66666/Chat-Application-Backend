"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.wrap = void 0;
const wrap = (fn) => {
    return async function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.wrap = wrap;
class AppError extends Error {
    statusCode;
    message;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
;
//# sourceMappingURL=error.js.map