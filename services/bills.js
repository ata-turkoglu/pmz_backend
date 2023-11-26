const db = require("../db");
module.exports = {
    addElectricityBillData: (data) => {
        return db("electricity_bill").insert(data).returning("id").then();
    },
    getLastElectricityData: () => {
        return db("electricity_bill")
            .select()
            .orderBy("invoice_date", "desc")
            .limit(1)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getFuelDataByDateRange: (startDate, endDate) => {
        return db("fuel")
            .select()
            .whereBetween("invoice_date", [startDate, endDate])
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
