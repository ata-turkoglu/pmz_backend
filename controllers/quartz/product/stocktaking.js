const quartzProductStocktakingServices = require("../../../services/quartz/product/stocktaking");
const { readMails } = require("../../../services/email/readMail");
const moment = require("moment");
moment.locale("tr");
module.exports = {
    addStocktakingData: () => {
        new Promise(async (resolve) => {
            let lastDateOfProducing =
                await quartzProductStocktakingServices.getLastDateOfProducing();

            let lastDateOfPackaging =
                await quartzProductStocktakingServices.getLastDateOfPackaging();

            let list = await readMails({
                lastDateOfProducing,
                lastDateOfPackaging,
            });

            resolve(list);
        })
            .then((list) => {
                let producingData = [];
                let packagingData = [];

                list.forEach((item) => {
                    if (item.producing) {
                        producingData.push(...item.producing);
                    }
                    if (item.packaging) {
                        packagingData.push(...item.packaging);
                    }
                });

                return [producingData, packagingData];
            })
            .then(([producingData, packagingData]) => {
                if (producingData.length > 0) {
                    quartzProductStocktakingServices.addStocktakingData(
                        producingData
                    );
                }
                if (packagingData.length > 0) {
                    quartzProductStocktakingServices.addPackagingData(
                        packagingData
                    );
                }
            });
    },
};
