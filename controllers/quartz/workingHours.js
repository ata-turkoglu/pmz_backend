const quartzWorkingHoursService = require("../../services/quartz/workingHours");
module.exports = {
    getLastWorkingHoursData: () => {
        return quartzWorkingHoursService.getLastWorkingHoursData();
    },
    addWorkingHours: (data) => {
        let obj = {
            workday: data.date,
            crushing_timer: data.crushing.timer,
            crushing_diff: data.crushing.duration,
            mill1_timer: data.mill1.timer,
            mill1_diff: data.mill1.duration,
            mill2_timer: data.mill2.timer,
            mill2_diff: data.mill2.duration,
            screening_timer: data.screening.timer,
            screening_diff: data.screening.duration,
            crushed: data.crushed,
            washed: data.washed,
        };
        return quartzWorkingHoursService.addWorkingHours(obj);
    },
};
