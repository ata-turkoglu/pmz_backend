const ballChargeService = require("../../../services/quartz/rawMaterials/ballCharge");
module.exports = {
    addBallChargeData: async (data) => {
        let lastData = await ballChargeService.getLastData(data.mill);
        data.timer_diff = Math.abs(data.timer - lastData.timer);
        data.timer_total = Number(lastData.timer_total) + data.timer_diff;
        return ballChargeService.addBallChargeData(data);
    },
};
