const db = require("../../../db");

module.exports = {
    getLastDate: (data) => {
        return db("consumables")
            .select()
            .whereIn("facility", data.facility)
            .whereIn("material", data.materials)
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
    addConsumable: (data) => {
        return db("consumables")
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
};
