"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("./utils/error");
const logger_1 = __importDefault(require("./utils/logger"));
const db_1 = require("./config/db");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT;
if (!port) {
    throw new error_1.AppError("Port not defined", 500);
}
(async () => {
    try {
        await (0, db_1.connectToDatabase)();
        app_1.default.listen(port, () => {
            logger_1.default.info(`Server Started on http://localhost:${port}`);
        });
    }
    catch (err) {
        logger_1.default.error("Error Connecting to Database: ", err);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map