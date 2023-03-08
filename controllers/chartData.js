const moment = require("moment");
const chartDataServices = require("../services/chartData");

module.exports = {
  getDailyChartDataByDateRange: (facility, startDate, endDate) => {
    return chartDataServices
      .getDailyChartDataByDateRange(facility, startDate, endDate)
      .then((result) => {
        return result.map((item) => {
          return {
            date: moment(item.date).format("YYYY-MM-DD"),
            dryerWorkingTime: item.dryer_working_time,
            reducerWorkingTime: item.reducer_working_time,
            cngConsumption: item.cng_consumption,
          };
        });
      });
  },
};
