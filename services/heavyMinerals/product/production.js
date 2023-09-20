const db = require("../../../db");
module.exports = {
    getProductionDataByDateRange: (startDate, endDate) => {
        return db("hm_production")
            .select()
            .whereBetween("workday", [startDate, endDate])
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
