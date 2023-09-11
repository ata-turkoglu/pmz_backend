const db = require("../../../db");
const moment = require("moment");

const setLastDate = (result) => {
    return new Promise((resolve) => {
        let lastDate;
        if (result == []) {
            lastDate = moment("01-09-2023", "DD-MM-YYYY").format(); // 2023-09-01T00:00:00+03:00
        } else {
            lastDate = moment(result[0]?.workday).format();
        }
        resolve(lastDate);
    });
};

module.exports = {
    addStocktakingData: (data) => {
        console.log("addStocktakingData");
        return db("quartz_product_stocktaking")
            .insert(data)
            .returning("id")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    addPackagingData: (data) => {
        return db("quartz_packaging_usage")
            .insert(data)
            .returning("id")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getLastDateOfProducing: () => {
        return db("quartz_product_stocktaking")
            .select("workday")
            .orderBy("workday", "desc")
            .limit(1)
            .then(async (result) => {
                return await setLastDate(result);
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getLastDateOfPackaging: () => {
        return db("quartz_packaging_usage")
            .select("workday")
            .orderBy("workday", "desc")
            .limit(1)
            .then(async (result) => {
                return await setLastDate(result);
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
