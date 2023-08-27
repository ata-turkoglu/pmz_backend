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
                    flueFan: item.flue_fan,
                    kilnSpeed: item.kiln_speed,
                    temp: item.temp,
                    score: item.score,
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
            flue_fan: data.flueFan,
            kiln_speed: data.kilnSpeed,
            temp: data.temp,
            score: data.score,
        };
        return processService.addNewFeedingData(obj);
    },

    deleteReducerFeedingData: (id) => {
        return processService.deleteReducerFeedingData(id);
    },
};
