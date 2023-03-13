const db = require("../db");

module.exports = {
  getDailyChartDataByDateRange: (facility, startDate, endDate) => {
    return db("activity_forms")
      .select("form_date as date")
      .sum("dryer_diff as dryer_working_time")
      .sum("reducer_diff as reducer_working_time")
      .sum("cng_diff as cng_consumption")
      .where({ facility })
      .whereBetween("form_date", [startDate, endDate])
      .groupBy("form_date")
      .orderBy("form_date")
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },
  getLastDataForAvarage: (facility) => {
    return (
      db("activity_forms")
        //.select("form_date", "cng_total", "dryer_total", "reducer_total")
        .select()
        .where({ facility })
        .orderBy("form_date", "desc")
        .orderBy("shift", "desc")
        .limit(1)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.log(error);
          return { error };
        })
    );
  },
};
