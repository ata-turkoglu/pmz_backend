const router = require("express").Router();
const chartDataController = require("../controllers/chartData");
const quartzProductionController = require("../controllers/quartz/product/production");

router.get("/daily", (req, res, next) => {
    const { facility, startDate, endDate } = req.query;
    return chartDataController
        .getDailyChartDataByDateRange(facility, startDate, endDate)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/get-last-total", (req, res, next) => {
    const { facility } = req.query;
    return chartDataController
        .getLastDataForAvarage(facility)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/get-previous-total-for-edit", (req, res, next) => {
    const { facility } = req.query;
    return chartDataController
        .getPreviousDataForEdit(facility)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/production", (req, res, next) => {
    const { facility, startDate, endDate, product } = req.query;
    if (facility == 5) {
        return quartzProductionController
            .getProductionDataByDateRange(startDate, endDate, product)
            .then((result) => {
                res.status(200).send(result);
                return next();
            })
            .catch((exception) => {
                console.log(exception);
                return next();
            });
    }
});
router.get("/dispatched", (req, res, next) => {
    const { facility, startDate, endDate, product } = req.query;
    if (facility == 5) {
        return quartzProductionController
            .getDispatchedDataByDateRange(startDate, endDate, product)
            .then((result) => {
                res.status(200).send(result);
                return next();
            })
            .catch((exception) => {
                console.log(exception);
                return next();
            });
    }
});

module.exports = router;
