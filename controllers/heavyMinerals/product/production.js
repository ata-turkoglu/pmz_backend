const heavyMineralsProductionService = require("../../../services/heavyMinerals/product/production");

module.exports = {
    getProductionDataByDateRange: (startDate, endDate) => {
        return heavyMineralsProductionService.getProductionDataByDateRange(
            startDate,
            endDate
        );
    },
};
