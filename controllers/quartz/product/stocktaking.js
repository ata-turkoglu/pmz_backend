const quartzProductStocktakingServices = require("../../../services/quartz/product/stocktaking");
const { readMails } = require("../../../services/email/readMail");
const moment = require("moment");
moment.locale("tr");
module.exports = {
    addStocktakingData: async () => {
        let res = await quartzProductStocktakingServices.getLastDate();
        let lastDate;
        if (res == []) {
            lastDate = moment("01-09-2023", "DD-MM-YYYY").format(); // 2023-09-01T00:00:00+03:00
        } else {
            lastDate = moment(res[0]?.workday).format();
        }
        let data = await readMails(lastDate);
        return quartzProductStocktakingServices.addStocktakingData(data);
    },
};
