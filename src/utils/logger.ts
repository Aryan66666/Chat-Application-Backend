import winston, { format } from "winston";
import * as path from "path";
import * as fs from "fs";

const logLevel = process.env.LOG_LEVEL || "info";

const logDir = path.resolve(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json() 
  ),
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        })
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      level: logLevel,
      format: format.combine(format.timestamp(), format.json())
    })
  ],
  exitOnError: false
});

export default logger;
