const db = require("../../../db");

module.exports = {
    addStocktakingData: (data) => {
        return db("quartz_product_stocktaking")
            .insert(data)
            .returning("id")
            .then((result) => {
                return result;
            });
    },
};
