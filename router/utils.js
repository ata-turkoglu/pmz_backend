const router = require("express").Router();
const logger = require("../logger");
const stocktakingController = require("../controllers/quartz/product/stocktaking");
const utilsController = require("../controllers/utils");

router.get("/checkMails", (req, res, next) => {
    logger.info("checkMails");
    stocktakingController.addStocktakingData();
    res.status(200).send(true);
    return next();
});

router.get("/getProducts", (req, res, next) => {
    return utilsController
        .getProducts()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/getProductPackagings", (req, res, next) => {
    return utilsController
        .getProductPackagings()
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
