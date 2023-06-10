const router = require("express").Router();
const coalControllers = require("../controllers/rawMaterials/coal.js");

router.get("/getCoalData", (req, res, next) => {
    return coalControllers
        .getCoalData()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.post("/addCoalEntry", (req, res, next) => {
    return coalControllers
        .addCoalEntry(req.body)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.patch("/updateCoalEntry", (req, res, next) => {
    return coalControllers
        .updateCoalEntry(req.body)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.delete("/deleteCoalEntry", (req, res, next) => {
    return coalControllers
        .deleteCoalEntry(req.body.id)
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
