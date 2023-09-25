const db = require("../../db");
module.exports = {
    getLastWorkingHoursData: () => {
        return db("quartz_working_hours")
            .select()
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
    addWorkingHours: (data) => {
        return db("quartz_working_hours")
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
