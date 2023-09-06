const db = require("../../../db");

module.exports = {
    addStocktakingData: (data) => {
        return db("quartz_product_stocktaking")
            .insert(...data)
            .returning("id")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getLastDate: () => {
        return db("quartz_product_stocktaking")
            .select("workday")
            .orderBy("workday", "desc")
            .limit(1)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
