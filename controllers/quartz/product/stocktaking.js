const quartzProductStocktakingServices = require("../../../services/quartz/product/stocktaking");
const { readMails } = require("../../../services/email/readMail");
const logger = require("../../../logger");

module.exports = {
    addStocktakingData: () => {
        logger.info(
            "run quartzProductStocktakingController.addStocktakingData"
        );

        new Promise(async (resolve) => {
            //get last existent dates to filter non existent data mails
            let lastDateOfProducing =
                await quartzProductStocktakingServices.getLastDateOfProducing();

            let lastDateOfPackaging =
                await quartzProductStocktakingServices.getLastDateOfPackaging();

            //read mails due to dates and get data from the excels
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
