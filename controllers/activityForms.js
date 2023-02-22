const activityFormsServices = require("../services/activityForms");
module.exports = {
  getFacilityActivityForms: (facility) => {
    return activityFormsServices.getFacilityActivityForms(facility);
  },
};
