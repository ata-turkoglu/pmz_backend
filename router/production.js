const router = require("express").Router();
const heavyMineralsProductionControllers = require("../controllers/heavyMinerals/product/production");

router.get("/productionByDateRange", (req, res, next) => {
    const { facility, startDate, endDate } = req.query;
    if (facility == 2) {
        return heavyMineralsProductionControllers
            .getProductionDataByDateRange(startDate, endDate)
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
