const quartzProductStocktakingServices = require("../../../services/quartz/product/stocktaking");
const { readMails } = require("../../../services/email/readMail");
module.exports = {
    addStocktakingData: async () => {
        let data = await readMails();
        return quartzProductStocktakingServices.addStocktakingData(data);
    },
};
