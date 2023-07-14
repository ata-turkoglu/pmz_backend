const processService = require("../services/process");

module.exports = {
    getReducerFeedingData: () => {
        return processService.getReducerFeedingData().then((result) => {
            let list = [];
            result.forEach((item) => {
                let obj = {
                    id: item.id,
                    dateTime: item.check_date,
                    coalHz: item.coal_hz,
                    calculatedCoal: item.coal_amount,
                    heavyMineralHz: item.mineral_hz,
                    calculatedHeavyMinerals: item.mineral_amount,
                    ratio: item.ratio,
                };
                list.push(obj);
            });
            return list;
        });
    },

    addNewFeedingData: (data) => {
        let obj = {
            check_date: data.dateTime,
            coal_hz: data.coalHz,
            coal_amount: data.calculatedCoal,
            mineral_hz: data.heavyMineralHz,
            mineral_amount: data.calculatedHeavyMinerals,
            ratio: data.ratio,
        };
        return processService.addNewFeedingData(obj);
    },

    deleteReducerFeedingData: (id) => {
        return processService.deleteReducerFeedingData(id);
    },
};
