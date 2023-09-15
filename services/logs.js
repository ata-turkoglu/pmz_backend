const fs = require("fs");
const logger = require("../logger");
module.exports = {
    getLogs: () => {
        return new Promise((resolve) => {
            fs.open("./logs.log", "r", function (err, fd) {
                if (err) {
                    fs.writeFile("./logs.log", "", function (err) {
                        if (err) {
                            logger.error("writeFile error: " + err);
                            console.log(err);
                        }
                        logger.info("Log file was saved");
                        console.log("The file was saved!");
                    });
                } else {
                    logger.info("Log file exists");
                    console.log("The file exists!");
                }
            });
            resolve();
        })
            .then(() => {
                let text = fs.readFileSync("./logs.log", "utf-8");
                return text.split("\n");
            })
            .then((array) => {
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
