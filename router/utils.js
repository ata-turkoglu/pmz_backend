const router = require("express").Router();
const logger = require("../logger");
const stocktakingController = require("../controllers/quartz/product/stocktaking");

router.get("/checkMails", (req, res, next) => {
    logger.info("checkMails");
    //stocktakingController.addStocktakingData()
});

module.exports = router;
