const db = require("../db");

module.exports = {
  getFacilityActivityForms: (facility) => {
    return db("activity_forms")
      .select("*")
      .where("facility", facility)
      .then((result) => console.log(result));
  },
};
