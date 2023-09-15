const router = require("express").Router();
const logControllers = require("../controllers/logs");
const logger = require("../logger");

router.get("/", (req, res, next) => {
    return logControllers
        .getLogs()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            logger.error("logControllers getLogs: " + exception);
            console.log(exception);
            return next();
        });
});

module.exports = router;
