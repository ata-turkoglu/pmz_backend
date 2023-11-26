const billsService = require("../services/bills");
module.exports = {
    addElectricityBillData: (data) => {
        return billsService.addElectricityBillData(data);
    },
    getLastElectricityData: () => {
        return billsService.getLastElectricityData();
    },
    getFuelDataByDateRange: (startDate, endDate) => {
        return billsService.getFuelDataByDateRange(startDate, endDate);
    },
};
