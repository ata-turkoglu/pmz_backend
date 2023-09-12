const quartzProductionService = require("../../../services/quartz/product/production");

module.exports = {
    getProductionDataByDateRange: (startDate, endDate) => {
        return quartzProductionService.getProductionDataByDateRange(
            startDate,
            endDate
        );
    },
};
