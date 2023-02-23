const db = require("../db");

module.exports = {
  getFacilityActivityForms: (facility) => {
    return db("activity_forms")
      .select(
        "id",
        "facility",
        "shift",
        "form_date as date",
        "dryer_kiln as dryerKilnTimer",
        "reducer_kiln as reducerKilnTimer",
        "cng as cngTimer",
        "products as productsText",
        "malfunctions as malfunctionsText",
        "other_activities as otherActivities"
      )
      .where("facility", facility)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },
  addNew: (data) => {
    return db("activity_forms")
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
