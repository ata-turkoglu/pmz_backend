const activityFormsServices = require("../services/activityForms");
module.exports = {
  getFacilityActivityForms: (facility) => {
    return activityFormsServices.getFacilityActivityForms(facility);
  },
  addNew: (data) => {
    return activityFormsServices.addNew({
      form_date: data.date,
      facility: data.facility,
      shift: data.shift,
      dryer_kiln: data.dryerKilnTimer,
      reducer_kiln: data.reducerKilnTimer,
      cng: data.cngTimer,
      products: data.productsText,
      malfunctions: data.malfunctionsText,
      other_activities: data.otherActivities,
    });
  },
  update: (data) => {
    return activityFormsServices.update({
      id: data.id,
      form_date: data.date,
      facility: data.facility,
      shift: data.shift,
      dryer_kiln: data.dryerKilnTimer,
      reducer_kiln: data.reducerKilnTimer,
      cng: data.cngTimer,
      products: data.productsText,
      malfunctions: data.malfunctionsText,
      other_activities: data.otherActivities,
    });
  },
};
