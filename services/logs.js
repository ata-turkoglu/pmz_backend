const fs = require("fs");
const logger = require("../logger");
module.exports = {
    getLogs: () => {
        return new Promise((resolve) => {
            let text = fs.readFileSync("./logs.log", "utf-8");
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
