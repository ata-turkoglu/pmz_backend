const router = require("express").Router();
const logger = require("../logger");
const stocktakingController = require("../controllers/quartz/product/stocktaking");

router.get("/checkMails", (req, res, next) => {
    logger.info("checkMails");
    res.status(200).send(true);
    return next();
    //stocktakingController.addStocktakingData()
});

module.exports = router;
