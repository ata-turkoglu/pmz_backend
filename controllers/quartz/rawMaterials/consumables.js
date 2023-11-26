const consumabalesService = require("../../../services/quartz/rawMaterials/consumables");
const moment = require("moment");

module.exports = {
    getLastDate: (data) => {
        return consumabalesService.getLastDate(data);
    },
    addConsumable: (data) => {
        return consumabalesService.addConsumable(data);
    },
    getPurchasedConsumablesByYear: (year) => {
        const start = moment([year]).startOf("year").format("YYYY-MM-DD");
        const end = moment([year]).endOf("year").format("YYYY-MM-DD");

        return consumabalesService.getPurchasedConsumablesByYear([start, end]);
    },
};
