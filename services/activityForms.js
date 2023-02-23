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
  update: (data) => {
    return db("activity_forms")
      .update({
        form_date: data.form_date,
        facility: data.facility,
        shift: data.shift,
        dryer_kiln: data.dryer_kiln,
        reducer_kiln: data.reducer_kiln,
        cng: data.cng,
        products: data.products,
        malfunctions: data.malfunctions,
        other_activities: data.other_activities,
      })
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
