const router = require("express").Router();
const coalControllers = require("../controllers/rawMaterials/coal.js");

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

module.exports = router;
