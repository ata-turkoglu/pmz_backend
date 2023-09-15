const logServices = require("../services/logs");
module.exports = {
    getLogs: () => {
        return logServices.getLogs();
    },
};
