const quartzProductionService = require("../../../services/quartz/product/production");

module.exports = {
    getProductionDataByDateRange: (startDate, endDate, product) => {
        return quartzProductionService.getProductionDataByDateRange(
            startDate,
            endDate,
            product
        );
    },
};
