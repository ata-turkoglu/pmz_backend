const router = require("express").Router();

const processController = require("../controllers/process");

router.get("/getReducerFeedingData", (req, res, next) => {
    return processController
        .getReducerFeedingData()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.post("/addReducerFeeding", (req, res, next) => {
    return processController
        .addNewFeedingData(req.body)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.delete("/deleteReducerFeedingData", (req, res, next) => {
    return processController
        .deleteReducerFeedingData(req.body.id)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

module.exports = router;
