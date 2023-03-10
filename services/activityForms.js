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
        "dryer_diff as dryerDiff",
        "reducer_diff as reducerDiff",
        "dryer_total as dryerTotal",
        "reducer_total as reducerTotal",
        "cng as cngTimer",
        "cng_diff as cngDiff",
        "cng_total as cngTotal",
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
  getForm: (date, shift) => {
    return db("activity_forms")
      .select()
      .where({ form_date: date, shift })
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
  update: (data) => {
    return db("activity_forms")
      .update(data)
      .where({ id: data.id })
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
