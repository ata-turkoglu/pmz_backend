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
  getLastDataForAvarage: (facility) => {
    return chartDataServices.getLastDataForAvarage(facility).then((result) => {
      return result.map((item) => {
        return {
          date: moment(item.form_date).format("YYYY-MM-DD"),
          facility: item.facility,
          shift: item.shift,
          dryerKilnTimer: item.dryer_kiln,
          reducerKilnTimer: item.reducer_kiln,
          cngTotal: item.cng_total,
          dryerTotal: item.dryer_total,
          reducerTotal: item.reducer_total,
        };
      });
    });
  },
};
