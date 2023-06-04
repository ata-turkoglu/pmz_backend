const db = require("../../db");

const coalServices = {
    addCoalEntry: (data) => {
        return db("coal")
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
    getCoalData: () => {
        return db("coal")
            .select(
                "id",
                "company_name",
                "acceptance_date",
                "amount",
                "unit_price",
                "total_price"
            )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};

module.exports = coalServices;
