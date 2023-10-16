const quartzProductionService = require("../../../services/quartz/product/production");

module.exports = {
    getProductionDataByDateRange: (startDate, endDate, product) => {
        return quartzProductionService.getProductionDataByDateRange(
            startDate,
            endDate,
            product
        );
    },
    getDispatchedDataByDateRange: (startDate, endDate, product) => {
        return quartzProductionService.getDispatchedDataByDateRange(
            startDate,
            endDate,
            product
        );
    },
    getBallConsumptionByDateRange: (startDate, endDate) => {
        return quartzProductionService.getBallConsumptionByDateRange(
            startDate,
            endDate
        );
    },
};
