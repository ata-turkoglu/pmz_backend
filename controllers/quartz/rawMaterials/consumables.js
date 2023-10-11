const consumabalesService = require("../../../services/quartz/rawMaterials/consumables");

module.exports = {
    getLastDate: (data) => {
        return consumabalesService.getLastDate(data);
    },
    addConsumable: (data) => {
        return consumabalesService.addConsumable(data);
    },
};
