const db = require("../../../db");
module.exports = {
    getProductionDataByDateRange: (startDate, endDate) => {
        return db("quartz_product_stocktaking")
            .select("workday")
            .sum("bigbag_produced as bigbag")
            .sum("diff_bigbag_produced as diffBigbag")
            .sum("pallet_produced as pallet")
            .sum("pp_produced as pp")
            .whereBetween("workday", [startDate, endDate])
            .groupBy("workday")
            .orderBy("workday")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
