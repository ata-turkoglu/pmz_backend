const { format, createLogger, transports } = require("winston");
const { timestamp, combine, json, simple } = format;

const logger = createLogger({
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    transports: [new transports.File({ filename: "logs.log" })],
});

module.exports = logger;
