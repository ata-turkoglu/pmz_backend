const db = require("../../../db");
module.exports = {
    getLastData: (mill) => {
        return db("quartz_ball_charge")
            .select()
            .where("mill", mill)
            .orderBy("id", "desc")
            .limit(1)
            .then((result) => {
                return result[0];
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addBallChargeData: (data) => {
        return db("quartz_ball_charge")
            .insert(data)
            .returning("id")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
