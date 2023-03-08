const activityFormsServices = require("../services/activityForms");
const moment = require("moment");
module.exports = {
  getFacilityActivityForms: (facility) => {
    return activityFormsServices.getFacilityActivityForms(facility);
  },
  getForm(date, shift) {
    return activityFormsServices.getForm(date, shift);
  },
  addNew: (data) => {
    let date, shift;
    data.shift == 1
      ? (date = moment(data.date).subtract(1, "days").format("YYYY-MM-DD"))
      : (date = data.date);
    data.shift == 1 ? (shift = 3) : (shift = data.shift - 1);

    return module.exports.getForm(date, shift).then(async (foundDate) => {
      if (foundDate.length > 0) {
        let obj = {
          form_date: data.date,
          facility: data.facility,
          shift: data.shift,
          dryer_kiln: data.dryerKilnTimer,
          reducer_kiln: data.reducerKilnTimer,
          cng: data.cngTimer,
          products: data.productsText,
          malfunctions: data.malfunctionsText,
          other_activities: data.otherActivities,
        };

        obj.dryer_diff = data.dryerKilnTimer - foundDate[0].dryer_kiln;
        obj.reducer_diff = data.reducerKilnTimer - foundDate[0].reducer_kiln;

        obj.dryer_total = foundDate[0].dryer_total + obj.dryer_diff;
        obj.reducer_total = foundDate[0].reducer_total + obj.reducer_diff;

        return activityFormsServices.addNew(obj);
      } else {
        return { error: "Bir önceki vardiya bilgisi girilmemiş" };
      }
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
