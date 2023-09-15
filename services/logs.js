const fs = require("fs");
var path = require("path");
const logger = require("../logger");
module.exports = {
    getLogs: () => {
        return new Promise((resolve) => {
            let logFileDir = path.join(__dirname, "..", "logs.log");
            let text = fs.readFileSync(logFileDir, "utf-8");
            let array = text.split("\n");
            resolve(array);
        }).then((array) => {
            let dataArray = [];
            array.forEach((item) => {
                if (item != "") {
                    dataArray.push(JSON.parse(item));
                }
            });
            return dataArray;
        });
    },
};
