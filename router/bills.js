const router = require("express").Router();
const billController = require("../controllers/bills");

router.post("/addElectricityBillData", (req, res, next) => {
    return billController
        .addElectricityBillData(req.body)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/getLastElectricityData", (req, res, next) => {
    return billController
        .getLastElectricityData()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/fuelDataByDateRange", (req, res, next) => {
    const { startDate, endDate } = req.query;
    return billController
        .getFuelDataByDateRange(startDate, endDate)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

module.exports = router;
