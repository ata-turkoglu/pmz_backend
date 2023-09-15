const { format, createLogger, transports } = require("winston");
const { timestamp, combine, json, simple } = format;
const path = require("path");
let logFileDir = path.join(__dirname, "logs.log");

const logger = createLogger({
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    transports: [
        new transports.File({ filename: logFileDir }),
        new transports.Console(),
    ],
});

module.exports = logger;
