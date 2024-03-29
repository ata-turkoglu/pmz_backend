const activityFormsServices = require("../services/activityForms");
const moment = require("moment");
module.exports = {
    getFacilityActivityForms: (facility) => {
        return activityFormsServices
            .getFacilityActivityForms(facility)
            .then((result) => {
                return result;
            });
    },
    getForm(facility, date, shift) {
        return activityFormsServices.getForm(facility, date, shift);
    },
    addNew: (data) => {
        let date, shift;
        data.shift == 1
            ? (date = moment(data.date)
                  .subtract(1, "days")
                  .format("YYYY-MM-DD"))
            : (date = data.date);
        data.shift == 1 ? (shift = 3) : (shift = data.shift - 1);
        return module.exports
            .getForm(data.facility, date, shift)
            .then((foundDate) => {
                if (foundDate.length > 0) {
                    let obj = {
                        form_date: data.date,
                        facility: data.facility,
                        shift: data.shift,
                        dryer_kiln: data.dryerKilnTimer,
                        reducer_kiln: data.reducerKilnTimer,
                        cng: data.cngTimer,
                        produced: data.produced,
                        malfunctions: data.malfunctionsText,
                        other_activities: data.otherActivities,
                    };

                    obj.dryer_diff =
                        data.dryerKilnTimer - foundDate[0].dryer_kiln;
                    obj.reducer_diff =
                        data.reducerKilnTimer - foundDate[0].reducer_kiln;

                    obj.dryer_total =
                        Number(foundDate[0].dryer_total) +
                        Number(obj.dryer_diff);
                    obj.reducer_total =
                        Number(foundDate[0].reducer_total) +
                        Number(obj.reducer_diff);

                    obj.cng_diff = data.cngTimer - foundDate[0].cng;
                    obj.cng_total = foundDate[0].cng_total + obj.cng_diff;

                    return activityFormsServices.addNew(obj);
                } else {
                    return { error: "Bir önceki vardiya bilgisi girilmemiş" };
                }
            });
    },
    update: (data) => {
        let date, shift;
        data.shift == 1
            ? (date = moment(data.date)
                  .subtract(1, "days")
                  .format("YYYY-MM-DD"))
            : (date = data.date);
        data.shift == 1 ? (shift = 3) : (shift = data.shift - 1);

        return module.exports
            .getForm(data.facility, date, shift)
            .then((foundDate) => {
                if (foundDate.length > 0) {
                    let obj = {
                        id: data.id,
                        form_date: data.date,
                        facility: data.facility,
                        shift: data.shift,
                        dryer_kiln: data.dryerKilnTimer,
                        reducer_kiln: data.reducerKilnTimer,
                        cng: data.cngTimer,
                        produced: data.produced,
                        malfunctions: data.malfunctionsText,
                        other_activities: data.otherActivities,
                    };

                    obj.dryer_diff =
                        data.dryerKilnTimer - foundDate[0].dryer_kiln;
                    obj.reducer_diff =
                        data.reducerKilnTimer - foundDate[0].reducer_kiln;

                    obj.dryer_total =
                        Number(foundDate[0].dryer_total) +
                        Number(obj.dryer_diff);
                    obj.reducer_total =
                        Number(foundDate[0].reducer_total) +
                        Number(obj.reducer_diff);

                    obj.cng_diff = data.cngTimer - foundDate[0].cng;
                    obj.cng_total = foundDate[0].cng_total + obj.cng_diff;

                    return activityFormsServices.update(obj);
                } else {
                    return { error: "Bir önceki vardiya bilgisi girilmemiş" };
                }
            });
    },
};
