const db = require("../../../db");
const moment = require("moment");
module.exports = {
    getProductionDataByDateRange: (startDate, endDate, product) => {
        return db("quartz_product_stocktaking")
            .select("workday")
            .modify(function (queryBuilder) {
                if (product != null) {
                    queryBuilder.where("product_name", product);
                }
            })
            .sum("bigbag_produced as bigbag")
            .sum("diff_bigbag_produced as diffBigbag")
            .sum("pallet_produced as pallet")
            .sum("pp_produced as pp")
            .sum("silobas_produced as silobas")
            .whereBetween("workday", [startDate, endDate])
            .groupBy("workday")
            .orderBy("workday")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getDispatchedDataByDateRange: (startDate, endDate, product) => {
        return db("quartz_product_stocktaking")
            .select("workday")
            .modify(function (queryBuilder) {
                if (product != null) {
                    queryBuilder.where("product_name", product);
                }
            })
            .sum("bigbag_sent as bigbag")
            .sum("diff_bigbag_sent as diffBigbag")
            .sum("pallet_sent as pallet")
            .sum("pp_sent as pp")
            .sum("silobas_sent as silobas")
            .whereBetween("workday", [startDate, endDate])
            .groupBy("workday")
            .orderBy("workday")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getBallConsumptionByDateRange: async (startDate, endDate) => {
        let startBallChargeDateMill1,
            endBallChargeDateMill1,
            startBallChargeDateMill2,
            endBallChargeDateMill2;
        let ballCharges = [];
        let millsWorkingHours = [];
        let producedByMills = [];
        return new Promise(async (resolve) => {
            startBallChargeDateMill1 = await db("quartz_ball_charge")
                .select("workday")
                //.where({ mill: 1 })
                .andWhere("workday", "<=", startDate)
                .orderBy("workday", "desc")
                .limit(1)
                .then((res) => {
                    if (res.length > 0) {
                        return moment(res[0].workday).format("YYYY-MM-DD");
                    } else {
                        return (
                            db("quartz_ball_charge")
                                .select("workday")
                                //.where({ mill: 1 })
                                .orderBy("workday", "asc")
                                .limit(1)
                                .then((res) => {
                                    return moment(res[0].workday).format(
                                        "YYYY-MM-DD"
                                    );
                                })
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                    return { error };
                });

            endBallChargeDateMill1 = await db("quartz_ball_charge")
                .select("workday")
                //.where({ mill: 1 })
                .andWhere("workday", ">=", endDate)
                .orderBy("workday", "asc")
                .limit(1)
                .then((res) => {
                    if (res.length > 0) {
                        return moment(res[0].workday).format("YYYY-MM-DD");
                    } else {
                        return (
                            db("quartz_ball_charge")
                                .select("workday")
                                //.where({ mill: 1 })
                                .orderBy("workday", "desc")
                                .limit(1)
                                .then((res) => {
                                    return moment(res[0].workday).format(
                                        "YYYY-MM-DD"
                                    );
                                })
                        );
                    }
                });

            startBallChargeDateMill2 = await db("quartz_ball_charge")
                .select("workday")
                .where({ mill: 2 })
                .andWhere("workday", "<=", startDate)
                .orderBy("workday", "desc")
                .limit(1)
                .then((res) => {
                    if (res.length > 0) {
                        return moment(res[0].workday).format("YYYY-MM-DD");
                    } else {
                        return db("quartz_ball_charge")
                            .select("workday")
                            .where({ mill: 2 })
                            .orderBy("workday", "asc")
                            .limit(1)
                            .then((res) => {
                                return moment(res[0].workday).format(
                                    "YYYY-MM-DD"
                                );
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    return { error };
                });

            endBallChargeDateMill2 = await db("quartz_ball_charge")
                .select("workday")
                .where({ mill: 2 })
                .andWhere("workday", ">=", endDate)
                .orderBy("workday", "asc")
                .limit(1)
                .then((res) => {
                    if (res.length > 0) {
                        return moment(res[0].workday).format("YYYY-MM-DD");
                    } else {
                        return db("quartz_ball_charge")
                            .select("workday")
                            .where({ mill: 2 })
                            .orderBy("workday", "desc")
                            .limit(1)
                            .then((res) => {
                                return moment(res[0].workday).format(
                                    "YYYY-MM-DD"
                                );
                            });
                    }
                });
            resolve({
                start:
                    startBallChargeDateMill1 < startBallChargeDateMill2
                        ? startBallChargeDateMill1
                        : startBallChargeDateMill2,
                end:
                    endBallChargeDateMill1 > endBallChargeDateMill2
                        ? endBallChargeDateMill1
                        : endBallChargeDateMill2,
            });
        })
            .then(async (dates) => {
                const { start, end } = dates;
                ballCharges = await db("quartz_ball_charge")
                    .select("mill", "workday", "timer_diff", "amount")
                    .andWhere("workday", ">=", start)
                    .andWhere("workday", "<=", end)
                    .orderBy("workday", "asc")
                    .then((res) => res);
            })
            .then(async () => {
                millsWorkingHours = await db("quartz_working_hours")
                    .select("workday", "mill1_diff", "mill2_diff")
                    .where("workday", ">=", startDate)
                    .andWhere("workday", "<=", endDate)
                    .then((res) => res);
            })
            .then(async () => {
                producedByMills = await db("quartz_product_stocktaking")
                    .select(
                        "workday",
                        "product_name",
                        "bigbag_produced",
                        "silobas_produced",
                        "diff_bigbag_produced",
                        "pallet_produced",
                        "pp_produced"
                    )
                    .whereIn("product_name", [
                        "45 M",
                        "63 M",
                        "75 M",
                        "150 M BIGBAG",
                        "150 M (PALET)25 kg",
                        "150 M SİLOBAS",
                    ])
                    .andWhere("workday", ">=", startDate)
                    .andWhere("workday", "<=", endDate)
                    .then((res) => res);
            })
            .then(() => {
                return { ballCharges, millsWorkingHours, producedByMills };
            });
    },
};
