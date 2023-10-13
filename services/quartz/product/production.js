const db = require("../../../db");
module.exports = {
    getProductionDataByDateRange: (startDate, endDate, product) => {
        return db("quartz_product_stocktaking")
            .select("workday")
            .modify(function (queryBuilder) {
                if (product != null) {
                    queryBuilder.where("product_name", product);
                }
            })
            .sum("bigbag_produced as bigbag")
            .sum("diff_bigbag_produced as diffBigbag")
            .sum("pallet_produced as pallet")
            .sum("pp_produced as pp")
            .sum("silobas_produced as silobas")
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
